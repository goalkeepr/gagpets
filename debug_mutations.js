// Test script to debug the mutation function
import('./global_bridge.js').then(async () => {
    console.log('=== DEBUGGING MUTATION FUNCTION ===');
    
    // Wait a bit for everything to load
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Test if the function exists
    const hasFunction = typeof window.getPetMutationDescription === 'function';
    console.log('1. Function exists globally:', hasFunction);
    
    if (!hasFunction) {
        console.log('Available window properties:', Object.keys(window).filter(k => k.includes('pet') || k.includes('Pet')));
        return;
    }
    
    // Test different mutation types
    const testCases = [
        { type: 'shocked', weight: 50 },
        { type: 'radiant', weight: 50 },
        { type: 'frozen', weight: 25 },
        { type: 'none', weight: 50 }
    ];
    
    testCases.forEach(({ type, weight }) => {
        console.log(`\n2. Testing ${type} mutation with ${weight}kg:`);
        try {
            const result = window.getPetMutationDescription(type, weight);
            console.log('   Result:', result ? 'SUCCESS' : 'NULL/EMPTY');
            console.log('   Content:', result ? result.substring(0, 100) + '...' : 'No content');
        } catch (error) {
            console.error('   Error:', error.message);
        }
    });
    
    // Test the petMutationOptions directly
    console.log('\n3. Checking petMutationOptions:');
    console.log('   Exists:', typeof window.petMutationOptions === 'object');
    if (window.petMutationOptions) {
        console.log('   Keys:', Object.keys(window.petMutationOptions));
    }
    
    console.log('=== END DEBUG ===');
});
