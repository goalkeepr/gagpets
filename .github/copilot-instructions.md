# GitHub Copilot Instructions for GAG Pets Project

## Project Overview
This is a **web-based pet ability calculator** for the game "Grow a Garden". It's a full-stack Node.js application that provides an interactive interface for calculating pet abilities, comparing different weights, and managing pet data. The project serves 142+ pets across 23 different egg categories with a modular, scalable architecture.

## Technology Stack
- **Backend**: Node.js with Express.js server
- **Module System**: ES6 modules throughout
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Architecture**: Modular pet system with dynamic imports
- **Deployment**: Docker support with production configurations
- **Environment**: Development server on port 8029

## Project Architecture

### Core Components
- **Server**: `server.js` - Express server serving static files and API endpoints
- **Pet Integration**: `petAbilities_modular.js` - Main integration file combining all pet categories
- **Global Bridge**: `global_bridge.js` - Makes ES6 modules available globally for frontend
- **Frontend**: HTML interfaces (`pets.html`, `recipes.html`, `fruittypes.html`)

### Key Directories
- `/pets/` - **CRITICAL**: 23 pet category files (e.g., `beeEgg.js`, `legendaryEgg.js`)
  - Each file exports a specific pet category with complete pet definitions
  - Contains 142+ pets with abilities, calculations, and metadata
  - This is the primary data source for all pet functionality
- `/utils/` - Utility functions for calculations, modifiers, and pet migration
- `/data/` - Constants, icons, and mutation definitions
- `/node_modules/` - Dependencies (Express.js, etc.)

### Pet Data Structure
- **All pet data is modularized in the `/pets/` folder**
- Each pet category is a separate ES6 module file
- Pet objects include: name, icon, type, rarity, source, probability, calculations
- Calculation functions handle weight-based ability modifications

## API Endpoints

### Core Endpoints
- `GET /` - Main pet calculator interface (`pets.html`)
- `GET /recipes` - Recipe management interface
- `GET /fruittypes` - Fruit types reference
- `GET /health` - Health check endpoint (returns status, timestamp, environment)
- `GET /debug-modules` - Debug endpoint showing loaded pets and modules

### Development Server
```bash
npm start  # Starts server on http://localhost:8029
```

## Development Workflow

### Before Making Changes
1. **Start the development server**: `npm start`
2. **Check current pet data**: Visit `/debug-modules` endpoint to verify pet loading
3. **Review modular structure**: Check `/pets/` folder for existing pet categories
4. **Understand calculation system**: Review `/utils/calculations.js` for shared utilities

### When Adding New Pets
1. **Create or modify category file** in `/pets/` folder
2. **Import the category** in `petAbilities_modular.js`
3. **Add to the combined export** in the main integration object
4. **Test the integration** via the debug endpoint
5. **Verify frontend integration** through the web interface

### When Modifying Pet Abilities
1. **Update the specific category file** in `/pets/`
2. **Follow existing calculation patterns** using utils from `/utils/calculations.js`
3. **Include modifier support** using `getModifierDetails()` from `/utils/modifiers.js`
4. **Test calculations** through the web interface
5. **Verify backward compatibility** with existing pets

### Testing and Validation
- **Server Health**: Use `/health` endpoint to verify server status
- **Module Loading**: Use `/debug-modules` to verify pet data loading
- **Frontend Testing**: Load the web interface and test pet calculations
- **Docker Testing**: Use `docker-compose up` for containerized testing

## Coding Conventions and Best Practices

### ES6 Module System
- **All files use ES6 modules** with `import`/`export` statements
- **Pet categories** export named exports (e.g., `export const BEE_EGG_PETS = {...}`)
- **Main integration** combines all categories using object spread syntax
- **Global compatibility** achieved through `global_bridge.js`

### Pet Data Structure
Each pet should follow this pattern:
```javascript
export const CATEGORY_PETS = {
    petkey: {
        name: "Pet Name",
        icon: { type: "image", url: "...", fallback: "🐝" },
        type: "animal_type", // from TYPES constants
        rarity: "Rarity", // from RARITIES constants  
        source: "Source Name",
        probability: 65, // percentage
        obtainable: true,
        description: "Brief description",
        calculate: (kg, modifierType = "none") => { /* calculation logic */ },
        perKgImpact: () => "Impact description"
    }
};
```

### Calculation Functions
- **Use shared utilities** from `/utils/calculations.js`
- **Include modifier support** using `getModifierDetails()`
- **Validate input weights** with `Utils.isValidWeight(kg)`
- **Format time outputs** with `Utils.formatTime(seconds)`
- **Return HTML-formatted strings** with styling for display

### File Organization
- **Pet categories**: `/pets/categoryEgg.js` (e.g., `beeEgg.js`, `legendaryEgg.js`)
- **Shared utilities**: `/utils/` folder
- **Constants and data**: `/data/` folder  
- **Frontend assets**: Root directory (`pets.html`, `styles.css`)

## Docker and Deployment

### Local Development
```bash
npm start                    # Development server
docker-compose up            # Containerized development
docker-compose -f docker-compose.prod.yml up  # Production mode
```

### Common Tasks and Examples

### Adding a New Pet to an Existing Category
1. **Open the category file** (e.g., `/pets/beeEgg.js`)
2. **Add the new pet object** following the established pattern
3. **Include calculation function** with weight and modifier support
4. **Test through web interface** to verify calculations
5. **No additional imports needed** - automatically included via modular system

### Creating a New Pet Category
1. **Create new category file** `/pets/newCategoryEgg.js`
2. **Export category constant** `export const NEW_CATEGORY_PETS = {...}`
3. **Import in main integration** file `petAbilities_modular.js`
4. **Add to combined export** using object spread
5. **Update frontend filter** in HTML files if needed

### Modifying Calculation Logic
1. **Use shared utilities** from `/utils/calculations.js` for consistency
2. **Follow modifier pattern**: Always include `modifierType` parameter
3. **Use `getModifierDetails(modifierType)` for modifier calculations
4. **Format output with HTML** for proper display in web interface
5. **Include per-kg impact description** for user guidance

### Frontend Integration
- **Global bridge** automatically makes all pet data available as `window.petAbilities`
- **Pet selection** handled through HTML dropdowns and filters
- **Real-time calculations** update as users change weight values
- **Styling** handled through existing CSS classes and inline styles

## Important Files Reference

### Core Files (Do not modify carelessly)
- `petAbilities_modular.js` - Main integration, imports all categories
- `global_bridge.js` - Makes ES6 modules globally available
- `server.js` - Express server with API endpoints

### Data Files (Primary working area)
- `/pets/*.js` - All pet category definitions (23 files)
- `/utils/calculations.js` - Shared calculation utilities
- `/utils/modifiers.js` - Pet modifier/mutation system
- `/data/constants.js` - Rarity and type definitions

### Frontend Files
- `pets.html` - Main calculator interface  
- `recipes.html` - Recipe management interface
- `fruittypes.html` - Fruit types reference
- `styles.css` - Application styling

## Debugging and Troubleshooting

### Common Issues
- **Module import errors**: Check file paths and export names in `/pets/` files
- **Pet not appearing**: Verify import and export in `petAbilities_modular.js`
- **Calculation errors**: Use `/debug-modules` endpoint to verify pet loading
- **Frontend issues**: Check browser console for JavaScript errors

### Debug Resources
- **Server health**: `curl http://localhost:8029/health`
- **Pet data status**: `curl http://localhost:8029/debug-modules`
- **Module loading**: Check browser console for global_bridge.js logs
- **Pet count verification**: Currently 142+ pets across 23 categories

## Questions to Consider
When working on pet-related features:
- **Does this change affect existing pet calculations?**
- **Are there similar pets or abilities already implemented?**
- **How does this integrate with the modular pet system?**  
- **Should this data be in an existing category or new category?**
- **Does the calculation follow the established modifier patterns?**
- **Is the frontend integration tested and working?**