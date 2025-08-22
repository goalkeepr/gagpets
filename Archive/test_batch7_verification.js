#!/usr/bin/env node

// Test file to verify all pets updated in batch 7 have correct source data
const expectedPets = [
    // Primal Egg pets (all obtainable: false)
    { file: 'pets/dinosaurs.js', pet: 'parasaurolophus', source: 'Primal Egg', probability: 35, obtainable: false },
    { file: 'pets/dinosaurs.js', pet: 'iguanodon', source: 'Primal Egg', probability: 32.50, obtainable: false },
    { file: 'pets/dinosaurs.js', pet: 'pachycephalosaurus', source: 'Primal Egg', probability: 28, obtainable: false },
    { file: 'pets/dinosaurs.js', pet: 'dilophosaurus', source: 'Primal Egg', probability: 3, obtainable: false },
    { file: 'pets/dinosaurs.js', pet: 'ankylosaurus', source: 'Primal Egg', probability: 1, obtainable: false },
    { file: 'pets/dinosaurs.js', pet: 'spinosaurus', source: 'Primal Egg', probability: 0.50, obtainable: false },
    
    // Rare Egg pets (all obtainable: false)
    { file: 'pets/mammals.js', pet: 'orangetabby', source: 'Rare Egg', probability: 33.33, obtainable: false },
    { file: 'pets/mammals.js', pet: 'spotteddeer', source: 'Rare Egg', probability: 25, obtainable: false },
    { file: 'pets/domestic.js', pet: 'pig', source: 'Rare Egg', probability: 16.67, obtainable: false },
    { file: 'pets/birds_new.js', pet: 'rooster', source: 'Rare Egg', probability: 16.67, obtainable: false },
    { file: 'pets/primates.js', pet: 'monkey', source: 'Rare Egg', probability: 8.33, obtainable: false },
    
    // Rare Summer Egg pets (all obtainable: true)
    { file: 'pets/birds_new.js', pet: 'flamingo', source: 'Rare Summer Egg', probability: 30, obtainable: true },
    { file: 'pets/birds_new.js', pet: 'toucan', source: 'Rare Summer Egg', probability: 25, obtainable: true },
    { file: 'pets/aquatic.js', pet: 'seaturtle', source: 'Rare Summer Egg', probability: 20, obtainable: true },
    { file: 'pets/primates.js', pet: 'orangutan', source: 'Rare Summer Egg', probability: 15, obtainable: true },
    { file: 'pets/aquatic.js', pet: 'seal', source: 'Rare Summer Egg', probability: 10, obtainable: true }
];

import fs from 'fs';
import path from 'path';

async function verifyPets() {
    console.log('🔍 Verifying Batch 7 pets...\n');
    
    let allPassed = true;
    const results = [];
    
    for (const expected of expectedPets) {
        const filePath = path.join(process.cwd(), expected.file);
        
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            
            // Find the pet definition
            const petRegex = new RegExp(`${expected.pet}:\\s*{([^}]+(?:{[^}]*}[^}]*)*)`, 'g');
            const match = petRegex.exec(content);
            
            if (!match) {
                results.push({ pet: expected.pet, status: '❌ FAIL', reason: 'Pet not found' });
                allPassed = false;
                continue;
            }
            
            const petDefinition = match[1];
            
            // Check source
            const sourceMatch = petDefinition.match(/source:\s*["']([^"']+)["']/);
            const source = sourceMatch ? sourceMatch[1] : null;
            
            // Check probability  
            const probMatch = petDefinition.match(/probability:\s*([0-9.]+)/);
            const probability = probMatch ? parseFloat(probMatch[1]) : null;
            
            // Check obtainable
            const obtainableMatch = petDefinition.match(/obtainable:\s*(true|false)/);
            const obtainable = obtainableMatch ? obtainableMatch[1] === 'true' : null;
            
            // Verify all fields
            const issues = [];
            if (source !== expected.source) issues.push(`source: expected "${expected.source}", got "${source}"`);
            if (probability !== expected.probability) issues.push(`probability: expected ${expected.probability}, got ${probability}`);
            if (obtainable !== expected.obtainable) issues.push(`obtainable: expected ${expected.obtainable}, got ${obtainable}`);
            
            if (issues.length === 0) {
                results.push({ pet: expected.pet, status: '✅ PASS', reason: `${source} ${probability}% obtainable:${obtainable}` });
            } else {
                results.push({ pet: expected.pet, status: '❌ FAIL', reason: issues.join(', ') });
                allPassed = false;
            }
            
        } catch (error) {
            results.push({ pet: expected.pet, status: '❌ ERROR', reason: error.message });
            allPassed = false;
        }
    }
    
    // Display results
    console.log('📋 Individual Pet Results:');
    results.forEach(result => {
        console.log(`${result.status} ${result.pet.padEnd(20)} - ${result.reason}`);
    });
    
    // Calculate probability totals
    console.log('\n📊 Probability Verification:');
    const sourceGroups = {
        'Primal Egg': expectedPets.filter(p => p.source === 'Primal Egg'),
        'Rare Egg': expectedPets.filter(p => p.source === 'Rare Egg'),
        'Rare Summer Egg': expectedPets.filter(p => p.source === 'Rare Summer Egg')
    };
    
    for (const [source, pets] of Object.entries(sourceGroups)) {
        const total = pets.reduce((sum, pet) => sum + pet.probability, 0);
        const status = Math.abs(total - 100) < 0.01 ? '✅' : '❌';
        console.log(`${status} ${source}: ${total.toFixed(2)}% (${pets.length} pets)`);
    }
    
    console.log(`\n🎯 Overall Result: ${allPassed ? '✅ ALL TESTS PASSED!' : '❌ SOME TESTS FAILED'}`);
    console.log(`📈 Total pets updated in batch 7: ${expectedPets.length}`);
    
    return allPassed;
}

verifyPets().catch(console.error);
