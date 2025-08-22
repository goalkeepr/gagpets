// Dragon pets module
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const dragonPets = {
    reddragon: {
        name: "Red Dragon",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/6/6e/RedDragonRender.png",
            fallback: "🐉"
        },
        type: "dragon",
        rarity: "Prismatic",
        description: "Burns nearby fruits with fiery breath",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 80;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            const burnChance = 20 + (kg / 5);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${burnChance.toFixed(1)}%</strong> chance nearby fruit becomes Burnt!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases burning time by 1 second and increases burn chance by 0.2%"
    }
};
