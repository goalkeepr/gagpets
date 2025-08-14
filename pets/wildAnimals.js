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
    },

    meerkat: {
        name: "Meerkat",
        icon: ICONS.MEERKAT,
        type: TYPES.MAMMAL,
        rarity: RARITIES.UNCOMMON,
        description: "Alert sentinel that provides early warning and surveillance bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseAlertness = 45;
            const alertness = baseAlertness + (kg * 0.8);
            const surveillance = 35 + (kg * 0.6);
            const earlyWarning = 30 + (kg * 0.5);
            const range = 18 + (kg * 0.3);
            
            const alertnessMod = baseAlertness * modifier;
            const alertnessTotal = alertness + alertnessMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Stands sentinel! Provides <strong>${alertnessTotal.toFixed(1)}%</strong> alertness, <strong>${surveillance.toFixed(1)}%</strong> surveillance coverage, and <strong>${earlyWarning.toFixed(1)}%</strong> early warning within <strong>${range.toFixed(1)}</strong> studs${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases alertness by 0.8%, surveillance by 0.6%, early warning by 0.5%, and range by 0.3 studs"
    },

    goldenlab: {
        name: "Golden Lab",
        icon: ICONS.GOLDENLAB,
        type: TYPES.MAMMAL,
        rarity: RARITIES.RARE,
        description: "Loyal golden retriever that provides companionship and retrieval bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 300;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(30, adjustedBaseSeconds - (4 * kg));
            const companionship = 35 + (kg * 0.6);
            const retrievalBonus = 30 + (kg * 0.5);
            const loyalty = 40 + (kg * 0.7);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, shows loyal devotion! Provides <strong>${companionship.toFixed(1)}%</strong> companionship comfort, <strong>${retrievalBonus.toFixed(1)}%</strong> item retrieval, and <strong>${loyalty.toFixed(1)}%</strong> unwavering loyalty${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases devotion time by 4 seconds, increases companionship by 0.6%, retrieval bonus by 0.5%, and loyalty by 0.7%"
    },

    orangetabby: {
        name: "Orange Tabby",
        icon: ICONS.ORANGETABBY,
        type: TYPES.MAMMAL,
        rarity: RARITIES.COMMON,
        description: "Friendly orange cat that provides warmth and comfort bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseWarmth = 25;
            const warmth = baseWarmth + (kg * 0.4);
            const comfort = 20 + (kg * 0.35);
            const purringEffect = 18 + (kg * 0.3);
            
            const warmthMod = baseWarmth * modifier;
            const warmthTotal = warmth + warmthMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Provides feline comfort! Grants <strong>${warmthTotal.toFixed(1)}%</strong> warmth bonus, <strong>${comfort.toFixed(1)}%</strong> comfort enhancement, and <strong>${purringEffect.toFixed(1)}%</strong> soothing purring effect${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases warmth by 0.4%, comfort by 0.35%, and purring effect by 0.3%"
    }
};
