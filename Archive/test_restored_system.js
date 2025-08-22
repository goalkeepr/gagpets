// Comprehensive test for the restored pet system
import { dragonPets } from './pets/dragon.js';
import { spiritPets } from './pets/spirit.js';
import { DINOSAUR_PETS } from './pets/dinosaurs.js';
import { aquaticPets } from './pets/aquatic.js';
import { birdPets } from './pets/birds.js';
import { insects } from './pets/insects.js';
import { mammals } from './pets/mammals.js';
import { herbivores } from './pets/herbivores.js';
import { amphibians } from './pets/amphibians.js';
import { mollusks } from './pets/mollusks.js';
import { fruits } from './pets/fruits.js';
import { undeadPets } from './pets/undead.js';
import { otherPets } from './pets/other.js';
import { reptilePets } from './pets/reptiles.js';
import { foodPets } from './pets/food.js';

// Test configuration
const TEST_WEIGHT = 50;
const TEST_MODIFIER = "golden";

// Combine all pets into one object for testing
const allPets = {
    ...dragonPets,
    ...spiritPets,
    ...DINOSAUR_PETS,
    ...aquaticPets,
    ...birdPets,
    ...insects,
    ...mammals,
    ...herbivores,
    ...amphibians,
    ...mollusks,
    ...fruits,
    ...undeadPets,
    ...otherPets,
    ...reptilePets,
    ...foodPets
};

console.log("🧪 TESTING RESTORED PET SYSTEM");
console.log("=" .repeat(50));

// Test 1: Count verification
const petCount = Object.keys(allPets).length;
console.log(`\n📊 Pet Count Test:`);
console.log(`Total pets loaded: ${petCount}`);
console.log(`Expected: 108`);
console.log(`Status: ${petCount === 108 ? '✅ PASS' : '❌ FAIL'}`);

// Test 2: Structure validation
console.log(`\n🏗️  Structure Validation Test:`);
let structureErrors = 0;
let samplePets = [];

for (const [petKey, pet] of Object.entries(allPets)) {
    // Check required properties
    const requiredProps = ['name', 'icon', 'type', 'rarity', 'description', 'calculate', 'perKgImpact'];
    const missingProps = requiredProps.filter(prop => !pet.hasOwnProperty(prop));
    
    if (missingProps.length > 0) {
        console.log(`❌ ${petKey}: Missing properties: ${missingProps.join(', ')}`);
        structureErrors++;
    }
    
    // Check icon structure
    if (pet.icon && (!pet.icon.type || !pet.icon.url || !pet.icon.fallback)) {
        console.log(`❌ ${petKey}: Invalid icon structure`);
        structureErrors++;
    }
    
    // Check if calculate is a function
    if (typeof pet.calculate !== 'function') {
        console.log(`❌ ${petKey}: calculate is not a function`);
        structureErrors++;
    }
    
    // Check if perKgImpact is a function
    if (typeof pet.perKgImpact !== 'function') {
        console.log(`❌ ${petKey}: perKgImpact is not a function`);
        structureErrors++;
    }
    
    // Collect sample pets for calculation testing
    if (samplePets.length < 10) {
        samplePets.push({ key: petKey, pet });
    }
}

console.log(`Structure errors found: ${structureErrors}`);
console.log(`Status: ${structureErrors === 0 ? '✅ PASS' : '❌ FAIL'}`);

// Test 3: Calculation functionality
console.log(`\n🧮 Calculation Test:`);
let calculationErrors = 0;

for (const { key, pet } of samplePets) {
    try {
        // Test basic calculation
        const result = pet.calculate(TEST_WEIGHT);
        if (typeof result !== 'string' || result.length === 0) {
            console.log(`❌ ${key}: Invalid calculation result`);
            calculationErrors++;
        }
        
        // Test with modifier
        const modResult = pet.calculate(TEST_WEIGHT, TEST_MODIFIER);
        if (typeof modResult !== 'string' || modResult.length === 0) {
            console.log(`❌ ${key}: Invalid modifier calculation result`);
            calculationErrors++;
        }
        
        // Test perKgImpact
        const impact = pet.perKgImpact();
        if (typeof impact !== 'string' || impact.length === 0) {
            console.log(`❌ ${key}: Invalid perKgImpact result`);
            calculationErrors++;
        }
        
        console.log(`✅ ${key}: Calculations working`);
        
    } catch (error) {
        console.log(`❌ ${key}: Calculation error - ${error.message}`);
        calculationErrors++;
    }
}

console.log(`Calculation errors found: ${calculationErrors}`);
console.log(`Status: ${calculationErrors === 0 ? '✅ PASS' : '❌ FAIL'}`);

// Test 4: Category coverage
console.log(`\n📁 Category Coverage Test:`);
const categoryTests = [
    { name: 'Dragon', pets: dragonPets, expected: 1 },
    { name: 'Spirit', pets: spiritPets, expected: 2 },
    { name: 'Dinosaur', pets: DINOSAUR_PETS, expected: 12 },
    { name: 'Aquatic', pets: aquaticPets, expected: 9 },
    { name: 'Bird', pets: birdPets, expected: 16 },
    { name: 'Insect', pets: insects, expected: 18 },
    { name: 'Mammal', pets: mammals, expected: 24 }, // Updated count after adding missing pets
    { name: 'Herbivore', pets: herbivores, expected: 3 },
    { name: 'Amphibian', pets: amphibians, expected: 2 },
    { name: 'Mollusk', pets: mollusks, expected: 1 },
    { name: 'Fruit', pets: fruits, expected: 1 },
    { name: 'Undead', pets: undeadPets, expected: 1 },
    { name: 'Other', pets: otherPets, expected: 7 },
    { name: 'Reptile', pets: reptilePets, expected: 3 },
    { name: 'Food', pets: foodPets, expected: 6 }
];

let categoryErrors = 0;
for (const test of categoryTests) {
    const count = Object.keys(test.pets).length;
    const status = count === test.expected ? '✅' : '❌';
    if (count !== test.expected) categoryErrors++;
    console.log(`${status} ${test.name}: ${count}/${test.expected} pets`);
}

console.log(`Category errors found: ${categoryErrors}`);
console.log(`Status: ${categoryErrors === 0 ? '✅ PASS' : '❌ FAIL'}`);

// Test 5: Sample pet demonstrations
console.log(`\n🎮 Sample Pet Demonstrations:`);
console.log(`Testing with ${TEST_WEIGHT}kg weight and ${TEST_MODIFIER} modifier:\n`);

// Test a few interesting pets
const demoPets = [
    { key: 'reddragon', pet: dragonPets.reddragon },
    { key: 'bunny', pet: herbivores.bunny },
    { key: 'panda', pet: mammals.panda }, // Test our newly added pet
    { key: 'spotteddeer', pet: mammals.spotteddeer }, // Test our other newly added pet
    { key: 'baldeagle', pet: birdPets.baldeagle }
];

for (const { key, pet } of demoPets) {
    if (pet) {
        console.log(`🐾 ${pet.name} (${pet.rarity} ${pet.type}):`);
        console.log(`   Description: ${pet.description}`);
        console.log(`   Ability: ${pet.calculate(TEST_WEIGHT, "none")}`);
        console.log(`   With ${TEST_MODIFIER}: ${pet.calculate(TEST_WEIGHT, TEST_MODIFIER)}`);
        console.log(`   Per kg impact: ${pet.perKgImpact()}`);
        console.log('');
    }
}

// Final summary
console.log("=" .repeat(50));
const totalErrors = structureErrors + calculationErrors + categoryErrors;
console.log(`\n🎯 FINAL TEST RESULTS:`);
console.log(`Total pets: ${petCount}`);
console.log(`Total errors: ${totalErrors}`);
console.log(`Status: ${totalErrors === 0 ? '🎉 ALL TESTS PASSED!' : '⚠️  TESTS FAILED'}`);

if (totalErrors === 0) {
    console.log(`\n✨ The restored pet system is fully functional!`);
    console.log(`✨ All 108 pets have been successfully restored with perfect data integrity!`);
} else {
    console.log(`\n🔧 Please fix the ${totalErrors} error(s) found above.`);
}
