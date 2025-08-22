import { MAMMAL_PETS } from './pets/mammals.js';
import { birdPets } from './pets/birds_new.js';
import { AQUATIC_PETS } from './pets/aquatic.js';
import { INSECT_PETS } from './pets/insects.js';

console.log('🔍 REMAINING PETS ANALYSIS FOR BATCH 5:');
console.log();

const allRemaining = {
    ...MAMMAL_PETS,
    ...birdPets,
    ...AQUATIC_PETS,
    ...INSECT_PETS
};

// Group by source
const sourceGroups = {};
for (const [name, pet] of Object.entries(allRemaining)) {
    const source = pet.source || 'Unknown';
    if (!sourceGroups[source]) {
        sourceGroups[source] = [];
    }
    sourceGroups[source].push({name, ...pet});
}

console.log('📊 PETS GROUPED BY SOURCE:');
for (const [source, pets] of Object.entries(sourceGroups)) {
    console.log();
    console.log('🎯 ' + source + ' (' + pets.length + ' pets):');
    pets.forEach(pet => {
        console.log('  - ' + pet.name + ' (prob: ' + pet.probability + '%)');
    });
}

console.log();
console.log('📋 BATCH 5 RECOMMENDATIONS:');
const sources = Object.keys(sourceGroups).sort((a,b) => sourceGroups[b].length - sourceGroups[a].length);
sources.slice(0, 3).forEach((source, i) => {
    console.log((i+1) + '. ' + source + ' - ' + sourceGroups[source].length + ' pets (Good batch size)');
});
