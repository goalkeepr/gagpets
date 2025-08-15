// Spirit pets module
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const spiritPets = {
    kodama: {
        name: "Kodama",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/86/Kodama.png",
            fallback: "👻"
        },
        type: "spirit",
        rarity: "Ultra Rare",
        source: "Kitsune Chest",
        probability: 14.50,
        obtainable: false,
        description: "Forest spirit that applies tranquil mutation",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (kg * 2));
            const mutationChance = 15 + (kg / 3);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${mutationChance.toFixed(1)}%</strong> chance to apply Tranquil mutation to random crops!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases time by 2 seconds and increases tranquil chance by 0.33%"
    },
    
    corruptedkodama: {
        name: "Corrupted Kodama",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/f/fd/CorruptedKodama.png",
            fallback: "👿"
        },
        type: "spirit",
        rarity: "Ultra Rare",
        description: "Dark forest spirit that spreads corruption",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 70;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (kg * 1.5));
            const corruptionChance = 12 + (kg / 4);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${corruptionChance.toFixed(1)}%</strong> chance to apply Corrupted mutation to random crops!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases time by 1.5 seconds and increases corruption chance by 0.25%"
    }
};
