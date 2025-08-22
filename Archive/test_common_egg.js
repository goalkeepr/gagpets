// Test Common Egg pets migration
import { petAbilities } from './petAbilities_modular.js';
import { COMMON_EGG_PETS } from './pets/commonEgg.js';

console.log('=== Testing Common Egg Pets Migration ===\n');

// Expected Common Egg pets
const expectedPets = ['bunny', 'dog', 'goldenlab'];

console.log('1. Testing that pets exist in new commonEgg.js file:');
expectedPets.forEach(petKey => {
    const pet = COMMON_EGG_PETS[petKey];
    if (pet) {
        console.log(`✅ ${petKey}: Found with source "${pet.source}" and probability ${pet.probability}%`);
        console.log(`   Description: ${pet.description}`);
    } else {
        console.log(`❌ ${petKey}: NOT FOUND in COMMON_EGG_PETS`);
    }
});

console.log('\n2. Testing that pets are accessible in main petAbilities object:');
expectedPets.forEach(petKey => {
    const pet = petAbilities[petKey];
    if (pet) {
        console.log(`✅ ${petKey}: Found in main petAbilities with source "${pet.source}"`);
        
        // Test the calculate function
        if (typeof pet.calculate === 'function') {
            try {
                const result = pet.calculate(50);
                console.log(`   Calculate function works: ${result.substring(0, 50)}...`);
            } catch (error) {
                console.log(`   ❌ Calculate function error: ${error.message}`);
            }
        }
    } else {
        console.log(`❌ ${petKey}: NOT FOUND in main petAbilities`);
    }
});

console.log('\n3. Verifying probability totals:');
const totalProbability = expectedPets.reduce((sum, petKey) => {
    const pet = COMMON_EGG_PETS[petKey];
    return sum + (pet?.probability || 0);
}, 0);
console.log(`Total probability: ${totalProbability}% (should be ~100%)`);

console.log('\n4. Checking that Common Egg pets have the right properties:');
expectedPets.forEach(petKey => {
    const pet = COMMON_EGG_PETS[petKey];
    if (pet) {
        const checks = {
            'source': pet.source === 'Common Egg',
            'probability': pet.probability === 33.33,
            'obtainable': pet.obtainable === true,
            'rarity': pet.rarity === 'Common',
            'calculate function': typeof pet.calculate === 'function',
            'perKgImpact function': typeof pet.perKgImpact === 'function'
        };
        
        console.log(`${petKey}:`);
        Object.entries(checks).forEach(([property, isValid]) => {
            console.log(`  ${isValid ? '✅' : '❌'} ${property}: ${isValid ? 'Valid' : 'Invalid'}`);
        });
    }
});

console.log('\n=== Test Complete ===');
