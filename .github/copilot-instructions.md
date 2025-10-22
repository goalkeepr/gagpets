# GitHub Copilot Instructions for GAG Pets Project

## Project Overview
This is a **web-based pet ability calculator** for the game "Grow a Garden". It's a full-stack Node.js application that provides an interactive interface for calculating pet abilities, comparing different weights, and managing pet data. The project serves 156+ pets across 26 different pet categories with a modular, scalable architecture.

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
- `/pets/` - **CRITICAL**: 26 pet category files (e.g., `beeEgg.js`, `legendaryEgg.js`, `fallEgg.js`, `jungleEgg.js`)
  - Each file exports a specific pet category with complete pet definitions
  - Contains 156+ pets with abilities, calculations, and metadata
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
- **CRITICAL**: All time-based calculations use **SECONDS**, not minutes (e.g., Base: 188 seconds, Scale: -1.8 seconds/kg)

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

## Adding a New Pet Source/Category (Complete Guide)

Based on the Fall Egg implementation, here's the complete process for adding an entirely new pet source to the site:

### Step 1: Create the Pet Category File
Create `/pets/newSourceEgg.js` following this structure:

```javascript
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const NEW_SOURCE_PETS = {
    petkey: {
        name: "Pet Name",
        icon: { 
            type: "image", 
            url: "https://static.wikia.nocookie.net/growagarden/images/x/xx/PetName.png", 
            fallback: "🐾" 
        },
        type: "mammal", // Use appropriate type from TYPES constants (mammal, bird, reptile, amphibian, insect, fish, etc.)
        rarity: "Rare", // Use appropriate rarity from RARITIES constants (Common, Uncommon, Rare, Legendary, Mythical, Divine, Prismatic)
        source: "New Source", // This becomes the filter category name - MUST match exactly in pets.html
        probability: 40, // percentage as whole number (40 = 40%)
        obtainable: true,
        description: "Brief description of what the pet does",
        calculate: (kg, modifierType = "none") => {
            // 1. Validate weight input
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            // 2. Get modifier details for mutations
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            // 3. Document kgLimits for reference (optional but recommended)
            const kgLimits = "Cooldown Min: 87.78 (61.67 🌈)";
            
            // 4. Calculate ability with modifier support
            // IMPORTANT: All time values are in SECONDS
            const baseSeconds = 188; // Base cooldown in seconds
            const secondsMod = baseSeconds * modifier; // Calculate modifier amount
            const adjustedBaseSeconds = baseSeconds - secondsMod; // Subtract for improvements
            const seconds = Math.max(30, adjustedBaseSeconds - (1.8 * kg)); // Apply scaling with minimum
            
            // 5. Format display text with modifier info
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            // 6. Return HTML-formatted string
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, does something cool!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 1.8 seconds"
    }
    // Add more pets as needed
};
```

**Key Points:**
- **petkey**: Use lowercase, no spaces (e.g., `treefrog`, not `Tree Frog`)
- **source**: Must match exactly what you add to pets.html filters
- **probability**: Whole number percentage (40 = 40%)
- **Time units**: Always use SECONDS in calculations
- **Modifier pattern**: Subtract modifier amount for improvements, add for penalties
- **HTML formatting**: Use `<strong>` tags and inline styles for better display

### Step 2: Integrate into Main Module System
Update `petAbilities_modular.js`:

```javascript
// Add import at top with other imports
import { NEW_SOURCE_PETS } from './pets/newSourceEgg.js';

// Add to the petAbilities object spread
export const petAbilities = {
    ...BEE_EGG_PETS,
    ...LEGENDARY_EGG_PETS,
    // ... other categories
    ...NEW_SOURCE_PETS
};

// Add to selective imports object
export {
    BEE_EGG_PETS,
    LEGENDARY_EGG_PETS,
    // ... other exports
    NEW_SOURCE_PETS
};
```

### Step 3: Update Frontend Interface
Update `pets.html` to include the new source in filtering options:

**A. For Mobile Dropdown** (search for `id="typeFilterSelect"`):
```html
<select id="typeFilterSelect" class="mobile-filter-dropdown">
    <option value="all">All Sources</option>
    <option value="Bee Egg">🐝 Bee Egg</option>
    <!-- ... other options -->
    <option value="New Source">🌴 New Source</option>
</select>
```

**B. For Desktop Filter Buttons** (search for `id="typeFilters"`):
```html
<div id="typeFilters" class="type-filters desktop-filter-buttons">
    <button type="button" class="filter-btn active" data-type="all">All</button>
    <button type="button" class="filter-btn" data-type="Bee Egg"><span class="source-icon-placeholder" data-source="Bee Egg"></span>Bee</button>
    <!-- ... other buttons -->
    <button type="button" class="filter-btn" data-type="New Source"><span class="source-icon-placeholder" data-source="New Source"></span>New Source</button>
</div>
```

**C. Add Source Icon URL** (search for `const SOURCE_ICONS = {`):
```javascript
const SOURCE_ICONS = {
    'Bee Egg': 'https://static.wikia.nocookie.net/growagarden/images/8/8a/Beeegg.png',
    'Legendary Egg': 'https://static.wikia.nocookie.net/growagarden/images/6/63/Legendary_Egg.webp',
    // ... other mappings
    'New Source': 'https://static.wikia.nocookie.net/growagarden/images/x/xx/NewSource.png'
};
```

**D. Add Emoji Fallback** (search for `const emojiMap = {` inside `getSourceIconHTML` function):
```javascript
const emojiMap = {
    'Common Egg': '🥚',
    'Bee Egg': '🐝',
    // ... other mappings
    'New Source': '�', // Choose appropriate emoji
    'other': '🔮'
};
```

**E. Add to Known Sources Array** (search for `const knownSources = [`):
```javascript
const knownSources = [
    'Bee Egg', 
    'Legendary Egg', 
    'Mythical Egg',
    // ... other sources
    'New Source'
];
```

**Important Notes:**
- Source name must match EXACTLY in all locations (case-sensitive)
- Mobile dropdown shows emoji + name, desktop shows just name
- SOURCE_ICONS provides the image URL
- emojiMap provides fallback if image fails to load
- knownSources array controls which sources are recognized as valid

### Step 4: Testing and Validation
1. **Test Module Loading**: 
   ```bash
   node -e "import('./petAbilities_modular.js').then(module => { 
       console.log('New Source pets:', Object.keys(module.NEW_SOURCE_PETS)); 
       console.log('Total pets:', Object.keys(module.petAbilities).length); 
   }).catch(console.error)"
   ```

2. **Test Pet Functionality**:
   ```bash
   node -e "import('./petAbilities_modular.js').then(module => { 
       const pet = module.petAbilities.petkey; 
       console.log('Pet name:', pet.name); 
       console.log('Pet abilities:', pet.calculate(50, 'none')); 
   }).catch(console.error)"
   ```

3. **Start Development Server**: `npm start`
4. **Verify Frontend**: Visit `http://localhost:8029` and test filtering
5. **Check Debug Endpoint**: Visit `/debug-modules` to verify loading

### Step 5: Advanced Features

**For Dual Abilities** (like Lobster Thermidor pattern):
```javascript
calculate: (kg, modifierType = "none") => {
    const modifierDetails = getModifierDetails(modifierType);
    if (!Utils.isValidWeight(kg)) return "Invalid weight";
    
    // First ability calculation
    const ability1Time = Math.max(300, Math.floor(3600 - (kg * 45)));
    const finalTime1 = Math.round(ability1Time * modifierDetails.multiplier);
    
    // Second ability calculation  
    const ability2Time = Math.max(60, Math.floor(900 - (kg * 12)));
    const finalTime2 = Math.round(ability2Time * modifierDetails.multiplier);
    
    return `<span style="color: #4CAF50;"><strong>Dual Ability:</strong></span><br>` +
           `Every <span style="color: #2196F3; font-weight: bold;">${Utils.formatTime(finalTime1)}</span> does first thing<br>` +
           `Every <span style="color: #FF9800; font-weight: bold;">${Utils.formatTime(finalTime2)}</span> does second thing!`;
}
```

**For Complex Calculations with Min/Max Constraints**:
```javascript
calculate: (kg, modifierType = "none") => {
    const modifierDetails = getModifierDetails(modifierType);
    if (!Utils.isValidWeight(kg)) return "Invalid weight";
    
    // Base calculation with scaling
    const baseValue = 1800 - (kg * 30); // Starts at 30 minutes, reduces by 30s per kg
    const constrainedValue = Math.max(300, Math.min(1800, baseValue)); // Min 5min, Max 30min
    const finalValue = Math.round(constrainedValue * modifierDetails.multiplier);
    
    return `Does something every <span style="color: #2196F3; font-weight: bold;">${Utils.formatTime(finalValue)}</span>!`;
}
```

### Step 6: Troubleshooting Common Issues

**Module Import Errors**:
- Ensure all import paths are correct relative to the file location
- Check that export names match exactly (case-sensitive)
- Verify the category constant is properly exported

**Frontend Filter Not Working**:
- Confirm source name matches exactly between pet data and HTML
- Check that both mobile dropdown and desktop buttons are updated
- Verify source is added to knownSources array

**Pet Not Appearing**:
- Test module loading with node -e commands
- Check browser console for JavaScript errors
- Verify petAbilities_modular.js includes the new import and spread

**Calculation Issues**:
- Always include modifierType parameter with default "none"
- Use Utils.isValidWeight() for input validation
- Include getModifierDetails() for mutation support
- Return HTML-formatted strings for proper display

### Complete List of Pet Categories (26 Total)
1. Anti Bee Egg (`antiBeeEgg.js`)
2. Bee Egg (`beeEgg.js`)
3. Blood Moon Shop (`bloodMoonShop.js`)
4. Bug Egg (`bugEgg.js`)
5. Chests/Events/Other (`chestsEventsOther.js`)
6. Common Egg (`commonEgg.js`)
7. Common Summer Egg (`commonSummerEgg.js`)
8. Dinosaur Egg (`dinosaurEgg.js`)
9. Enchanted Egg (`enchantedEgg.js`)
10. Fall Egg (`fallEgg.js`)
11. Fall Pet Shop (`fallPetShop.js`)
12. Gourmet Egg (`gourmetEgg.js`)
13. Jungle Egg (`jungleEgg.js`) - **NEW**
14. Legendary Egg (`legendaryEgg.js`)
15. Mythical Egg (`mythicalEgg.js`)
16. Night Egg (`nightEgg.js`)
17. Oasis Egg (`oasisEgg.js`)
18. Paradise Egg (`paradiseEgg.js`)
19. Primal Egg (`primalEgg.js`)
20. Rainbow Exotic (`rainbowExotic.js`)
21. Rare Egg (`rareEgg.js`)
22. Rare Summer Egg (`rareSummerEgg.js`)
23. Sprout Egg (`sproutEgg.js`)
24. Uncommon Egg (`uncommonEgg.js`)
25. Zen Egg (`zenEgg.js`)
26. (Future expansion slot)

### File Checklist for New Pet Source
- [ ] `/pets/newSourceEgg.js` - Created with proper exports
- [ ] `petAbilities_modular.js` - Import added and spread into petAbilities
- [ ] `petAbilities_modular.js` - Added to selective exports
- [ ] `pets.html` - Mobile dropdown option added
- [ ] `pets.html` - Desktop filter button added  
- [ ] `pets.html` - Source added to knownSources array
- [ ] `pets.html` - Icon mapping added to SOURCE_ICONS
- [ ] `pets.html` - Emoji fallback added (optional)
- [ ] Module loading tested with node commands
- [ ] Frontend filtering tested in browser
- [ ] Pet calculations tested and working

## Adding a New Pet Mutation (Complete Guide)

Pet mutations modify or enhance pet abilities. Examples include Golden (10% boost), Rainbow (20% boost), Shocked (applies lightning), Glimmering (applies glimmering effect), etc.

### Step 1: Define the Mutation in `data/mutations.js`

Add your new mutation to the `petMutationOptions` export:

```javascript
export const petMutationOptions = {
    // ... existing mutations
    'New Mutation Pet Mutation': {
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            // Define base cooldown and scaling (in SECONDS)
            const baseCooldown = 1500; // Base cooldown in seconds
            const cooldownMod = baseCooldown * modifier; // Calculate modifier amount
            const adjustedCooldown = baseCooldown - cooldownMod; // Apply modifier
            const cooldown = Math.max(120, adjustedCooldown - (15 * kg)); // Scale with weight

            // Define base chance and scaling (if applicable)
            const baseChance = 20;
            const chanceBonus = 0.1 * kg;
            const chance = Math.min(40, baseChance + chanceBonus); // Cap at 40%

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<font color="rgb(R, G, B)">NEW MUTATION: Every <strong>${Utils.formatTime(cooldown)}</strong>, does something amazing with <strong>${chance.toFixed(2)}%</strong> chance!</font>${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases cooldown by 15 seconds and increases chance by 0.1%'
    }
};
```

**Key Points:**
- **Mutation name**: Use format `'[Name] Pet Mutation'` (e.g., `'Glimmering Pet Mutation'`)
- **Time units**: Always use SECONDS for all time-based calculations
- **Modifier support**: Include `getModifierDetails()` for nested mutations
- **Formatting**: Use `<font color="rgb(R, G, B)">` for colored text
- **Utils.formatTime()**: Always format time display (converts seconds to human-readable)
- **Percentage display**: Use `.toFixed(2)` for consistent decimal places
- **Caps and minimums**: Use `Math.max()` and `Math.min()` to constrain values

### Step 2: Add Modifier Details in `utils/modifiers.js`

Update the `getModifierDetails()` function to include your new mutation:

```javascript
export const getModifierDetails = (modifierType) => {
    switch (modifierType) {
    // ... existing cases
    case 'newmutation':
        return { 
            value: 0, 
            text: '[+NewMutation]', 
            style: 'color: rgb(R, G, B);' 
        };
    default:
        return { value: 0, text: '', style: '' };
    }
};
```

**ALSO update** the async `getPetMutationDescription()` function's `mutationMap` in the same file:

```javascript
const mutationMap = {
    'shocked': 'Shocked Pet Mutation',
    'frozen': 'Frozen Pet Mutation',
    // ... other mutations
    'newmutation': 'New Mutation Pet Mutation'  // Add this line
};
```

**Key Points:**
- **Case name**: Use lowercase, no spaces (e.g., `'glimmering'`, not `'Glimmering'`)
- **Value**: Use `0` for mutations that don't affect base calculations (most do)
- **Text**: Format as `[+MutationName]` for display consistency
- **Style**: Use RGB color matching your mutation's theme
- **CRITICAL**: Must update BOTH the switch statement AND the mutationMap

### Step 3: Update Mutation Map in `petAbilities_modular.js`

Find the `getPetMutationDescription` function and add your mutation to the `mutationMap`:

```javascript
export const getPetMutationDescription = (modifierType, kg = 50) => {
    if (!petMutationOptions) {
        return '';
    }

    const mutationMap = {
        'shocked': 'Shocked Pet Mutation',
        'frozen': 'Frozen Pet Mutation',
        // ... other mutations
        'newmutation': 'New Mutation Pet Mutation'  // Add this line
    };
    
    // ... rest of function
};
```

**Key Points:**
- **Consistency**: The key must match what you use in `pets.html` dropdowns
- **Naming**: The value must exactly match the key in `data/mutations.js`
- **Case-sensitive**: Both keys and values are case-sensitive

### Step 4: Update Frontend Dropdown Options in `pets.html`

Add your mutation to THREE dropdown locations:

**A. Single Mode Dropdown** (search for `id="modifierType"`):
```html
<select id="modifierType" aria-label="Select pet mutation">
    <option value="none">None</option>
    <!-- ... existing options -->
    <option value="newmutation">New Mutation (brief description)</option>
</select>
```

**B. Compare Mode Pet 1 Dropdown** (search for `id="modifier1Type"`):
```html
<select id="modifier1Type" aria-label="Select first pet modifier">
    <option value="none">None</option>
    <!-- ... existing options -->
    <option value="newmutation">New Mutation (brief description)</option>
</select>
```

**C. Compare Mode Pet 2 Dropdown** (search for `id="modifier2Type"`):
```html
<select id="modifier2Type" aria-label="Select second pet modifier">
    <option value="none">None</option>
    <!-- ... existing options -->
    <option value="newmutation">New Mutation (brief description)</option>
</select>
```

**ALSO update** the inline mutation map in `pets.html` (search for `window.getPetMutationDescription`):
```javascript
window.getPetMutationDescription = function(modifierType, kg = 50) {
    if (window.petMutationOptions) {
        const mutationMap = {
            "shocked": "Shocked Pet Mutation",
            // ... other mutations
            "newmutation": "New Mutation Pet Mutation"  // Add this line
        };
        // ... rest of function
    }
};
```

**Key Points:**
- **Value**: Must be lowercase, matching everywhere else
- **Description**: Keep it brief and descriptive (shown in dropdown)
- **All three dropdowns**: Must be updated or mutation won't work in compare mode
- **Inline map**: Must match for frontend fallback support

### Step 5: Testing and Validation

1. **Test Mutation Definition**:
   ```bash
   node -e "import('./data/mutations.js').then(module => { 
       console.log('New mutation exists:', 'New Mutation Pet Mutation' in module.petMutationOptions);
       console.log('Testing at 50kg:');
       console.log(module.petMutationOptions['New Mutation Pet Mutation'].calculate(50, 'none'));
   }).catch(console.error)"
   ```

2. **Test Integration**:
   ```bash
   node -e "import('./petAbilities_modular.js').then(module => { 
       console.log('Testing mutation description:');
       console.log(module.getPetMutationDescription('newmutation', 50));
   }).catch(console.error)"
   ```

3. **Test Different Weights**:
   ```bash
   node -e "import('./petAbilities_modular.js').then(module => { 
       console.log('At 10kg:', module.getPetMutationDescription('newmutation', 10));
       console.log('At 100kg:', module.getPetMutationDescription('newmutation', 100));
   }).catch(console.error)"
   ```

4. **Frontend Testing**:
   - Start server: `npm start`
   - Visit `http://localhost:8029`
   - Select a pet
   - Choose your new mutation from dropdown
   - Calculate and verify the mutation description appears

### Mutation Types Reference

**Passive Multiplier Mutations** (affect base calculations):
- Golden: 10% boost (`value: 0.1`)
- Rainbow: 20% boost (`value: 0.2`)

**Active Effect Mutations** (add additional abilities):
- Shocked, Frozen, Windy, IronSkin, Radiant, Ascended, Tranquil, Corrupted, Glimmering, Luminous, Nutty
- All use `value: 0` (no base calculation modification)
- Provide their own separate ability description

### Common Mutation Patterns

**Time-based with Chance** (like Frozen, Windy, Glimmering):
```javascript
const baseCooldown = 1500; // seconds
const cooldownMod = baseCooldown * modifier;
const adjustedCooldown = baseCooldown - cooldownMod;
const cooldown = Math.max(1000, adjustedCooldown - (3 * kg));

const baseChance = 20;
const chanceBonus = 0.03 * kg;
const chance = Math.min(30, baseChance + chanceBonus);

return `<font color="rgb(R, G, B)">NAME: Every <strong>${Utils.formatTime(cooldown)}</strong>, <strong>${chance.toFixed(2)}%</strong> chance to do something!</font>${displayText}`;
```

**Passive Chance Bonus** (like IronSkin):
```javascript
const baseChance = 35;
const chanceBonus = 0.2 * kg;
const chance = Math.min(45, baseChance + chanceBonus);

return `<font color="rgb(R, G, B)">NAME: Provides <strong>${chance.toFixed(2)}%</strong> chance when condition occurs!</font>${displayText}`;
```

**Long Cooldown Effect** (like Radiant, Ascended):
```javascript
const baseCooldown = 1800; // 30 minutes
const cooldownMod = baseCooldown * modifier;
const adjustedCooldown = baseCooldown - cooldownMod;
const cooldown = Math.max(1200, adjustedCooldown - (9 * kg)); // 20 min minimum

return `<font color="rgb(R, G, B)">NAME: Every <strong>${Utils.formatTime(cooldown)}</strong>, does major effect!</font>${displayText}`;
```

**Risk/Reward** (like Nutty):
```javascript
const baseCooldown = 1200;
const cooldownMod = baseCooldown * modifier;
const adjustedCooldown = baseCooldown - cooldownMod;
const cooldown = Math.max(120, adjustedCooldown - (12 * kg));

const baseChance = 20;
const chanceBonus = 0.1 * kg;
const chance = Math.min(40, baseChance + chanceBonus);

return `<font color="rgb(R, G, B)">NAME: Every <strong>${Utils.formatTime(cooldown)}</strong>, <strong>${chance.toFixed(2)}%</strong> chance for benefit. Otherwise, penalty.</font>${displayText}`;
```

### File Checklist for New Pet Mutation
- [ ] `/data/mutations.js` - Mutation calculation function added
- [ ] `/data/mutations.js` - perKgImpact description added
- [ ] `/utils/modifiers.js` - Case added to getModifierDetails() switch
- [ ] `/utils/modifiers.js` - Entry added to mutationMap in getPetMutationDescription()
- [ ] `petAbilities_modular.js` - Entry added to mutationMap in getPetMutationDescription()
- [ ] `pets.html` - Option added to single mode dropdown (modifierType)
- [ ] `pets.html` - Option added to compare mode pet 1 dropdown (modifier1Type)
- [ ] `pets.html` - Option added to compare mode pet 2 dropdown (modifier2Type)
- [ ] `pets.html` - Entry added to inline window.getPetMutationDescription mutationMap
- [ ] Mutation calculation tested with node commands
- [ ] Frontend dropdown tested in single mode
- [ ] Frontend dropdown tested in compare mode
- [ ] Mutation description displays correctly

### Troubleshooting Mutation Issues

**Mutation Not Appearing in Dropdown**:
- Check all three dropdown locations in `pets.html`
- Verify value attribute matches everywhere (case-sensitive)
- Clear browser cache and refresh

**Mutation Description Not Displaying**:
- Verify mutation name in `data/mutations.js` matches map entries
- Check all three mutationMap locations (modifiers.js, petAbilities_modular.js, pets.html)
- Use browser console to check for JavaScript errors
- Test with node commands to isolate backend vs frontend issues

**Calculation Errors**:
- Ensure Utils.isValidWeight() is called first
- Check getModifierDetails() is imported and called correctly
- Verify all time values are in SECONDS
- Use Utils.formatTime() for all time displays
- Check Math.max() and Math.min() constraints are correct

**Color Not Displaying**:
- Verify RGB values are valid (0-255)
- Check font tag syntax: `<font color="rgb(R, G, B)">`
- Ensure closing `</font>` tag is present
- Use browser inspector to check rendered HTML

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
- `/pets/*.js` - All pet category definitions (26 files)
- `/utils/calculations.js` - Shared calculation utilities
- `/utils/modifiers.js` - Pet modifier/mutation system
- `/data/constants.js` - Rarity and type definitions
- `/config/constants.js` - Pet constraints and time constants
- `/config/constants.js` - Pet constraints and time constants

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
- **Pet count verification**: Currently 156+ pets across 26 categories

## Questions to Consider
When working on pet-related features:
- **Does this change affect existing pet calculations?**
- **Are there similar pets or abilities already implemented?**
- **How does this integrate with the modular pet system?**  
- **Should this data be in an existing category or new category?**
- **Does the calculation follow the established modifier patterns?**
- **Is the frontend integration tested and working?**