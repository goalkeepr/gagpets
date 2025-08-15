console.log("Testing Primal Egg pets...");

// Test imports
import { petAbilities } from './petAbilities_modular.js';
import { PRIMAL_EGG_PETS } from './pets/primalEgg.js';

console.log("✓ Import tests passed");

// Test that all expected pets exist
const expectedPets = [
    'ankylosaurus',
    'dilophosaurus', 
    'iguanodon',
    'pachycephalosaurus',
    'parasaurolophus',
    'spinosaurus'
];

console.log("\n--- Testing Primal Egg Pet Existence ---");
for (const petName of expectedPets) {
    if (petAbilities[petName]) {
        console.log(`✓ ${petName} exists in main pets object`);
    } else {
        console.log(`✗ ${petName} missing from main pets object`);
    }
    
    if (PRIMAL_EGG_PETS[petName]) {
        console.log(`✓ ${petName} exists in PRIMAL_EGG_PETS`);
    } else {
        console.log(`✗ ${petName} missing from PRIMAL_EGG_PETS`);
    }
}

// Test probability distribution
console.log("\n--- Testing Probability Distribution ---");
let totalProbability = 0;
const probabilities = {};

for (const petName of expectedPets) {
    const pet = PRIMAL_EGG_PETS[petName];
    if (pet && pet.probability !== undefined) {
        probabilities[petName] = pet.probability;
        totalProbability += pet.probability;
        console.log(`${petName}: ${pet.probability}%`);
    }
}

console.log(`Total probability: ${totalProbability}%`);
if (Math.abs(totalProbability - 100) < 0.001) {
    console.log("✓ Probability distribution is exactly 100%");
} else {
    console.log(`✗ Probability distribution is ${totalProbability}%, not 100%`);
}

// Test pet properties
console.log("\n--- Testing Pet Properties ---");
for (const petName of expectedPets) {
    const pet = PRIMAL_EGG_PETS[petName];
    if (pet) {
        // Test required properties
        const requiredProps = ['name', 'icon', 'type', 'rarity', 'description', 'source', 'probability', 'obtainable', 'calculate', 'perKgImpact'];
        let allPropsPresent = true;
        
        for (const prop of requiredProps) {
            if (pet[prop] === undefined) {
                console.log(`✗ ${petName} missing property: ${prop}`);
                allPropsPresent = false;
            }
        }
        
        if (allPropsPresent) {
            console.log(`✓ ${petName} has all required properties`);
        }
        
        // Test source
        if (pet.source === "Primal Egg") {
            console.log(`✓ ${petName} has correct source: Primal Egg`);
        } else {
            console.log(`✗ ${petName} has incorrect source: ${pet.source}`);
        }
        
        // Test obtainable
        if (pet.obtainable === false) {
            console.log(`✓ ${petName} correctly marked as unobtainable`);
        } else {
            console.log(`✗ ${petName} incorrectly marked as obtainable: ${pet.obtainable}`);
        }
        
        // Test type
        if (pet.type === "dinosaur") {
            console.log(`✓ ${petName} has correct type: dinosaur`);
        } else {
            console.log(`✗ ${petName} has incorrect type: ${pet.type}`);
        }
    }
}

// Test calculation functions
console.log("\n--- Testing Calculation Functions ---");
for (const petName of expectedPets) {
    const pet = PRIMAL_EGG_PETS[petName];
    if (pet) {
        try {
            const result1 = pet.calculate(1);
            const result5 = pet.calculate(5);
            const resultImpact = pet.perKgImpact();
            
            if (typeof result1 === 'string' && result1.length > 0) {
                console.log(`✓ ${petName} calculate(1) returns valid string`);
            } else {
                console.log(`✗ ${petName} calculate(1) invalid: ${result1}`);
            }
            
            if (typeof result5 === 'string' && result5.length > 0) {
                console.log(`✓ ${petName} calculate(5) returns valid string`);
            } else {
                console.log(`✗ ${petName} calculate(5) invalid: ${result5}`);
            }
            
            if (typeof resultImpact === 'string' && resultImpact.length > 0) {
                console.log(`✓ ${petName} perKgImpact() returns valid string`);
            } else {
                console.log(`✗ ${petName} perKgImpact() invalid: ${resultImpact}`);
            }
        } catch (error) {
            console.log(`✗ ${petName} calculation error: ${error.message}`);
        }
    }
}

// Test rarity distribution
console.log("\n--- Testing Rarity Distribution ---");
const rarities = {};
for (const petName of expectedPets) {
    const pet = PRIMAL_EGG_PETS[petName];
    if (pet && pet.rarity) {
        rarities[pet.rarity] = (rarities[pet.rarity] || 0) + 1;
    }
}

console.log("Rarity breakdown:");
for (const [rarity, count] of Object.entries(rarities)) {
    console.log(`  ${rarity}: ${count} pet(s)`);
}

// Test that pets are no longer in dinosaurs.js
console.log("\n--- Testing Original File Cleanup ---");
try {
    const { DINOSAUR_PETS } = await import('./pets/dinosaurs.js');
    const dinosaurPetNames = Object.keys(DINOSAUR_PETS);
    
    let foundInOriginal = 0;
    for (const petName of expectedPets) {
        if (dinosaurPetNames.includes(petName)) {
            console.log(`✗ ${petName} still exists in dinosaurs.js`);
            foundInOriginal++;
        }
    }
    
    if (foundInOriginal === 0) {
        console.log("✓ All Primal Egg pets successfully removed from dinosaurs.js");
        console.log(`✓ dinosaurs.js now has ${dinosaurPetNames.length} pets remaining`);
    } else {
        console.log(`✗ ${foundInOriginal} pets still in dinosaurs.js`);
    }
} catch (error) {
    console.log(`✗ Error testing dinosaurs.js cleanup: ${error.message}`);
}

console.log("\n--- Primal Egg Migration Test Complete ---");
