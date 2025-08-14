// Small mammals pets
import { getModifierDetails } from '../utils/modifiers.js';
import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import Utils from '../utils/calculations.js';

export const SMALL_MAMMALS_PETS = {
    bunny: {
        name: "Bunny",
        icon: ICONS.BUNNY,
        type: TYPES.MAMMAL,
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
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, eats a carrot for a <strong>${bonusTotal.toFixed(3)}</strong> value bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases feeding time by 1 second and increases value bonus by 0.015"
    },

    hamster: {
        name: "Hamster",
        icon: ICONS.HAMSTER,
        type: TYPES.MAMMAL,
        rarity: RARITIES.COMMON,
        description: "Stores seeds in cheeks for emergency food supply",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 90;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(8, adjustedBaseSeconds - (2 * kg));
            const storage = 3 + (kg * 0.1);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, stores <strong>${storage.toFixed(1)}</strong> emergency food supplies${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases storage time by 2 seconds and increases storage capacity by 0.1"
    },

    hedgehog: {
        name: "Hedgehog",
        icon: ICONS.HEDGEHOG,
        type: TYPES.MAMMAL,
        rarity: RARITIES.UNCOMMON,
        description: "Rolls into a defensive ball that provides protection to nearby pets",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 300;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(30, adjustedBaseSeconds - (3 * kg));
            const protection = 10 + (kg * 0.2);
            const range = 8 + (kg * 0.15);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, rolls into defensive ball! Pets within <strong>${range.toFixed(1)}</strong> studs get <strong>${protection.toFixed(1)}%</strong> damage reduction${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases roll time by 3 seconds, increases protection by 0.2%, and increases range by 0.15 studs"
    },

    mole: {
        name: "Mole",
        icon: ICONS.MOLE,
        type: TYPES.MAMMAL,
        rarity: RARITIES.UNCOMMON,
        description: "Digs tunnels to uncover hidden treasures",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 180;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (2.5 * kg));
            const findChance = 8 + (kg * 0.12);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, digs a tunnel! <strong>${findChance.toFixed(2)}%</strong> chance to uncover buried treasure${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases dig time by 2.5 seconds and increases find chance by 0.12%"
    },

    squirrel: {
        name: "Squirrel",
        icon: ICONS.SQUIRREL,
        type: TYPES.MAMMAL,
        rarity: RARITIES.COMMON,
        description: "Gathers nuts for resource bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(6, adjustedBaseSeconds - (1.5 * kg));
            const gatherAmount = 2 + (kg * 0.08);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, gathers nuts! Collects <strong>${gatherAmount.toFixed(2)}</strong> extra resources${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases gather time by 1.5 seconds and increases gather amount by 0.08"
    }
};
