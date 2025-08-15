import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const WILD_ANIMALS_PETS = {
    polarbear: {
        name: "Polar Bear",
        icon: ICONS.POLARBEAR,
        type: TYPES.MAMMAL,
        rarity: RARITIES.EPIC,
        source: "Legendary Egg",
        probability: 2.13,
        obtainable: false,
        description: "Arctic bear that provides ice and cold resistance bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 600;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(60, adjustedBaseSeconds - (6 * kg));
            const iceBonus = 40 + (kg * 0.7);
            const coldResistance = 35 + (kg * 0.6);
            const arcticAura = 30 + (kg * 0.5);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, channels arctic power! Provides <strong>${iceBonus.toFixed(1)}%</strong> ice enhancement, <strong>${coldResistance.toFixed(1)}%</strong> cold resistance, and <strong>${arcticAura.toFixed(1)}%</strong> arctic aura${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases channeling time by 6 seconds, increases ice bonus by 0.7%, cold resistance by 0.6%, and arctic aura by 0.5%"
    }
};
