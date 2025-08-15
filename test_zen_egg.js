// Test Batch 11: Zen Egg pets migration verification
import { petAbilities } from './petAbilities_modular.js';

console.log("🧘 Testing Batch 11: Zen Egg pets migration...\n");

// Test 1: Check individual pets exist
const expectedPets = ['shibainu', 'nihonzaru', 'tanuki', 'tanchozuru', 'kappa', 'kitsune'];
let petsFound = 0;

expectedPets.forEach(petName => {
    if (petAbilities[petName]) {
        const pet = petAbilities[petName];
        console.log(`✅ ${pet.name}: ${pet.source} (${pet.probability}%)`);
        
        // Verify Zen Egg source
        if (pet.source === "Zen Egg") {
            console.log(`   ✓ Correct source: ${pet.source}`);
        } else {
            console.log(`   ❌ Wrong source: ${pet.source}`);
        }
        
        // Verify obtainable is false (Zen Egg pets are not obtainable)
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

console.log(`\n📊 Found ${petsFound}/6 Zen Egg pets`);

// Test 2: Verify probability distribution
console.log("\n🎲 Probability Distribution Check:");
const zenEggPets = expectedPets.filter(name => 
    petAbilities[name] && petAbilities[name].source === "Zen Egg"
);

let totalProbability = 0;
zenEggPets.forEach(petName => {
    const pet = petAbilities[petName];
    console.log(`   ${pet.name}: ${pet.probability}%`);
    totalProbability += pet.probability;
});

console.log(`   Total: ${totalProbability.toFixed(2)}%`);

if (Math.abs(totalProbability - 100) < 0.001) {
    console.log("✅ Perfect probability distribution!");
} else {
    console.log(`❌ Incorrect total probability: ${totalProbability}% (expected 100%)`);
}

// Test 3: Verify all pets have correct properties
console.log("\n🔍 Properties Verification:");
zenEggPets.forEach(petName => {
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

zenEggPets.forEach(petName => {
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
zenEggPets.forEach(petName => {
    const pet = petAbilities[petName];
    typeDistribution[pet.type] = (typeDistribution[pet.type] || 0) + 1;
});

Object.entries(typeDistribution).forEach(([type, count]) => {
    console.log(`   ${type}: ${count} pet${count > 1 ? 's' : ''}`);
});

console.log(`✅ Total types represented: ${Object.keys(typeDistribution).length}`);

// Test 6: Verify Japanese/Zen theme consistency
console.log("\n🎌 Japanese/Zen Theme Check:");
const japaneseNames = ['Shiba Inu', 'Nihon-zaru', 'Tanuki', 'Tancho-zuru', 'Kappa', 'Kitsune'];
let themeCount = 0;

zenEggPets.forEach(petName => {
    const pet = petAbilities[petName];
    if (japaneseNames.includes(pet.name)) {
        console.log(`✅ ${pet.name}: Japanese/Zen themed`);
        themeCount++;
    } else {
        console.log(`❌ ${pet.name}: Not Japanese/Zen themed`);
    }
});

console.log(`✅ Japanese themed pets: ${themeCount}/6`);

console.log("\n🧘 Batch 11 Zen Egg Migration Test Complete!");

// Summary
const successCount = petsFound;
const totalTests = expectedPets.length;
const probabilityCorrect = Math.abs(totalProbability - 100) < 0.001;
const allJapanese = themeCount === 6;

console.log(`\n📈 SUMMARY:`);
console.log(`Pets Found: ${successCount}/${totalTests}`);
console.log(`Probability Total: ${totalProbability}% ${probabilityCorrect ? '✅' : '❌'}`);
console.log(`All Obtainable False: ${zenEggPets.every(name => petAbilities[name].obtainable === false) ? '✅' : '❌'}`);
console.log(`Japanese Theme Consistency: ${allJapanese ? '✅' : '❌'}`);
console.log(`Migration Status: ${successCount === totalTests && probabilityCorrect && allJapanese ? 'SUCCESS ✅' : 'NEEDS ATTENTION ❌'}`);
