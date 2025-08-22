import { MAMMAL_PETS } from './pets/mammals.js';
import { birdPets } from './pets/birds_new.js';
import { AMPHIBIAN_PETS } from './pets/amphibians.js';

console.log('🔍 CLEANUP VERIFICATION - Checking for Night Egg pets in original files:');
console.log();

const allPets = {
    ...MAMMAL_PETS,
    ...birdPets, 
    ...AMPHIBIAN_PETS
};

const nightEggPets = ['raccoon', 'hedgehog', 'mole', 'nightowl', 'echofrog', 'frog'];
let foundDuplicates = false;

for (const petName of nightEggPets) {
    if (allPets[petName]) {
        console.log('❌ DUPLICATE FOUND: ' + petName + ' still exists in original files');
        foundDuplicates = true;
    } else {
        console.log('✅ ' + petName + ': Properly removed from original files');
    }
}

console.log();
if (!foundDuplicates) {
    console.log('🎉 CLEANUP SUCCESS! All Night Egg pets removed from original files');
    console.log('✅ No duplicates found - clean migration completed!');
} else {
    console.log('❌ Cleanup incomplete - duplicates found');
}
