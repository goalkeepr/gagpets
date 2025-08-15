// Improved script to check for pets missing source field
import fs from 'fs';

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

let totalPetsWithoutSource = 0;

for (const file of petFiles) {
    try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Use regex to find pet objects (not icon objects)
        const petMatches = content.match(/(\w+):\s*{\s*name:\s*["']([^"']+)["']/g);
        
        if (petMatches) {
            for (const match of petMatches) {
                const petName = match.split(':')[0].trim();
                const displayName = match.match(/name:\s*["']([^"']+)["']/)[1];
                
                // Check if this pet has a source field
                const petStart = content.indexOf(match);
                const petEnd = content.indexOf('\n    },', petStart);
                const petSection = content.substring(petStart, petEnd + 6);
                
                if (!petSection.includes('source:')) {
                    console.log(`❌ ${file}: ${petName} (${displayName}) - MISSING SOURCE`);
                    totalPetsWithoutSource++;
                }
            }
        }
        
    } catch (error) {
        console.log(`⚠️ Error reading ${file}: ${error.message}`);
    }
}

console.log(`\nTotal pets without source: ${totalPetsWithoutSource}`);
