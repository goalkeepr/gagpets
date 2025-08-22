import { MAMMAL_PETS } from './pets/mammals.js';
import { birdPets } from './pets/birds_new.js';
import { AQUATIC_PETS } from './pets/aquatic.js';

console.log('🔍 CLEANUP VERIFICATION - Checking for Paradise Egg pets in original files:');
console.log();

const allPets = {
    ...MAMMAL_PETS,
    ...birdPets, 
    ...AQUATIC_PETS
};

const paradiseEggPets = ['ostrich', 'peacock', 'capybara', 'scarletmacaw', 'mimicoctopus'];
let foundDuplicates = false;

for (const petName of paradiseEggPets) {
    if (allPets[petName]) {
        console.log('❌ DUPLICATE FOUND: ' + petName + ' still exists in original files');
        foundDuplicates = true;
    } else {
        console.log('✅ ' + petName + ': Properly removed from original files');
    }
}

console.log();
if (!foundDuplicates) {
    console.log('🎉 CLEANUP SUCCESS! All Paradise Egg pets removed from original files');
    console.log('✅ No duplicates found - clean migration completed!');
} else {
    console.log('❌ Cleanup incomplete - duplicates found');
}
