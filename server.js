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

// Helper function to get query parameter in a case-insensitive way
const getCaseInsensitiveParam = (query, paramName, defaultValue = undefined) => {
    const queryKeys = Object.keys(query);
    
    // First try exact match
    if (query[paramName] !== undefined) {
        return query[paramName];
    }
    
    // Then try case-insensitive search
    const foundKey = queryKeys.find(key => key.toLowerCase() === paramName.toLowerCase());
    return foundKey ? query[foundKey] : defaultValue;
};

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

// Route for pet card page
app.get('/petcard', (req, res) => {
    res.sendFile(path.join(__dirname, 'petcard.html'));
});

// Route for pet limits page
app.get('/petlimits', (req, res) => {
    res.sendFile(path.join(__dirname, 'petlimits.html'));
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
            },
            'GET /api/pets/:petKey/screenshot': {
                description: 'Returns a PNG screenshot of the pet card',
                parameters: {
                    petKey: 'string - Pet identifier (path parameter)',
                    weight: 'number - Pet weight in kg (query parameter, default: 50)',
                    age: 'number - Pet age (query parameter, default: 1)',
                    mutation: 'string - Pet mutation type (query parameter, default: none)',
                    width: 'number - Image width in pixels (query parameter, default: 760)',
                    height: 'number - Image height in pixels (query parameter, default: 1080)'
                },
                response: 'binary - PNG image data'
            }
        },
        examples: {
            'List all pets': 'GET /api/pets',
            'Get bunny ability at 50kg': 'GET /api/pets/bunny/ability?weight=50',
            'Get legendary pet ability': 'GET /api/pets/tarantulahawk/ability?weight=75',
            'Get pet card screenshot': 'GET /api/pets/trex/screenshot?weight=10&age=5&mutation=rainbow'
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

// GET /api/pets/:petKey - Returns detailed pet information for pet card
app.get('/api/pets/:petKey', async (req, res) => {
    try {
        const { petAbilities } = await import('./petAbilities_modular.js');
        const { validatePetKey } = await import('./utils/validation.js');
        const inputPetKey = req.params.petKey;

        // Validate and normalize pet key (handles case insensitivity)
        const petKeyValidation = validatePetKey(inputPetKey, petAbilities);
        if (!petKeyValidation.isValid) {
            return res.status(404).json({
                error: 'Pet not found',
                message: `Pet '${inputPetKey}' not found`
            });
        }

        const petKey = petKeyValidation.value;
        const pet = petAbilities[petKey];
        
        res.json({
            key: petKey,
            name: pet.name,
            icon: pet.icon,
            type: pet.type,
            rarity: pet.rarity,
            source: pet.source,
            description: pet.description,
            obtainable: pet.obtainable,
            probability: pet.probability
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
        const { petAbilities, getPetMutationDescription } = await import('./petAbilities_modular.js');
        const inputPetKey = req.params.petKey;
        
        // Extract parameters with case-insensitive support
        const weight = getCaseInsensitiveParam(req.query, 'weight');
        const modifierType = getCaseInsensitiveParam(req.query, 'modifierType', 'none');

        // Validate all inputs using centralized validation (this handles case-insensitive pet key)
        const validation = validatePetCalculationInputs({
            weight,
            petKey: inputPetKey,
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
        
        // Add mutation description if modifier is not 'none' or 'golden' or 'rainbow'
        let combinedAbilityText = abilityText;
        if (validatedModifier !== 'none' && validatedModifier !== 'golden' && validatedModifier !== 'rainbow') {
            const mutationDescription = getPetMutationDescription(validatedModifier, validatedWeight);
            if (mutationDescription) {
                combinedAbilityText = `${abilityText}\n\n${mutationDescription}`;
            }
        }

        // Cache the result
        calculationCache.set(validatedPetKey, validatedWeight, validatedModifier, combinedAbilityText);

        res.json({
            petKey: validatedPetKey,
            petName: pet.name,
            weight: validatedWeight,
            modifierType: validatedModifier,
            abilityText: combinedAbilityText,
            cached: false
        });
    } catch (error) {
        res.status(500).json({
            error: ERROR_MESSAGES.CALCULATION_FAILED,
            message: error.message
        });
    }
});

// GET /api/pets/:petKey/screenshot - Returns PNG screenshot of pet card
app.get('/api/pets/:petKey/screenshot', async (req, res) => {
    let browser;
    try {
        const { validatePetKey } = await import('./utils/validation.js');
        const { petAbilities } = await import('./petAbilities_modular.js');
        const inputPetKey = req.params.petKey;

        // Validate pet key
        const petKeyValidation = validatePetKey(inputPetKey, petAbilities);
        if (!petKeyValidation.isValid) {
            return res.status(404).json({
                error: 'Pet not found',
                message: `Pet '${inputPetKey}' not found`
            });
        }

        const petKey = petKeyValidation.value;

        // Extract and validate parameters
        const weight = parseFloat(getCaseInsensitiveParam(req.query, 'weight', '50'));
        const age = parseFloat(getCaseInsensitiveParam(req.query, 'age', '1'));
        const mutation = getCaseInsensitiveParam(req.query, 'mutation', 'none');
        const imageWidth = parseInt(getCaseInsensitiveParam(req.query, 'width', '760'));
        const imageHeight = parseInt(getCaseInsensitiveParam(req.query, 'height', '1080'));

        // Validate numeric parameters
        if (isNaN(weight) || weight <= 0) {
            return res.status(400).json({
                error: 'Invalid weight',
                message: 'Weight must be a positive number'
            });
        }

        if (isNaN(age) || age <= 0) {
            return res.status(400).json({
                error: 'Invalid age',
                message: 'Age must be a positive number'
            });
        }

        if (isNaN(imageWidth) || imageWidth < 100 || imageWidth > 2000) {
            return res.status(400).json({
                error: 'Invalid width',
                message: 'Width must be between 100 and 2000 pixels'
            });
        }

        if (isNaN(imageHeight) || imageHeight < 100 || imageHeight > 3000) {
            return res.status(400).json({
                error: 'Invalid height',
                message: 'Height must be between 100 and 3000 pixels'
            });
        }

        // Import Puppeteer
        const puppeteer = await import('puppeteer');

        // Launch headless browser
        browser = await puppeteer.default.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ]
        });

        const page = await browser.newPage();

        // Set viewport
        await page.setViewport({
            width: imageWidth,
            height: imageHeight,
            deviceScaleFactor: 2
        });

        // Build the pet card URL
        const baseUrl = `http://localhost:${PORT}`;
        const petCardUrl = `${baseUrl}/petcard?pet=${encodeURIComponent(petKey)}&weight=${weight}&age=${age}&mutation=${encodeURIComponent(mutation)}`;

        console.log(`Generating screenshot for: ${petCardUrl}`);

        // Navigate to pet card page
        await page.goto(petCardUrl, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        // Wait for the pet card to load completely
        await page.waitForSelector('#petCardContent', { visible: true, timeout: 30000 });

        // Wait a bit more for any dynamic content (color extraction, etc.)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Hide the download button for screenshot
        await page.evaluate(() => {
            const downloadSection = document.getElementById('downloadSection');
            if (downloadSection) {
                downloadSection.style.display = 'none';
            }
        });

        // Take screenshot of the pet card element
        const petCardElement = await page.$('#capture-area');
        if (!petCardElement) {
            throw new Error('Pet card element not found');
        }

        const screenshot = await petCardElement.screenshot({
            type: 'png',
            omitBackground: false
        });

        // Set appropriate headers
        const petName = petAbilities[petKey].name.replace(/\\s+/g, '_');
        const filename = `${petName}_Age${age}_${weight}kg_Pet_Card.png`;

        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
        res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

        // Send the screenshot
        res.send(screenshot);

    } catch (error) {
        console.error('Screenshot generation failed:', error);
        
        if (!res.headersSent) {
            res.status(500).json({
                error: 'Screenshot generation failed',
                message: error.message
            });
        }
    } finally {
        // Always close the browser
        if (browser) {
            try {
                await browser.close();
            } catch (closeError) {
                console.error('Error closing browser:', closeError);
            }
        }
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
