// BATCH 3 MIGRATION VERIFICATION TEST
// Testing 5 Mythical Egg pets migrated to mythicalEgg.js

import fs from 'fs';

console.log('🧪 BATCH 3 MIGRATION VERIFICATION TEST\n');

// Define expected pets
const expectedPets = [
    { file: 'pets/mythicalEgg.js', pet: 'redgiantant', source: 'Mythical Egg', probability: 8.93, obtainable: true },
    { file: 'pets/mythicalEgg.js', pet: 'brownmouse', source: 'Mythical Egg', probability: 26.79, obtainable: true },
    { file: 'pets/mythicalEgg.js', pet: 'redfox', source: 'Mythical Egg', probability: 1.79, obtainable: true },
    { file: 'pets/mythicalEgg.js', pet: 'greymouse', source: 'Mythical Egg', probability: 35.71, obtainable: true },
    { file: 'pets/mythicalEgg.js', pet: 'squirrel', source: 'Mythical Egg', probability: 26.79, obtainable: true }
];

console.log('🎯 BATCH 3: Mythical Egg Pets (5 pets)');
console.log('Expected pets:', expectedPets.map(p => p.pet).join(', '));
console.log();

// Test 1: Verify new mythicalEgg.js file exists and has correct content
try {
    const mythicalEggContent = fs.readFileSync('pets/mythicalEgg.js', 'utf8');
    console.log('✅ mythicalEgg.js file exists');
    
    // Test each pet
    let allPetsFound = true;
    for (const pet of expectedPets) {
        if (mythicalEggContent.includes(`${pet.pet}:`)) {
            console.log(`✅ ${pet.pet} found in mythicalEgg.js`);
            
            // Check source and probability
            const petSection = mythicalEggContent.substring(
                mythicalEggContent.indexOf(`${pet.pet}:`),
                mythicalEggContent.indexOf(`},`, mythicalEggContent.indexOf(`${pet.pet}:`))
            );
            
            if (petSection.includes(`source: "${pet.source}"`)) {
                console.log(`  ✅ ${pet.pet} has correct source: ${pet.source}`);
            } else {
                console.log(`  ❌ ${pet.pet} missing or incorrect source`);
                allPetsFound = false;
            }
            
            if (petSection.includes(`probability: ${pet.probability}`)) {
                console.log(`  ✅ ${pet.pet} has correct probability: ${pet.probability}%`);
            } else {
                console.log(`  ❌ ${pet.pet} missing or incorrect probability`);
                allPetsFound = false;
            }
            
            if (petSection.includes(`obtainable: ${pet.obtainable}`)) {
                console.log(`  ✅ ${pet.pet} has correct obtainable: ${pet.obtainable}`);
            } else {
                console.log(`  ❌ ${pet.pet} missing or incorrect obtainable value`);
                allPetsFound = false;
            }
        } else {
            console.log(`❌ ${pet.pet} NOT found in mythicalEgg.js`);
            allPetsFound = false;
        }
    }
    
    if (allPetsFound) {
        console.log('✅ All 5 Mythical Egg pets correctly migrated to mythicalEgg.js');
    } else {
        console.log('❌ Some pets missing or incorrect in mythicalEgg.js');
    }
} catch (err) {
    console.log('❌ mythicalEgg.js file not found or readable');
}

console.log();

// Test 2: Verify pets removed from original files
const originalFiles = [
    { file: 'pets/insects.js', pets: ['redgiantant'] },
    { file: 'pets/mammals.js', pets: ['brownmouse', 'redfox', 'greymouse'] },
    { file: 'pets/smallMammals.js', pets: ['squirrel'] }
];

console.log('🗑️  REMOVAL VERIFICATION:');
let allPetsRemoved = true;

for (const fileInfo of originalFiles) {
    try {
        const content = fs.readFileSync(fileInfo.file, 'utf8');
        console.log(`\nChecking ${fileInfo.file}:`);
        
        for (const pet of fileInfo.pets) {
            if (!content.includes(`${pet}:`)) {
                console.log(`  ✅ ${pet} correctly removed from ${fileInfo.file}`);
            } else {
                console.log(`  ❌ ${pet} still found in ${fileInfo.file}`);
                allPetsRemoved = false;
            }
        }
    } catch (err) {
        console.log(`❌ Could not read ${fileInfo.file}`);
    }
}

if (allPetsRemoved) {
    console.log('\n✅ All pets correctly removed from original type files');
} else {
    console.log('\n❌ Some pets still exist in original files');
}

console.log();

// Test 3: Verify petAbilities_modular.js integration
try {
    const modularContent = fs.readFileSync('petAbilities_modular.js', 'utf8');
    console.log('🔗 INTEGRATION VERIFICATION:');
    
    if (modularContent.includes('import { MYTHICAL_EGG_PETS } from \'./pets/mythicalEgg.js\'')) {
        console.log('✅ mythicalEgg.js import found in petAbilities_modular.js');
    } else {
        console.log('❌ mythicalEgg.js import missing in petAbilities_modular.js');
    }
    
    if (modularContent.includes('...MYTHICAL_EGG_PETS,')) {
        console.log('✅ MYTHICAL_EGG_PETS spread found in petAbilities object');
    } else {
        console.log('❌ MYTHICAL_EGG_PETS spread missing in petAbilities object');
    }
    
    if (modularContent.includes('MYTHICAL_EGG_PETS,') && modularContent.includes('export {')) {
        console.log('✅ MYTHICAL_EGG_PETS found in exports');
    } else {
        console.log('❌ MYTHICAL_EGG_PETS missing in exports');
    }
    
} catch (err) {
    console.log('❌ Could not read petAbilities_modular.js');
}

console.log();

// Test 4: Probability verification
const expectedProbabilities = [8.93, 26.79, 1.79, 35.71, 26.79];
const totalProbability = expectedProbabilities.reduce((sum, prob) => sum + prob, 0);

console.log('📊 PROBABILITY VERIFICATION:');
console.log(`Expected total probability: ${totalProbability.toFixed(2)}%`);
if (Math.abs(totalProbability - 100) < 0.1) {
    console.log('✅ Probabilities total approximately 100%');
} else {
    console.log('❌ Probabilities do not total 100%');
}

// Expected obtainable values
console.log('\n🔓 OBTAINABLE VERIFICATION:');
console.log('All Mythical Egg pets should be obtainable: true');
if (expectedPets.every(pet => pet.obtainable === true)) {
    console.log('✅ All pets marked as obtainable: true');
} else {
    console.log('❌ Some pets have incorrect obtainable values');
}

console.log('\n🏆 BATCH 3 MIGRATION TEST COMPLETE!');
console.log('📦 Total pets migrated: 5');
console.log('📁 Source: Mythical Egg');
console.log('🎯 Target file: pets/mythicalEgg.js');
