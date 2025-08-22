import { readFileSync } from 'fs';
import { readdirSync } from 'fs';

// Get all original pets
const originalContent = readFileSync('./petAbilities_original.js', 'utf8');
const originalPetMatches = originalContent.match(/^\s*[a-z][a-zA-Z0-9]*:\s*{/gm) || [];
const originalPets = originalPetMatches
    .map(match => match.replace(/^\s*/, '').replace(/:\s*{.*$/, ''))
    .filter(name => !['icon', 'fallback'].includes(name))
    .sort();

// Remove duplicates
const uniqueOriginalPets = [...new Set(originalPets)];

// Get migrated pets from all category files
const migratedPets = [];
const categoryFiles = readdirSync('./pets/').filter(f => f.endsWith('.js') && !f.includes('_clean.js')).map(f => `./pets/${f}`);

for (const file of categoryFiles) {
    if (file.includes('_clean.js')) continue;
    
    try {
        const module = await import(file);
        const petsObject = Object.values(module)[0];
        if (petsObject && typeof petsObject === 'object') {
            migratedPets.push(...Object.keys(petsObject));
        }
    } catch (error) {
        console.log(`Error importing ${file}:`, error.message);
    }
}

const uniqueMigratedPets = [...new Set(migratedPets)].sort();

// Find remaining pets
const remainingPets = uniqueOriginalPets.filter(pet => !uniqueMigratedPets.includes(pet));

console.log('=== MIGRATION PROGRESS ===');
console.log(`Original pets: ${uniqueOriginalPets.length}`);
console.log(`Migrated pets: ${uniqueMigratedPets.length}`);
console.log(`Remaining pets: ${remainingPets.length}`);
console.log();

console.log('=== REMAINING PETS TO MIGRATE ===');
remainingPets.forEach(pet => console.log(pet));
