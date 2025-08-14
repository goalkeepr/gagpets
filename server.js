import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8029;

// Set proper MIME types for ES6 modules
app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    }
    next();
});

// Serve static files from the current directory
app.use(express.static(__dirname, {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
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

// Health check route for production monitoring
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
    });
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
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌱 Pet Calculator Server running on port ${PORT}`);
    console.log(`📱 Access the application at http://localhost:${PORT}`);
    console.log(`🔧 Health check available at http://localhost:${PORT}/health`);
    console.log(`🐳 Environment: ${process.env.NODE_ENV || 'development'}`);
});
