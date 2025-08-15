import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const MOLLUSK_PETS = {
    snail: {
        name: "Snail",
        icon: ICONS.SNAIL,
        type: TYPES.MOLLUSK,
        rarity: RARITIES.LEGENDARY,
        description: "Increases seed drop chances",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const chance = 5 + (kg / 20);
            
            const chanceMod = 5 * modifier;
            const chanceTotal = chance + chanceMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${chanceTotal.toFixed(2)}%</strong> extra chance harvested plants drop seeds. Rarer plants have lower chance to duplicate.${displayText}`;
        },
        perKgImpact: () => "Each additional kg adds 0.05% chance to drop seeds"
    }
};
