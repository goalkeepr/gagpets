// Pet Migration Script - Helper to convert existing pets to new structure
// This script helps analyze and convert pets from the original file

import { readFileSync, writeFileSync } from 'fs';

class PetMigrator {
    constructor(originalFilePath) {
        this.originalContent = readFileSync(originalFilePath, 'utf8');
        this.categories = {
            aquatic: ['starfish', 'crab', 'koi', 'seaturtle', 'axolotl'],
            mammals: ['bunny', 'cat', 'dog', 'capybara', 'raccoon', 'redfox', 'hedgehog', 'mouse', 'deer', 'cow'],
            birds: ['rooster', 'ostrich', 'seagull', 'baldeagle', 'flamingo', 'peacock'],
            dinosaurs: ['raptor', 'stegosaurus', 'trex', 'iguanodon', 'brontosaurus', 'pachycephalosaurus', 'ankylosaurus', 'dilophosaurus'],
            insects: ['bee', 'discobee', 'bearbee', 'goldenbee', 'giantant', 'butterfly', 'dragonfly', 'caterpillar'],
            special: ['bloodkiwi', 'bloodhedgehog', 'bloodowl', 'baconpig', 'bagelbunny', 'blackbunny', 'chickenombie', 'cookedowl', 'echofrog', 'fennecfox', 'frog', 'goldenlab']
        };
    }

    // Extract all pet names from the original file
    extractPetNames() {
        const nameMatches = this.originalContent.match(/name: "([^"]+)"/g);
        return nameMatches ? nameMatches.map(match => match.match(/"([^"]+)"/)[1]) : [];
    }

    // Extract a specific pet definition
    extractPet(petKey) {
        const regex = new RegExp(`${petKey}:\\s*{[\\s\\S]*?(?=\\n\\s*[a-zA-Z_]+:\\s*{|\\n\\s*};|$)`, 'm');
        const match = this.originalContent.match(regex);
        return match ? match[0] : null;
    }

    // Convert pet to new modular structure
    convertPet(petDefinition, category) {
        // This is a basic template - you'd expand this based on patterns you find
        const lines = petDefinition.split('\n');
        let converted = '';

        // Add category import and structure
        converted += `// ${category} pet converted from original structure\n`;
        converted += petDefinition.replace(/name: "([^"]+)"/, 'name: "$1"');

        return converted;
    }

    // Generate category file
    generateCategoryFile(category, pets) {
        let content = `// ${category.charAt(0).toUpperCase() + category.slice(1)} pets\n`;
        content += 'import { getModifierDetails } from \'../utils/modifiers.js\';\n';
        content += 'import { ICONS } from \'../data/icons.js\';\n';
        content += 'import { RARITY, PET_TYPES } from \'../data/constants.js\';\n\n';
        content += `export const ${category}Pets = {\n`;

        pets.forEach(pet => {
            const petDef = this.extractPet(pet);
            if (petDef) {
                content += `    ${petDef},\n`;
            }
        });

        content += '};\n';
        return content;
    }

    // Analyze pet patterns
    analyzePets() {
        const pets = this.extractPetNames();
        const patterns = {
            feedingPets: 0,
            experiencePets: 0,
            specialPets: 0,
            calculatePatterns: {
                timeBase: 0,
                valueBase: 0,
                experienceBase: 0
            }
        };

        // Count different patterns (simplified analysis)
        const feedingKeywords = ['eats', 'feeds', 'bonus', 'value'];
        const experienceKeywords = ['experience', 'gains', 'grows'];

        pets.forEach(pet => {
            const petDef = this.extractPet(pet.toLowerCase().replace(/\s+/g, ''));
            if (petDef) {
                if (feedingKeywords.some(keyword => petDef.toLowerCase().includes(keyword))) {
                    patterns.feedingPets++;
                }
                if (experienceKeywords.some(keyword => petDef.toLowerCase().includes(keyword))) {
                    patterns.experiencePets++;
                }
            }
        });

        return {
            totalPets: pets.length,
            petNames: pets,
            patterns
        };
    }
}

// Usage example:
// const migrator = new PetMigrator('/path/to/petAbilities_original.js');
// const analysis = migrator.analyzePets();
// console.log('Pet Analysis:', analysis);

export { PetMigrator };
