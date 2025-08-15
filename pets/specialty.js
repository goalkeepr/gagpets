import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const SPECIALTY_PETS = {
    frenchfryferret: {
        name: "French Fry Ferret",
        icon: ICONS.FRENCHFRYFERRET,
        type: TYPES.SPECIALTY,
        rarity: RARITIES.EPIC,
        source: "Gourmet Egg",
        probability: 1,
        obtainable: true,
        description: "Unique ferret that loves french fries and provides crispy bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 300;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(30, adjustedBaseSeconds - (4 * kg));
            const crispyBonus = 22 + (kg * 0.35);
            const frenchFryEffect = 18 + (kg * 0.3);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, munches french fries! Provides <strong>${crispyBonus.toFixed(1)}%</strong> crispy texture bonus and <strong>${frenchFryEffect.toFixed(1)}%</strong> golden preparation enhancement${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases munch time by 4 seconds, increases crispy bonus by 0.35%, and increases preparation effect by 0.3%"
    },

    mochimouse: {
        name: "Mochi Mouse",
        icon: ICONS.MOCHIMOUSE,
        type: TYPES.SPECIALTY,
        rarity: RARITIES.RARE,
        source: "Cooking Event",
        probability: 0,
        obtainable: true,
        description: "Soft and squishy mouse that provides comfort and sweetness bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseComfort = 25;
            const comfort = baseComfort + (kg * 0.4);
            const sweetness = 20 + (kg * 0.35);
            const squishiness = 15 + (kg * 0.25);
            
            const comfortMod = baseComfort * modifier;
            const comfortTotal = comfort + comfortMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Provides mochi comfort! Grants <strong>${comfortTotal.toFixed(1)}%</strong> comfort bonus, <strong>${sweetness.toFixed(1)}%</strong> sweetness enhancement, and <strong>${squishiness.toFixed(1)}%</strong> stress relief${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases comfort by 0.4%, sweetness by 0.35%, and stress relief by 0.25%"
    },

    mooncat: {
        name: "Moon Cat",
        icon: ICONS.MOONCAT,
        type: TYPES.SPECIALTY,
        rarity: RARITIES.LEGENDARY,
        source: "Twilight Shop",
        probability: 0,
        obtainable: false,
        description: "Mystical feline that channels lunar energy for nighttime bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseLunar = 30;
            const lunar = baseLunar + (kg * 0.5);
            const nightBonus = 25 + (kg * 0.4);
            const mysticalAura = 20 + (kg * 0.35);
            
            const lunarMod = baseLunar * modifier;
            const lunarTotal = lunar + lunarMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Channels lunar energy! Provides <strong>${lunarTotal.toFixed(1)}%</strong> lunar power, <strong>${nightBonus.toFixed(1)}%</strong> nighttime activity bonus, and <strong>${mysticalAura.toFixed(1)}%</strong> mystical enhancement${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases lunar power by 0.5%, night bonus by 0.4%, and mystical aura by 0.35%"
    },

    pancakemole: {
        name: "Pancake Mole",
        icon: ICONS.PANCAKEMOLE,
        type: TYPES.SPECIALTY,
        rarity: RARITIES.UNCOMMON,
        source: "Gourmet Egg",
        probability: 38,
        obtainable: true,
        description: "Flat mole that loves pancakes and provides breakfast bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 420;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(42, adjustedBaseSeconds - (4.5 * kg));
            const breakfastBonus = 28 + (kg * 0.45);
            const fluffiness = 22 + (kg * 0.35);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flips pancakes! Provides <strong>${breakfastBonus.toFixed(1)}%</strong> breakfast bonus and <strong>${fluffiness.toFixed(1)}%</strong> fluffy comfort enhancement${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases flip time by 4.5 seconds, increases breakfast bonus by 0.45%, and increases fluffiness by 0.35%"
    },

    spaghettisloth: {
        name: "Spaghetti Sloth",
        icon: ICONS.SPAGHETTISLOTH,
        type: TYPES.SPECIALTY,
        rarity: RARITIES.EPIC,
        source: "Gourmet Egg",
        probability: 4,
        obtainable: true,
        description: "Slow-moving sloth that loves pasta and provides relaxation bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 900;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(90, adjustedBaseSeconds - (8 * kg));
            const relaxation = 35 + (kg * 0.6);
            const pastaJoy = 25 + (kg * 0.4);
            const slowness = 40 + (kg * 0.7);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, slowly enjoys spaghetti! Provides <strong>${relaxation.toFixed(1)}%</strong> deep relaxation, <strong>${pastaJoy.toFixed(1)}%</strong> culinary joy, and <strong>${slowness.toFixed(1)}%</strong> mindful slowness bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases eating time by 8 seconds, increases relaxation by 0.6%, pasta joy by 0.4%, and slowness bonus by 0.7%"
    },

    sushibear: {
        name: "Sushi Bear",
        icon: ICONS.SUSHIBEAR,
        type: TYPES.SPECIALTY,
        rarity: RARITIES.RARE,
        source: "Gourmet Egg",
        probability: 7,
        obtainable: true,
        description: "Cultured bear that appreciates fine sushi and provides gourmet bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 600;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(60, adjustedBaseSeconds - (6 * kg));
            const gourmetBonus = 30 + (kg * 0.5);
            const sushiCraftsmanship = 25 + (kg * 0.4);
            const refinement = 20 + (kg * 0.35);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, crafts fine sushi! Provides <strong>${gourmetBonus.toFixed(1)}%</strong> gourmet bonus, <strong>${sushiCraftsmanship.toFixed(1)}%</strong> culinary craftsmanship, and <strong>${refinement.toFixed(1)}%</strong> cultural refinement${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases crafting time by 6 seconds, increases gourmet bonus by 0.5%, craftsmanship by 0.4%, and refinement by 0.35%"
    },

};

