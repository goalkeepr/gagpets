import { 
    ANTI_BEE_EGG_PETS, 
    BEE_EGG_PETS, 
    BLOOD_MOON_SHOP_PETS, 
    BUG_EGG_PETS 
} from './petAbilities_modular.js';

// Test runner
function runTests() {
    console.log("=== BATCH 2 MIGRATION VERIFICATION ===\n");
    
    // Test Anti Bee Egg pets (5 pets)
    testCategory("ANTI BEE EGG", ANTI_BEE_EGG_PETS, [
        'wasp', 'tarantulahawk', 'moth', 'butterfly', 'discobee'
    ]);
    
    // Test Bee Egg pets (5 pets)
    testCategory("BEE EGG", BEE_EGG_PETS, [
        'bee', 'honeybee', 'bearbee', 'petalbee', 'queenbee'
    ]);
    
    // Test Blood Moon Shop pets (3 pets)
    testCategory("BLOOD MOON SHOP", BLOOD_MOON_SHOP_PETS, [
        'bloodkiwi', 'bloodhedgehog', 'bloodowl'
    ]);
    
    // Test Bug Egg pets (5 pets)
    testCategory("BUG EGG", BUG_EGG_PETS, [
        'snail', 'giantant', 'caterpillar', 'prayingmantis', 'dragonfly'
    ]);
    
    console.log("=== BATCH 2 MIGRATION COMPLETE ===");
}

function testCategory(categoryName, petsObject, expectedPets) {
    console.log(`--- Testing ${categoryName} ---`);
    
    const actualPets = Object.keys(petsObject);
    const actualCount = actualPets.length;
    const expectedCount = expectedPets.length;
    
    console.log(`Expected pets: ${expectedCount}, Found: ${actualCount}`);
    
    // Check count matches
    if (actualCount !== expectedCount) {
        console.error(`❌ COUNT MISMATCH! Expected ${expectedCount}, got ${actualCount}`);
        return;
    }
    
    // Check all expected pets are present
    let missingPets = [];
    let unexpectedPets = [];
    
    expectedPets.forEach(pet => {
        if (!actualPets.includes(pet)) {
            missingPets.push(pet);
        }
    });
    
    actualPets.forEach(pet => {
        if (!expectedPets.includes(pet)) {
            unexpectedPets.push(pet);
        }
    });
    
    if (missingPets.length > 0) {
        console.error(`❌ Missing pets: ${missingPets.join(', ')}`);
        return;
    }
    
    if (unexpectedPets.length > 0) {
        console.error(`❌ Unexpected pets: ${unexpectedPets.join(', ')}`);
        return;
    }
    
    // Test each pet's structure
    let allPetsValid = true;
    expectedPets.forEach(petKey => {
        const pet = petsObject[petKey];
        if (!validatePetStructure(petKey, pet)) {
            allPetsValid = false;
        }
    });
    
    if (allPetsValid) {
        console.log(`✅ ${categoryName} - All ${expectedCount} pets present and valid`);
    } else {
        console.error(`❌ ${categoryName} - Some pets have invalid structure`);
    }
    
    console.log('');
}

function validatePetStructure(petKey, pet) {
    const requiredFields = ['name', 'icon', 'type', 'rarity', 'source', 'probability', 'obtainable', 'description', 'calculate', 'perKgImpact'];
    
    for (const field of requiredFields) {
        if (!(field in pet)) {
            console.error(`  ❌ ${petKey}: Missing field '${field}'`);
            return false;
        }
    }
    
    // Test calculate function
    if (typeof pet.calculate !== 'function') {
        console.error(`  ❌ ${petKey}: 'calculate' is not a function`);
        return false;
    }
    
    try {
        const result = pet.calculate(100);
        if (typeof result !== 'string' || result.length === 0) {
            console.error(`  ❌ ${petKey}: 'calculate' didn't return a valid string`);
            return false;
        }
    } catch (error) {
        console.error(`  ❌ ${petKey}: 'calculate' function error: ${error.message}`);
        return false;
    }
    
    // Test perKgImpact function
    if (typeof pet.perKgImpact !== 'function') {
        console.error(`  ❌ ${petKey}: 'perKgImpact' is not a function`);
        return false;
    }
    
    try {
        const result = pet.perKgImpact();
        if (typeof result !== 'string' || result.length === 0) {
            console.error(`  ❌ ${petKey}: 'perKgImpact' didn't return a valid string`);
            return false;
        }
    } catch (error) {
        console.error(`  ❌ ${petKey}: 'perKgImpact' function error: ${error.message}`);
        return false;
    }
    
    return true;
}

// Run the tests
runTests();
