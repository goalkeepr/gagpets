// Reptile pets module
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const reptilePets = {
    sandsnake: {
        name: "Sand Snake",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/a/a4/SandSnakeIcon.png",
            fallback: "🐍"
        },
        type: "reptile",
        rarity: "Legendary",
        description: "Duplicates purchased items from seed/gear shop",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const duplicateChance = 1 + (kg / 4);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Buying from the seed/gear shop has a <strong>${duplicateChance.toFixed(2)}%</strong> chance to duplicate the bought item!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases item duplication chance by 0.25%"
    },
    turtle: {
        name: "Turtle",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/b/b1/Turtle_icon.png",
            fallback: "🐢"
        },
        type: "reptile",
        rarity: "Legendary",
        description: "Extends sprinkler duration",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const duration = 20 + (kg / 5);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All Sprinklers last <strong>${duration.toFixed(1)}%</strong> longer!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases sprinkler duration by 0.2%"
    },
    tsuchinoko: {
        name: "Tsuchinoko",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/f/fd/Tsuchinoko.png",
            fallback: "🐍"
        },
        type: "reptile",
        rarity: "Rare",
        description: "Fat Snake: Increased lucky harvest chance!",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const chance = 5 + (kg / 20);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${chance.toFixed(2)}%</strong> extra chance harvested plants drop seeds. Rarer plants have lower chance to duplicate.${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases seed drop chance by 0.05%"
    }
};
