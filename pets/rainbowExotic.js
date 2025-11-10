import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

const rainbowExoticPets = {
    rainbowParasaurolophus: {
        name: "Rainbow Parasaurolophus",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/9f/RainbowParasaurolophus.png",
            fallback: "🦕"
        },
        type: "dinosaur",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Reduces cosmetic crate open times with chance for multiplied effect",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 34.44 (25.33 🌈)";
            
            const baseCooldown = 41;
            const baseAmount = 160;
            const baseChance = 51;
            const baseMultiplier = 3;
            
            const cooldown = Math.max(10, baseCooldown - (0.9 * kg));
            const amount = baseAmount + (1.3 * kg);
            const chance = baseChance + (0.5 * kg);
            const multiplier = baseMultiplier + (0.4 * kg);
            
            const cooldownMod = baseCooldown * modifier;
            const amountMod = baseAmount * modifier;
            const chanceMod = baseChance * modifier;
            const multiplierMod = baseMultiplier * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldownTotal = Math.max(10, adjustedBaseCooldown - (0.9 * kg));
            const amountTotal = amount + amountMod;
            const chanceTotal = chance + chanceMod;
            const multiplierTotal = multiplier + multiplierMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${cooldownTotal.toFixed(1)} seconds</strong>, goes to the cosmetic crate with the highest open time, and reduces its open time by <strong>${amountTotal.toFixed(1)} seconds</strong>! There is a <strong>${chanceTotal.toFixed(1)}%</strong> chance for open time reduction to be multiplied by <strong>${multiplierTotal.toFixed(1)}x</strong>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 0.9s (min 10s), increases reduction amount by 1.3s, increases chance by 0.5%, and increases multiplier by 0.4x"
    },

    rainbowIguanodon: {
        name: "Rainbow Iguanodon",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/f/fb/RainbowIguanodon.png",
            fallback: "🦕"
        },
        type: "dinosaur",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Provides XP bonus to all active Dinosaur type pets",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            const baseChance = 1.2;
            const chance = baseChance + (0.12 * kg);
            
            const chanceMod = baseChance * modifier;
            const chanceTotal = chance + chanceMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All active Dinosaur type pets gain an additional <strong>${chanceTotal.toFixed(2)} XP/s</strong>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases Dinosaur pets' XP bonus by 0.12 XP/s"
    },

    rainbowPachycephalosaurus: {
        name: "Rainbow Pachycephalosaurus",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/97/RainbowPachycephalosaurus.png",
            fallback: "🦕"
        },
        type: "dinosaur",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Provides chance to duplicate crafted items",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Duplication Chance Max: 63.33 (59.33 🌈)";
            
            const baseChance = 12;
            const chance = Math.min(50, baseChance + (0.6 * kg));
            
            const chanceMod = baseChance * modifier;
            const chanceTotal = Math.min(50, chance + chanceMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Grants a <strong>${chanceTotal.toFixed(1)}%</strong> chance to duplicate a crafted item${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases duplication chance by 0.6% (max 50%)"
    },

    rainbowDilophosaurus: {
        name: "Rainbow Dilophosaurus",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/d/d8/RainbowDilophosaurus.png",
            fallback: "🦕"
        },
        type: "dinosaur",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Spits venom to advance pet cooldowns or grant XP",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 91.09 (71.00 🌈), Targets Max: 45.00 (42.00 🌈), Cooldown Advance Max: 80.00 (64.00 🌈), XP Grant Max: 62.50 (60.00 🌈)";
            
            const baseCooldown = 643;
            const baseNumber = 3;
            const baseAmountCD = 80;
            const baseAmountXP = 1000;
            
            const cooldown = Math.max(60, baseCooldown - (6.4 * kg));
            const number = Math.min(12, baseNumber + (0.2 * kg));
            const amountCD = Math.min(160, baseAmountCD + kg);
            const amountXP = Math.min(6000, baseAmountXP + (80 * kg));
            
            const cooldownMod = baseCooldown * modifier;
            const numberMod = baseNumber * modifier;
            const amountCDMod = baseAmountCD * modifier;
            const amountXPMod = baseAmountXP * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldownTotal = Math.max(60, adjustedBaseCooldown - (6.4 * kg));
            const numberTotal = Math.min(12, number + numberMod);
            const amountCDTotal = Math.min(160, amountCD + amountCDMod);
            const amountXPTotal = Math.min(6000, amountXP + amountXPMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldownTotal)}</strong>, opens its frills and spits out venom! The venom spreads to <strong>${numberTotal.toFixed(1)}</strong> other random pets, advancing cooldown by <strong>${amountCDTotal.toFixed(0)}</strong> OR granting <strong>${amountXPTotal.toFixed(0)} XP</strong>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 6.4s (min 1:00), increases targets by 0.2 (max 12), increases cooldown advance by 1s (max 160s), and increases XP by 80 (max 6000)"
    },

    rainbowAnkylosaurus: {
        name: "Rainbow Ankylosaurus",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/91/RainbowAnkylosaurus.png",
            fallback: "🦕"
        },
        type: "dinosaur",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Protects against fruit theft",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Theft Protection Max: 57.20 (44.64 🌈)";
            
            const baseChance = 31.4;
            const chance = Math.min(60, baseChance + (0.5 * kg));
            
            const chanceMod = baseChance * modifier;
            const chanceTotal = Math.min(60, chance + chanceMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `When another player steals fruit from you, grants a <strong>${chanceTotal.toFixed(1)}%</strong> chance you get the stolen fruit as well${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases theft protection chance by 0.5% (max 60%)"
    },

    rainbowSpinosaurus: {
        name: "Rainbow Spinosaurus",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/e/e7/RainbowSpinosaurusIcon.png",
            fallback: "🦕"
        },
        type: "dinosaur",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Devours and spreads mutations with favorited fruit priority",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            const baseCooldown = 912;
            const baseAmount = 6;
            
            const cooldown = Math.max(15, baseCooldown - (6 * kg));
            const amount = baseAmount + (0.4 * kg);
            
            const cooldownMod = baseCooldown * modifier;
            const amountMod = baseAmount * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldownTotal = Math.max(15, adjustedBaseCooldown - (6 * kg));
            const amountTotal = amount + amountMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldownTotal)}</strong>, devours a random mutation from <strong>${amountTotal.toFixed(1)}</strong> fruits in your garden each, then roars, spreading those mutations to 1 random fruit in your garden! Prioritizes applying mutations to a favorited fruit${displayText}.`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 6s (min 15s) and increases fruits affected by 0.4"
    },

    rainbowManekiNeko: {
        name: "Rainbow Maneki-neko",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/0e/RainbowManekiNeko.png",
            fallback: "🐱"
        },
        type: "other",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Enhanced fortune cat with improved fruit refund chances",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 95.00 (71.00 🌈), Refund Chance Max: 50.00 (40.00 🌈), Duration Max: 88.00 (72.00 🌈)";
            
            const baseCooldown = 72;
            const baseChance = 15;
            const baseDuration = 20;
            
            const cooldown = Math.max(15, baseCooldown - (0.6 * kg));
            const chance = Math.min(30, baseChance + (0.3 * kg));
            const duration = Math.min(42, baseDuration + (0.25 * kg));
            
            const cooldownMod = baseCooldown * modifier;
            const chanceMod = baseChance * modifier;
            const durationMod = baseDuration * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldownTotal = Math.max(15, adjustedBaseCooldown - (0.6 * kg));
            const chanceTotal = Math.min(30, chance + chanceMod);
            const durationTotal = Math.min(42, duration + durationMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldownTotal)}</strong>, waves and invites good fortune that grants <strong>${chanceTotal.toFixed(1)}%</strong> chance to refund fruit back to your inventory for <strong>${durationTotal.toFixed(1)}s</strong>! Rarer fruit have rarer chance to refund${displayText}.`;
        },
        perKgImpact: () => "Each additional kg decreases wave time by 0.6s (min 15s), increases refund chance by 0.3% (max 30%), and increases duration by 0.25s (max 42s)"
    },

    rainbowKodama: {
        name: "Rainbow Kodama",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/76/RainbowKodama.png",
            fallback: "🌳"
        },
        type: "other",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Enhanced tree spirit with improved Tranquil mutation chance",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Tranquil Mutation Max: 20.00 (16.00 🌈)";
            
            const baseChance = 8;
            const chance = Math.min(16, baseChance + (0.4 * kg));
            
            const chanceMod = baseChance * modifier;
            const chanceTotal = Math.min(16, chance + chanceMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${chanceTotal.toFixed(1)}%</strong> chance Zen type fruit gets Tranquil mutation after collecting${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases Tranquil mutation chance by 0.4% (max 16%)"
    },

    rainbowCorruptedKitsune: {
        name: "Rainbow Corrupted Kitsune",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/3/3f/RainbowCorruptedKitsune.png",
            fallback: "🦊"
        },
        type: "other",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Enhanced nine-tailed curse with improved corruption chance",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Corruption Chance Max: No Limit (100.00 🌈)";
            
            const baseCooldown = 630;
            const baseChance = 25;
            
            const cooldown = Math.max(30, baseCooldown - (3.6 * kg));
            const chance = Math.min(50, baseChance + (0.2 * kg));
            
            const cooldownMod = baseCooldown * modifier;
            const chanceMod = baseChance * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldownTotal = Math.max(30, adjustedBaseCooldown - (3.6 * kg));
            const chanceTotal = Math.min(50, chance + chanceMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${cooldownTotal.toFixed(1)} seconds</strong>, launches cursed energy at 9 different fruits. Each fruit has <strong>${chanceTotal.toFixed(1)}%</strong> to mutate with <span style="color: rgb(0, 85, 255);">Corrupt Chakra</span> with a very rare chance for <span style="color: rgb(0, 0, 255);">Corrupt Foxfire Chakra</span> instead${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cursed energy time by 3.6s (min 30s) and increases Corrupt Chakra chance by 0.2% (max 50%)"
    },

    rainbowBaconPig: {
        name: "Rainbow Bacon Pig",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/23/RainbowBaconPig.png",
            fallback: "🐷"
        },
        type: "mammal",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Enhanced aura that boosts variant chance for new fruits",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 75.00 (59.00 🌈)";
            
            const baseCooldown = 80;
            const baseDuration = 30;
            const baseRange = 30;
            const baseMultiplier = 3;
            
            const cooldown = Math.max(5, baseCooldown - kg);
            const duration = baseDuration + (0.15 * kg);
            const range = baseRange + (0.15 * kg);
            const multiplier = baseMultiplier + (0.01 * kg);
            
            const cooldownMod = baseCooldown * modifier;
            const durationMod = baseDuration * modifier;
            const rangeMod = baseRange * modifier;
            const multiplierMod = baseMultiplier * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldownTotal = Math.max(5, adjustedBaseCooldown - kg);
            const durationTotal = duration + durationMod;
            const rangeTotal = range + rangeMod;
            const multiplierTotal = multiplier + multiplierMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${cooldownTotal.toFixed(0)} seconds</strong>, emits an aura for <strong>${durationTotal.toFixed(2)} seconds</strong> granting <strong>${multiplierTotal.toFixed(2)}x</strong> chance for new fruit to grow as variants within <strong>${rangeTotal.toFixed(2)}</strong> studs${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 1s (min 5s), increases duration by 0.15s, increases range by 0.15 studs, and increases variant multiplier by 0.01x"
    },

    rainbowHotdogDaschund: {
        name: "Rainbow Hotdog Daschund",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/2e/RainbowHotdogDaschund.png",
            fallback: "🌭"
        },
        type: "food",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Drops mustard/ketchup puddles that boost pet performance",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 93.33 (66.67 🌈), XP Multiplier Max: 10.00 (4.00 🌈), Cooldown Boost Max: 8.80 (8.56 🌈), Duration Max: 100.00 (40.00 🌈)";
            
            const baseCooldown = 200;
            const baseMultiplier = 0.3;
            const baseAmount = 0.09;
            const baseDuration = 45;
            const baseRadius = 16;
            
            const cooldown = Math.max(60, baseCooldown - (1.5 * kg));
            const multiplier = Math.min(0.4, baseMultiplier + (0.01 * kg));
            const amount = Math.min(0.75, baseAmount + (0.075 * kg));
            const duration = Math.min(60, baseDuration + (0.15 * kg));
            const radius = Math.min(32, baseRadius + (0.08 * kg));
            
            const cooldownMod = baseCooldown * modifier;
            const multiplierMod = baseMultiplier * modifier;
            const amountMod = baseAmount * modifier;
            const durationMod = baseDuration * modifier;
            const radiusMod = baseRadius * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldownTotal = Math.max(60, adjustedBaseCooldown - (1.5 * kg));
            const multiplierTotal = Math.min(0.4, multiplier + multiplierMod);
            const amountTotal = Math.min(0.75, amount + amountMod);
            const durationTotal = Math.min(60, duration + durationMod);
            const radiusTotal = Math.min(32, radius + radiusMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${cooldownTotal.toFixed(0)} seconds</strong>, drops a <strong>${radiusTotal.toFixed(1)} stud</strong> mustard or ketchup puddle that lasts <strong>${durationTotal.toFixed(1)} seconds</strong>. Pets on mustard have their cooldowns tick by <strong>${amountTotal.toFixed(3)}</strong> faster and pets on ketchup gain <strong>${(multiplierTotal * 100).toFixed(1)}%</strong> more experience${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 1.5s (min 60s), increases XP multiplier by 1% (max 40%), increases cooldown boost by 0.075 (max 0.75), increases duration by 0.15s (max 60s), and increases radius by 0.08 studs (max 32)"
    },

    rainbowLobsterThermidor: {
        name: "Rainbow Lobster Thermidor",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/d/dd/LobsterThermidor.png",
            fallback: "🦞"
        },
        type: "food",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Dual ability: Applies both Molten and Meteoric mutations",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Molten Cooldown Min: 111.11 (80.00 🌈), Meteoric Cooldown Min: No Limit (84.71 🌈)";
            
            // First ability - Molten
            const baseCooldown1 = 700;
            const baseChance1 = 40;
            const cooldown1 = Math.max(200, baseCooldown1 - (4.5 * kg));
            const chance1 = baseChance1 + (0.2 * kg);
            
            // Second ability - Meteoric
            const baseCooldown2 = 1400;
            const baseChance2 = 20;
            const cooldown2 = Math.max(400, baseCooldown2 - (8.5 * kg));
            const chance2 = baseChance2 + (0.2 * kg);
            
            // Apply modifiers
            const cooldown1Mod = baseCooldown1 * modifier;
            const chance1Mod = baseChance1 * modifier;
            const cooldown2Mod = baseCooldown2 * modifier;
            const chance2Mod = baseChance2 * modifier;
            
            const adjustedBaseCooldown1 = baseCooldown1 - cooldown1Mod;
            const adjustedBaseCooldown2 = baseCooldown2 - cooldown2Mod;
            const cooldown1Total = Math.max(200, adjustedBaseCooldown1 - (4.5 * kg));
            const cooldown2Total = Math.max(400, adjustedBaseCooldown2 - (8.5 * kg));
            const chance1Total = chance1 + chance1Mod;
            const chance2Total = chance2 + chance2Mod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>Dual Ability:</strong><br>Every <strong>${Utils.formatTime(cooldown1Total)}</strong>, <strong>${chance1Total.toFixed(1)}%</strong> chance a nearby fruit becomes Molten!<br>Every <strong>${Utils.formatTime(cooldown2Total)}</strong>, <strong>${chance2Total.toFixed(1)}%</strong> chance a nearby fruit becomes Meteoric${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases Molten cooldown by 4.5s (min 3:20), decreases Meteoric cooldown by 8.5s (min 6:40), and increases both chances by 0.2%"
    },

    rainbowElk: {
        name: "Rainbow Elk",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/3/32/Elk.png",
            fallback: "🦌"
        },
        type: "mammal",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Enhanced berry fruit preservation with improved chances",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Berry Preservation Max: 100.00 (80.00 🌈)";
            
            const baseChance = 5;
            const chance = Math.min(10, baseChance + (0.05 * kg));
            
            // Apply modifiers
            const chanceMod = baseChance * modifier;
            const chanceTotal = Math.min(10, chance + chanceMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${chanceTotal.toFixed(2)}%</strong> chance berry fruit stays after collecting! Rarer plants have rarer chance to replant${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases berry preservation chance by 0.05% (max 10%)"
    },

    rainbowMandrake: {
        name: "Rainbow Mandrake",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/2f/MandrakePet.png",
            fallback: "🧄"
        },
        type: "plant",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Enhanced Mandrake with improved Rot mutation chance",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Rot Mutation Max: 46.67 (37.33 🌈)";
            
            const baseChance = 7;
            const chance = Math.min(14, baseChance + (0.15 * kg));
            
            // Apply modifiers
            const chanceMod = baseChance * modifier;
            const chanceTotal = Math.min(14, chance + chanceMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Harvesting Mandrake crops have a <strong>${chanceTotal.toFixed(2)}%</strong> chance to apply Rot mutation to a random fruit in your garden${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases Rot mutation chance by 0.15% (max 14%)"
    },

    rainbowGriffin: {
        name: "Rainbow Griffin",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/7b/GriffinPet.png",
            fallback: "🦅"
        },
        type: "mythical",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Enhanced Griffin that releases multiple cyclones",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Advance Max: 66.67 (53.33 🌈)";
            
            const baseCooldown = 615;
            const baseCooldownAmount = 100;
            const baseChance = 18;
            const cycloneAmount = 2; // Fixed at 2 cyclones
            
            const cooldown = Math.max(150, baseCooldown - (2 * kg));
            const cooldownAmount = Math.min(200, baseCooldownAmount + (1.5 * kg));
            const chance = Math.min(50, baseChance + (0.18 * kg));
            
            // Apply modifiers
            const cooldownMod = baseCooldown * modifier;
            const cooldownAmountMod = baseCooldownAmount * modifier;
            const chanceMod = baseChance * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldownTotal = Math.max(150, adjustedBaseCooldown - (2 * kg));
            const cooldownAmountTotal = Math.min(200, cooldownAmount + cooldownAmountMod);
            const chanceTotal = Math.min(50, chance + chanceMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldownTotal)}</strong>, flaunts its wings and releases <strong>${cycloneAmount}</strong> Cyclones. Pets struck have cooldown advanced by <strong>${cooldownAmountTotal.toFixed(1)}s</strong> and fruits struck have a <strong>${chanceTotal.toFixed(1)}%</strong> chance to get the Cyclonic mutation${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 2s (min 2:30), increases cooldown advance by 1.5s (max 200s), and increases Cyclonic chance by 0.18% (max 50%)"
    },

    rainbowCardinal: {
        name: "Rainbow Cardinal",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/1/1a/RainbowCardinal.png",
            fallback: "🐦"
        },
        type: "bird",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Enhanced Cardinal - All Magical type plants grow faster",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Growth Multiplier Max: 45.00 (41.00 🌈)";
            
            const baseRange = 45;
            const baseMultiplier = 2;
            const range = Math.min(60, baseRange); // Range doesn't scale with weight based on provided data
            const multiplier = Math.min(6.5, baseMultiplier + (0.1 * kg));
            
            // Apply modifiers
            const rangeMod = baseRange * modifier;
            const multiplierMod = baseMultiplier * modifier;
            const rangeTotal = Math.min(60, range + rangeMod);
            const multiplierTotal = Math.min(6.5, multiplier + multiplierMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All Magical type plants within <strong>${rangeTotal.toFixed(0)}</strong> studs grow <strong>${multiplierTotal.toFixed(1)}x</strong> faster${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases growth multiplier by 0.1x (max 6.5x)"
    },

    rainbowShroomie: {
        name: "Rainbow Shroomie",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/05/RainbowShroomie.png",
            fallback: "🍄"
        },
        type: "fungus",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Enhanced Shroomie - All nearby plants have increased size bonus for every Fungus type plant",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Size Multiplier Max: 6.00 (5.20 🌈)";
            
            const baseRange = 14.75;
            const baseMultiplier = 0.004;
            const range = Math.min(60, baseRange + (0.35 * kg));
            const multiplier = Math.min(0.01, baseMultiplier + (0.001 * kg));
            
            // Apply modifiers
            const rangeMod = baseRange * modifier;
            const multiplierMod = baseMultiplier * modifier;
            const rangeTotal = Math.min(60, range + rangeMod);
            const multiplierTotal = Math.min(0.01, multiplier + multiplierMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All nearby plants within <strong>${rangeTotal.toFixed(2)}</strong> studs will have increased <strong>${multiplierTotal.toFixed(3)}x</strong> size bonus for every Fungus type plant planted in your garden! (Max 300)${displayText}.`;
        },
        perKgImpact: () => "Each additional kg increases range by 0.35 studs (max 60) and increases size multiplier by 0.001x (max 0.01x)"
    },

    rainbowPhoenix: {
        name: "Rainbow Phoenix",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/b/b8/RainbowPhoenix.png",
            fallback: "🔥"
        },
        type: "mythical",
        rarity: "Rainbow Exotic",
        source: "Rainbow Exotic",
        probability: 0,
        obtainable: false,
        description: "Enhanced Phoenix - Dual ability: Provides enhanced age bonus to mutated pets and travels between fruits applying Flaming mutations",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Age Bonus Max: 72.00 (60.40 🌈), Mutation Chance Max: 100.00 (80.00 🌈), Fruit Amount Max: 25.00 (19.00 🌈)";
            
            // First ability - Pet mutation age bonus (enhanced)
            const baseChance1 = 5.8;
            const chance1 = Math.min(13, baseChance1 + (0.1 * kg));
            
            // Second ability - Flaming mutation (enhanced)
            const baseCooldown2 = 900;
            const baseChance2 = 30;
            const baseAmount = 6;
            const cooldown2 = Math.max(200, baseCooldown2 - (4.5 * kg));
            const chance2 = Math.min(60, baseChance2 + (0.3 * kg));
            const amount = Math.min(11, baseAmount + (0.2 * kg));
            
            // Apply modifiers
            const chance1Mod = baseChance1 * modifier;
            const cooldown2Mod = baseCooldown2 * modifier;
            const chance2Mod = baseChance2 * modifier;
            const amountMod = baseAmount * modifier;
            
            const chance1Total = Math.min(13, chance1 + chance1Mod);
            const adjustedBaseCooldown2 = baseCooldown2 - cooldown2Mod;
            const cooldown2Total = Math.max(200, adjustedBaseCooldown2 - (4.5 * kg));
            const chance2Total = Math.min(60, chance2 + chance2Mod);
            const amountTotal = Math.min(11, amount + amountMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>Dual Ability:</strong><br>Pets taken from the pet mutation machine have a bonus <strong>2 - ${chance1Total.toFixed(1)}</strong> age to their age value!<br>Every <strong>${Utils.formatTime(cooldown2Total)}</strong>, travels between <strong>${amountTotal.toFixed(1)}</strong> random fruit in your garden which get the Flaming mutation! Fruits passed have <strong>${chance2Total.toFixed(1)}%</strong> chance to mutated as well${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases age bonus by 0.1 (max 13), decreases travel cooldown by 4.5s (min 3:20), increases mutation chance by 0.3% (max 60%), and increases fruit amount by 0.2 (max 11)"
    },

    ghostlyBat: {
        name: "Ghostly Bat",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/a/ad/Bat.png",
            fallback: "🦇"
        },
        type: "mammal",
        rarity: "Uncommon",
        source: "Rainbow Exotic",
        probability: 45,
        obtainable: true,
        description: "Grants Spooky plants variant chance bonus in range",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Multiplier Max: 44.00 (39.20 🌈), Range Max: No Limit (No Limit 🌈)";
            
            const baseMultiplier = 1.2;
            const baseRange = 50;
            
            const multiplierMod = baseMultiplier * modifier;
            const rangeMod = baseRange * modifier;
            
            const adjustedBaseMultiplier = baseMultiplier + multiplierMod;
            const multiplier = Math.min(3.4, adjustedBaseMultiplier + (0.05 * kg));
            
            const adjustedBaseRange = baseRange + rangeMod;
            const range = Math.min(100, adjustedBaseRange + (0.25 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Grants Spooky plants within <strong>${range.toFixed(1)}</strong> studs a <strong>${multiplier.toFixed(2)}x</strong> variant chance bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases multiplier by 0.05x (max 3.4x) and increases range by 0.25 studs (max 100)"
    },

    ghostlyBoneDog: {
        name: "Ghostly Bone Dog",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/07/Bone_Dog.png",
            fallback: "🦴"
        },
        type: "mammal",
        rarity: "Rare",
        source: "Rainbow Exotic",
        probability: 25,
        obtainable: true,
        description: "Digs up random seeds periodically",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 35.00 (27.00 🌈), Chance Max: no limit (no limit 🌈)";
            
            const baseCooldown = 40;
            const baseChance = 30;
            
            const cooldownMod = baseCooldown * modifier;
            const chanceMod = baseChance * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(5, adjustedBaseCooldown - (1 * kg));
            
            const adjustedBaseChance = baseChance + chanceMod;
            const chance = adjustedBaseChance + (0.05 * kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, <strong>${chance.toFixed(2)}%</strong> chance to dig up a random seed${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 1s (min 5s) and increases chance by 0.05%"
    },

    ghostlySpider: {
        name: "Ghostly Spider",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/84/Spider.png",
            fallback: "🕷️"
        },
        type: "insect",
        rarity: "Legendary",
        source: "Rainbow Exotic",
        probability: 18,
        obtainable: true,
        description: "Weaves webs that boost pet cooldowns and plant growth",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 51.43 (34.00 🌈), Range Max: 0.00 (0.00 🌈), Duration Max: No Limit (No Limit 🌈), AmountPet Max: 50.00 (10.00 🌈), AmountPlant Max: No Limit (No Limit 🌈)";
            
            const baseCooldown = 244;
            const baseRange = 40;
            const baseDuration = 20;
            const baseAmountPet = 2;
            const baseAmountPlant = 30;
            
            const cooldownMod = baseCooldown * modifier;
            const rangeMod = baseRange * modifier;
            const durationMod = baseDuration * modifier;
            const amountPetMod = baseAmountPet * modifier;
            const amountPlantMod = baseAmountPlant * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(100, adjustedBaseCooldown - (2.8 * kg));
            
            const adjustedBaseRange = baseRange + rangeMod;
            const range = Math.min(40, adjustedBaseRange + (0.18 * kg));
            
            const adjustedBaseDuration = baseDuration + durationMod;
            const duration = Math.min(40, adjustedBaseDuration + (0.1 * kg));
            
            const adjustedBaseAmountPet = baseAmountPet + amountPetMod;
            const amountPet = Math.min(2.5, adjustedBaseAmountPet + (0.01 * kg));
            
            const adjustedBaseAmountPlant = baseAmountPlant + amountPlantMod;
            const amountPlant = Math.min(60, adjustedBaseAmountPlant + (0.15 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, weaves a <strong>${range.toFixed(1)}</strong> stud web that lasts for <strong>${Utils.formatTime(duration)}</strong>. Pets on the web advance cooldown an extra <strong>${amountPet.toFixed(2)}s</strong> every second & plants grow an additional <strong>${amountPlant.toFixed(1)}s</strong> every second${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 2.8s (min 100s), increases range by 0.18 studs (max 40), increases duration by 0.1s (max 40s), increases pet cooldown advance by 0.01s/s (max 2.5s/s), and increases plant growth by 0.15s/s (max 60s/s)"
    },

    ghostlyBlackCat: {
        name: "Ghostly Black Cat",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/f/fb/Blackcat.png",
            fallback: "🐈‍⬛"
        },
        type: "mammal",
        rarity: "Mythical",
        source: "Rainbow Exotic",
        probability: 8.5,
        obtainable: true,
        description: "Naps near Witch's Cauldron to enlarge nearby fruits",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 20.50 (9.40 🌈), Range Max: No Limit (No Limit 🌈), Duration Max: No Limit (No Limit 🌈), Multiplier Max: 15.00 (11.00 🌈)";
            
            const baseCooldown = 111;
            const baseRange = 20;
            const baseDuration = 29.5;
            const baseMultiplier = 2;
            
            const cooldownMod = baseCooldown * modifier;
            const rangeMod = baseRange * modifier;
            const durationMod = baseDuration * modifier;
            const multiplierMod = baseMultiplier * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(70, adjustedBaseCooldown - (2 * kg));
            
            const adjustedBaseRange = baseRange + rangeMod;
            const range = Math.min(40, adjustedBaseRange + (0.1 * kg));
            
            const adjustedBaseDuration = baseDuration + durationMod;
            const duration = Math.min(60, adjustedBaseDuration + (0.15 * kg));
            
            const adjustedBaseMultiplier = baseMultiplier + multiplierMod;
            const multiplier = Math.min(3.5, adjustedBaseMultiplier + (0.1 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, goes to a Witch's Cauldron cosmetic and naps near it for <strong>${Utils.formatTime(duration)}</strong>. New fruit within <strong>${range.toFixed(1)}</strong> studs will be <strong>${multiplier.toFixed(2)}x</strong> larger${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 2s (min 70s), increases range by 0.1 studs (max 40), increases duration by 0.15s (max 60s), and increases multiplier by 0.1x (max 3.5x)"
    },

    ghostlyHeadlessHorseman: {
        name: "Ghostly Headless Horseman",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/3/3d/Headless_Horseman.png",
            fallback: "🐴"
        },
        type: "undead",
        rarity: "Prismatic",
        source: "Rainbow Exotic",
        probability: 0.5,
        obtainable: true,
        description: "Haunts pets and bestows chaotic mutations",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 60.17 (39.80 🌈), Level Min: 21.00 (8.80 🌈), Chance Max: 60.00 (48.00 🌈)";
            
            const baseCooldown = 1222; // in seconds (20.37 minutes)
            const baseLevel = 30.5;
            const baseChance = 12;
            
            const cooldownMod = baseCooldown * modifier;
            const levelMod = baseLevel * modifier;
            const chanceMod = baseChance * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(500, adjustedBaseCooldown - (12 * kg));
            
            const adjustedBaseLevel = baseLevel - levelMod;
            const level = Math.max(20, adjustedBaseLevel - (0.5 * kg));
            
            const adjustedBaseChance = baseChance + chanceMod;
            const chance = Math.min(24, adjustedBaseChance + (0.2 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <font color='#FFD700'><strong>${Utils.formatTime(cooldown)}</strong></font>, haunts a random level <font color='#FFD700'><strong>${level.toFixed(1)}</strong></font> pet without a mutation, resetting it to <font color='#FF5555'>level 1</font> and bestowing one of four chaotic mutations:\n\n<font color='#8C2DAF'>Dreadbound</font>, <font color='#FF5528'>Soulflame</font>, or <font color='#5AC8FF'>Spectral</font> — with a rare <font color='#FF0064'><strong>${chance.toFixed(1)}%</strong></font> chance for <font color='#FF0064'>Nightmare</font>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 12s (min 500s), decreases target level by 0.5 (min 20), and increases Nightmare chance by 0.2% (max 24%)"
    }
};

export { rainbowExoticPets as RAINBOW_EXOTIC_PETS };
