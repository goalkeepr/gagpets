import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const SEASON_PASS_PETS = {
    bluejay: {
        name: "Blue Jay",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/2d/BlueJay.png",
            fallback: "🐦"
        },
        type: "bird",
        rarity: "Uncommon",
        source: "Season Pass",
        probability: 0,
        obtainable: true,
        description: "Makes Berry type plants grow faster",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            const range = 30;
            const baseMultiplier = 1.5;
            const multiplierMod = baseMultiplier * modifier;
            const adjustedBaseMultiplier = baseMultiplier + multiplierMod;
            const multiplier = Math.min(4, adjustedBaseMultiplier + (0.05 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All Berry type plants within <strong>${range} studs</strong> grow <strong>${multiplier.toFixed(2)}x faster</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases growth multiplier by 0.05x (max 4x)"
    },
    silverdragonfly: {
        name: "Silver Dragonfly",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/28/SilverDragonfly.png",
            fallback: "🪲"
        },
        type: "insect",
        rarity: "Legendary",
        source: "Season Pass",
        probability: 0,
        obtainable: true,
        description: "Turns random fruits Silver",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 98.50 (74.30 🌈)";
            
            const baseSeconds = 484;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(90, adjustedBaseSeconds - (4 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, turns one random fruit Silver!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 4 seconds"
    },
    firefly: {
        name: "Firefly",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/c/cd/Again.png",
            fallback: "✨"
        },
        type: "insect",
        rarity: "Mythical",
        source: "Season Pass",
        probability: 0,
        obtainable: true,
        description: "Shocks nearby fruits",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 87.00 (65.20 🌈)";
            
            const baseSeconds = 545;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(110, adjustedBaseSeconds - (5 * kg));
            const baseChance = 10.25;
            const chanceMod = baseChance * modifier;
            const adjustedBaseChance = baseChance + chanceMod;
            const chance = Math.min(20, adjustedBaseChance + (0.1 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${chance.toFixed(2)}%</strong> chance a nearby fruit becomes Shocked!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 5 seconds and increases chance by 0.1% (max 20%)"
    },
    mizuchi: {
        name: "Mizuchi",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/1/1c/Mizuchi.png",
            fallback: "🐉"
        },
        type: "reptile",
        rarity: "Divine",
        source: "Season Pass",
        probability: 0,
        obtainable: true,
        description: "Transfers mutations when selling Azure fruits and applies Azure mutation to fruits",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: No Limit (93.14 🌈)";
            
            const baseTransferChance = 6;
            const transferChanceMod = baseTransferChance * modifier;
            const adjustedBaseTransferChance = baseTransferChance + transferChanceMod;
            const transferChance = Math.min(12, adjustedBaseTransferChance + (0.1 * kg));
            
            const baseSeconds = 545;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(110, adjustedBaseSeconds - (3.5 * kg));
            const baseAzureChance = 12;
            const azureChanceMod = baseAzureChance * modifier;
            const adjustedBaseAzureChance = baseAzureChance + azureChanceMod;
            const azureChance = Math.min(24, adjustedBaseAzureChance + (0.12 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `When selling fruits with Azure mutation: <strong>${transferChance.toFixed(2)}%</strong> chance a random mutation from that fruit will be applied to a fruit in your garden!\n\nEvery <strong>${Utils.formatTime(seconds)}</strong>, <strong>${azureChance.toFixed(2)}%</strong> chance a nearby fruit becomes Azure!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases transfer chance by 0.1% (max 12%), decreases Azure cooldown by 3.5 seconds, and increases Azure chance by 0.12% (max 24%)"
    },
    rainbowbluejay: {
        name: "Rainbow Blue Jay",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/2d/BlueJay.png",
            fallback: "🌈"
        },
        type: "bird",
        rarity: "Uncommon",
        source: "Season Pass",
        probability: 0,
        obtainable: true,
        description: "Makes Berry type plants grow faster with rainbow power",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            const range = 45;
            const baseMultiplier = 2.5;
            const multiplierMod = baseMultiplier * modifier;
            const adjustedBaseMultiplier = baseMultiplier + multiplierMod;
            const multiplier = Math.min(6, adjustedBaseMultiplier + (0.08 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All Berry type plants within <strong>${range} studs</strong> grow <strong>${multiplier.toFixed(2)}x faster</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases growth multiplier by 0.08x (max 6x)"
    },
    giantsilverdragonfly: {
        name: "GIANT Silver Dragonfly",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/28/SilverDragonfly.png",
            fallback: "🪲"
        },
        type: "insect",
        rarity: "Legendary",
        source: "Season Pass",
        probability: 0,
        obtainable: true,
        description: "Turns random fruits Silver faster than normal",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 99.50 (75.10 🌈)";
            
            const baseSeconds = 244;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(45, adjustedBaseSeconds - (2 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, turns one random fruit Silver!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 2 seconds"
    },
    giantfirefly: {
        name: "GIANT Firefly",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/c/cd/Again.png",
            fallback: "✨"
        },
        type: "insect",
        rarity: "Mythical",
        source: "Season Pass",
        probability: 0,
        obtainable: true,
        description: "Shocks nearby fruits with greater power",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 75.00 (52.50 🌈)";
            
            const baseSeconds = 225;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(75, adjustedBaseSeconds - (2 * kg));
            const baseChance = 20.25;
            const chanceMod = baseChance * modifier;
            const adjustedBaseChance = baseChance + chanceMod;
            const chance = Math.min(40, adjustedBaseChance + (0.1 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${chance.toFixed(2)}%</strong> chance a nearby fruit becomes Shocked!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 2 seconds and increases chance by 0.1% (max 40%)"
    },
    rainbowmizuchi: {
        name: "Rainbow Mizuchi",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/1/1c/Mizuchi.png",
            fallback: "🌈"
        },
        type: "reptile",
        rarity: "Divine",
        source: "Season Pass",
        probability: 0,
        obtainable: true,
        description: "Enhanced mutation transfer and Azure application with rainbow power",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 60.00 (42.00 🌈)";
            
            const baseTransferChance = 12;
            const transferChanceMod = baseTransferChance * modifier;
            const adjustedBaseTransferChance = baseTransferChance + transferChanceMod;
            const transferChance = Math.min(24, adjustedBaseTransferChance + (0.12 * kg));
            
            const baseSeconds = 225;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(75, adjustedBaseSeconds - (2.5 * kg));
            const baseAzureChance = 24;
            const azureChanceMod = baseAzureChance * modifier;
            const adjustedBaseAzureChance = baseAzureChance + azureChanceMod;
            const azureChance = Math.min(48, adjustedBaseAzureChance + (0.24 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `When selling fruits with Azure mutation: <strong>${transferChance.toFixed(2)}%</strong> chance a random mutation from that fruit will be applied to a fruit in your garden!\n\nEvery <strong>${Utils.formatTime(seconds)}</strong>, <strong>${azureChance.toFixed(2)}%</strong> chance a nearby fruit becomes Azure!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases transfer chance by 0.12% (max 24%), decreases Azure cooldown by 2.5 seconds, and increases Azure chance by 0.24% (max 48%)"
    }
};
