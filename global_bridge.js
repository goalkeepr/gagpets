// Global bridge for ES6 module compatibility
// This script makes the modular pet system available globally

console.log('🔧 Global bridge starting - importing modules...');

import { 
    petAbilities, 
    petMutationOptions, 
    getModifierDetails,
    getPetMutationDescription 
} from './petAbilities_modular.js';

// Debug logging
console.log('🔧 Global bridge modules imported successfully');
console.log('📊 Pet abilities loaded:', Object.keys(petAbilities).length, 'pets');
console.log('🎲 Mutation options loaded:', Object.keys(petMutationOptions).length, 'mutations');
console.log('🔧 Sample pets:', Object.keys(petAbilities).slice(0, 5));

// Make everything available globally for backward compatibility
window.petAbilities = petAbilities;
window.petMutationOptions = petMutationOptions; 
window.getModifierDetails = getModifierDetails;
window.getPetMutationDescription = getPetMutationDescription;

// Also make getPetMutationDescription available as a global function (not just window property)
globalThis.getPetMutationDescription = getPetMutationDescription;

// Ensure functions are immediately available
Object.assign(window, {
    petAbilities,
    petMutationOptions,
    getModifierDetails,
    getPetMutationDescription
});

// Debug log
console.log('🔧 Global bridge loaded - mutations available:', typeof window.getPetMutationDescription);
console.log('✅ Global bridge complete - petAbilities available:', typeof window.petAbilities);
console.log('🔍 First few pets:', Object.keys(petAbilities).slice(0, 10));

// Trigger a custom event to let the page know the data is ready
window.dispatchEvent(new CustomEvent('petDataLoaded', { 
    detail: { 
        petCount: Object.keys(petAbilities).length,
        mutationCount: Object.keys(petMutationOptions).length
    }
}));

console.log('🎉 Pet data loaded successfully! Available globally.');

export { petAbilities, petMutationOptions, getModifierDetails, getPetMutationDescription };
