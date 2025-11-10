import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const ANTI_BEE_EGG_PETS = {
    wasp: {
        name: "Wasp",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/f/f8/The_Wasp.png",
            fallback: "🐝"
        },
        type: "insect",
        rarity: "Rare",
        source: "Anti Bee Egg",
        probability: 55,
        obtainable: true,
        description: "Pollinates fruits and stings pets to advance cooldowns",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Pollination Min: 96.67 (80.56 🌈), Sting Min: 90.33 (75.28 🌈)";
            
            const basePollinateSeconds = 1800;
            const pollinateSecondsMod = basePollinateSeconds * modifier;
            const adjustedBasePollinateSeconds = basePollinateSeconds - pollinateSecondsMod;
            const pollinateSeconds = Math.max(60, adjustedBasePollinateSeconds - (18 * kg));
            
            const baseStingSeconds = 602;
            const stingSecondsMod = baseStingSeconds * modifier;
            const adjustedBaseStingSeconds = baseStingSeconds + stingSecondsMod;
            const stingSeconds = Math.max(60, adjustedBaseStingSeconds - (6 * kg));
            const cooldownAdvance = 60 + (0.6 * kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(pollinateSeconds)}</strong>, flies to a nearby fruit and pollinates it applying Pollinated mutation!\n\nEvery <strong>${Utils.formatTime(stingSeconds)}</strong>, stings a random pet and advances its ability cooldown by <strong>${Utils.formatTime(cooldownAdvance)}</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases pollination time by 18 seconds, decreases sting time by 6 seconds, and increases cooldown advance by 0.6 seconds"
    },
    tarantulahawk: {
        name: "Tarantula Hawk",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/78/The_Tarantula_Hawk.png",
            fallback: "🕷️"
        },
        type: "insect",
        rarity: "Legendary",
        source: "Anti Bee Egg",
        probability: 30,
        obtainable: true,
        description: "Pollinates fruits and stings pets to advance cooldowns",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Pollination Min: 85.00 (66.13 🌈), Sting Min: 50.67 (30.53 🌈)";
            
            const basePollinateSeconds = 1510;
            const pollinateSecondsMod = basePollinateSeconds * modifier;
            const adjustedBasePollinateSeconds = basePollinateSeconds - pollinateSecondsMod;
            const pollinateSeconds = Math.max(60, adjustedBasePollinateSeconds - (16 * kg));
            
            const baseStingSeconds = 302;
            const stingSecondsMod = baseStingSeconds * modifier;
            const adjustedBaseStingSeconds = baseStingSeconds - stingSecondsMod;
            const stingSeconds = Math.max(60, adjustedBaseStingSeconds - (3 * kg));
            const cooldownAdvance = 80 + (0.8 * kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(pollinateSeconds)}</strong>, flies to a nearby fruit and pollinates it applying Pollinated mutation!\n\nEvery <strong>${Utils.formatTime(stingSeconds)}</strong>, stings a random pet and advances its ability cooldown by <strong>${Utils.formatTime(cooldownAdvance)}</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases pollination time by 16 seconds, decreases sting time by 3 seconds, and increases cooldown advance by 0.8 seconds"
    },
    moth: {
        name: "Moth",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/09/Moth.png",
            fallback: "🦋"
        },
        type: "insect",
        rarity: "Legendary",
        source: "Anti Bee Egg",
        probability: 13.75,
        obtainable: true,
        description: "Sings to restore pet hunger",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Singing Min: 106.86 (85.06 🌈)";
            
            const baseSeconds = 763;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (7 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, sings to a random pet and restores its hunger to 100%!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases singing time by 7 seconds"
    },
    butterfly: {
        name: "Butterfly",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/1/18/Thy_Butterfly_V2.png",
            fallback: "🦋"
        },
        type: "insect",
        rarity: "Mythical",
        source: "Anti Bee Egg",
        probability: 1,
        obtainable: true,
        description: "Transforms heavily mutated fruits into rainbow fruits",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Transformation Min: 99.61 (79.52 🌈)";
            
            const baseSeconds = 1808;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (18 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit with 5+ mutations, removes all of them, and turns it rainbow!\nIgnores favorited fruit${displayText}.`;
        },
        perKgImpact: () => "Each additional kg decreases transformation time by 18 seconds"
    },
    discobee: {
        name: "Disco Bee",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/f/f2/DiscoBeeIcon.gif",
            fallback: "🕺"
        },
        type: "insect",
        rarity: "Divine",
        source: "Anti Bee Egg",
        probability: 0.25,
        obtainable: true,
        description: "Makes nearby fruits become Disco",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 74.25 (59.15 🌈)";
            
            const baseSeconds = 906;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (12 * kg));
            const chance = 14 + (1 * kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${chance.toFixed(2)}%</strong> chance a nearby fruit becomes Disco!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 12 seconds and increases chance by 1%"
    }
};
