// Test script to verify Anti Bee Egg pets have new data structure
console.log("Testing Anti Bee Egg pets...");

// Import the pet data
import { petAbilities } from './petAbilities_modular.js';

const antiBeeEggPets = ['wasp', 'tarantulahawk', 'moth', 'butterfly', 'discobee'];

console.log("Checking Anti Bee Egg pets:");
antiBeeEggPets.forEach(petKey => {
    const pet = petAbilities[petKey];
    if (pet) {
        console.log(`\n${pet.name}:`);
        console.log(`  - Type: ${pet.type}`);
        console.log(`  - Rarity: ${pet.rarity}`);
        console.log(`  - Source: ${pet.source || 'NOT SET'}`);
        console.log(`  - Probability: ${pet.probability || 'NOT SET'}%`);
        console.log(`  - Obtainable: ${pet.obtainable !== undefined ? pet.obtainable : 'NOT SET'}`);
        console.log(`  - Has calculate function: ${typeof pet.calculate === 'function'}`);
    } else {
        console.log(`❌ Pet '${petKey}' not found!`);
    }
});

// Test that existing functionality still works
const testPet = petAbilities.wasp;
if (testPet && typeof testPet.calculate === 'function') {
    console.log("\n✅ Testing calculation functionality:");
    console.log("Wasp at 50kg:", testPet.calculate(50));
} else {
    console.log("❌ Calculation function not working!");
}
