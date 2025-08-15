import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const AMPHIBIAN_PETS = {
    echofrog: {
        name: "Echo Frog",
        icon: ICONS.ECHOFROG,
        type: TYPES.AMPHIBIAN,
        rarity: RARITIES.MYTHICAL,
        description: "Croaks to advance plant growth by 24 hours",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 303;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (6 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, croaks and a random nearby plant will advance growth by <strong>24 hours</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases croaking time by 6 seconds"
    },

    frog: {
        name: "Frog",
        icon: ICONS.FROG,
        type: TYPES.AMPHIBIAN,
        rarity: RARITIES.LEGENDARY,
        description: "Croaks to advance plant growth by 24 hours",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 604.5;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (9 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, croaks and a random nearby plant will advance growth by <strong>24 hours</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases croaking time by 9 seconds"
    }
};
