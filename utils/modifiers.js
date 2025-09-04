// Utility functions for pet modifier calculations
import { MODIFIER_CONFIG } from '../config/constants.js';

/**
 * Get modifier details for pet calculations
 * @param {string} modifierType - Type of modifier (golden, rainbow, shocked, etc.)
 * @returns {Object} Object containing modifier value, display text, and CSS styling
 * @returns {number} returns.value - Numeric modifier value (0-1)
 * @returns {string} returns.text - Display text for the modifier
 * @returns {string} returns.style - CSS styling for the modifier display
 */
export const getModifierDetails = (modifierType) => {
    switch (modifierType) {
    case 'golden':
        return {
            value: MODIFIER_CONFIG.GOLDEN_MULTIPLIER,
            text: '[+Golden]',
            style: 'color: gold;'
        };
    case 'rainbow':
        return {
            value: MODIFIER_CONFIG.RAINBOW_MULTIPLIER,
            text: '[+Rainbow]',
            style: 'background: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
        };
    case 'shocked':
        return { value: 0, text: '[+Shocked]', style: 'color: rgb(255, 255, 100);' };
    case 'frozen':
        return { value: 0, text: '[+Frozen]', style: 'color: rgb(108, 184, 255);' };
    case 'windy':
        return { value: 0, text: '[+Windy]', style: 'color: rgb(162, 185, 209);' };
    case 'ironskin':
        return { value: 0, text: '[+IronSkin]', style: 'color: rgb(206, 206, 206);' };
    case 'radiant':
        return { value: 0, text: '[+Radiant]', style: 'color: rgb(248, 108, 38);' };
    case 'ascended':
        return { value: 0, text: '[+Ascended]', style: 'color: rgb(247, 245, 184);' };
    case 'tranquil':
        return { value: 0, text: '[+Tranquil]', style: 'color: rgb(247, 245, 184);' };
    case 'corrupted':
        return { value: 0, text: '[+Corrupted]', style: 'color: rgb(247, 184, 184);' };
    default:
        return { value: 0, text: '', style: '' };
    }
};

/**
 * Get pet mutation description with lazy loading to avoid circular dependencies
 * @param {string} modifierType - Type of mutation modifier
 * @param {number} kg - Pet weight for calculation (default: 50)
 * @returns {Promise<string>} HTML-formatted description of the mutation effect
 */
export const getPetMutationDescription = async (modifierType, kg = 50) => {
    if (!modifierType || modifierType === 'none') {
        return '';
    }

    try {
        const { petMutationOptions } = await import('../data/mutations.js');

        const mutationMap = {
            'shocked': 'Shocked Pet Mutation',
            'frozen': 'Frozen Pet Mutation',
            'windy': 'Windy Pet Mutation',
            'ironskin': 'IronSkin Pet Mutation',
            'radiant': 'Radiant Pet Mutation',
            'ascended': 'Ascended Pet Mutation',
            'tranquil': 'Tranquil Pet Mutation',
            'corrupted': 'Corrupted Pet Mutation',
            'glimmering': 'Glimmering Pet Mutation'
        };

        const mutationKey = mutationMap[modifierType];
        if (!mutationKey || !petMutationOptions[mutationKey]) {
            return '';
        }

        if (typeof petMutationOptions[mutationKey].calculate === 'function') {
            return petMutationOptions[mutationKey].calculate(kg, 'none');
        }

        return '';
    } catch (error) {
        console.warn(`Failed to load mutation description for ${modifierType}:`, error);
        return '';
    }
};
