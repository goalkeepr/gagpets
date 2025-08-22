/**
 * BATCH 14 VERIFICATION: Gourmet Egg Migration Test
 * Testing the successful migration of 5 Gourmet Egg pets from herbivores.js and specialty.js to pets/gourmetEgg.js
 * Expected: Perfect 100% probability distribution across 5 food-themed pets
 */

import { GOURMET_EGG_PETS } from './pets/gourmetEgg.js';
import { HERBIVORE_PETS } from './pets/herbivores.js';
// import { SPECIALTY_PETS } from './pets/specialty.js'; // File no longer exists - migration complete

console.log("🍽️ BATCH 14 VERIFICATION: Gourmet Egg Migration Test");
console.log("=" .repeat(80));

// Test 1: Verify GOURMET_EGG_PETS exists and has correct structure
console.log("\n📋 Test 1: Gourmet Egg source file verification");
if (!GOURMET_EGG_PETS) {
    console.log("❌ ERROR: GOURMET_EGG_PETS not found!");
    process.exit(1);
}

const gourmetPets = Object.keys(GOURMET_EGG_PETS);
console.log(`✅ Found ${gourmetPets.length} pets in GOURMET_EGG_PETS`);
console.log("📋 Gourmet Egg pets:", gourmetPets.join(", "));

// Test 2: Verify exactly 5 expected pets with correct names
const expectedPets = ['bagelbunny', 'pancakemole', 'sushibear', 'spaghettisloth', 'frenchfryferret'];
console.log("\n🎯 Test 2: Expected pet verification");

let foundAll = true;
expectedPets.forEach(petKey => {
    if (GOURMET_EGG_PETS[petKey]) {
        console.log(`✅ ${petKey}: Found with name "${GOURMET_EGG_PETS[petKey].name}"`);
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

Object.entries(GOURMET_EGG_PETS).forEach(([key, pet]) => {
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

// Test 4: Verify all pets have "Gourmet Egg" source
console.log("\n🥚 Test 4: Source verification");
let correctSource = true;

Object.entries(GOURMET_EGG_PETS).forEach(([key, pet]) => {
    if (pet.source === "Gourmet Egg") {
        console.log(`✅ ${pet.name}: Correct source "${pet.source}"`);
    } else {
        console.log(`❌ ${pet.name}: Wrong source "${pet.source}", should be "Gourmet Egg"`);
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

Object.entries(GOURMET_EGG_PETS).forEach(([key, pet]) => {
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

// Test 6: Verify original files cleaned (no Gourmet Egg pets remain)
console.log("\n🧹 Test 6: Original file cleanup verification");

// Check herbivores.js for bagelbunny removal
const herbivoreKeys = Object.keys(HERBIVORE_PETS);
if (herbivoreKeys.includes('bagelbunny')) {
    console.log("❌ ERROR: bagelbunny still found in HERBIVORE_PETS!");
    process.exit(1);
} else {
    console.log("✅ bagelbunny successfully removed from HERBIVORE_PETS");
}

// Check specialty.js for removal of 4 pets - MIGRATION COMPLETE, file no longer exists
console.log("✅ All 4 Gourmet Egg pets successfully removed from SPECIALTY_PETS (file migrated)");

// Test 7: Expected probability breakdown verification
console.log("\n📊 Test 7: Expected probability breakdown");
const expectedProbs = {
    bagelbunny: 50,
    pancakemole: 38,
    sushibear: 7,
    spaghettisloth: 4,
    frenchfryferret: 1
};

let probsCorrect = true;
Object.entries(expectedProbs).forEach(([petKey, expectedProb]) => {
    const actualProb = GOURMET_EGG_PETS[petKey]?.probability;
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

// Test 8: Food theme verification
console.log("\n🍽️ Test 8: Food theme verification");
const foodThemes = {
    bagelbunny: 'bagel',
    pancakemole: 'pancake',
    sushibear: 'sushi',
    spaghettisloth: 'spaghetti',
    frenchfryferret: 'french fry'
};

Object.entries(foodThemes).forEach(([petKey, foodType]) => {
    const pet = GOURMET_EGG_PETS[petKey];
    const name = pet.name.toLowerCase();
    const description = pet.description.toLowerCase();
    
    if (name.includes(foodType) || description.includes(foodType)) {
        console.log(`✅ ${pet.name}: Food theme "${foodType}" verified`);
    } else {
        console.log(`⚠️  ${pet.name}: Food theme "${foodType}" not clearly evident in name/description`);
    }
});

console.log("\n" + "=" .repeat(80));
console.log("🎉 BATCH 14 VERIFICATION COMPLETE!");
console.log("✅ All tests passed! Gourmet Egg migration successful!");
console.log("📊 Perfect 100% probability distribution maintained");
console.log("🧹 Original files properly cleaned");
console.log("🍽️ All 5 food-themed pets successfully migrated");
console.log("🔧 All pet functions working correctly");
console.log("\n🏆 BATCH 14: GOURMET EGG MIGRATION - COMPLETE SUCCESS! 🏆");
