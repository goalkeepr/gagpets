import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const AQUATIC_PETS = {
    starfish: {
        name: "Starfish",
        icon: ICONS.STARFISH,
        type: TYPES.AQUATIC,
        rarity: RARITIES.COMMON,
        description: "Regenerates and finds treasures buried in sand",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(5, adjustedBaseSeconds - (kg / 2));
            const regeneration = 5 + (kg / 10);
            const findChance = 2 + (kg / 25);
            
            const regenerationMod = 5 * modifier;
            const findChanceMod = 2 * modifier;
            const regenerationTotal = regeneration + regenerationMod;
            const findChanceTotal = findChance + findChanceMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, regenerates <strong>${regenerationTotal.toFixed(1)}</strong> health and has <strong>${findChanceTotal.toFixed(2)}%</strong> chance to find buried treasure${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases regeneration time by 0.5 seconds, increases regeneration by 0.1 health, and increases find chance by 0.04%"
    },

    crab: {
        name: "Crab",
        icon: ICONS.CRAB,
        type: TYPES.AQUATIC,
        rarity: RARITIES.COMMON,
        description: "Scuttles around finding hidden treasures",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 120;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(10, adjustedBaseSeconds - (8 * kg));
            const findChance = 1.25 + (kg * 0.05);
            
            const findChanceMod = 1.25 * modifier;
            const findChanceTotal = findChance + findChanceMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, scuttles around with <strong>${findChanceTotal.toFixed(2)}%</strong> chance to find hidden treasure${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases scuttle time by 8 seconds and increases find chance by 0.05%"
    }
};
