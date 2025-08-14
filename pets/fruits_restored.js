import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const fruits = {
    bloodkiwi: {
        name: "Blood Kiwi",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/79/Blood_Kiwi_Icon.png",
            fallback: "🥝"
        },
        type: "fruit",
        rarity: "Mythical",
        description: "Reduces egg hatch times",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            const reduction = 45 + (0.45 * kg);
            
            const reductionMod = 45 * modifier;
            const reductionTotal = reduction + reductionMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to the egg with the highest hatch time, and reduces its hatch time by <strong>${reductionTotal.toFixed(2)}</strong> seconds${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases action time by 1 second and increases hatch time reduction by 0.45 seconds"
    }
};
