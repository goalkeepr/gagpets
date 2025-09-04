import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import { SERVER_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES } from './config/constants.js';
import { validatePetCalculationInputs } from './utils/validation.js';
import { calculationCache } from './utils/cache.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || SERVER_CONFIG.DEFAULT_PORT;

// Enable compression for all responses
app.use(compression());

// JSON middleware for API routes
app.use(express.json());

// Set proper MIME types for ES6 modules
app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    }
    next();
});

// Serve static files from the current directory with caching
app.use(express.static(__dirname, {
    maxAge: SERVER_CONFIG.STATIC_FILES_CACHE_DURATION,
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        }
        // Set cache headers for static assets
        if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 hours
        }
    }
}));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pets.html'));
});

// Route for recipes page
app.get('/recipes', (req, res) => {
    res.sendFile(path.join(__dirname, 'recipes.html'));
});

// Route for fruit types page
app.get('/fruittypes', (req, res) => {
    res.sendFile(path.join(__dirname, 'fruittypes.html'));
});

// Health check route for production monitoring
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
    });
});

// API Routes
// GET /api - API information and documentation
app.get('/api', (req, res) => {
    res.json({
        name: 'Pet Abilities API',
        version: '1.0.0',
        description: 'REST API for Grow a Garden pet abilities and calculations',
        endpoints: {
            'GET /api': {
                description: 'API information and documentation'
            },
            'GET /api/pets': {
                description: 'Returns list of all available pets with metadata',
                response: {
                    count: 'number - Total number of pets',
                    pets: 'array - Array of pet objects with key, name, rarity, type, source, description'
                }
            },
            'GET /api/pets/:petKey/ability': {
                description: 'Returns calculated ability text for a specific pet at given weight',
                parameters: {
                    petKey: 'string - Pet identifier (path parameter)',
                    weight: 'number - Pet weight in kg (query parameter)'
                },
                response: {
                    petKey: 'string - Pet identifier',
                    petName: 'string - Pet display name',
                    weight: 'number - Pet weight used for calculation',
                    abilityText: 'string - HTML-formatted ability description'
                }
            }
        },
        examples: {
            'List all pets': 'GET /api/pets',
            'Get bunny ability at 50kg': 'GET /api/pets/bunny/ability?weight=50',
            'Get legendary pet ability': 'GET /api/pets/tarantulahawk/ability?weight=75'
        }
    });
});

// GET /api/pets - Returns list of available pets
app.get('/api/pets', async (req, res) => {
    try {
        const { petAbilities } = await import('./petAbilities_modular.js');

        const pets = Object.keys(petAbilities).map(key => ({
            key,
            name: petAbilities[key].name,
            rarity: petAbilities[key].rarity,
            type: petAbilities[key].type,
            source: petAbilities[key].source,
            description: petAbilities[key].description
        }));

        res.json({
            count: pets.length,
            pets: pets
        });
    } catch (error) {
        res.status(500).json({
            error: ERROR_MESSAGES.MODULE_LOAD_FAILED,
            message: error.message
        });
    }
});

// GET /api/pets/:petKey/ability - Returns pet ability text for given weight
app.get('/api/pets/:petKey/ability', async (req, res) => {
    try {
        const { petAbilities } = await import('./petAbilities_modular.js');
        const { petKey } = req.params;
        const { weight, modifierType = 'none' } = req.query;

        // Validate all inputs using centralized validation
        const validation = validatePetCalculationInputs({
            weight,
            petKey,
            modifierType
        }, petAbilities);

        if (!validation.isValid) {
            return res.status(400).json({
                error: 'Invalid input',
                message: validation.error
            });
        }

        const { petKey: validatedPetKey, weight: validatedWeight, modifierType: validatedModifier } = validation.value;

        // Check cache first
        const cachedResult = calculationCache.get(validatedPetKey, validatedWeight, validatedModifier);
        if (cachedResult) {
            return res.json({
                petKey: validatedPetKey,
                petName: petAbilities[validatedPetKey].name,
                weight: validatedWeight,
                modifierType: validatedModifier,
                abilityText: cachedResult,
                cached: true
            });
        }

        const pet = petAbilities[validatedPetKey];

        // Check if pet has calculate function
        if (typeof pet.calculate !== 'function') {
            return res.status(500).json({
                error: 'Pet ability unavailable',
                message: `Pet '${validatedPetKey}' does not have ability calculation available`
            });
        }

        const abilityText = pet.calculate(validatedWeight, validatedModifier);

        // Cache the result
        calculationCache.set(validatedPetKey, validatedWeight, validatedModifier, abilityText);

        res.json({
            petKey: validatedPetKey,
            petName: pet.name,
            weight: validatedWeight,
            modifierType: validatedModifier,
            abilityText: abilityText,
            cached: false
        });
    } catch (error) {
        res.status(500).json({
            error: ERROR_MESSAGES.CALCULATION_FAILED,
            message: error.message
        });
    }
});

// Debug route to test module loading
app.get('/debug-modules', async (req, res) => {
    try {
        const { petAbilities } = await import('./petAbilities_modular.js');
        const petCount = Object.keys(petAbilities).length;
        const samplePets = Object.keys(petAbilities).slice(0, 5);

        res.json({
            status: 'success',
            petCount,
            samplePets,
            cacheStats: calculationCache.getStats(),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message,
            stack: error.stack
        });
    }
});

// Start the server
app.listen(PORT, SERVER_CONFIG.DEFAULT_HOST, () => {
    const isDevelopment = process.env.NODE_ENV !== 'production';
    if (isDevelopment) {
        console.log(`🌱 Pet Calculator Server running on port ${PORT}`);
        console.log(`📱 Access the application at http://localhost:${PORT}`);
        console.log(`🔧 Health check available at http://localhost:${PORT}/health`);
        console.log(`🐳 Environment: ${process.env.NODE_ENV || 'development'}`);
    }
});
