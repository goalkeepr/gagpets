import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';
import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';

const primalEggPets = {
    parasaurolophus: {
        name: "Parasaurolophus",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/26/Parasaurolophus.png",
            fallback: "🦕"
        },
        type: "dinosaur",
        rarity: "Legendary",
        description: "Reduces cosmetic crate open times with chance for multiplied effect",
        source: "Primal Egg",
        probability: 35,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 82;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (1.8 * kg));
            const reduction = 80 + (0.65 * kg);
            const chancePercent = 25.5 + (kg / 4);
            const multiplier = 1.5 + (kg / 5);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to the cosmetic crate with the highest open time and reduces its open time by <strong>${Utils.formatTime(reduction)}</strong>!\n\nThere is a <strong>${chancePercent.toFixed(2)}%</strong> chance for open time reduction to be multiplied by <strong>${multiplier.toFixed(1)}x</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases action time by 1.8 seconds, increases reduction by 0.65 seconds, increases multiplier chance by 0.25%, and increases multiplier by 0.2x"
    },

    iguanodon: {
        name: "Iguanodon",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/94/Iguanodon.png",
            fallback: "🦕"
        },
        type: "dinosaur",
        rarity: "Legendary",
        description: "Provides XP bonuses to all active dinosaur pets",
        source: "Primal Egg",
        probability: 32.50,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseXpBonus = 0.6;
            const xpBonus = baseXpBonus + (0.06 * kg);
            
            const xpBonusMod = baseXpBonus * modifier;
            const xpBonusTotal = xpBonus + xpBonusMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All active Dinosaur type pets gain an additional <strong>${xpBonusTotal.toFixed(2)} XP/s</strong>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases dinosaur pet XP bonus by 0.06 XP/s"
    },

    pachycephalosaurus: {
        name: "Pachycephalosaurus",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/5/54/Pachycephalosaurus.png",
            fallback: "🦕"
        },
        type: "dinosaur",
        rarity: "Legendary",
        description: "Provides chances to duplicate crafted items",
        source: "Primal Egg",
        probability: 28,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseChance = 6;
            const chance = baseChance + (0.3 * kg);
            
            const chanceMod = baseChance * modifier;
            const chanceTotal = chance + chanceMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Grants a <strong>${chanceTotal.toFixed(1)}%</strong> chance to duplicate a crafted item${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases crafted item duplication chance by 0.3%"
    },

    dilophosaurus: {
        name: "Dilophosaurus",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/3/3c/Dilophosaurus.png",
            fallback: "🦖"
        },
        type: "dinosaur",
        rarity: "Mythical",
        description: "Spits venom to advance cooldowns or grant XP to multiple pets",
        source: "Primal Egg",
        probability: 3,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 846;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (8.4 * kg));
            const targets = Math.min(5, 3 + (kg / 5));
            const cooldownAdvance = Math.min(100, 40 + (kg / 4));
            const xpGrant = Math.min(1500, 500 + (40 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, opens its frills and spits out venom! The venom spreads to <strong>${targets.toFixed(1)}</strong> other random pets, advancing cooldown by <strong>${Utils.formatTime(cooldownAdvance)}</strong> OR granting <strong>${Utils.formatNumber(Math.round(xpGrant))}</strong> XP!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases venom time by 8.4 seconds, increases targets by 0.2, increases cooldown advance by 0.5 seconds, and increases XP grant by 49"
    },

    ankylosaurus: {
        name: "Ankylosaurus",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/a/a7/Ankylosaurus.png",
            fallback: "🦕"
        },
        type: "dinosaur",
        rarity: "Mythical",
        description: "Protects against fruit theft by duplicating stolen fruit",
        source: "Primal Egg",
        probability: 1,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseProtectionChance = 15.7;
            const protectionChance = baseProtectionChance + (kg / 4);
            
            const protectionChanceMod = baseProtectionChance * modifier;
            const protectionChanceTotal = protectionChance + protectionChanceMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `When another player steals fruit from you, grants a <strong>${protectionChanceTotal.toFixed(2)}%</strong> chance you get the stolen fruit as well${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases theft protection chance by 0.25%"
    },

    spinosaurus: {
        name: "Spinosaurus",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/24/Spinosaurus.png",
            fallback: "🦕"
        },
        type: "dinosaur",
        rarity: "Divine",
        description: "Devours mutations and spreads them with roar",
        source: "Primal Egg",
        probability: 0.50,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1224;
            const baseFruits = 3;
            const fruits = baseFruits + (kg / 5);
            
            const secondsMod = baseSeconds * modifier;
            const fruitsMod = baseFruits * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const finalSeconds = Math.max(1, adjustedBaseSeconds - (12 * kg));
            const fruitsTotal = fruits + fruitsMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(finalSeconds)}</strong>, devours a random mutation from <strong>${fruitsTotal.toFixed(1)}</strong> fruits in your garden each then roars spreading those mutations to 1 random fruit in your garden! Prioritizes applying mutations to a favorited fruit.${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases roaring time by 12 seconds and increases fruits affected by 0.2"
    }
};

export { primalEggPets as PRIMAL_EGG_PETS };
