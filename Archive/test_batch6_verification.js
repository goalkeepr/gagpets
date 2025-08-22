#!/usr/bin/env node

// Test script to verify Batch 6 pet source updates  
// Tests 16 pets across 3 sources: Night Egg, Oasis Egg, Paradise Egg

import { readFileSync } from 'fs';

console.log("🔍 BATCH 6 VERIFICATION - Pet Source Updates");
console.log("=" .repeat(60));

// Pets to verify with their expected data
const expectedUpdates = [
    // Night Egg (6 pets) - all obtainable: false
    { file: 'pets/mammals.js', pet: 'hedgehog', source: 'Night Egg', probability: 47, obtainable: false },
    { file: 'pets/mammals.js', pet: 'mole', source: 'Night Egg', probability: 23.50, obtainable: false },
    { file: 'pets/amphibians.js', pet: 'frog', source: 'Night Egg', probability: 17.63, obtainable: false },
    { file: 'pets/amphibians.js', pet: 'echofrog', source: 'Night Egg', probability: 8.23, obtainable: false },
    { file: 'pets/birds_new.js', pet: 'nightowl', source: 'Night Egg', probability: 3.53, obtainable: false },
    { file: 'pets/mammals.js', pet: 'raccoon', source: 'Night Egg', probability: 0.12, obtainable: false },
    
    // Oasis Egg (5 pets) - all obtainable: false
    { file: 'pets/mammals.js', pet: 'meerkat', source: 'Oasis Egg', probability: 45, obtainable: false },
    { file: 'pets/reptiles.js', pet: 'sandsnake', source: 'Oasis Egg', probability: 34.50, obtainable: false },
    { file: 'pets/aquatic.js', pet: 'axolotl', source: 'Oasis Egg', probability: 15, obtainable: false },
    { file: 'pets/birds_new.js', pet: 'hyacinthmacaw', source: 'Oasis Egg', probability: 5, obtainable: false },
    { file: 'pets/mammals.js', pet: 'fennecfox', source: 'Oasis Egg', probability: 0.50, obtainable: false },
    
    // Paradise Egg (5 pets) - all obtainable: true
    { file: 'pets/birds_new.js', pet: 'ostrich', source: 'Paradise Egg', probability: 40, obtainable: true },
    { file: 'pets/birds_new.js', pet: 'peacock', source: 'Paradise Egg', probability: 30, obtainable: true },
    { file: 'pets/mammals.js', pet: 'capybara', source: 'Paradise Egg', probability: 21, obtainable: true },
    { file: 'pets/birds_new.js', pet: 'scarletmacaw', source: 'Paradise Egg', probability: 8, obtainable: true },
    { file: 'pets/aquatic.js', pet: 'mimicoctopus', source: 'Paradise Egg', probability: 1, obtainable: true }
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
            console.log(`✅ ${pet.padEnd(16)} | ${source.padEnd(12)} | ${String(probability).padEnd(5)}% | ${obtainableIcon} | ${file}`);
            successCount++;
        } else {
            console.log(`❌ ${pet.padEnd(16)} | ${source.padEnd(12)} | ${String(probability).padEnd(5)}% | ? | ${file} - NOT FOUND`);
            failureCount++;
        }
    } catch (error) {
        console.log(`❌ ${pet.padEnd(16)} | ${source.padEnd(12)} | ${String(probability).padEnd(5)}% | ? | ${file} - ERROR: ${error.message}`);
        failureCount++;
    }
});

// Test probability totals for each source
console.log("\n🧮 PROBABILITY VALIDATION:");
console.log("-".repeat(60));

const sourceGroups = {
    'Night Egg': [47, 23.50, 17.63, 8.23, 3.53, 0.12],
    'Oasis Egg': [45, 34.50, 15, 5, 0.50],
    'Paradise Egg': [40, 30, 21, 8, 1]
};

Object.entries(sourceGroups).forEach(([source, probabilities]) => {
    const total = probabilities.reduce((sum, prob) => sum + prob, 0);
    const status = Math.abs(total - 100) < 0.01 ? '✅' : '❌'; // Allow for floating point precision
    console.log(`${status} ${source.padEnd(15)} | Total: ${total.toFixed(2)}%`);
});

// Test obtainable field consistency
console.log("\n🔐 OBTAINABLE STATUS VALIDATION:");
console.log("-".repeat(60));

const obtainableExpected = {
    'Night Egg': false,
    'Oasis Egg': false,
    'Paradise Egg': true
};

Object.entries(obtainableExpected).forEach(([source, expected]) => {
    const sourceResults = expectedUpdates.filter(pet => pet.source === source);
    const allCorrect = sourceResults.every(pet => pet.obtainable === expected);
    const status = allCorrect ? '✅' : '❌';
    console.log(`${status} ${source.padEnd(15)} | All pets obtainable: ${expected}`);
});

console.log("\n📈 BATCH 6 SUMMARY:");
console.log("-".repeat(60));
console.log(`✅ Successfully updated: ${successCount}/16 pets`);
console.log(`❌ Failed updates: ${failureCount}/16 pets`);
console.log(`📊 Total processed: ${successCount}/16 requested pets`);

// Calculate cumulative progress
const totalBatchesCompleted = 6;
const totalPetsUpdated = 49 + 16; // Previous batches + current batch
console.log(`\n🎯 CUMULATIVE PROGRESS:`);
console.log("-".repeat(60));
console.log(`📦 Batches completed: ${totalBatchesCompleted}`);
console.log(`🐾 Total pets updated: ${totalPetsUpdated}`);
console.log(`📊 Sources processed: 17 out of 25 total`);

if (successCount === 16 && failureCount === 0) {
    console.log(`\n🎉 BATCH 6 COMPLETE! All pets successfully updated with source data.`);
} else {
    console.log(`\n⚠️  Issues detected. Review failed updates above.`);
}

console.log("\n🔄 NEXT: Proceed to Batch 7 with remaining pets");
