// Test Batch 10: Rare Egg pets migration verification
import { petAbilities } from './petAbilities_modular.js';

console.log("🌟 Testing Batch 10: Rare Egg pets migration...\n");

// Test 1: Check individual pets exist
const expectedPets = ['orangetabby', 'spotteddeer', 'pig', 'rooster', 'monkey'];
let petsFound = 0;

expectedPets.forEach(petName => {
    if (petAbilities[petName]) {
        const pet = petAbilities[petName];
        console.log(`✅ ${pet.name}: ${pet.source} (${pet.probability}%)`);
        
        // Verify Rare Egg source
        if (pet.source === "Rare Egg") {
            console.log(`   ✓ Correct source: ${pet.source}`);
        } else {
            console.log(`   ❌ Wrong source: ${pet.source}`);
        }
        
        // Verify obtainable is false (Rare Egg pets are not obtainable)
        if (pet.obtainable === false) {
            console.log(`   ✓ Correctly marked as not obtainable`);
        } else {
            console.log(`   ❌ Should be marked as not obtainable`);
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

console.log(`\n📊 Found ${petsFound}/5 Rare Egg pets`);

// Test 2: Verify probability distribution
console.log("\n🎲 Probability Distribution Check:");
const rareEggPets = expectedPets.filter(name => 
    petAbilities[name] && petAbilities[name].source === "Rare Egg"
);

let totalProbability = 0;
rareEggPets.forEach(petName => {
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
rareEggPets.forEach(petName => {
    const pet = petAbilities[petName];
    const hasRequired = pet.name && pet.icon && pet.type && pet.rarity && 
                       pet.source && typeof pet.probability === 'number' && 
                       typeof pet.calculate === 'function' && pet.description &&
                       pet.obtainable === false;
    
    if (hasRequired) {
        console.log(`✅ ${pet.name}: All required properties present`);
    } else {
        console.log(`❌ ${pet.name}: Missing required properties`);
    }
});

// Test 4: Verify migration cleanliness (no duplicates)
console.log("\n🧹 Migration Cleanliness Check:");
const allPetNames = Object.keys(petAbilities);

rareEggPets.forEach(petName => {
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

// Test 5: Verify cross-type diversity
console.log("\n🌈 Type Diversity Check:");
const typeDistribution = {};
rareEggPets.forEach(petName => {
    const pet = petAbilities[petName];
    typeDistribution[pet.type] = (typeDistribution[pet.type] || 0) + 1;
});

Object.entries(typeDistribution).forEach(([type, count]) => {
    console.log(`   ${type}: ${count} pet${count > 1 ? 's' : ''}`);
});

console.log(`✅ Total types represented: ${Object.keys(typeDistribution).length}`);

console.log("\n🎯 Batch 10 Rare Egg Migration Test Complete!");

// Summary
const successCount = petsFound;
const totalTests = expectedPets.length;
const probabilityCorrect = totalProbability === 100;

console.log(`\n📈 SUMMARY:`);
console.log(`Pets Found: ${successCount}/${totalTests}`);
console.log(`Probability Total: ${totalProbability}% ${probabilityCorrect ? '✅' : '❌'}`);
console.log(`All Obtainable False: ${rareEggPets.every(name => petAbilities[name].obtainable === false) ? '✅' : '❌'}`);
console.log(`Migration Status: ${successCount === totalTests && probabilityCorrect ? 'SUCCESS ✅' : 'NEEDS ATTENTION ❌'}`);
