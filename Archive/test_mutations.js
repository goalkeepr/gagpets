// Test the mutation functionality
console.log('=== MUTATION TEST START ===');

// Wait for the module to load, then test
setTimeout(() => {
    console.log('Testing global getPetMutationDescription:', typeof window.getPetMutationDescription);
    
    if (typeof window.getPetMutationDescription === 'function') {
        console.log('✅ Function exists globally');
        const result = window.getPetMutationDescription('radiant', 50);
        console.log('Radiant mutation result:', result);
        
        const result2 = window.getPetMutationDescription('shocked', 25);
        console.log('Shocked mutation result:', result2);
    } else {
        console.error('❌ getPetMutationDescription not available globally');
        console.log('Available globals:', Object.keys(window).filter(k => k.includes('pet') || k.includes('mutation')));
    }
    
    console.log('=== MUTATION TEST END ===');
}, 1000);
