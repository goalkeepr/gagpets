import { ICONS } from '../data/icons.js';
import { TYPES, RARITIES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const GOURMET_EGG_PETS = {
    bagelbunny: {
        name: "Bagel Bunny",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/5/51/BagelBunny.png",
            fallback: "🥯"
        },
        type: "herbivore",
        rarity: "Legendary",
        source: "Gourmet Egg",
        probability: 50,
        obtainable: true,
        description: "Eats carrots for enhanced value bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 40.00 (31.00 🌈)";
            
            const baseCooldown = 45;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(5, adjustedBaseCooldown - kg);
            const multiplier = 5 + (0.05 * kg);
            
            const multiplierMod = 5 * modifier;
            const multiplierTotal = multiplier + multiplierMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, eats a carrot for <strong>${multiplierTotal.toFixed(2)}x</strong> value bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 1 second and increases value bonus by 0.05x"
    },

    pancakemole: {
        name: "Pancake Mole",
        icon: ICONS.PANCAKEMOLE,
        type: TYPES.SPECIALTY,
        rarity: RARITIES.UNCOMMON,
        source: "Gourmet Egg",
        probability: 38,
        obtainable: true,
        description: "Digs underground to find treasure including gear and sheckles",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 70.00 (54.00 🌈)";
            
            const baseSeconds = 80;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(10, adjustedBaseSeconds - kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, digs down underground to find treasure. Can dig up gear or sheckles${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases digging cooldown by 1 second"
    },

    sushibear: {
        name: "Sushi Bear",
        icon: ICONS.SUSHIBEAR,
        type: TYPES.SPECIALTY,
        rarity: RARITIES.RARE,
        source: "Gourmet Egg",
        probability: 7,
        obtainable: true,
        description: "Dual ability: Chills/freezes nearby fruits and feeds sushi to other pets",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Chill Cooldown Min: 70.00 (54.00 🌈), Sushi Cooldown Min: no limit (no limit 🌈), Hunger Fed Max: no limit (no limit 🌈)";
            
            // First ability - Chilling/Freezing
            const baseCooldown1 = 80;
            const baseChance1 = 15;
            const cooldown1 = Math.max(10, baseCooldown1 - kg);
            const chance1 = baseChance1 + (0.15 * kg);
            
            // Second ability - Sushi Feeding
            const baseCooldown2 = 670;
            const baseAmount2 = 0.01;
            const cooldown2 = Math.max(60, baseCooldown2 - (3.5 * kg));
            const amount2 = Math.min(0.5, baseAmount2 + (0.001 * kg));
            
            // Apply modifiers
            const cooldown1Mod = baseCooldown1 * modifier;
            const chance1Mod = baseChance1 * modifier;
            const cooldown2Mod = baseCooldown2 * modifier;
            const amount2Mod = baseAmount2 * modifier;
            
            const adjustedBaseCooldown1 = baseCooldown1 - cooldown1Mod;
            const adjustedBaseCooldown2 = baseCooldown2 - cooldown2Mod;
            const cooldown1Total = Math.max(10, adjustedBaseCooldown1 - kg);
            const cooldown2Total = Math.max(60, adjustedBaseCooldown2 - (3.5 * kg));
            const chance1Total = chance1 + chance1Mod;
            const amount2Total = Math.min(0.5, amount2 + amount2Mod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>Dual Ability:</strong><br>Every <strong>${Utils.formatTime(cooldown1Total)}</strong>, <strong>${chance1Total.toFixed(1)}%</strong> chance a nearby fruit becomes Chilled or Frozen!<br>Every <strong>${Utils.formatTime(cooldown2Total)}</strong>, flings sushi towards a random pet and feeds it for <strong>${(amount2Total * 100).toFixed(1)}%</strong> of its hunger${displayText}!`;
        },
        perKgImpact: () => "Each additional kg: Ability 1 - decreases cooldown by 1s (min 10s), increases freeze chance by 0.15%. Ability 2 - decreases cooldown by 3.5s (min 60s), increases hunger fed by 0.1% (max 50%)"
    },

    spaghettisloth: {
        name: "Spaghetti Sloth",
        icon: ICONS.SPAGHETTISLOTH,
        type: TYPES.SPECIALTY,
        rarity: RARITIES.MYTHICAL,
        source: "Gourmet Egg",
        probability: 4,
        obtainable: true,
        description: "Slowly cooks nearby fruits, applying pasta-themed mutations",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 86.00 (63.47 🌈)";
            
            const baseSeconds = 845;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(200, adjustedBaseSeconds - (7.5 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to a nearby fruit and does-a-cooking! Applying Pasta, Sauce or Meatball mutation${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooking cooldown by 7.5 seconds"
    },

    frenchfryferret: {
        name: "French Fry Ferret",
        icon: ICONS.FRENCHFRYFERRET,
        type: TYPES.SPECIALTY,
        rarity: RARITIES.DIVINE,
        source: "Gourmet Egg",
        probability: 1,
        obtainable: true,
        description: "Increases pet levels",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 67.56 (47.38 🌈)";
            
            const baseSeconds = 3632;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1200, adjustedBaseSeconds - (36 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, increases a random pet's level by 1! Ability cannot be mimicked or refreshed${displayText}.`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 36 seconds"
    }
};
