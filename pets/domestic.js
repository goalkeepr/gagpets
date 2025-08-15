import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const DOMESTIC_PETS = {
    chicken: {
        name: "Chicken",
        icon: ICONS.CHICKEN,
        type: TYPES.DOMESTIC,
        rarity: RARITIES.COMMON,
        source: "Uncommon Egg",
        probability: 25,
        obtainable: false,
        description: "Increases egg hatch speed",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const hatchSpeed = 10 + (kg / 10);
            
            const hatchSpeedMod = 10 * modifier;
            const hatchSpeedTotal = hatchSpeed + hatchSpeedMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Increases egg hatch speed by <strong>${hatchSpeedTotal.toFixed(1)}%</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases egg hatch speed by 0.1%"
    },

    pig: {
        name: "Pig",
        icon: ICONS.PIG,
        type: TYPES.DOMESTIC,
        rarity: RARITIES.COMMON,
        description: "Snorts around finding truffles and valuable items",
        source: "Rare Egg",
        probability: 16.67,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 200;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(20, adjustedBaseSeconds - (2.5 * kg));
            const findChance = 6 + (kg * 0.1);
            const truffleValue = 12 + (kg * 0.2);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, snorts for truffles! <strong>${findChance.toFixed(2)}%</strong> chance to find <strong>${truffleValue.toFixed(1)}</strong> value items${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases snort time by 2.5 seconds, increases find chance by 0.1%, and increases truffle value by 0.2"
    }
};
