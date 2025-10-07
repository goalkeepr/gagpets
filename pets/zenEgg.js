import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';
import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';

const zenEggPets = {
    shibainu: {
        name: "Shiba Inu",
        icon: ICONS.SHIBAINU,
        type: "mammal",
        rarity: "Uncommon",
        description: "Independent spirit that digs up seeds with determination",
        source: "Zen Egg",
        probability: 40,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Min Digging Cooldown: 55.00 (43.00 🌈)";
            
            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(5, adjustedBaseSeconds - kg);
            
            const baseChance = 15;
            const chanceMod = baseChance * modifier;
            const adjustedBaseChance = baseChance + chanceMod;
            const chance = adjustedBaseChance + (0.05 * kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${chance.toFixed(1)}%</strong> chance to dig up a random seed${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases digging cooldown by 1 second (min 5s) and increases seed finding chance by 0.05%"
    },
    nihonzaru: {
        name: "Nihonzaru",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/d/db/Nihonzaru_.png",
            fallback: "🐒"
        },
        type: "mammal",
        rarity: "Rare",
        source: "Zen Egg",
        probability: 0,
        obtainable: false,
        description: "Just takes up space in your inventory. Does nothing.",
        calculate: (kg, modifierType = "none") => {
            return "This pet does nothing.";
        },
        perKgImpact: () => "Does nothing regardless of weight"
    },
    tanuki: {
        name: "Tanuki",
        icon: ICONS.TANUKI,
        type: "mythical",
        rarity: "Rare",
        description: "Shapeshifting raccoon dog that brings luck and mischief",
        source: "Zen Egg",
        probability: 20.82,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Min Mischief Time: 55.00 (40.00 🌈)";
            
            const baseSeconds = 300;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(80, adjustedBaseSeconds - (4 * kg));
            const luckBonus = 18 + (kg * 0.3);
            const mischiefChance = 12 + (kg * 0.2);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, causes mischief! Provides <strong>${luckBonus.toFixed(1)}%</strong> luck bonus and <strong>${mischiefChance.toFixed(1)}%</strong> chance for unexpected surprises${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases mischief time by 4 seconds (min 80s), increases luck by 0.3%, and increases surprise chance by 0.2%"
    },

    tanchozuru: {
        name: "Tanchozuru",
        icon: ICONS.TANCHOZURU,
        type: "mythical",
        rarity: "Legendary",
        description: "Sacred crane that meditates to apply Tranquil mutations to nearby fruits",
        source: "Zen Egg",
        probability: 4.60,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseCooldown = 627;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(60, adjustedBaseCooldown - (1 * kg));
            
            const duration = 10 + (0.1 * kg);
            const range = 15 + (0.1 * kg);
            const chance = 5 + (0.05 * kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, meditates for <strong>${Utils.formatTime(duration)}</strong>, nearby fruits in a <strong>${range.toFixed(1)}</strong> studs have a <strong>${chance.toFixed(2)}%</strong> chance every second to mutate into Tranquil!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 1 second (min 60s), increases duration by 0.1 seconds, increases range by 0.1 studs, and increases chance by 0.05%"
    },

    kappa: {
        name: "Kappa",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/84/Kappa_.png",
            fallback: "🥒"
        },
        type: "aquatic",
        rarity: "Mythical",
        description: "Sprays water to apply Wet mutations with chance for Bloodlit",
        source: "Zen Egg",
        probability: 3.50,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Min Spray Time: 107.00 (82.60 🌈)";
            
            const baseSeconds = 488;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(60, adjustedBaseSeconds - (4 * kg));
            const range = 25 + (kg / 4);
            const bloodlitChance = 10 + (kg / 10);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, sprays water on all fruits within <strong>${range.toFixed(1)}</strong> studs, applying Wet mutation. Has a <strong>${bloodlitChance.toFixed(1)}%</strong> to replace Wet mutations already on fruit with Bloodlit mutation!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases spray time by 4 seconds (min 60s), increases range by 0.25 studs, and increases bloodlit replacement chance by 0.1%"
    },

    kitsune: {
        name: "Kitsune",
        icon: ICONS.KITSUNE,
        type: "mythical",
        rarity: "Prismatic",
        source: "Zen Egg",
        probability: 0.08,
        obtainable: false,
        description: "Steals crops from other players with chakra mutations",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1344.5;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(60, adjustedBaseSeconds - (6 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to another player's crop, mutates it with <span style="color: rgb(255, 80, 65);">Chakra</span> then steals (duplicate) and gives it to you! Very rare chance to mutate with <span style="color: rgb(255, 0, 0);">Foxfire Chakra</span> mutation instead!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases stealing time by 6 seconds (min 60s)"
    }
};

export { zenEggPets as ZEN_EGG_PETS };
