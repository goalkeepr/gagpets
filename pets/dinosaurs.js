import { ICONS } from '../data/icons.js';
import { TYPES, RARITIES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const DINOSAUR_PETS = {
    raptor: {
        name: "Raptor",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/6/64/Raptor_Icon.png",
            fallback: "🦖"
        },
        type: "dinosaur",
        rarity: "Legendary",
        source: "Dinosaur Egg",
        probability: 35,
        obtainable: false,
        description: "Provides amber mutations and movement speed",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseChance = 2 + (kg / 5);
            const baseSpeed = 14 + (kg / 4);
            const chance = baseChance + (2 * modifier);
            const speed = baseSpeed + (14 * modifier);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${chance.toFixed(2)}%</strong> chance fruit gets Amber mutation after collecting.\nRarer plants have lesser chance.\n\nGrants additional <strong>${speed.toFixed(2)}%</strong> increase to player movement speed${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases amber mutation chance by 0.2% and movement speed by 0.25%"
    },
    
    stegosaurus: {
        name: "Stegosaurus",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/70/Stegosaurus_Icon.webp",
            fallback: "🦕"
        },
        type: "dinosaur",
        rarity: "Legendary",
        source: "Dinosaur Egg",
        probability: 28,
        obtainable: false,
        description: "Duplicates harvested fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseChance = 8 + (0.15 * kg);
            const extraChance = 5 + (kg / 10);
            
            const baseChanceMod = 8 * modifier;
            const extraChanceMod = 5 * modifier;
            const baseChanceTotal = baseChance + baseChanceMod;
            const extraChanceTotal = extraChance + extraChanceMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${baseChanceTotal.toFixed(2)}%</strong> chance harvested fruit duplicates!\nRarer crops have lower chance to duplicate.\n\n<strong>${extraChanceTotal.toFixed(2)}%</strong> extra chance for Prehistoric type fruit to duplicate${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases duplication chance by 0.15% and prehistoric fruit bonus by 0.1%"
    },
    
    trex: {
        name: "T-Rex",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/5/5e/T-Rex_Icon.webp",
            fallback: "🦖"
        },
        type: "dinosaur",
        rarity: "Divine",
        source: "Dinosaur Egg",
        probability: 0.5,
        obtainable: false,
        description: "Devours and spreads mutations throughout the garden",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1224;
            const baseTargets = 3;
            const targets = baseTargets + (kg / 5);
            
            const secondsMod = baseSeconds * modifier;
            const targetsMod = baseTargets * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const finalSeconds = Math.max(1, adjustedBaseSeconds - (12 * kg));
            const targetsTotal = targets + targetsMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(finalSeconds)}</strong>, devours a random mutation from your garden, then spreads it to <strong>${targetsTotal.toFixed(1)}</strong> other random fruits in your garden${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases action time by 12 seconds and increases spread targets by 0.2"
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

    brontosaurus: {
        name: "Brontosaurus",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/2f/Brontosaurus_Icon.webp",
            fallback: "🦴"
        },
        type: "dinosaur",
        rarity: "Mythical",
        source: "Dinosaur Egg",
        probability: 1,
        obtainable: false,
        description: "Increases size and weight of pets hatched from eggs",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseBonus = 5.25;
            const bonus = Math.min(30, baseBonus + (kg / 10));
            
            const bonusMod = baseBonus * modifier;
            const adjustedBaseBonus = Math.min(30, baseBonus + bonusMod);
            const bonusTotal = Math.min(30, adjustedBaseBonus + (kg / 10));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Pets hatched from eggs have a <strong>${bonusTotal.toFixed(2)}%</strong> increase in base size and weight! (Max bonus 30%, does not apply to Brontosauruses.)${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases size and weight bonus by 0.1% (capped at 30% total)"
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

    pterodactyl: {
        name: "Pterodactyl",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/7c/Pterodactyl_Icon.webp",
            fallback: "🦕"
        },
        type: "dinosaur",
        rarity: "Mythical",
        source: "Dinosaur Egg",
        probability: 3,
        obtainable: false,
        description: "Flaps wings to send ripples causing fruit to get Windstruck with chance for Twisted",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 666;
            const baseFruits = 3;
            const baseTwistedChance = 18.2;
            const baseJumpBonus = 14;
            const fruits = baseFruits + (0.15 * kg);
            const twistedChance = baseTwistedChance + (kg / 4);
            const jumpBonus = baseJumpBonus + (kg / 4);
            
            const secondsMod = baseSeconds * modifier;
            const fruitsMod = baseFruits * modifier;
            const twistedChanceMod = baseTwistedChance * modifier;
            const jumpBonusMod = baseJumpBonus * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const finalSeconds = Math.max(1, adjustedBaseSeconds - (6 * kg));
            const fruitsTotal = fruits + fruitsMod;
            const twistedChanceTotal = twistedChance + twistedChanceMod;
            const jumpBonusTotal = jumpBonus + jumpBonusMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(finalSeconds)}</strong>, flaps its wings and sends out ripples of wind causing <strong>${fruitsTotal.toFixed(2)}</strong> random fruit to get Windstruck with a <strong>${twistedChanceTotal.toFixed(2)}%</strong> chance for Twisted to be applied as well!\n\nGrants additional <strong>${jumpBonusTotal.toFixed(2)}%</strong> increase to player jump height${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases flapping time by 6 seconds, increases fruit affected by 0.15, increases Twisted chance by 0.25%, and increases jump height by 0.25%"
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
