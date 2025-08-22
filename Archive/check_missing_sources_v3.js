// Final script to accurately check for pets missing source field
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
let totalPetsChecked = 0;

for (const file of petFiles) {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Look for pet object start (has name property)
            if (line.match(/^\w+:\s*{\s*$/) && i + 1 < lines.length && lines[i + 1].trim().startsWith('name:')) {
                const petName = line.split(':')[0].trim();
                
                // Extract the pet object from start to end
                let braceCount = 1;
                let petContent = line + '\n';
                let j = i + 1;
                
                while (j < lines.length && braceCount > 0) {
                    const currentLine = lines[j];
                    petContent += currentLine + '\n';
                    
                    // Count braces
                    for (const char of currentLine) {
                        if (char === '{') braceCount++;
                        if (char === '}') braceCount--;
                    }
                    j++;
                }
                
                // Check if this pet object has a source field
                if (petContent.includes('name:')) {
                    totalPetsChecked++;
                    const nameMatch = petContent.match(/name:\s*["']([^"']+)["']/);
                    const displayName = nameMatch ? nameMatch[1] : petName;
                    
                    if (!petContent.includes('source:')) {
                        console.log(`❌ ${file}: ${petName} (${displayName}) - MISSING SOURCE`);
                        totalPetsWithoutSource++;
                    }
                }
                
                // Skip ahead since we processed this pet
                i = j - 1;
            }
        }
        
    } catch (error) {
        console.log(`⚠️ Error reading ${file}: ${error.message}`);
    }
}

console.log(`\nSummary:`);
console.log(`Total pets checked: ${totalPetsChecked}`);
console.log(`Pets without source: ${totalPetsWithoutSource}`);
console.log(`Pets with source: ${totalPetsChecked - totalPetsWithoutSource}`);
