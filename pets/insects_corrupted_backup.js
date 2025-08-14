import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const INSECT_PETS = {
    bee: {
        name: "Bee",
        icon: ICONS.BEE,
        type: TYPES.INSECT,
        rarity: RARITIES.UNCOMMON,
        description: "Pollinates fruits with mutations",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1510;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (16 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit and pollinates it, applying Pollinated mutation${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases pollination time by 16 seconds"
    },
    
    giantant: {
        name: "Giant Ant",
        icon: ICONS.GIANTANT,
        type: TYPES.INSECT,
        rarity: RARITIES.MYTHICAL,
        description: "Duplicates candy-type fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseChance = 1.5 + (2 * kg);
            const extraChance = 5 + (0.15 * kg);
            
            const baseChanceMod = 1.5 * modifier;
            const extraChanceMod = 5 * modifier;
            const baseChanceTotal = baseChance + baseChanceMod;
            const extraChanceTotal = extraChance + extraChanceMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${baseChanceTotal.toFixed(2)}%</strong> chance Harvested fruit duplicate!\nRarer crops have lower chance to duplicate.\n\n<strong>${extraChanceTotal.toFixed(2)}%</strong> extra chance for Candy type fruit to duplicate!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases fruit duplication chance by 2% and candy fruit bonus by 0.15%"
    },
    
    discobee: {
        name: "Disco Bee",
        icon: ICONS.DISCOBEE,
        type: TYPES.INSECT,
        rarity: RARITIES.DIVINE,
        description: "Applies disco mutations to fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 905;
            const baseChance = 14;
            const chance = baseChance + kg;
            
            const secondsMod = baseSeconds * modifier;
            const chanceMod = baseChance * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const finalSeconds = Math.max(1, adjustedBaseSeconds - (12 * kg));
            const chanceTotal = chance + chanceMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(finalSeconds)}</strong>, <strong>${chanceTotal.toFixed(2)}%</strong> chance a nearby fruit becomes disco${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases action time by 12 seconds and increases disco chance by 1%"
    },
    
    butterfly: {
        name: "Butterfly",
        icon: ICONS.BUTTERFLY,
        type: TYPES.INSECT,
        rarity: RARITIES.MYTHICAL,
        description: "Transforms heavily mutated fruits into rainbow fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1807.4;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (18 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit with 5+ mutations, removes all of them, and turns it rainbow!\nIgnores favorited fruit${displayText}.`;
        },
        perKgImpact: () => "Each additional kg decreases transformation time by 18 seconds"
    },
    
    bearbee: {
        name: "Bear Bee",
        icon: ICONS.BEARBEE,
        type: TYPES.INSECT,
        rarity: RARITIES.MYTHICAL,
        description: "Attempts to pollinate but creates Honey Glazed fruits instead",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1510;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const finalSeconds = Math.max(1, adjustedBaseSeconds - (16 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(finalSeconds)}</strong>, goes to a nearby fruit and tries to pollinate it - but it's not a bee so it fails and turns it to Honey Glazed instead${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases honey glazing time by 16 seconds"
    },
    
    caterpillar: {
        name: "Caterpillar",
        icon: ICONS.CATERPILLAR,
        type: TYPES.INSECT,
        rarity: RARITIES.LEGENDARY,
        description: "Accelerates growth of leafy plants",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const growthMultiplier = 1.45 + (kg * 0.15);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All leafy plants grow <strong>${growthMultiplier.toFixed(2)}x</strong> faster!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases leafy plant growth speed by 0.15x"
    },
    
    moth: {
        name: "Moth",
        icon: ICONS.MOTH,
        type: TYPES.INSECT,
        rarity: RARITIES.LEGENDARY,
        description: "Sings to restore pet hunger",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 763;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (7 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, sings to a random pet and restores its hunger to 100%!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases singing time by 7 seconds"
    },

    goldenbee: {
        name: "Golden Bee",
        icon: ICONS.GOLDENBEE,
        type: TYPES.INSECT,
        rarity: RARITIES.EPIC,
        description: "Pollinates fruits with golden mutations for enhanced value",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1200;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(10, adjustedBaseSeconds - (15 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit and applies Golden Pollination for enhanced value${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases golden pollination time by 15 seconds"
    },

    honeybee: {
        name: "Honey Bee",
        icon: ICONS.HONEYBEE,
        type: TYPES.INSECT,
        rarity: RARITIES.RARE,
        description: "Produces honey that provides sustained energy bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 900;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(45, adjustedBaseSeconds - (8 * kg));
            const honeyValue = 12 + (kg * 0.2);
            const duration = 300 + (kg * 3);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, produces honey! Provides <strong>${honeyValue.toFixed(1)}</strong> energy for <strong>${Utils.formatTime(duration)}</strong>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases production time by 8 seconds, increases honey value by 0.2, and extends duration by 3 seconds"
    },

    packbee: {
        name: "Pack Bee",
        icon: ICONS.PACKBEE,
        type: TYPES.INSECT,
        rarity: RARITIES.UNCOMMON,
        description: "Works in coordination with other bees for enhanced pollination",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1600;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(20, adjustedBaseSeconds - (18 * kg));
            const packBonus = 25 + (kg * 0.5);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, pollinates with pack coordination! <strong>${packBonus.toFixed(1)}%</strong> bonus effectiveness with other bees nearby${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases pack pollination time by 18 seconds and increases pack bonus by 0.5%"
    },

    petalbee: {
        name: "Petal Bee",
        icon: ICONS.PETALBEE,
        type: TYPES.INSECT,
        rarity: RARITIES.RARE,
        description: "Collects flower petals to enhance beauty of the garden",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 450;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(25, adjustedBaseSeconds - (6 * kg));
            const beautyBonus = 8 + (kg * 0.12);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, collects petals! Increases garden beauty by <strong>${beautyBonus.toFixed(2)}</strong> for all aesthetic bonuses${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases collection time by 6 seconds and increases beauty bonus by 0.12"
    },

    queenbee: {
        name: "Queen Bee",
        icon: ICONS.QUEENBEE,
        type: TYPES.INSECT,
        rarity: RARITIES.LEGENDARY,
        description: "Commands all bees in the area for coordinated pollination efforts",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseCommandBonus = 40;
            const commandBonus = baseCommandBonus + (kg * 0.6);
            const range = 20 + (kg * 0.4);
            
            const commandBonusMod = baseCommandBonus * modifier;
            const commandBonusTotal = commandBonus + commandBonusMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Commands all bees within <strong>${range.toFixed(1)}</strong> studs! Increases their effectiveness by <strong>${commandBonusTotal.toFixed(1)}%</strong>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases command bonus by 0.6% and range by 0.4 studs"
    },

    wasp: {
        name: "Wasp",
        icon: ICONS.WASP,
        type: TYPES.INSECT,
        rarity: RARITIES.UNCOMMON,
        description: "Aggressive defender that protects the garden from pests",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 180;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (2 * kg));
            const protection = 15 + (kg * 0.25);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, patrols aggressively! Provides <strong>${protection.toFixed(2)}%</strong> pest protection to the garden${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases patrol time by 2 seconds and increases protection by 0.25%"
    },

    dragonfly: {
        name: "Dragonfly",
        icon: ICONS.DRAGONFLY,
        type: TYPES.INSECT,
        rarity: RARITIES.RARE,
        description: "Swift aerial hunter that controls mosquito populations",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 90;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(8, adjustedBaseSeconds - (1.5 * kg));
            const huntSuccess = 35 + (kg * 0.4);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, hunts aerial pests! <strong>${huntSuccess.toFixed(1)}%</strong> success rate reducing garden pest problems${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases hunt time by 1.5 seconds and increases success rate by 0.4%"
    },

    prayingmantis: {
        name: "Praying Mantis",
        icon: ICONS.PRAYINGMANTIS,
        type: TYPES.INSECT,
        rarity: RARITIES.EPIC,
        description: "Patient predator that eliminates harmful insects with precision",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 300;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(30, adjustedBaseSeconds - (4 * kg));
            const precision = 60 + (kg * 0.8);
            const elimination = 20 + (kg * 0.3);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, strikes with patience! <strong>${precision.toFixed(1)}%</strong> precision eliminates <strong>${elimination.toFixed(1)}%</strong> of harmful insects${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases strike time by 4 seconds, increases precision by 0.8%, and increases elimination by 0.3%"
    }
};
