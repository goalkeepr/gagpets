// Food pets module
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const foodPets = {
    bagelbunny: {
        name: "Bagel Bunny",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/5/51/BagelBunny.png",
            fallback: "🥯"
        },
        type: "food",
        rarity: "Uncommon",
        description: "Eats carrots for value bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 45;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(5, adjustedBaseSeconds - kg);
            const multiplier = 5 + (0.05 * kg);
            
            const multiplierMod = 5 * modifier;
            const multiplierTotal = multiplier + multiplierMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, eats a carrot for <strong>${multiplierTotal.toFixed(2)}x</strong> value bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 1 second and increases multiplier by 0.05x"
    },
    pancakemole: {
        name: "Pancake Mole",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/26/PancakeMole.png",
            fallback: "🥞"
        },
        type: "food",
        rarity: "Rare",
        description: "Digs underground to find treasure",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 80;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(10, adjustedBaseSeconds - kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, digs down underground to find treasure. Can dig up gear or sheckles${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 1 second (minimum 10 seconds)"
    },
    sushibear: {
        name: "Sushi Bear",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/5/5a/SushiBear.png",
            fallback: "🍣"
        },
        type: "food",
        rarity: "Legendary",
        description: "Chills nearby fruits and feeds other pets",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds1 = 80;
            const baseSeconds2 = 670;
            const seconds1Mod = baseSeconds1 * modifier;
            const seconds2Mod = baseSeconds2 * modifier;
            const adjustedBaseSeconds1 = baseSeconds1 - seconds1Mod;
            const adjustedBaseSeconds2 = baseSeconds2 - seconds2Mod;
            const seconds1 = Math.max(10, adjustedBaseSeconds1 - kg);
            const seconds2 = Math.max(100, adjustedBaseSeconds2 - (3.5 * kg));
            const chance = 15 + (0.15 * kg);
            const amount = Math.min(0.5, 0.01);  // Fixed: no kg scaling, max 0.5
            
            const chanceMod = 15 * modifier;
            const amountMod = 0.01 * modifier;
            const chanceTotal = chance + chanceMod;
            const amountTotal = Math.min(0.5, amount + amountMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds1)}</strong>, <strong>${chanceTotal.toFixed(1)}%</strong> chance a nearby fruit becomes Chilled or Frozen${displayText}!\n\nEvery <strong>${Utils.formatTime(seconds2)}</strong>, flings a sushi towards a random pet and feeds it for <strong>${(amountTotal * 100).toFixed(1)}%</strong> of its hunger!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldowns by 1 and 3.5 seconds respectively (minimums 10s and 100s), and increases chill chance by 0.15%"
    },
    spaghettisloth: {
        name: "Spaghetti Sloth",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/8f/SpaghettiSloth.png",
            fallback: "🍝"
        },
        type: "food",
        rarity: "Legendary",
        description: "Cooks nearby fruits with pasta mutations",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 845;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(200, adjustedBaseSeconds - (7.5 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to a nearby fruit and does-a-cooking! Applying Pasta, Sauce or Meatball mutation${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 7.5 seconds (minimum 200 seconds)"
    },
    frenchfryferret: {
        name: "French Fry Ferret",
        icon: ICONS.FRENCHFRYFERRET,
        type: TYPES.SPECIALTY,
        rarity: RARITIES.EPIC,
        source: "Gourmet Egg",
        probability: 1,
        obtainable: true,
        description: "Increases pet levels",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 3632;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1200, adjustedBaseSeconds - (36 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, increases a random pet's level by 1! Ability cannot be mimicked or refreshed${displayText}.`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 36 seconds"
    },
    mochimouse: {
        name: "Mochi Mouse",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/78/MochiMouse.png",
            fallback: "🍡"
        },
        type: "food",
        rarity: "Legendary",
        description: "Provides XP bonuses to Food type pets",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseXpBonus = 0.75;
            const xpBonus = baseXpBonus + (0.15 * kg);
            
            const xpBonusMod = baseXpBonus * modifier;
            const xpBonusTotal = xpBonus + xpBonusMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All active Food type pets gain an additional <strong>${xpBonusTotal.toFixed(2)} XP/s</strong>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases Food type pets' XP bonus by 0.15 XP/s"
    }
};
