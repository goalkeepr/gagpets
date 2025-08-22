console.log("Testing Legendary Egg pets...");

// Test imports
import { petAbilities } from './petAbilities_modular.js';
import { LEGENDARY_EGG_PETS } from './pets/legendaryEgg.js';

console.log("✓ Import tests passed");

// Test that all expected pets exist
const expectedPets = [
    'cow',
    'silvermonkey',
    'seaotter',
    'polarbear',
    'turtle'
];

console.log("\n--- Testing Legendary Egg Pet Existence ---");
for (const petName of expectedPets) {
    if (petAbilities[petName]) {
        console.log(`✓ ${petName} exists in main pets object`);
    } else {
        console.log(`✗ ${petName} missing from main pets object`);
    }
    
    if (LEGENDARY_EGG_PETS[petName]) {
        console.log(`✓ ${petName} exists in LEGENDARY_EGG_PETS`);
    } else {
        console.log(`✗ ${petName} missing from LEGENDARY_EGG_PETS`);
    }
}

// Test probability distribution
console.log("\n--- Testing Probability Distribution ---");
let totalProbability = 0;
const probabilities = {};

for (const petName of expectedPets) {
    const pet = LEGENDARY_EGG_PETS[petName];
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
    const pet = LEGENDARY_EGG_PETS[petName];
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
        if (pet.source === "Legendary Egg") {
            console.log(`✓ ${petName} has correct source: Legendary Egg`);
        } else {
            console.log(`✗ ${petName} has incorrect source: ${pet.source}`);
        }
        
        // Test obtainable
        if (pet.obtainable === false) {
            console.log(`✓ ${petName} correctly marked as unobtainable`);
        } else {
            console.log(`✗ ${petName} incorrectly marked as obtainable: ${pet.obtainable}`);
        }
        
        // Test types
        const validTypes = ["mammal", "aquatic", "reptile"];
        if (validTypes.includes(pet.type)) {
            console.log(`✓ ${petName} has valid type: ${pet.type}`);
        } else {
            console.log(`✗ ${petName} has invalid type: ${pet.type}`);
        }
    }
}

// Test calculation functions
console.log("\n--- Testing Calculation Functions ---");
for (const petName of expectedPets) {
    const pet = LEGENDARY_EGG_PETS[petName];
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
    const pet = LEGENDARY_EGG_PETS[petName];
    if (pet && pet.rarity) {
        rarities[pet.rarity] = (rarities[pet.rarity] || 0) + 1;
    }
}

console.log("Rarity breakdown:");
for (const [rarity, count] of Object.entries(rarities)) {
    console.log(`  ${rarity}: ${count} pet(s)`);
}

// Test that pets are no longer in original files
console.log("\n--- Testing Original File Cleanup ---");
try {
    const { MAMMAL_PETS } = await import('./pets/mammals.js');
    const { AQUATIC_PETS } = await import('./pets/aquatic.js');
    const { PRIMATES_PETS } = await import('./pets/primates.js');
    const { WILD_ANIMALS_PETS } = await import('./pets/wildAnimals.js');
    
    const originalFiles = [
        { name: 'mammals.js', pets: MAMMAL_PETS, expectedMissing: ['cow'] },
        { name: 'aquatic.js', pets: AQUATIC_PETS, expectedMissing: ['seaotter'] },
        { name: 'primates.js', pets: PRIMATES_PETS, expectedMissing: ['silvermonkey'] },
        { name: 'wildAnimals.js', pets: WILD_ANIMALS_PETS, expectedMissing: ['polarbear'] }
    ];
    
    let totalFoundInOriginal = 0;
    for (const file of originalFiles) {
        const petNames = Object.keys(file.pets);
        let foundInFile = 0;
        
        for (const expectedMissing of file.expectedMissing) {
            if (petNames.includes(expectedMissing)) {
                console.log(`✗ ${expectedMissing} still exists in ${file.name}`);
                foundInFile++;
                totalFoundInOriginal++;
            }
        }
        
        if (foundInFile === 0) {
            console.log(`✓ All Legendary Egg pets successfully removed from ${file.name}`);
            console.log(`✓ ${file.name} now has ${petNames.length} pets remaining`);
        }
    }
    
    if (totalFoundInOriginal === 0) {
        console.log("✓ All Legendary Egg pets successfully removed from original files");
    } else {
        console.log(`✗ ${totalFoundInOriginal} pets still in original files`);
    }
} catch (error) {
    console.log(`✗ Error testing original file cleanup: ${error.message}`);
}

console.log("\n--- Legendary Egg Migration Test Complete ---");
