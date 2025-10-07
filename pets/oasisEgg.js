import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const OASIS_EGG_PETS = {
    fennecfox: {
        name: "Fennec Fox",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/e/e8/FennecFoxIcon.png",
            fallback: "🦊"
        },
        type: "mammal",
        rarity: "Divine",
        source: "Oasis Egg",
        probability: 0.50,
        obtainable: false,
        description: "Copies mutations from other players' fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 94.62 (73.85 🌈)";
            
            const baseSeconds = 1350;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(120, adjustedBaseSeconds - (13 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to another player's random fruit, has a chance to copy 1 random mutation and apply it to random fruit you own! The higher mutation multiplier the rarer chance to copy!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases mutation copying time by 13 seconds (min 120 seconds)"
    },
    meerkat: {
        name: "Meerkat",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/c/c2/Meerkat.png",
            fallback: "🦦"
        },
        type: "mammal",
        rarity: "Legendary",
        source: "Oasis Egg",
        probability: 45,
        obtainable: false,
        description: "Goes to another pet and does a lookout that advances their cooldown, with a chance to repeat",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 97.50 (77.32 🌈)";
            
            const baseSeconds = 444;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (4.4 * kg));
            const advance = 20 + (0.5 * kg);
            const chance = Math.min(100, 15 + (0.25 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong> goes to another pet and does a lookout. That pet advances cooldown by <strong>${Utils.formatTime(advance)}</strong>! Has a <strong>${chance.toFixed(2)}%</strong> chance to do it again after each lookout.${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 4.4 seconds (min 15 seconds), increases advance amount by 0.5 seconds, and increases repeat chance by 0.25%"
    },
    hyacinthmacaw: {
        name: "Hyacinth Macaw",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/77/HyacinthMacawIcon.png",
            fallback: "🦜"
        },
        type: "bird",
        rarity: "Mythical",
        source: "Oasis Egg",
        probability: 5,
        obtainable: false,
        description: "Applies Cloudtouched mutations to nearby fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 97.50 (77.32 🌈)";
            
            const baseSeconds = 444;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (4.4 * kg));
            const mutateChance = Math.min(100, 15 + (kg / 4.4));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${mutateChance.toFixed(2)}%</strong> chance to mutate a nearby fruit, applying the Cloudtouched mutation!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases mutation time by 4.4 seconds (min 15 seconds) and increases mutation chance by 0.23%"
    },
    axolotl: {
        name: "Axolotl",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/0f/AxolotlIcon.png",
            fallback: "🦎"
        },
        type: "aquatic",
        rarity: "Mythical",
        source: "Oasis Egg",
        probability: 15,
        obtainable: false,
        description: "Preserves Summer type fruits after collecting",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Preservation Max: 35.00 (35.00 🌈)";
            
            const basePreserveChance = 6;
            const preserveChance = Math.min(13, basePreserveChance + (0.20 * kg));
            
            const preserveChanceMod = basePreserveChance * modifier;
            const preserveChanceTotal = preserveChance + preserveChanceMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${preserveChanceTotal.toFixed(1)}%</strong> chance Summer type fruit stays after collecting${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases preservation chance by 0.20% (max 13%)"
    },
    sandsnake: {
        name: "Sand Snake",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/a/a4/SandSnakeIcon.png",
            fallback: "🐍"
        },
        type: "reptile",
        rarity: "Legendary",
        source: "Oasis Egg",
        probability: 34.5,
        obtainable: false,        
        description: "Duplicates purchased items from seed/gear shop",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const duplicateChance = 1 + (kg / 4);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Buying from the seed/gear shop has a <strong>${duplicateChance.toFixed(2)}%</strong> chance to duplicate the bought item!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases item duplication chance by 0.25%"
    }
};
