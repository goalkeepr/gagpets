import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const HERBIVORE_PETS = {
    bunny: {
        name: "Bunny",
        icon: ICONS.BUNNY,
        type: TYPES.HERBIVORE,
        rarity: RARITIES.COMMON,
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
        icon: ICONS.BAGELBUNNY,
        type: TYPES.HERBIVORE,
        rarity: RARITIES.LEGENDARY,
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
        icon: ICONS.BLACKBUNNY,
        type: TYPES.HERBIVORE,
        rarity: RARITIES.UNCOMMON,
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
    },

    deer: {
        name: "Deer",
        icon: ICONS.DEER,
        type: TYPES.HERBIVORE,
        rarity: RARITIES.UNCOMMON,
        description: "Graceful grazer that provides serenity bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSerenity = 18;
            const serenity = baseSerenity + (kg * 0.3);
            const range = 15 + (kg * 0.25);
            
            const serenityMod = baseSerenity * modifier;
            const serenityTotal = serenity + serenityMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Provides graceful presence! All pets within <strong>${range.toFixed(1)}</strong> studs get <strong>${serenityTotal.toFixed(1)}%</strong> serenity bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases serenity bonus by 0.3% and range by 0.25 studs"
    },

    panda: {
        name: "Panda",
        icon: ICONS.PANDA,
        type: TYPES.HERBIVORE,
        rarity: RARITIES.RARE,
        description: "Peaceful bamboo eater that promotes harmony",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 400;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(40, adjustedBaseSeconds - (3 * kg));
            const harmonyBonus = 20 + (kg * 0.35);
            const range = 12 + (kg * 0.2);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, munches bamboo peacefully! All pets within <strong>${range.toFixed(1)}</strong> studs get <strong>${harmonyBonus.toFixed(1)}%</strong> harmony bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases munch time by 3 seconds, increases harmony by 0.35%, and increases range by 0.2 studs"
    },

    turtle: {
        name: "Turtle",
        icon: ICONS.TURTLE,
        type: TYPES.HERBIVORE,
        rarity: RARITIES.UNCOMMON,
        description: "Slow and steady provider of wisdom and patience bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseWisdom = 12;
            const wisdom = baseWisdom + (kg * 0.2);
            const patience = 8 + (kg * 0.15);
            
            const wisdomMod = baseWisdom * modifier;
            const wisdomTotal = wisdom + wisdomMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Provides steady wisdom! Grants <strong>${wisdomTotal.toFixed(1)}%</strong> experience bonus and <strong>${patience.toFixed(1)}%</strong> patience to all garden activities${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases wisdom by 0.2% and patience by 0.15%"
    }
};
