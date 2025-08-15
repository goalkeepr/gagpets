// Small mammals pets
import { getModifierDetails } from '../utils/modifiers.js';
import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import Utils from '../utils/calculations.js';

export const SMALL_MAMMALS_PETS = {
    hamster: {
        name: "Hamster",
        icon: ICONS.HAMSTER,
        type: TYPES.MAMMAL,
        rarity: RARITIES.COMMON,
        description: "Stores seeds in cheeks for emergency food supply",
        source: "Event",
        probability: 0,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 90;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(8, adjustedBaseSeconds - (2 * kg));
            const storage = 3 + (kg * 0.1);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, stores <strong>${storage.toFixed(1)}</strong> emergency food supplies${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases storage time by 2 seconds and increases storage capacity by 0.1"
    },

    squirrel: {
        name: "Squirrel",
        icon: ICONS.SQUIRREL,
        type: TYPES.MAMMAL,
        rarity: RARITIES.COMMON,
        source: "Mythical Egg",
        probability: 26.79,
        obtainable: true,
        description: "Gathers nuts for resource bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(6, adjustedBaseSeconds - (1.5 * kg));
            const gatherAmount = 2 + (kg * 0.08);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, gathers nuts! Collects <strong>${gatherAmount.toFixed(2)}</strong> extra resources${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases gather time by 1.5 seconds and increases gather amount by 0.08"
    }
};
