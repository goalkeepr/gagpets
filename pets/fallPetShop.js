import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const FALL_PET_SHOP_PETS = {
    chipmunk: {
        name: "Chipmunk",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/9e/Chipmunk.png",
            fallback: "🐿️"
        },
        type: "mammal",
        rarity: "Common",
        source: "Fall Pet Shop",
        probability: 0,
        obtainable: true,
        description: "Chance to not consume harvest tool uses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Harvest Tool Max: 24.00 (19.20 🌈)";
            
            const baseChance = 6;
            const chance = Math.min(12, baseChance + (0.25 * kg));
            
            // Apply modifiers
            const chanceMod = baseChance * modifier;
            const chanceTotal = Math.min(12, chance + chanceMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${chanceTotal.toFixed(2)}%</strong> chance to not consume a use when using a Harvest Tool${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases harvest tool preservation chance by 0.25% (max 12%)"
    },

    redsquirrel: {
        name: "Red Squirrel",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/6/61/RedSquirrel.png",
            fallback: "🐿️"
        },
        type: "mammal",
        rarity: "Rare",
        source: "Fall Pet Shop",
        probability: 0,
        obtainable: true,
        description: "Reduces cooldown for Fall type pets when they finish their abilities",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Reduction Max: 40.00 (33.00 🌈)";
            
            const baseChance = 14;
            const chance = Math.min(30, baseChance + (0.4 * kg));
            
            // Apply modifiers
            const chanceMod = baseChance * modifier;
            const chanceTotal = Math.min(30, chance + chanceMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `When Fall type pets finish their abilities, they start their cooldown with <strong>${chanceTotal.toFixed(1)}</strong> seconds less${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases cooldown reduction by 0.4 seconds (max 30s)"
    },

    marmot: {
        name: "Marmot",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/2b/Marmot.png",
            fallback: "🐹"
        },
        type: "mammal",
        rarity: "Legendary",
        source: "Fall Pet Shop",
        probability: 0,
        obtainable: true,
        description: "Burrows underground and hides in mounds for Fall rewards",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 120.00 (89.14 🌈), Chance Max: 300.00 (240.00 🌈)";
            
            const baseCooldown = 540;
            const baseChance = 15;
            const cooldown = Math.max(120, baseCooldown - (3.5 * kg));
            const chance = Math.min(30, baseChance + (0.05 * kg));
            
            // Apply modifiers
            const cooldownMod = baseCooldown * modifier;
            const chanceMod = baseChance * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldownTotal = Math.max(120, adjustedBaseCooldown - (3.5 * kg));
            const chanceTotal = Math.min(30, chance + chanceMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldownTotal)}</strong>, burrows down in the ground and hides in a random mound! Finding the Marmot will grant a Fall related reward! Has a <strong>${chanceTotal.toFixed(2)}%</strong> chance to burrow again${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases burrow cooldown by 3.5s (min 2:00) and increases re-burrow chance by 0.05% (max 30%)"
    },

    sugarglider: {
        name: "Sugar Glider",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/94/SugarGlider.png",
            fallback: "🐿️"
        },
        type: "mammal",
        rarity: "Mythical",
        source: "Fall Pet Shop",
        probability: 0,
        obtainable: true,
        description: "Glides between fruits to copy and transfer mutations",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Glide Min: 106.67 (53.33 🌈)";
            
            const baseCooldown = 1200;
            const cooldown = Math.max(720, baseCooldown - (4.5 * kg));
            
            // Apply modifiers
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldownTotal = Math.max(720, adjustedBaseCooldown - (4.5 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldownTotal)}</strong>, glides from 3 different mutated fruits. Copies 1 mutation from each fruit and applies it to the next. Ability cannot be mimicked${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases glide cooldown by 4.5s (min 12:00)"
    },

    spacesquirrel: {
        name: "Space Squirrel",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/89/SpaceSquirrel.png",
            fallback: "🐿️"
        },
        type: "mammal",
        rarity: "Divine",
        source: "Fall Pet Shop",
        probability: 0,
        obtainable: true,
        description: "Applies Voidtouched mutations from space",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 120.00 (72.00 🌈), Voidtouched Max: 33.33 (23.33 🌈)";
            
            const baseCooldown = 1080;
            const baseChance = 15;
            const cooldown = Math.max(540, baseCooldown - (4.5 * kg));
            const chance = Math.min(25, baseChance + (0.3 * kg));
            
            // Apply modifiers
            const cooldownMod = baseCooldown * modifier;
            const chanceMod = baseChance * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldownTotal = Math.max(540, adjustedBaseCooldown - (4.5 * kg));
            const chanceTotal = Math.min(25, chance + chanceMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldownTotal)}</strong>, has <strong>${chanceTotal.toFixed(1)}%</strong> chance to apply the Voidtouched mutation${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 4.5s (min 9:00) and increases Voidtouched chance by 0.3% (max 25%)"
    },

    salmon: {
        name: "Salmon",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/e/e0/Salmon.png",
            fallback: "🐟"
        },
        type: "aquatic",
        rarity: "Uncommon",
        source: "Fall Pet Shop",
        probability: 0,
        obtainable: true,
        description: "Gains additional XP for every other Salmon in garden",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "XP Bonus Max: 100.00 (80.00 🌈)";
            
            const baseChance = 4;
            const chance = Math.min(8, baseChance + (0.04 * kg));
            
            // Apply modifiers
            const chanceMod = baseChance * modifier;
            const chanceTotal = Math.min(8, chance + chanceMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `For every other Salmon in your garden gains an additional <strong>${chanceTotal.toFixed(2)} XP</strong> per second${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases XP bonus by 0.04 XP/s per Salmon (max 8 XP/s)"
    },

    woodpecker: {
        name: "Woodpecker",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/6/6c/Woodpecker.png",
            fallback: "🪶"
        },
        type: "bird",
        rarity: "Rare",
        source: "Fall Pet Shop",
        probability: 0,
        obtainable: true,
        description: "Pecks at Woody type plants to grant duplication chance",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 120.00 (72.00 🌈), Chance Max: 150.00 (120.00 🌈)";
            
            const baseCooldown = 120;
            const baseChance = 6;
            const baseDuration = 30;
            const cooldown = Math.max(60, baseCooldown - (0.5 * kg));
            const chance = Math.min(12, baseChance + (0.04 * kg));
            const duration = baseDuration + (0.5 * kg);
            
            // Apply modifiers
            const cooldownMod = baseCooldown * modifier;
            const chanceMod = baseChance * modifier;
            const durationMod = baseDuration * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldownTotal = Math.max(60, adjustedBaseCooldown - (0.5 * kg));
            const chanceTotal = Math.min(12, chance + chanceMod);
            const durationTotal = duration + durationMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldownTotal)}</strong>, goes to a Woody type plant and pecks at it for <strong>${Utils.formatTime(durationTotal)}</strong>, which grants <strong>${chanceTotal.toFixed(2)}%</strong> chance for Woody type fruit to duplicate! Rarer crops have lower chance to duplicate${displayText}.`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 0.5s (min 60s), increases duplication chance by 0.04% (max 12%), and increases duration by 0.5s"
    },

    mallard: {
        name: "Mallard",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/00/Mallard.png",
            fallback: "🦆"
        },
        type: "bird",
        rarity: "Legendary",
        source: "Fall Pet Shop",
        probability: 0,
        obtainable: true,
        description: "Flies south for winter rewards",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Reward Chance Max: 101.00 (81.20 🌈)";
            
            const baseChance = 14.85;
            const chance = Math.min(30, baseChance + (0.15 * kg));
            
            // Apply modifiers
            const chanceMod = baseChance * modifier;
            const chanceTotal = Math.min(30, chance + chanceMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Flies south for the winter every half hour in a day, leaving you with a random reward before returning to your inventory. <strong>${chanceTotal.toFixed(2)}%</strong> enhanced reward chance${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases reward chance by 0.15% (max 30%)"
    },

    redpanda: {
        name: "Red Panda",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/79/RedPandaIcon.png",
            fallback: "🐼"
        },
        type: "mammal",
        rarity: "Divine",
        source: "Fall Pet Shop",
        probability: 0,
        obtainable: true,
        description: "Restocks shop items",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 62.69 (41.19 🌈)";
            
            const baseCooldown = 720;
            const cooldown = Math.max(300, baseCooldown - (6.7 * kg));
            
            // Apply modifiers
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldownTotal = Math.max(300, adjustedBaseCooldown - (6.7 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldownTotal)}</strong>, goes to the Gear, Seed or Pet Shop and restocks 1 random stock. Rarer items have rarer chance to stock. Ability cannot be mimicked or refreshed${displayText}.`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 6.7s (min 5:00)"
    }
};