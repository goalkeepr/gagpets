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
        description: "Lays eggs that provide regular food supply",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 300;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(30, adjustedBaseSeconds - (4 * kg));
            const eggValue = 8 + (kg * 0.15);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, lays an egg! Provides <strong>${eggValue.toFixed(2)}</strong> food supply${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases laying time by 4 seconds and increases egg value by 0.15"
    },

    cow: {
        name: "Cow",
        icon: ICONS.COW,
        type: TYPES.DOMESTIC,
        rarity: RARITIES.UNCOMMON,
        description: "Produces milk for sustained nutrition bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 600;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(60, adjustedBaseSeconds - (5 * kg));
            const milkValue = 25 + (kg * 0.4);
            const duration = 180 + (kg * 2);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, produces milk! <strong>${milkValue.toFixed(1)}</strong> nutrition for <strong>${Utils.formatTime(duration)}</strong>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases production time by 5 seconds, increases milk value by 0.4, and extends duration by 2 seconds"
    },

    pig: {
        name: "Pig",
        icon: ICONS.PIG,
        type: TYPES.DOMESTIC,
        rarity: RARITIES.COMMON,
        description: "Snorts around finding truffles and valuable items",
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
