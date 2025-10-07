import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const ENCHANTED_EGG_PETS = {
    ladybug: {
        name: "Ladybug",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/3/38/Ladybug.png",
            fallback: "🐞"
        },
        type: "insect",
        rarity: "Common",
        source: "Enchanted Egg",
        probability: 50,
        obtainable: true,
        description: "All flower type plants grow faster",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Multiplier Max: 51.00 (45.20 🌈)";
            
            const baseMultiplier = 1.45;
            const multiplier = Math.min(4, baseMultiplier + (0.05 * kg));
            const range = 30; // Fixed range of 30 studs
            
            // Apply modifiers
            const multiplierMod = baseMultiplier * modifier;
            const adjustedBaseMultiplier = baseMultiplier + multiplierMod;
            const multiplierTotal = Math.min(4, adjustedBaseMultiplier + (0.05 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All flower type plants within <strong>${range}</strong> studs grow <strong>${multiplierTotal.toFixed(2)}x</strong> faster${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases growth multiplier by 0.05x (max 4x)"
    },

    pixie: {
        name: "Pixie",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/22/Pixie.png",
            fallback: "🧚"
        },
        type: "mythical",
        rarity: "Rare",
        source: "Enchanted Egg",
        probability: 29,
        obtainable: true,
        description: "Spreads pixie dust to advance plant growth and make players levitate",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: 50.83 (32.33 🌈), Range Max: 60.00 (48.00 🌈)";
            
            const baseCooldown = 222;
            const baseDuration = 15;
            const baseRange = 15;
            
            const cooldown = Math.max(100, baseCooldown - (2.4 * kg));
            const duration = Math.min(30, baseDuration + (0.05 * kg));
            const range = Math.min(30, baseRange + (0.25 * kg));
            
            // Apply modifiers
            const cooldownMod = baseCooldown * modifier;
            const durationMod = baseDuration * modifier;
            const rangeMod = baseRange * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const adjustedBaseDuration = baseDuration + durationMod;
            const adjustedBaseRange = baseRange + rangeMod;
            
            const cooldownTotal = Math.max(100, adjustedBaseCooldown - (2.4 * kg));
            const durationTotal = Math.min(30, adjustedBaseDuration + (0.05 * kg));
            const rangeTotal = Math.min(30, adjustedBaseRange + (0.25 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldownTotal)}</strong>, spreads pixie dust for <strong>${durationTotal.toFixed(1)}s</strong>. All plants within <strong>${rangeTotal.toFixed(1)}</strong> studs will advance growth an extra 30 seconds every second! Also makes nearby players levitate${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 2.4s (min 1:40), increases duration by 0.05s (max 30s), and increases range by 0.25 studs (max 30)"
    },

    imp: {
        name: "Imp",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/b/b3/Imp.png",
            fallback: "👺"
        },
        type: "demonic",
        rarity: "Legendary",
        source: "Enchanted Egg",
        probability: 15,
        obtainable: true,
        description: "Playfully invites you to chase it for random rewards",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Replay Chance Max: no limit (no limit 🌈)";
            
            const baseChance = 15;
            const chance = Math.min(30, baseChance + (0.05 * kg));
            
            // Apply modifiers
            const chanceMod = baseChance * modifier;
            const adjustedBaseChance = baseChance + chanceMod;
            const chanceTotal = Math.min(30, adjustedBaseChance + (0.05 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>6:66m</strong>, the Imp will playfully invite you to chase it. Catching the Imp will grant a random reward! The Imp has a <strong>${chanceTotal.toFixed(1)}%</strong> chance to play again on successful chase${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases replay chance by 0.05% (max 30%)"
    },

    glimmeringsprite: {
        name: "Glimmering Sprite",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/a/a1/Glimmering_Sprite.png",
            fallback: "✨"
        },
        type: "mythical",
        rarity: "Mythical",
        source: "Enchanted Egg",
        probability: 5,
        obtainable: true,
        description: "Flies to nearby fruits and applies Glimmering mutation",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Cooldown Min: no limit (no limit 🌈)";
            
            const baseCooldown = 220;
            const cooldown = Math.max(60, baseCooldown - (1 * kg));
            
            // Apply modifiers
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldownTotal = Math.max(60, adjustedBaseCooldown - (1 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldownTotal)}</strong>, flies to a nearby fruit and enchants it, applying Glimmering mutation${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 1s (min 1:00)"
    },

    cockatrice: {
        name: "Cockatrice",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/09/Cockatrice.png",
            fallback: "🐉"
        },
        type: "mythical",
        rarity: "Mythical", // Assuming Mythical based on the context
        source: "Enchanted Egg",
        probability: 1,
        obtainable: true,
        description: "Dual ability: Screeches to turn fruits Silver/Gold and spits to apply Toxic mutations while advancing eggs/pets",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            const kgLimits = "Range Max: 80.00 (80.00 🌈), Spit Targets Max: 50.00 (50.00 🌈), Screech Cooldown Min: no limit (80.00 🌈), Spit Cooldown Min: no limit (91.43 🌈)";
            
            // First ability - Screech (Silver/Gold)
            const baseCooldown1 = 1000;
            const baseRange = 20;
            const baseChance = 20;
            const baseGoldChance = 1;
            
            const cooldown1 = Math.max(400, baseCooldown1 - (5 * kg));
            const range = Math.min(40, baseRange + (0.25 * kg));
            const chance = Math.min(40, baseChance + (0.05 * kg));
            const goldChance = Math.min(3, baseGoldChance + (0.01 * kg));
            
            // Second ability - Spit (Toxic/XP/Eggs)
            const baseCooldown2 = 625;
            const baseAmount = 5;
            const baseAmountEgg = 80;
            const baseAmountXP = 800;
            
            const cooldown2 = Math.max(180, baseCooldown2 - (3.5 * kg));
            const amount = Math.min(10, baseAmount + (0.1 * kg));
            const amountEgg = Math.min(150, baseAmountEgg + (0.5 * kg));
            const amountXP = Math.min(1500, baseAmountXP + (2.5 * kg));
            
            // Apply modifiers
            const cooldown1Mod = baseCooldown1 * modifier;
            const cooldown2Mod = baseCooldown2 * modifier;
            const chanceMod = baseChance * modifier;
            const goldChanceMod = baseGoldChance * modifier;
            const amountXPMod = baseAmountXP * modifier;
            
            const adjustedBaseCooldown1 = baseCooldown1 - cooldown1Mod;
            const adjustedBaseCooldown2 = baseCooldown2 - cooldown2Mod;
            const cooldown1Total = Math.max(400, adjustedBaseCooldown1 - (5 * kg));
            const cooldown2Total = Math.max(180, adjustedBaseCooldown2 - (3.5 * kg));
            const chanceTotal = Math.min(40, chance + chanceMod);
            const goldChanceTotal = Math.min(3, goldChance + goldChanceMod);
            const amountXPTotal = Math.min(1500, amountXP + amountXPMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>Dual Ability:</strong><br>Every <strong>${Utils.formatTime(cooldown1Total)}</strong>, screeches and all fruits within <strong>${range.toFixed(1)}</strong> studs have a <strong>${chanceTotal.toFixed(1)}%</strong> chance to turn Silver; <strong>${goldChanceTotal.toFixed(1)}%</strong> chance to turn Gold!<br>Every <strong>${Utils.formatTime(cooldown2Total)}</strong>, spits at <strong>${amount.toFixed(1)}</strong> different fruit/eggs/pets. Fruits get Toxic mutation, eggs advance by <strong>${amountEgg.toFixed(0)}</strong> seconds, pets gain <strong>${amountXPTotal.toFixed(0)}</strong> XP${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases screech cooldown by 5s (min 6:40), decreases spit cooldown by 3.5s (min 3:00), increases range by 0.25 studs (max 40), increases silver chance by 0.05% (max 40%), increases gold chance by 0.01% (max 3%), increases spit targets by 0.1 (max 10), increases egg advancement by 0.5s (max 150s), and increases XP gain by 2.5 (max 1500)"
    }
};
