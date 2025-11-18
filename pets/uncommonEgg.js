import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const UNCOMMON_EGG_PETS = {
    cat: {
        name: "Cat",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/89/Catpet.png",
            fallback: "🐱"
        },
        type: "mammal",
        rarity: "Uncommon",
        description: "Naps to provide size bonuses to nearby fruits",
        source: "Uncommon Egg",
        probability: 25,
        obtainable: false,
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Nap Interval Min: 75.00 (59.00 🌈), Nap Duration Max: 100.00 (100.00 🌈), Range Max: 100.00 (100.00 🌈)";
            
            const baseSeconds = 80;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const napInterval = Math.max(5, adjustedBaseSeconds - kg);
            const napDuration = Math.min(20, 10 + (kg / 10));
            const range = Math.min(20, 10 + (kg / 10));
            const sizeMultiplier = Math.min(4, 1.25 + (0.0025 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(napInterval)}</strong>, naps for <strong>${Utils.formatTime(napDuration)}</strong>. New fruit within <strong>${range.toFixed(1)}</strong> studs will be <strong>${sizeMultiplier.toFixed(4)}x</strong> larger!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases nap interval by 1 second (min 5s), increases nap duration by 0.1 seconds (max 20s), increases range by 0.1 studs (max 20 studs), and increases size multiplier by 0.0025x (max 4x)"
    },
    deer: {
        name: "Deer",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/27/Deer.png",
            fallback: "🦌"
        },
        type: "mammal",
        rarity: "Uncommon",
        description: "Preserves berry fruits after harvest",
        source: "Uncommon Egg",
        probability: 25,
        obtainable: false,
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Max Preservation Chance: 30.00 (28.00 🌈)";
            
            const baseChance = 1;
            const chanceMod = baseChance * modifier;
            const adjustedBaseChance = baseChance + chanceMod;
            const preserveChance = Math.min(4, adjustedBaseChance + (kg / 10));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${preserveChance.toFixed(1)}%</strong> chance Berry type fruit stays after harvest!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases berry preservation chance by 0.1% (max 4%)"
    },
    blackbunny: {
        name: "Black Bunny",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/e/ec/Black_bunny_icon.png",
            fallback: "🐰"
        },
        type: "herbivore",
        rarity: "Uncommon",
        description: "Eats carrots for value bonuses",
        source: "Uncommon Egg",
        probability: 25,
        obtainable: false,
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Min Feeding Time: 40.00 (31.00 🌈)";
            
            const baseSeconds = 45;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(5, adjustedBaseSeconds - kg);
            const bonus = 1.5 + (0.015 * kg);
            
            const bonusMod = 1.5 * modifier;
            const bonusTotal = bonus + bonusMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, eats a carrot for a <strong>${bonusTotal.toFixed(3)}x</strong> value bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases feeding time by 1 second (min 5s) and increases value bonus by 0.015x"
    },
    chicken: {
        name: "Chicken",
        icon: ICONS.CHICKEN,
        type: "domestic",
        rarity: "Common",
        source: "Uncommon Egg",
        probability: 25,
        obtainable: false,
        description: "Increases egg hatch speed",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            const hatchSpeed = 10 + (kg / 10);
            
            const hatchSpeedMod = 10 * modifier;
            const hatchSpeedTotal = Math.min(35, hatchSpeed + hatchSpeedMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Increases egg hatch speed by <strong>${hatchSpeedTotal.toFixed(1)}%</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases egg hatch speed by 0.1% (max 35%)"
    }
};
