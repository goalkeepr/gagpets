// Test Batch 9: Common Summer Egg pets migration verification
import { petAbilities } from './petAbilities_modular.js';

console.log("🌞 Testing Batch 9: Common Summer Egg pets migration...\n");

// Test 1: Check individual pets exist
const expectedPets = ['seagull', 'starfish', 'crab'];
let petsFound = 0;

expectedPets.forEach(petName => {
    if (petAbilities[petName]) {
        const pet = petAbilities[petName];
        console.log(`✅ ${pet.name}: ${pet.source} (${pet.probability}%)`);
        
        // Verify Common Summer Egg source
        if (pet.source === "Common Summer Egg") {
            console.log(`   ✓ Correct source: ${pet.source}`);
        } else {
            console.log(`   ❌ Wrong source: ${pet.source}`);
        }
        
        // Test calculate function
        const result = pet.calculate(1);
        if (result && !result.includes("Invalid")) {
            console.log(`   ✓ Calculate function working`);
        } else {
            console.log(`   ❌ Calculate function failed: ${result}`);
        }
        
        petsFound++;
    } else {
        console.log(`❌ ${petName}: NOT FOUND`);
    }
});

console.log(`\n📊 Found ${petsFound}/3 Common Summer Egg pets`);

// Test 2: Verify probability distribution
console.log("\n🎲 Probability Distribution Check:");
const commonSummerEggPets = expectedPets.filter(name => 
    petAbilities[name] && petAbilities[name].source === "Common Summer Egg"
);

let totalProbability = 0;
commonSummerEggPets.forEach(petName => {
    const pet = petAbilities[petName];
    console.log(`   ${pet.name}: ${pet.probability}%`);
    totalProbability += pet.probability;
});

console.log(`   Total: ${totalProbability}%`);

if (totalProbability === 100) {
    console.log("✅ Perfect probability distribution!");
} else {
    console.log(`❌ Incorrect total probability: ${totalProbability}% (expected 100%)`);
}

// Test 3: Verify all pets have correct properties
console.log("\n🔍 Properties Verification:");
commonSummerEggPets.forEach(petName => {
    const pet = petAbilities[petName];
    const hasRequired = pet.name && pet.icon && pet.type && pet.rarity && 
                       pet.source && typeof pet.probability === 'number' && 
                       typeof pet.calculate === 'function' && pet.description;
    
    if (hasRequired) {
        console.log(`✅ ${pet.name}: All required properties present`);
    } else {
        console.log(`❌ ${pet.name}: Missing required properties`);
    }
});

// Test 4: Verify migration cleanliness (no duplicates)
console.log("\n🧹 Migration Cleanliness Check:");
const allPetNames = Object.keys(petAbilities);
const duplicateCheck = {};

commonSummerEggPets.forEach(petName => {
    const matches = allPetNames.filter(name => 
        petAbilities[name].name === petAbilities[petName].name
    );
    
    if (matches.length === 1) {
        console.log(`✅ ${petAbilities[petName].name}: No duplicates found`);
    } else {
        console.log(`❌ ${petAbilities[petName].name}: ${matches.length} instances found`);
        console.log(`   Instances: ${matches.join(', ')}`);
    }
});

console.log("\n🎯 Batch 9 Common Summer Egg Migration Test Complete!");

// Summary
const successCount = petsFound;
const totalTests = expectedPets.length;
const probabilityCorrect = totalProbability === 100;

console.log(`\n📈 SUMMARY:`);
console.log(`Pets Found: ${successCount}/${totalTests}`);
console.log(`Probability Total: ${totalProbability}% ${probabilityCorrect ? '✅' : '❌'}`);
console.log(`Migration Status: ${successCount === totalTests && probabilityCorrect ? 'SUCCESS ✅' : 'NEEDS ATTENTION ❌'}`);
