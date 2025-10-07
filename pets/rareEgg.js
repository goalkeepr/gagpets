import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';
import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';

const rareEggPets = {
    orangetabby: {
        name: "Orange Tabby",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/73/Orange_tabby_icon.png",
            fallback: "🐱"
        },
        type: "mammal",
        rarity: "Rare",
        description: "Naps to provide size bonuses to nearby fruits",
        source: "Rare Egg",
        probability: 33.33,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 85.00 (67.00 🌈)";
            
            const baseNapInterval = 90;
            const napIntervalMod = baseNapInterval * modifier;
            const adjustedBaseNapInterval = baseNapInterval - napIntervalMod;
            const napInterval = Math.max(5, adjustedBaseNapInterval - kg);
            const napDuration = 15 + (0.15 * kg);
            const range = 15 + (0.15 * kg);
            const sizeMultiplier = 1.5 + (kg / 100);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(napInterval)}</strong>, naps for <strong>${Utils.formatTime(napDuration)}</strong>. New fruit within <strong>${range.toFixed(2)}</strong> studs will be <strong>${sizeMultiplier.toFixed(3)}x</strong> larger!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases nap interval by 1 second (min 5s), increases nap duration by 0.15 seconds, increases range by 0.15 studs, and increases size multiplier by 0.01x"
    },

    spotteddeer: {
        name: "Spotted Deer",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/3/38/Spotteddeer.png",
            fallback: "🦌"
        },
        type: "mammal",
        rarity: "Rare",
        description: "Preserves berry fruits after harvest",
        source: "Rare Egg",
        probability: 25,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Berry Preservation Max: 100.00 (100.00 🌈)";
            
            const preserveChance = Math.min(10, 5 + (kg / 20));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${preserveChance.toFixed(2)}%</strong> chance berry fruit stays after harvest!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases berry preservation chance by 0.05% (max 10%)"
    },

    pig: {
        name: "Pig",
        icon: ICONS.PIG,
        type: "domestic",
        rarity: "Common",
        description: "Emits aura that boosts variant chance for new fruits",
        source: "Rare Egg",
        probability: 16.67,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: No Limit (91.00 🌈)";
            
            const baseCooldown = 120;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(5, adjustedBaseCooldown - kg);
            
            const duration = 15 + (0.15 * kg);
            const range = 15 + (0.15 * kg);
            const multiplier = 2 + (0.01 * kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, emits an aura for <strong>${Utils.formatTime(duration)}</strong> granting <strong>${multiplier.toFixed(2)}x</strong> chance for new fruit to grow as variants within <strong>${range.toFixed(2)}</strong> studs${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 1 second (min 5s), increases duration by 0.15 seconds, increases range by 0.15 studs, and increases variant multiplier by 0.01x"
    },

    rooster: {
        name: "Rooster",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/2c/Rooster.png",
            fallback: "🐓"
        },
        type: "bird",
        rarity: "Rare",
        description: "Increases egg hatch speed",
        source: "Rare Egg",
        probability: 16.67,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const speed = 20 + (kg / 5);
            
            const speedMod = 20 * modifier;
            const speedTotal = speed + speedMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Increases egg hatch speed by <strong>${speedTotal.toFixed(2)}%</strong>${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases egg hatch speed by 0.2%"
    },
    monkey: {
        name: "Monkey",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/85/Monkey_Pet_V2.png",
            fallback: "🐒"
        },
        type: "mammal",
        rarity: "Rare",
        source: "Rare Egg",
        probability: 0,
        obtainable: false,
        description: "Refunds fruits back to inventory",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const refundChance = 2.5 + (kg / 40);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${refundChance.toFixed(2)}%</strong> chance to refund fruit back to your inventory. Rarer plants have lower chance to refund!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases fruit refund chance by 0.025%"
    }
};

export { rareEggPets as RARE_EGG_PETS };
