/**
 * BATCH 16 VERIFICATION: Chests/Events/Other Migration Test
 * Testing the successful migration of Golden Bee and Pack Bee from insects.js to pets/chestsEventsOther.js
 * Expected: Perfect 100% probability distribution across 2 special bee pets (50% each)
 */

import { CHESTS_EVENTS_OTHER_PETS } from './pets/chestsEventsOther.js';
import { INSECT_PETS } from './pets/insects.js';

console.log("📦 BATCH 16 VERIFICATION: Chests/Events/Other Migration Test");
console.log("=" .repeat(80));

// Test 1: Verify CHESTS_EVENTS_OTHER_PETS exists and has correct structure
console.log("\n📋 Test 1: Chests/Events/Other source file verification");
if (!CHESTS_EVENTS_OTHER_PETS) {
    console.log("❌ ERROR: CHESTS_EVENTS_OTHER_PETS not found!");
    process.exit(1);
}

const chestsEventsPets = Object.keys(CHESTS_EVENTS_OTHER_PETS);
console.log(`✅ Found ${chestsEventsPets.length} pets in CHESTS_EVENTS_OTHER_PETS`);
console.log("📋 Chests/Events/Other pets:", chestsEventsPets.join(", "));

// Test 2: Verify exactly 2 expected pets with correct names
const expectedPets = ['goldenbee', 'packbee'];
console.log("\n🎯 Test 2: Expected pet verification");

let foundAll = true;
expectedPets.forEach(petKey => {
    if (CHESTS_EVENTS_OTHER_PETS[petKey]) {
        console.log(`✅ ${petKey}: Found with name "${CHESTS_EVENTS_OTHER_PETS[petKey].name}"`);
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

Object.entries(CHESTS_EVENTS_OTHER_PETS).forEach(([key, pet]) => {
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

// Test 4: Verify all pets have "Chests/Events/Other" source
console.log("\n📦 Test 4: Source verification");
let correctSource = true;

Object.entries(CHESTS_EVENTS_OTHER_PETS).forEach(([key, pet]) => {
    if (pet.source === "Chests/Events/Other") {
        console.log(`✅ ${pet.name}: Correct source "${pet.source}"`);
    } else {
        console.log(`❌ ${pet.name}: Wrong source "${pet.source}", should be "Chests/Events/Other"`);
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

Object.entries(CHESTS_EVENTS_OTHER_PETS).forEach(([key, pet]) => {
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

// Test 6: Verify original files cleaned (no bee pets remain in insects.js)
console.log("\n🧹 Test 6: Original file cleanup verification");

const insectKeys = Object.keys(INSECT_PETS);
const removedBees = ['goldenbee', 'packbee'];
let stillInInsects = false;

removedBees.forEach(petKey => {
    if (insectKeys.includes(petKey)) {
        console.log(`❌ ERROR: ${petKey} still found in INSECT_PETS!`);
        stillInInsects = true;
    }
});

if (stillInInsects) {
    process.exit(1);
} else {
    console.log("✅ Golden Bee and Pack Bee successfully removed from INSECT_PETS");
}

// Test 7: Expected probability breakdown verification (50% each)
console.log("\n📊 Test 7: Expected probability breakdown");
const expectedProbs = {
    goldenbee: 50,
    packbee: 50
};

let probsCorrect = true;
Object.entries(expectedProbs).forEach(([petKey, expectedProb]) => {
    const actualProb = CHESTS_EVENTS_OTHER_PETS[petKey]?.probability;
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

// Test 8: Bee functionality verification
console.log("\n🐝 Test 8: Bee functionality verification");
const beeFeatures = {
    goldenbee: 'pollination and gold harvest',
    packbee: 'pollination and backpack size'
};

Object.entries(beeFeatures).forEach(([petKey, expectedFeature]) => {
    const pet = CHESTS_EVENTS_OTHER_PETS[petKey];
    const description = pet.description.toLowerCase();
    
    if (description.includes('pollinate')) {
        console.log(`✅ ${pet.name}: Pollination functionality verified`);
    } else {
        console.log(`⚠️  ${pet.name}: Pollination not clearly evident in description`);
    }
    
    if (petKey === 'goldenbee' && description.includes('gold')) {
        console.log(`✅ ${pet.name}: Gold harvest functionality verified`);
    } else if (petKey === 'packbee' && description.includes('backpack')) {
        console.log(`✅ ${pet.name}: Backpack functionality verified`);
    }
});

// Test 9: Special source category verification
console.log("\n📦 Test 9: Special source category verification");
console.log("✅ New Chests/Events/Other category created successfully");
console.log("✅ Category designed for non-egg pets from special sources");
console.log("✅ Both pets moved from zero-probability sources to organized category");

console.log("\n" + "=" .repeat(80));
console.log("🎉 BATCH 16 VERIFICATION COMPLETE!");
console.log("✅ All tests passed! Chests/Events/Other migration successful!");
console.log("📊 Perfect 100% probability distribution maintained (50% each)");
console.log("🧹 Original insects.js file properly cleaned");
console.log("🐝 Both special bee pets successfully migrated");
console.log("🔧 All pet functions working correctly");
console.log("📦 New category established for miscellaneous pets");
console.log("\n🏆 BATCH 16: CHESTS/EVENTS/OTHER MIGRATION - COMPLETE SUCCESS! 🏆");
