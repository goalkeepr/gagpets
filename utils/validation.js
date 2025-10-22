// Input validation utilities
import { PET_CONSTRAINTS, ERROR_MESSAGES } from '../config/constants.js';

/**
 * Validation result object
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether the validation passed
 * @property {string} error - Error message if validation failed
 * @property {*} value - Parsed/normalized value if validation passed
 */

/**
 * Validates and normalizes pet weight input
 * @param {*} input - Input to validate (any type)
 * @returns {ValidationResult} Validation result with parsed weight
 */
export const validateWeight = (input) => {
    if (input === null || input === undefined || input === '') {
        return {
            isValid: false,
            error: ERROR_MESSAGES.INVALID_WEIGHT,
            value: null
        };
    }

    const weight = parseFloat(input);

    if (isNaN(weight)) {
        return {
            isValid: false,
            error: ERROR_MESSAGES.INVALID_WEIGHT,
            value: null
        };
    }

    if (weight < PET_CONSTRAINTS.MIN_WEIGHT || weight > PET_CONSTRAINTS.MAX_WEIGHT) {
        return {
            isValid: false,
            error: ERROR_MESSAGES.INVALID_WEIGHT,
            value: null
        };
    }

    return {
        isValid: true,
        error: null,
        value: weight
    };
};

/**
 * Validates and normalizes pet age input
 * @param {*} input - Input to validate (any type)
 * @returns {ValidationResult} Validation result with parsed age
 */
export const validateAge = (input) => {
    if (input === null || input === undefined || input === '') {
        return {
            isValid: false,
            error: ERROR_MESSAGES.INVALID_AGE,
            value: null
        };
    }

    const age = parseFloat(input);

    if (isNaN(age)) {
        return {
            isValid: false,
            error: ERROR_MESSAGES.INVALID_AGE,
            value: null
        };
    }

    if (age < PET_CONSTRAINTS.MIN_AGE || age > PET_CONSTRAINTS.MAX_AGE) {
        return {
            isValid: false,
            error: ERROR_MESSAGES.INVALID_AGE,
            value: null
        };
    }

    return {
        isValid: true,
        error: null,
        value: age
    };
};

/**
 * Validates pet key/identifier
 * @param {string} petKey - Pet key to validate
 * @param {Object} petAbilities - Pet abilities object to check against
 * @returns {ValidationResult} Validation result
 */
export const validatePetKey = (petKey, petAbilities) => {
    if (!petKey || typeof petKey !== 'string' || petKey.trim().length === 0) {
        return {
            isValid: false,
            error: ERROR_MESSAGES.PET_NOT_FOUND,
            value: null
        };
    }

    const trimmedKey = petKey.trim();

    // First try exact case match
    if (petAbilities && petAbilities[trimmedKey]) {
        return {
            isValid: true,
            error: null,
            value: trimmedKey
        };
    }

    // If exact match fails, try case-insensitive lookup
    const normalizedKey = trimmedKey.toLowerCase();
    const actualKey = Object.keys(petAbilities || {}).find(key => key.toLowerCase() === normalizedKey);

    if (!actualKey) {
        return {
            isValid: false,
            error: ERROR_MESSAGES.PET_NOT_FOUND,
            value: null
        };
    }

    return {
        isValid: true,
        error: null,
        value: actualKey
    };
};

/**
 * Validates modifier type
 * @param {string} modifierType - Modifier type to validate
 * @returns {ValidationResult} Validation result
 */
export const validateModifierType = (modifierType) => {
    const validModifiers = [
        'none', 'spectral', 'golden', 'rainbow', 'nightmare', 'shocked', 'frozen', 'windy',
        'ironskin', 'radiant', 'ascended', 'tranquil', 'corrupted', 'glimmering', 
        'luminous', 'nutty'
    ];

    if (!modifierType) {
        return {
            isValid: true,
            error: null,
            value: 'none'
        };
    }

    const normalizedModifier = modifierType.toLowerCase().trim();

    if (!validModifiers.includes(normalizedModifier)) {
        return {
            isValid: false,
            error: `Invalid modifier type. Must be one of: ${validModifiers.join(', ')}`,
            value: null
        };
    }

    return {
        isValid: true,
        error: null,
        value: normalizedModifier
    };
};

/**
 * Validates multiple inputs and returns combined result
 * @param {Object} inputs - Object containing input values to validate
 * @param {*} inputs.weight - Weight input
 * @param {*} inputs.age - Age input (optional)
 * @param {string} inputs.petKey - Pet key input
 * @param {string} inputs.modifierType - Modifier type input (optional)
 * @param {Object} petAbilities - Pet abilities object for validation
 * @returns {ValidationResult} Combined validation result
 */
export const validatePetCalculationInputs = (inputs, petAbilities) => {
    const { weight, age, petKey, modifierType } = inputs;
    const errors = [];
    const values = {};

    // Validate weight (required)
    const weightValidation = validateWeight(weight);
    if (!weightValidation.isValid) {
        errors.push(weightValidation.error);
    } else {
        values.weight = weightValidation.value;
    }

    // Validate age (optional)
    if (age !== undefined && age !== null && age !== '') {
        const ageValidation = validateAge(age);
        if (!ageValidation.isValid) {
            errors.push(ageValidation.error);
        } else {
            values.age = ageValidation.value;
        }
    }

    // Validate pet key (required)
    const petKeyValidation = validatePetKey(petKey, petAbilities);
    if (!petKeyValidation.isValid) {
        errors.push(petKeyValidation.error);
    } else {
        values.petKey = petKeyValidation.value;
    }

    // Validate modifier type (optional)
    const modifierValidation = validateModifierType(modifierType);
    if (!modifierValidation.isValid) {
        errors.push(modifierValidation.error);
    } else {
        values.modifierType = modifierValidation.value;
    }

    return {
        isValid: errors.length === 0,
        error: errors.length > 0 ? errors.join('; ') : null,
        value: errors.length === 0 ? values : null
    };
};
