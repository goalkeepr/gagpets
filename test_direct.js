// Direct test of mutation function 
async function testMutation() {
    try {
        // Import the function directly from the modular file
        const module = await import('./petAbilities_modular.js');
        
        console.log('=== MUTATION FUNCTION TEST ===');
        console.log('Function type:', typeof module.getPetMutationDescription);
        
        // Test different mutation types
        const tests = [
            { type: 'shocked', weight: 50 },
            { type: 'radiant', weight: 50 },
            { type: 'none', weight: 50 },
            { type: 'invalid', weight: 50 }
        ];
        
        for (const test of tests) {
            console.log(`\nTesting ${test.type} with ${test.weight}kg:`);
            const result = module.getPetMutationDescription(test.type, test.weight);
            console.log('Result type:', typeof result);
            console.log('Result length:', result?.length || 0);
            console.log('Result preview:', result ? result.substring(0, 100) : 'No result');
        }
        
        // Test petMutationOptions
        console.log('\n=== MUTATION OPTIONS TEST ===');
        console.log('Options type:', typeof module.petMutationOptions);
        if (module.petMutationOptions) {
            console.log('Options keys:', Object.keys(module.petMutationOptions));
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

testMutation();
