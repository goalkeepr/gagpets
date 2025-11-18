import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const MYTHICAL_EGG_PETS = {
    redgiantant: {
        name: "Red Giant Ant",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/c/c8/RedGiantAntImage.png",
            fallback: "🐜"
        },
        type: "insect",
        rarity: "Mythical",
        source: "Mythical Egg",
        probability: 8.5,
        obtainable: true,
        description: "Dual ability: Duplicates harvested fruits with bonus for Fruit types",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // First ability - General fruit duplication
            const baseChance1 = 5;
            const chance1Mod = baseChance1 * modifier;
            const chance1Total = Math.min(30, (baseChance1 + chance1Mod) + (0.1 * kg));
            
            // Second ability - Fruit type bonus
            const baseChance2 = 5;
            const chance2Mod = baseChance2 * modifier;
            const chance2Total = Math.min(25, (baseChance2 + chance2Mod) + (0.1 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>Dual Ability:</strong><br><strong>${chance1Total.toFixed(1)}%</strong> chance harvested fruit duplicate! Rarer crops have lower chance to duplicate.<br><strong>${chance2Total.toFixed(1)}%</strong> extra chance for Fruit type crops to duplicate${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases duplicate chance by 0.1% (max 30%) and Fruit type bonus by 0.1% (max 25%)"
    },
    brownmouse: {
        name: "Brown Mouse",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/86/BrownMouse.png",
            fallback: "🐭"
        },
        type: "mammal",
        rarity: "Mythical",
        source: "Mythical Egg",
        probability: 27,
        obtainable: true,
        description: "Provides experience and jump height bonuses",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 82.68 (65.65 🌈)";
            
            const baseSeconds = 502;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (5.89 * kg));
            const exp = 750 + (11 * kg);
            const jump = 12 + (kg / 10);
            
            const expMod = 750 * modifier;
            const jumpMod = 12 * modifier;
            const expTotal = exp + expMod;
            const jumpTotal = jump + jumpMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, gains additional <strong>${Utils.formatNumber(Math.round(expTotal))}</strong> bonus experience${displayText}!\n\nGrants additional <strong>${jumpTotal.toFixed(1)}%</strong> increase to player jump height!`;
        },
        perKgImpact: () => "Each additional kg decreases experience time by 5.89 seconds (min 15 seconds), increases experience by 11, and increases jump height by 0.1%"
    },
    redfox: {
        name: "Red Fox",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/d/d5/RedFox.png",
            fallback: "🦊"
        },
        type: "mammal",
        rarity: "Divine",
        source: "Mythical Egg",
        probability: 1.5,
        obtainable: true,
        description: "Steals seeds from other players' crops",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 85.47 (67.77 🌈)";
            
            const baseSeconds = 442.33;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const finalSeconds = Math.max(15, adjustedBaseSeconds - (5 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(finalSeconds)}</strong>, goes to another player's random crop and tries to get a seed from it.\nRarer seeds have lower chance to succeed${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases stealing time by 5 seconds (min 15 seconds)"
    },
    greymouse: {
        name: "Grey Mouse",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/88/GreyMouse.png",
            fallback: "🐭"
        },
        type: "mammal",
        rarity: "Mythical",
        source: "Mythical Egg",
        probability: 36,
        obtainable: true,
        description: "Provides experience and movement speed bonuses",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 71.88 (57.14 🌈)";
            
            const baseSeconds = 603;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (8.18 * kg));
            const exp = 500 + (8 * kg);
            const speed = 12 + (kg / 10);
            
            const expMod = 500 * modifier;
            const speedMod = 12 * modifier;
            const expTotal = exp + expMod;
            const speedTotal = speed + speedMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, gains additional <strong>${Utils.formatNumber(Math.round(expTotal))}</strong> bonus experience${displayText}!\n\nGrants additional <strong>${speedTotal.toFixed(1)}%</strong> increase to player movement speed!`;
        },
        perKgImpact: () => "Each additional kg decreases experience time by 8.18 seconds (min 15 seconds), increases experience by 8, and increases movement speed by 0.1%"
    },
    squirrel: {
        name: "Squirrel",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/93/Squirrel_Icon.png",
            fallback: "🐿️"
        },
        type: "mammal",
        rarity: "Common",
        source: "Mythical Egg",
        probability: 27,
        obtainable: true,
        description: "Chance to not consume a use when using the Reclaimer",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Chance Max: 66.67 (60.00 🌈)";
            
            const baseChance = 10;
            const chanceMod = baseChance * modifier;
            const chanceTotal = Math.min(30, (baseChance + chanceMod) + (0.3 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${chanceTotal.toFixed(1)}%</strong> chance to not consume a use when using the Reclaimer${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases Reclaimer conservation chance by 0.3% (max 30%)"
    }
};
