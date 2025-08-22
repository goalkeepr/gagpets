#!/usr/bin/env node

// Test script to verify Batch 4 pet source updates
// Tests 14 pets across 3 sources: Culinarian Chest, Dinosaur Egg, Gourmet Egg

import { readFileSync } from 'fs';

console.log("🔍 BATCH 4 VERIFICATION - Pet Source Updates");
console.log("=" .repeat(60));

// Pets to verify with their expected data
const expectedUpdates = [
    // Culinarian Chest (3 pets) - already completed in previous batches
    { file: 'pets/aquatic.js', pet: 'shrimp', source: 'Culinarian Chest', probability: 45 },
    { file: 'pets/aquatic.js', pet: 'crab', source: 'Culinarian Chest', probability: 35 },
    { file: 'pets/birds_new.js', pet: 'phoenix', source: 'Culinarian Chest', probability: 20 },
    
    // Dinosaur Egg (5 pets) - just completed
    { file: 'pets/dinosaurs.js', pet: 'raptor', source: 'Dinosaur Egg', probability: 35 },
    { file: 'pets/dinosaurs.js', pet: 'stegosaurus', source: 'Dinosaur Egg', probability: 28 },
    { file: 'pets/dinosaurs.js', pet: 'trex', source: 'Dinosaur Egg', probability: 0.5 },
    { file: 'pets/dinosaurs.js', pet: 'brontosaurus', source: 'Dinosaur Egg', probability: 1 },
    { file: 'pets/dinosaurs.js', pet: 'pterodactyl', source: 'Dinosaur Egg', probability: 3 },
    
    // Gourmet Egg (5 pets) - just completed
    { file: 'pets/herbivores.js', pet: 'bagelbunny', source: 'Gourmet Egg', probability: 50 },
    { file: 'pets/specialty.js', pet: 'pancakemole', source: 'Gourmet Egg', probability: 38 },
    { file: 'pets/specialty.js', pet: 'sushibear', source: 'Gourmet Egg', probability: 7 },
    { file: 'pets/specialty.js', pet: 'spaghettisloth', source: 'Gourmet Egg', probability: 4 },
    { file: 'pets/specialty.js', pet: 'frenchfryferret', source: 'Gourmet Egg', probability: 1 }
];

// Missing pets (not found in codebase)
const missingPets = [
    'Hotdog Dachshund',
    'Lobster Thermador', 
    'Triceratops'
];

let successCount = 0;
let failureCount = 0;

console.log("\n📊 VERIFICATION RESULTS:");
console.log("-".repeat(60));

// Test each expected update
expectedUpdates.forEach(({ file, pet, source, probability }) => {
    try {
        const filePath = `/Users/wayne/source/gagpets/${file}`;
        const content = readFileSync(filePath, 'utf8');
        
        // Look for the pet section
        const petRegex = new RegExp(`${pet}:\\s*{[\\s\\S]*?source:\\s*["']${source}["'][\\s\\S]*?probability:\\s*${probability}[\\s\\S]*?obtainable:\\s*(true|false)`, 'i');
        
        if (petRegex.test(content)) {
            console.log(`✅ ${pet.padEnd(20)} | ${source.padEnd(15)} | ${probability}% | ${file}`);
            successCount++;
        } else {
            console.log(`❌ ${pet.padEnd(20)} | ${source.padEnd(15)} | ${probability}% | ${file} - NOT FOUND`);
            failureCount++;
        }
    } catch (error) {
        console.log(`❌ ${pet.padEnd(20)} | ${source.padEnd(15)} | ${probability}% | ${file} - ERROR: ${error.message}`);
        failureCount++;
    }
});

// Test probability totals for each source
console.log("\n🧮 PROBABILITY VALIDATION:");
console.log("-".repeat(60));

const sourceGroups = {
    'Culinarian Chest': [45, 35, 20],
    'Dinosaur Egg': [35, 28, 0.5, 1, 3],
    'Gourmet Egg': [50, 38, 7, 4, 1]
};

Object.entries(sourceGroups).forEach(([source, probabilities]) => {
    const total = probabilities.reduce((sum, prob) => sum + prob, 0);
    const status = total === 100 ? '✅' : '❌';
    console.log(`${status} ${source.padEnd(20)} | Total: ${total}%`);
});

console.log("\n📋 MISSING PETS (not found in codebase):");
console.log("-".repeat(60));
missingPets.forEach(pet => {
    console.log(`⚠️  ${pet}`);
});

console.log("\n📈 BATCH 4 SUMMARY:");
console.log("-".repeat(60));
console.log(`✅ Successfully updated: ${successCount}/13 pets`);
console.log(`❌ Failed updates: ${failureCount}/13 pets`);
console.log(`⚠️  Missing from codebase: ${missingPets.length} pets`);
console.log(`📊 Total processed: ${successCount + missingPets.length}/14 requested pets`);

if (successCount === 13 && failureCount === 0) {
    console.log(`\n🎉 BATCH 4 COMPLETE! All existing pets successfully updated with source data.`);
} else {
    console.log(`\n⚠️  Issues detected. Review failed updates above.`);
}

console.log("\n🔄 NEXT: Proceed to Batch 5 with remaining 55 pets across 11 sources");
