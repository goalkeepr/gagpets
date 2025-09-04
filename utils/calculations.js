// Common calculation utilities for pets
import { getModifierDetails } from './modifiers.js';
import { PET_CONSTRAINTS, TIME_CONSTANTS } from '../config/constants.js';

/**
 * Utility functions for pet calculations
 */
const Utils = {
    /**
     * Validates if a weight value is within acceptable range
     * @param {number} kg - Weight in kilograms
     * @returns {boolean} True if weight is valid
     */
    isValidWeight: (kg) => {
        return typeof kg === 'number' &&
               kg >= PET_CONSTRAINTS.MIN_WEIGHT &&
               kg <= PET_CONSTRAINTS.MAX_WEIGHT;
    },

    /**
     * Validates if an age value is within acceptable range
     * @param {number} age - Age in years
     * @returns {boolean} True if age is valid
     */
    isValidAge: (age) => {
        return typeof age === 'number' &&
               age >= PET_CONSTRAINTS.MIN_AGE &&
               age <= PET_CONSTRAINTS.MAX_AGE;
    },

    /**
     * Formats seconds into human-readable time format
     * @param {number} seconds - Time in seconds
     * @returns {string} Formatted time string
     */
    formatTime: (seconds) => {
        if (seconds < TIME_CONSTANTS.SECONDS_PER_MINUTE) {
            return `${Math.round(seconds)}s`;
        } else if (seconds < TIME_CONSTANTS.SECONDS_PER_HOUR) {
            const minutes = Math.floor(seconds / TIME_CONSTANTS.SECONDS_PER_MINUTE);
            const remainingSeconds = Math.round(seconds % TIME_CONSTANTS.SECONDS_PER_MINUTE);
            return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
        } else {
            const hours = Math.floor(seconds / TIME_CONSTANTS.SECONDS_PER_HOUR);
            const remainingMinutes = Math.floor((seconds % TIME_CONSTANTS.SECONDS_PER_HOUR) / TIME_CONSTANTS.SECONDS_PER_MINUTE);
            return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
        }
    },

    /**
     * Formats numbers with proper locale formatting
     * @param {number} num - Number to format
     * @returns {string} Formatted number string
     */
    formatNumber: (num) => {
        return num.toLocaleString();
    }
};

/**
 * Apply time-based modifier calculations
 * @param {number} baseSeconds - Base time in seconds
 * @param {number} kg - Pet weight in kilograms
 * @param {number} secondsPerKg - Seconds reduced per kg
 * @param {number} modifier - Modifier multiplier (0-1)
 * @param {number} minSeconds - Minimum allowed time
 * @returns {number} Calculated time with modifier applied
 */
export const applyTimeModifier = (baseSeconds, kg, secondsPerKg, modifier, minSeconds = 1) => {
    const secondsMod = baseSeconds * modifier;
    const adjustedBase = baseSeconds - secondsMod;
    return Math.max(minSeconds, adjustedBase - (secondsPerKg * kg));
};

/**
 * Apply value-based modifier calculations
 * @param {number} baseValue - Base value
 * @param {number} kg - Pet weight in kilograms
 * @param {number} valuePerKg - Value increase per kg
 * @param {number} modifier - Modifier multiplier (0-1)
 * @returns {number} Calculated value with modifier applied
 */
export const applyValueModifier = (baseValue, kg, valuePerKg, modifier) => {
    const value = baseValue + (valuePerKg * kg);
    const modValue = baseValue * modifier;
    return value + modValue;
};

/**
 * Format modifier display text with styling
 * @param {number} modifier - Modifier value
 * @param {string} modifierText - Display text for modifier
 * @param {string} modifierStyle - CSS styling for modifier
 * @returns {string} Formatted HTML string for display
 */
export const formatModifierDisplay = (modifier, modifierText, modifierStyle) => {
    return modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';
};

/**
 * Standard feeding pet calculation factory
 * Creates a calculation function for pets that feed items to plants
 * @param {Object} config - Configuration object for the feeding pet
 * @param {number} config.baseSeconds - Base feeding time in seconds
 * @param {number} config.secondsPerKg - Time reduction per kg
 * @param {number} config.baseBonus - Base bonus value
 * @param {number} config.bonusPerKg - Bonus increase per kg
 * @param {number} config.minSeconds - Minimum feeding time
 * @param {function} config.formatResult - Function to format the result string
 * @returns {function} Calculation function that takes (kg, modifierType)
 */
export const createFeedingCalculation = (config) => {
    return (kg, modifierType = 'none') => {
        if (!Utils.isValidWeight(kg)) {
            return 'Invalid weight';
        }

        const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

        const seconds = applyTimeModifier(
            config.baseSeconds,
            kg,
            config.secondsPerKg || 1,
            modifier,
            config.minSeconds || 1
        );

        const bonus = applyValueModifier(
            config.baseBonus,
            kg,
            config.bonusPerKg || 0,
            modifier
        );

        const displayText = formatModifierDisplay(modifier, modifierText, modifierStyle);

        return config.formatResult(seconds, bonus, displayText);
    };
};

/**
 * Experience gain pet calculation factory
 * Creates a calculation function for pets that provide experience bonuses
 * @param {Object} config - Configuration object for the experience pet
 * @param {number} config.baseExperience - Base experience value
 * @param {number} config.experiencePerKg - Experience increase per kg
 * @param {function} config.formatResult - Function to format the result string
 * @returns {function} Calculation function that takes (kg, modifierType)
 */
export const createExperienceCalculation = (config) => {
    return (kg, modifierType = 'none') => {
        if (!Utils.isValidWeight(kg)) {
            return 'Invalid weight';
        }

        const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

        const experience = applyValueModifier(
            config.baseExperience,
            kg,
            config.experiencePerKg || 0,
            modifier
        );

        const displayText = formatModifierDisplay(modifier, modifierText, modifierStyle);

        return config.formatResult(experience, displayText);
    };
};

// Export Utils as default
export default Utils;
