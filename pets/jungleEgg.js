import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const JUNGLE_EGG_PETS = {
    treefrog: {
        name: "Tree Frog",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/6/63/TreeFrog.png",
            fallback: "🐸"
        },
        type: "amphibian",
        rarity: "Rare",
        source: "Jungle Egg",
        probability: 40,
        obtainable: true,
        description: "Advances the growth of a random plant by 15 minutes",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 87.78 (61.67 🌈)";
            
            const baseSeconds = 188;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(30, adjustedBaseSeconds - (1.8 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, advances the growth of a random plant by <strong>15 minutes</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 1.8 seconds"
    },
    hummingbird: {
        name: "Hummingbird",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/23/Hummingbird.png",
            fallback: "🐦"
        },
        type: "bird",
        rarity: "Rare",
        source: "Jungle Egg",
        probability: 30,
        obtainable: true,
        description: "Converts a random single-harvest plant into its seed equivalent",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 75.00 (50.00 🌈)";
            
            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (0.6 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, converts a random single-harvest plant into its seed equivalent!\nIgnores favorited plants${displayText}.`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 0.6 seconds"
    },
    iguana: {
        name: "Iguana",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/a/af/Iguana.png",
            fallback: "🦎"
        },
        type: "reptile",
        rarity: "Legendary",
        source: "Jungle Egg",
        probability: 24,
        obtainable: true,
        description: "Melts frozen fruits back to Chilled or Wet",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 62.50 (37.50 🌈)";
            
            const baseSeconds = 80;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(30, adjustedBaseSeconds - (0.8 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to a random fruit with Frozen mutation and melts it back to Chilled or Wet!\nIgnores favorited fruit${displayText}.`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 0.8 seconds"
    },
    chimpanzee: {
        name: "Chimpanzee",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/0c/Chimpanzee.png",
            fallback: "🐵"
        },
        type: "mammal",
        rarity: "Mythical",
        source: "Jungle Egg",
        probability: 15,
        obtainable: true,
        description: "Grabs a random fruit and sells it for you",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 87.50 (62.50 🌈)";
            
            const baseSeconds = 120;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (1.2 * kg));
            const chance = 6 + (0.5 * kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, grabs a random fruit from your garden and goes to the sell stall and sells it for you!\nThere is a <strong>${chance.toFixed(1)}%</strong> chance the fruit does not get collected${displayText}.`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 1.2 seconds and increases failure chance by 0.5%"
    },
    tiger: {
        name: "Tiger",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/e/e0/TigerIcon.png",
            fallback: "🐯"
        },
        type: "mammal",
        rarity: "Divine",
        source: "Jungle Egg",
        probability: 1,
        obtainable: true,
        description: "Roars and replaces random mutations with different mutations",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 61.67 (36.53 🌈), Mutation Max: 10.00";
            
            const baseSeconds = 362;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(140, adjustedBaseSeconds - (3.6 * kg));
            const mutationCount = Math.min(6, 3 + (0.3 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, roars and <strong>${mutationCount.toFixed(1)}</strong> random mutations from your garden will be replaced with another random mutation!\nIgnores favorited fruit${displayText}.`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 3.6 seconds and increases mutation count by 0.3 (max 6)"
    }
};
