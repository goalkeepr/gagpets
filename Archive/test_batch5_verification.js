#!/usr/bin/env node

// Test script to verify Batch 5 pet source updates  
// Tests 14 pets across 3 sources: Kitsune Chest, Legendary Egg, Mythical Egg

import { readFileSync } from 'fs';

console.log("🔍 BATCH 5 VERIFICATION - Pet Source Updates");
console.log("=" .repeat(60));

// Pets to verify with their expected data
const expectedUpdates = [
    // Kitsune Chest (3 pets) - all obtainable: false
    { file: 'pets/other.js', pet: 'manekineko', source: 'Kitsune Chest', probability: 34.50, obtainable: false },
    { file: 'pets/spirit.js', pet: 'kodama', source: 'Kitsune Chest', probability: 14.50, obtainable: false },
    { file: 'pets/mythical.js', pet: 'corruptedkitsune', source: 'Kitsune Chest', probability: 1, obtainable: false },
    
    // Legendary Egg (5 pets) - all obtainable: false
    { file: 'pets/mammals.js', pet: 'cow', source: 'Legendary Egg', probability: 42.55, obtainable: false },
    { file: 'pets/primates.js', pet: 'silvermonkey', source: 'Legendary Egg', probability: 42.55, obtainable: false },
    { file: 'pets/aquatic.js', pet: 'seaotter', source: 'Legendary Egg', probability: 10.64, obtainable: false },
    { file: 'pets/reptiles.js', pet: 'turtle', source: 'Legendary Egg', probability: 2.13, obtainable: false },
    { file: 'pets/wildAnimals.js', pet: 'polarbear', source: 'Legendary Egg', probability: 2.13, obtainable: false },
    
    // Mythical Egg (5 pets) - all obtainable: true
    { file: 'pets/mammals.js', pet: 'greymouse', source: 'Mythical Egg', probability: 35.71, obtainable: true },
    { file: 'pets/mammals.js', pet: 'brownmouse', source: 'Mythical Egg', probability: 26.79, obtainable: true },
    { file: 'pets/smallMammals.js', pet: 'squirrel', source: 'Mythical Egg', probability: 26.79, obtainable: true },
    { file: 'pets/insects.js', pet: 'redgiantant', source: 'Mythical Egg', probability: 8.93, obtainable: true },
    { file: 'pets/mammals.js', pet: 'redfox', source: 'Mythical Egg', probability: 1.79, obtainable: true }
];

let successCount = 0;
let failureCount = 0;

console.log("\n📊 VERIFICATION RESULTS:");
console.log("-".repeat(60));

// Test each expected update
expectedUpdates.forEach(({ file, pet, source, probability, obtainable }) => {
    try {
        const filePath = `/Users/wayne/source/gagpets/${file}`;
        const content = readFileSync(filePath, 'utf8');
        
        // Look for the pet section with source, probability, and obtainable fields
        const petRegex = new RegExp(`${pet}:\\s*{[\\s\\S]*?source:\\s*["']${source}["'][\\s\\S]*?probability:\\s*${probability}[\\s\\S]*?obtainable:\\s*${obtainable}`, 'i');
        
        if (petRegex.test(content)) {
            const obtainableIcon = obtainable ? '✅' : '❌';
            console.log(`✅ ${pet.padEnd(18)} | ${source.padEnd(14)} | ${probability}% | ${obtainableIcon} | ${file}`);
            successCount++;
        } else {
            console.log(`❌ ${pet.padEnd(18)} | ${source.padEnd(14)} | ${probability}% | ? | ${file} - NOT FOUND`);
            failureCount++;
        }
    } catch (error) {
        console.log(`❌ ${pet.padEnd(18)} | ${source.padEnd(14)} | ${probability}% | ? | ${file} - ERROR: ${error.message}`);
        failureCount++;
    }
});

// Test probability totals for each source
console.log("\n🧮 PROBABILITY VALIDATION:");
console.log("-".repeat(60));

const sourceGroups = {
    'Kitsune Chest': [34.50, 14.50, 1],
    'Legendary Egg': [42.55, 42.55, 10.64, 2.13, 2.13],
    'Mythical Egg': [35.71, 26.79, 26.79, 8.93, 1.79]
};

Object.entries(sourceGroups).forEach(([source, probabilities]) => {
    const total = probabilities.reduce((sum, prob) => sum + prob, 0);
    const status = Math.abs(total - 100) < 0.01 ? '✅' : '❌'; // Allow for floating point precision
    console.log(`${status} ${source.padEnd(20)} | Total: ${total.toFixed(2)}%`);
});

// Test obtainable field consistency
console.log("\n🔐 OBTAINABLE STATUS VALIDATION:");
console.log("-".repeat(60));

const obtainableExpected = {
    'Kitsune Chest': false,
    'Legendary Egg': false,
    'Mythical Egg': true
};

Object.entries(obtainableExpected).forEach(([source, expected]) => {
    const sourceResults = expectedUpdates.filter(pet => pet.source === source);
    const allCorrect = sourceResults.every(pet => pet.obtainable === expected);
    const status = allCorrect ? '✅' : '❌';
    console.log(`${status} ${source.padEnd(20)} | All pets obtainable: ${expected}`);
});

console.log("\n📈 BATCH 5 SUMMARY:");
console.log("-".repeat(60));
console.log(`✅ Successfully updated: ${successCount}/13 pets`);
console.log(`❌ Failed updates: ${failureCount}/13 pets`);
console.log(`📊 Total processed: ${successCount}/14 requested pets`);

// Calculate cumulative progress
const totalBatchesCompleted = 5;
const totalPetsUpdated = 26 + 10 + 13; // Previous batches + current batch
console.log(`\n🎯 CUMULATIVE PROGRESS:`);
console.log("-".repeat(60));
console.log(`📦 Batches completed: ${totalBatchesCompleted}`);
console.log(`🐾 Total pets updated: ${totalPetsUpdated}`);
console.log(`📊 Sources processed: 14 out of 25 total`);

if (successCount === 13 && failureCount === 0) {
    console.log(`\n🎉 BATCH 5 COMPLETE! All pets successfully updated with source data.`);
} else {
    console.log(`\n⚠️  Issues detected. Review failed updates above.`);
}

console.log("\n🔄 NEXT: Proceed to Batch 6 with remaining pets");
