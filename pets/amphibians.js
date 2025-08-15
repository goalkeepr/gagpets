import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const AMPHIBIAN_PETS = {
    echofrog: {
        name: "Echo Frog",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/3/30/Echo_frog.png",
            fallback: "🐸"
        },
        type: "amphibian",
        rarity: "Mythical",
        source: "Night Egg",
        probability: 8.23,
        obtainable: false,
        description: "Croaks to advance plant growth by 24 hours",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 303;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (6 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, croaks and a random nearby plant will advance growth by <strong>24 hours</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases croaking time by 6 seconds"
    },
    frog: {
        name: "Frog",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/5/55/FrogV2.png",
            fallback: "🐸"
        },
        type: "amphibian",
        rarity: "Legendary",
        source: "Night Egg",
        probability: 17.63,
        obtainable: false,
        description: "Croaks to advance plant growth by 24 hours",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 604.5;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (9 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, croaks and a random nearby plant will advance growth by <strong>24 hours</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases croaking time by 9 seconds"
    }
};
