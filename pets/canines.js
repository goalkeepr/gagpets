import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const CANINES_PETS = {
    dog: {
        name: "Dog",
        icon: ICONS.DOG,
        type: TYPES.MAMMAL,
        rarity: RARITIES.COMMON,
        description: "Loyal companion that boosts morale and provides friendship bonus",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseMoraleBonus = 15;
            const moraleBonus = baseMoraleBonus + (kg * 0.25);
            const range = 10 + (kg * 0.2);
            
            const moraleBonusMod = baseMoraleBonus * modifier;
            const moraleBonusTotal = moraleBonus + moraleBonusMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Provides constant loyalty! All pets within <strong>${range.toFixed(1)}</strong> studs get <strong>${moraleBonusTotal.toFixed(1)}%</strong> morale boost${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases morale bonus by 0.25% and range by 0.2 studs"
    },

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
