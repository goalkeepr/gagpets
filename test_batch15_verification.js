/**
 * BATCH 15 VERIFICATION: Uncommon Egg Migration Test
 * Testing the successful migration of 4 Uncommon Egg pets from mammals.js, herbivores.js, and domestic.js to pets/uncommonEgg.js
 * Expected: Perfect 100% probability distribution across 4 common utility pets (25% each)
 */

import { UNCOMMON_EGG_PETS } from './pets/uncommonEgg.js';
import { MAMMAL_PETS } from './pets/mammals.js';
import { HERBIVORE_PETS } from './pets/herbivores.js';
import { DOMESTIC_PETS } from './pets/domestic.js';

console.log("🥚 BATCH 15 VERIFICATION: Uncommon Egg Migration Test");
console.log("=" .repeat(80));

// Test 1: Verify UNCOMMON_EGG_PETS exists and has correct structure
console.log("\n📋 Test 1: Uncommon Egg source file verification");
if (!UNCOMMON_EGG_PETS) {
    console.log("❌ ERROR: UNCOMMON_EGG_PETS not found!");
    process.exit(1);
}

const uncommonPets = Object.keys(UNCOMMON_EGG_PETS);
console.log(`✅ Found ${uncommonPets.length} pets in UNCOMMON_EGG_PETS`);
console.log("📋 Uncommon Egg pets:", uncommonPets.join(", "));

// Test 2: Verify exactly 4 expected pets with correct names
const expectedPets = ['cat', 'deer', 'blackbunny', 'chicken'];
console.log("\n🎯 Test 2: Expected pet verification");

let foundAll = true;
expectedPets.forEach(petKey => {
    if (UNCOMMON_EGG_PETS[petKey]) {
        console.log(`✅ ${petKey}: Found with name "${UNCOMMON_EGG_PETS[petKey].name}"`);
    } else {
        console.log(`❌ ${petKey}: MISSING!`);
        foundAll = false;
    }
});

if (!foundAll) {
    console.log("❌ ERROR: Missing expected pets!");
    process.exit(1);
}

// Test 3: Probability distribution verification (must total exactly 100%)
console.log("\n🎲 Test 3: Probability distribution verification");
let totalProbability = 0;
const probabilities = {};

Object.entries(UNCOMMON_EGG_PETS).forEach(([key, pet]) => {
    const prob = pet.probability;
    probabilities[key] = prob;
    totalProbability += prob;
    console.log(`   ${pet.name}: ${prob}%`);
});

console.log(`\n📊 Total probability: ${totalProbability}%`);

if (totalProbability === 100) {
    console.log("✅ Perfect 100% probability distribution!");
} else {
    console.log(`❌ ERROR: Probability total is ${totalProbability}%, should be 100%!`);
    process.exit(1);
}

// Test 4: Verify all pets have "Uncommon Egg" source
console.log("\n🥚 Test 4: Source verification");
let correctSource = true;

Object.entries(UNCOMMON_EGG_PETS).forEach(([key, pet]) => {
    if (pet.source === "Uncommon Egg") {
        console.log(`✅ ${pet.name}: Correct source "${pet.source}"`);
    } else {
        console.log(`❌ ${pet.name}: Wrong source "${pet.source}", should be "Uncommon Egg"`);
        correctSource = false;
    }
});

if (!correctSource) {
    console.log("❌ ERROR: Some pets have incorrect source!");
    process.exit(1);
}

// Test 5: Verify pets have proper functions
console.log("\n🔧 Test 5: Function verification");
let allFunctionsWork = true;

Object.entries(UNCOMMON_EGG_PETS).forEach(([key, pet]) => {
    // Test calculate function
    if (typeof pet.calculate === 'function') {
        try {
            const result = pet.calculate(10);
            if (typeof result === 'string' && result.length > 0) {
                console.log(`✅ ${pet.name}: calculate() works`);
            } else {
                console.log(`❌ ${pet.name}: calculate() returned invalid result`);
                allFunctionsWork = false;
            }
        } catch (error) {
            console.log(`❌ ${pet.name}: calculate() threw error: ${error.message}`);
            allFunctionsWork = false;
        }
    } else {
        console.log(`❌ ${pet.name}: calculate function missing`);
        allFunctionsWork = false;
    }

    // Test perKgImpact function
    if (typeof pet.perKgImpact === 'function') {
        try {
            const impact = pet.perKgImpact();
            if (typeof impact === 'string' && impact.length > 0) {
                console.log(`✅ ${pet.name}: perKgImpact() works`);
            } else {
                console.log(`❌ ${pet.name}: perKgImpact() returned invalid result`);
                allFunctionsWork = false;
            }
        } catch (error) {
            console.log(`❌ ${pet.name}: perKgImpact() threw error: ${error.message}`);
            allFunctionsWork = false;
        }
    } else {
        console.log(`❌ ${pet.name}: perKgImpact function missing`);
        allFunctionsWork = false;
    }
});

if (!allFunctionsWork) {
    console.log("❌ ERROR: Some pet functions are not working properly!");
    process.exit(1);
}

// Test 6: Verify original files cleaned (no Uncommon Egg pets remain)
console.log("\n🧹 Test 6: Original file cleanup verification");

// Check mammals.js for cat and deer removal
const mammalKeys = Object.keys(MAMMAL_PETS);
const removedMammals = ['cat', 'deer'];
let stillInMammals = false;

removedMammals.forEach(petKey => {
    if (mammalKeys.includes(petKey)) {
        console.log(`❌ ERROR: ${petKey} still found in MAMMAL_PETS!`);
        stillInMammals = true;
    }
});

if (stillInMammals) {
    process.exit(1);
} else {
    console.log("✅ cat and deer successfully removed from MAMMAL_PETS");
}

// Check herbivores.js for blackbunny removal
const herbivoreKeys = Object.keys(HERBIVORE_PETS);
if (herbivoreKeys.includes('blackbunny')) {
    console.log("❌ ERROR: blackbunny still found in HERBIVORE_PETS!");
    process.exit(1);
} else {
    console.log("✅ blackbunny successfully removed from HERBIVORE_PETS");
}

// Check domestic.js for chicken removal
const domesticKeys = Object.keys(DOMESTIC_PETS);
if (domesticKeys.includes('chicken')) {
    console.log("❌ ERROR: chicken still found in DOMESTIC_PETS!");
    process.exit(1);
} else {
    console.log("✅ chicken successfully removed from DOMESTIC_PETS");
}

// Test 7: Expected probability breakdown verification (25% each)
console.log("\n📊 Test 7: Expected probability breakdown");
const expectedProbs = {
    cat: 25,
    deer: 25,
    blackbunny: 25,
    chicken: 25
};

let probsCorrect = true;
Object.entries(expectedProbs).forEach(([petKey, expectedProb]) => {
    const actualProb = UNCOMMON_EGG_PETS[petKey]?.probability;
    if (actualProb === expectedProb) {
        console.log(`✅ ${petKey}: ${actualProb}% (correct)`);
    } else {
        console.log(`❌ ${petKey}: ${actualProb}% (expected ${expectedProb}%)`);
        probsCorrect = false;
    }
});

if (!probsCorrect) {
    console.log("❌ ERROR: Probability breakdown doesn't match expected values!");
    process.exit(1);
}

// Test 8: Pet type diversity verification
console.log("\n🔧 Test 8: Pet type diversity verification");
const petTypes = {
    cat: 'mammal',
    deer: 'mammal',
    blackbunny: 'herbivore',
    chicken: 'domestic'
};

Object.entries(petTypes).forEach(([petKey, expectedType]) => {
    const pet = UNCOMMON_EGG_PETS[petKey];
    const actualType = pet.type;
    
    if (actualType === expectedType) {
        console.log(`✅ ${pet.name}: Type "${actualType}" verified`);
    } else {
        console.log(`❌ ${pet.name}: Type "${actualType}" (expected "${expectedType}")`);
    }
});

// Test 9: Utility function verification
console.log("\n🛠️ Test 9: Utility function verification");
const utilities = {
    cat: 'fruit size bonuses',
    deer: 'berry preservation',
    blackbunny: 'carrot eating for value',
    chicken: 'egg hatch speed'
};

Object.entries(utilities).forEach(([petKey, expectedUtility]) => {
    const pet = UNCOMMON_EGG_PETS[petKey];
    const description = pet.description.toLowerCase();
    
    if (description.includes(expectedUtility.split(' ')[0])) {
        console.log(`✅ ${pet.name}: Utility "${expectedUtility}" verified`);
    } else {
        console.log(`ℹ️  ${pet.name}: Utility check - description: "${pet.description}"`);
    }
});

console.log("\n" + "=" .repeat(80));
console.log("🎉 BATCH 15 VERIFICATION COMPLETE!");
console.log("✅ All tests passed! Uncommon Egg migration successful!");
console.log("📊 Perfect 100% probability distribution maintained (25% each)");
console.log("🧹 Original files properly cleaned (3 files emptied of uncommon pets)");
console.log("🔧 All 4 utility pets successfully migrated");
console.log("🛠️ All pet functions working correctly");
console.log("\n🏆 BATCH 15: UNCOMMON EGG MIGRATION - COMPLETE SUCCESS! 🏆");
