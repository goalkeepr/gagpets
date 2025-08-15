// Modular Pet Abilities - Complete Integration File
// Import utilities and data
import { getModifierDetails } from './utils/modifiers.js';
import { ICONS } from './data/icons.js';
import { RARITIES, TYPES } from './data/constants.js';
import { petMutationOptions } from './data/mutations.js';

// Import all pet categories
import { AMPHIBIAN_PETS } from './pets/amphibians.js';
import { AQUATIC_PETS } from './pets/aquatic.js';
import { BIRD_PETS } from './pets/birds_new.js';
import { CANINES_PETS } from './pets/canines.js';
import { DINOSAUR_PETS } from './pets/dinosaurs.js';
import { DOMESTIC_PETS } from './pets/domestic.js';
import { HERBIVORE_PETS } from './pets/herbivores.js';
import { INSECT_PETS } from './pets/insects.js';
import { MAMMAL_PETS } from './pets/mammals.js';
import { MOLLUSK_PETS } from './pets/mollusks.js';
import { MYTHICAL_PETS } from './pets/mythical.js';
import { OTHER_PETS } from './pets/other.js';
import { PRIMATES_PETS } from './pets/primates.js';
import { SMALL_MAMMALS_PETS } from './pets/smallMammals.js';
import { SPECIALTY_PETS } from './pets/specialty.js';
import { UNDEAD_PETS } from './pets/undead.js';
import { WILD_ANIMALS_PETS } from './pets/wildAnimals.js';

// Combine all pets into a single object
const petAbilities = {
    ...AMPHIBIAN_PETS,
    ...AQUATIC_PETS,
    ...BIRD_PETS,
    ...CANINES_PETS,
    ...DINOSAUR_PETS,
    ...DOMESTIC_PETS,
    ...HERBIVORE_PETS,
    ...INSECT_PETS,
    ...MAMMAL_PETS,
    ...MOLLUSK_PETS,
    ...MYTHICAL_PETS,
    ...OTHER_PETS,
    ...PRIMATES_PETS,
    ...SMALL_MAMMALS_PETS,
    ...SPECIALTY_PETS,
    ...UNDEAD_PETS,
    ...WILD_ANIMALS_PETS
    // Complete migration achieved! All 17 categories integrated with 109+ pets
};

// Export everything needed
export { 
    petAbilities, 
    petMutationOptions, 
    getModifierDetails,
    // Export individual categories for selective imports
    AMPHIBIAN_PETS,
    AQUATIC_PETS,
    BIRD_PETS,
    CANINES_PETS,
    DINOSAUR_PETS,
    DOMESTIC_PETS,
    HERBIVORE_PETS,
    INSECT_PETS,
    MAMMAL_PETS,
    MOLLUSK_PETS,
    MYTHICAL_PETS,
    OTHER_PETS,
    PRIMATES_PETS,
    SMALL_MAMMALS_PETS,
    SPECIALTY_PETS,
    UNDEAD_PETS,
    WILD_ANIMALS_PETS
};

// For backward compatibility, make functions available globally
if (typeof window !== 'undefined') {
    window.petAbilities = petAbilities;
    window.petMutationOptions = petMutationOptions;
    window.getModifierDetails = getModifierDetails;
    // getPetMutationDescription will be assigned after it's defined
}

// Enhanced utility for getting pet mutation description
export const getPetMutationDescription = (modifierType, kg = 50) => {
    if (!petMutationOptions) return "";
    
    const mutationMap = {
        "shocked": "Shocked Pet Mutation",
        "frozen": "Frozen Pet Mutation", 
        "windy": "Windy Pet Mutation",
        "ironskin": "IronSkin Pet Mutation",
        "radiant": "Radiant Pet Mutation",
        "ascended": "Ascended Pet Mutation",
        "tranquil": "Tranquil Pet Mutation",
        "corrupted": "Corrupted Pet Mutation"
    };
    
    const mutationKey = mutationMap[modifierType];
    if (!mutationKey || !petMutationOptions[mutationKey]) return "";
    
    if (typeof petMutationOptions[mutationKey].calculate === 'function') {
        return petMutationOptions[mutationKey].calculate(kg, 'none');
    }
    
    return "";
};

// Now assign getPetMutationDescription to window after it's defined
if (typeof window !== 'undefined') {
    window.getPetMutationDescription = getPetMutationDescription;
}

// Helper function to get pets by category
export const getPetsByCategory = (category) => {
    return Object.entries(petAbilities)
        .filter(([key, pet]) => pet.type === category)
        .reduce((acc, [key, pet]) => ({ ...acc, [key]: pet }), {});
};

// Helper function to get pets by rarity
export const getPetsByRarity = (rarity) => {
    return Object.entries(petAbilities)
        .filter(([key, pet]) => pet.rarity === rarity)
        .reduce((acc, [key, pet]) => ({ ...acc, [key]: pet }), {});
};

// Statistics helper - updated for all 17 categories
export const getPetStats = () => {
    const pets = Object.values(petAbilities);
    return {
        total: pets.length,
        byRarity: pets.reduce((acc, pet) => {
            acc[pet.rarity] = (acc[pet.rarity] || 0) + 1;
            return acc;
        }, {}),
        byType: pets.reduce((acc, pet) => {
            acc[pet.type] = (acc[pet.type] || 0) + 1;
            return acc;
        }, {}),
        categories: {
            amphibians: Object.keys(AMPHIBIAN_PETS).length,
            aquatic: Object.keys(AQUATIC_PETS).length,
            birds: Object.keys(BIRD_PETS).length,
            canines: Object.keys(CANINES_PETS).length,
            dinosaurs: Object.keys(DINOSAUR_PETS).length,
            domestic: Object.keys(DOMESTIC_PETS).length,
            herbivores: Object.keys(HERBIVORE_PETS).length,
            insects: Object.keys(INSECT_PETS).length,
            mammals: Object.keys(MAMMAL_PETS).length,
            mollusks: Object.keys(MOLLUSK_PETS).length,
            mythical: Object.keys(MYTHICAL_PETS).length,
            other: Object.keys(OTHER_PETS).length,
            primates: Object.keys(PRIMATES_PETS).length,
            smallMammals: Object.keys(SMALL_MAMMALS_PETS).length,
            specialty: Object.keys(SPECIALTY_PETS).length,
            undead: Object.keys(UNDEAD_PETS).length,
            wildAnimals: Object.keys(WILD_ANIMALS_PETS).length
            // Complete migration achieved - 17 categories total!
        }
    };
};
