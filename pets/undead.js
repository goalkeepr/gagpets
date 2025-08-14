// Undead pets module
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const UNDEAD_PETS = {
    chickenzombie: {
        name: "Chicken Zombie",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/b/be/Chicken_Zombie_Icon.png",
            fallback: "🧟"
        },
        type: "undead",
        rarity: "Mythical",
        description: "Zombifies fruits and increases egg hatch speed",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1600;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (18 * kg));
            const zombifyChance = 20 + (kg / 5);
            const hatchSpeed = 10 + (kg / 10);
            
            const hatchSpeedMod = 10 * modifier;
            const hatchSpeedTotal = hatchSpeed + hatchSpeedMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${zombifyChance.toFixed(1)}%</strong> chance a nearby fruit becomes Zombified!\n\nIncreases egg hatch speed by <strong>${hatchSpeedTotal.toFixed(1)}%</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases zombify time by 18 seconds, increases zombify chance by 0.2%, and increases egg hatch speed by 0.1%"
    }
};
