import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const PRIMATES_PETS = {
    monkey: {
        name: "Monkey",
        icon: ICONS.MONKEY,
        type: TYPES.MAMMAL,
        rarity: RARITIES.UNCOMMON,
        description: "Playful primate that swings around gathering fruits",
        source: "Rare Egg",
        probability: 8.33,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 120;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(12, adjustedBaseSeconds - (2 * kg));
            const gatherAmount = 6 + (kg * 0.12);
            const swingBonus = 15 + (kg * 0.2);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, swings around gathering! Collects <strong>${gatherAmount.toFixed(2)}</strong> fruits with <strong>${swingBonus.toFixed(1)}%</strong> acrobatic bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases swing time by 2 seconds, increases gathering by 0.12, and increases acrobatic bonus by 0.2%"
    },

    orangutan: {
        name: "Orangutan",
        icon: ICONS.ORANGUTAN,
        type: TYPES.MAMMAL,
        rarity: RARITIES.RARE,
        description: "Intelligent ape that uses tools to improve garden efficiency",
        source: "Rare Summer Egg",
        probability: 15,
        obtainable: true,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 600;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(60, adjustedBaseSeconds - (6 * kg));
            const toolEfficiency = 30 + (kg * 0.5);
            const intelligenceBonus = 25 + (kg * 0.4);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, uses tools intelligently! Improves garden efficiency by <strong>${toolEfficiency.toFixed(1)}%</strong> and provides <strong>${intelligenceBonus.toFixed(1)}%</strong> problem-solving bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases tool time by 6 seconds, increases efficiency by 0.5%, and increases intelligence bonus by 0.4%"
    },

    nihonzaru: {
        name: "Nihon-zaru",
        icon: ICONS.NIHONZARU,
        type: TYPES.MAMMAL,
        rarity: RARITIES.UNCOMMON,
        description: "Japanese macaque that enjoys hot springs for relaxation bonuses",
        source: "Zen Egg",
        probability: 31,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 450;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(45, adjustedBaseSeconds - (4.5 * kg));
            const relaxationBonus = 22 + (kg * 0.35);
            const hotSpringEffect = 18 + (kg * 0.3);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, enjoys hot springs! Provides <strong>${relaxationBonus.toFixed(1)}%</strong> relaxation and <strong>${hotSpringEffect.toFixed(1)}%</strong> stress relief to nearby pets${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases spring time by 4.5 seconds, increases relaxation by 0.35%, and increases stress relief by 0.3%"
    },

    silvermonkey: {
        name: "Silver Monkey",
        icon: ICONS.SILVERMONKEY,
        type: TYPES.MAMMAL,
        rarity: RARITIES.EPIC,
        source: "Legendary Egg",
        probability: 42.55,
        obtainable: false,
        description: "Mystical monkey with silver fur that reflects moonlight for magical bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseMoonlight = 20;
            const moonlight = baseMoonlight + (kg * 0.3);
            const silverMagic = 15 + (kg * 0.25);
            const range = 18 + (kg * 0.3);
            
            const moonlightMod = baseMoonlight * modifier;
            const moonlightTotal = moonlight + moonlightMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Reflects moonlight mystically! All pets within <strong>${range.toFixed(1)}</strong> studs gain <strong>${moonlightTotal.toFixed(1)}%</strong> moonlight blessing and <strong>${silverMagic.toFixed(1)}%</strong> silver magic bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases moonlight by 0.3%, silver magic by 0.25%, and range by 0.3 studs"
    }
};
