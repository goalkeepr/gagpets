// Global bridge for ES6 module compatibility
// This script makes the modular pet system available globally

import {
    petAbilities,
    petMutationOptions,
    getModifierDetails,
    getPetMutationDescription
} from './petAbilities_modular.js';

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

// Trigger a custom event to let the page know the data is ready
window.dispatchEvent(new CustomEvent('petDataLoaded', {
    detail: {
        petCount: Object.keys(petAbilities).length,
        mutationCount: Object.keys(petMutationOptions).length
    }
}));

export { petAbilities, petMutationOptions, getModifierDetails, getPetMutationDescription };
