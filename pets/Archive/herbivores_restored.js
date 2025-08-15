import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const herbivores = {
    bunny: {
        name: "Bunny",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/6/6b/BunnyPet.png",
            fallback: "🐰"
        },
        type: "herbivore",
        rarity: "Common",
        description: "Eats carrots for value bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 45;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(5, adjustedBaseSeconds - kg);
            const bonus = 1.5 + (0.015 * kg);
            
            const bonusMod = 1.5 * modifier;
            const bonusTotal = bonus + bonusMod;
        
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, eats a carrot for a <strong>${bonusTotal.toFixed(3)}x</strong> value bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases feeding time by 1 second and increases value bonus by 0.015x"
    },
    bagelbunny: {
        name: "Bagel Bunny",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/5/51/BagelBunny.png/revision/latest?cb=20250806114811",
            fallback: "🥯"
        },
        type: "herbivore",
        rarity: "Legendary",
        description: "Eats carrots for enhanced value bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
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
    blackbunny: {
        name: "Black Bunny",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/e/ec/Black_bunny_icon.png",
            fallback: "🐰"
        },
        type: "herbivore",
        rarity: "Uncommon",
        description: "Eats carrots for value bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 45;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            const bonus = 1.5 + (0.015 * kg);
            
            const bonusMod = 1.5 * modifier;
            const bonusTotal = bonus + bonusMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, eats a carrot for a <strong>${bonusTotal.toFixed(3)}x</strong> value bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases feeding time by 1 second and increases value bonus by 0.015x"
    }
};
