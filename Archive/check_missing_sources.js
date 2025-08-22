// Script to check for pets missing source field
import fs from 'fs';
import path from 'path';

const petFiles = [
    'pets/specialty.js',
    'pets/dragon.js', 
    'pets/mollusks.js',
    'pets/wildAnimals.js',
    'pets/canines.js',
    'pets/other.js',
    'pets/primates.js',
    'pets/mammals.js',
    'pets/birds.js',
    'pets/dinosaurs.js',
    'pets/spirit.js',
    'pets/smallMammals.js',
    'pets/insects.js',
    'pets/aquatic.js',
    'pets/domestic.js',
    'pets/reptiles.js',
    'pets/food.js',
    'pets/undead.js',
    'pets/mythical.js',
    'pets/fruits.js',
    'pets/birds_new.js',
    'pets/herbivores.js',
    'pets/amphibians.js'
];

console.log('Checking for pets missing source field...\n');

for (const file of petFiles) {
    try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Look for pet objects (simplified pattern)
        const lines = content.split('\n');
        let currentPet = '';
        let inPetObject = false;
        let hasSource = false;
        let braceCount = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Check if we're starting a new pet object
            if (line.match(/^\w+:\s*{/)) {
                if (inPetObject && !hasSource) {
                    console.log(`❌ ${file}: ${currentPet} - MISSING SOURCE`);
                }
                currentPet = line.split(':')[0].trim();
                inPetObject = true;
                hasSource = false;
                braceCount = 1;
            } else if (inPetObject) {
                // Count braces to track when pet object ends
                const openBraces = (line.match(/{/g) || []).length;
                const closeBraces = (line.match(/}/g) || []).length;
                braceCount += openBraces - closeBraces;
                
                // Check for source field
                if (line.includes('source:')) {
                    hasSource = true;
                }
                
                // If we've closed all braces, pet object is done
                if (braceCount === 0) {
                    if (!hasSource) {
                        console.log(`❌ ${file}: ${currentPet} - MISSING SOURCE`);
                    }
                    inPetObject = false;
                }
            }
        }
        
        // Check final pet if file ended
        if (inPetObject && !hasSource) {
            console.log(`❌ ${file}: ${currentPet} - MISSING SOURCE`);
        }
        
    } catch (error) {
        console.log(`⚠️ Error reading ${file}: ${error.message}`);
    }
}

console.log('\nCheck complete!');
