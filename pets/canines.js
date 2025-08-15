import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const CANINES_PETS = {
    fennecfox: {
        name: "Fennec Fox",
        icon: ICONS.FENNECFOX,
        type: TYPES.MAMMAL,
        rarity: RARITIES.RARE,
        description: "Desert fox with excellent hearing that detects hidden opportunities",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 240;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(20, adjustedBaseSeconds - (3 * kg));
            const detectChance = 12 + (kg * 0.18);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, uses keen hearing! <strong>${detectChance.toFixed(2)}%</strong> chance to detect hidden opportunities${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases detection time by 3 seconds and increases detection chance by 0.18%"
    },

    shibainu: {
        name: "Shiba Inu",
        icon: ICONS.SHIBAINU,
        type: TYPES.MAMMAL,
        rarity: RARITIES.UNCOMMON,
        description: "Independent spirit that provides steady resource generation",
        source: "Zen Egg",
        probability: 40,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 120;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(12, adjustedBaseSeconds - (1.8 * kg));
            const resourceGen = 4 + (kg * 0.1);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, shows independent spirit! Generates <strong>${resourceGen.toFixed(1)}</strong> steady resources${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases generation time by 1.8 seconds and increases resource generation by 0.1"
    }
};
