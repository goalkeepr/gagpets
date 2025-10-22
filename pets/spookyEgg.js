import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const SPOOKY_EGG_PETS = {
    bat: {
        name: "Bat",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/a/ad/Bat.png",
            fallback: "🦇"
        },
        type: "mammal",
        rarity: "Uncommon",
        source: "Spooky Egg",
        probability: 45,
        obtainable: true,
        description: "Grants Spooky plants variant chance bonus in range",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Multiplier Max: 18.00 (15.60 🌈), Range Max: 112.00 (86.40 🌈)";
            
            const baseMultiplier = 0.6;
            const baseRange = 32;
            
            const multiplierMod = baseMultiplier * modifier;
            const rangeMod = baseRange * modifier;
            
            const adjustedBaseMultiplier = baseMultiplier + multiplierMod;
            const multiplier = Math.min(1.5, adjustedBaseMultiplier + (0.05 * kg));
            
            const adjustedBaseRange = baseRange + rangeMod;
            const range = Math.min(60, adjustedBaseRange + (0.25 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Grants Spooky plants within <strong>${range.toFixed(1)}</strong> studs a <strong>${multiplier.toFixed(2)}x</strong> variant chance bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases multiplier by 0.05x (max 1.5x) and increases range by 0.25 studs (max 60)"
    },

    bonedog: {
        name: "Bone Dog",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/07/Bone_Dog.png",
            fallback: "🦴"
        },
        type: "mammal",
        rarity: "Rare",
        source: "Spooky Egg",
        probability: 25,
        obtainable: true,
        description: "Digs up random seeds periodically",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 75.00 (59.00 🌈), Chance Max: no limit (no limit 🌈)";
            
            const baseCooldown = 80;
            const baseChance = 15;
            
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

    spider: {
        name: "Spider",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/84/Spider.png",
            fallback: "🕷️"
        },
        type: "insect",
        rarity: "Legendary",
        source: "Spooky Egg",
        probability: 18,
        obtainable: true,
        description: "Weaves webs that boost pet cooldowns and plant growth",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 60.00 (39.67 🌈), Range Max: 100.00 (80.00 🌈), Duration Max: 100.00 (80.00 🌈), AmountPet Max: 50.00 (30.00 🌈), AmountPlant Max: 100.00 (80.00 🌈)";
            
            const baseCooldown = 488;
            const baseRange = 18;
            const baseDuration = 10;
            const baseAmountPet = 1;
            const baseAmountPlant = 15;
            
            const cooldownMod = baseCooldown * modifier;
            const rangeMod = baseRange * modifier;
            const durationMod = baseDuration * modifier;
            const amountPetMod = baseAmountPet * modifier;
            const amountPlantMod = baseAmountPlant * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(200, adjustedBaseCooldown - (4.8 * kg));
            
            const adjustedBaseRange = baseRange + rangeMod;
            const range = Math.min(36, adjustedBaseRange + (0.18 * kg));
            
            const adjustedBaseDuration = baseDuration + durationMod;
            const duration = Math.min(20, adjustedBaseDuration + (0.1 * kg));
            
            const adjustedBaseAmountPet = baseAmountPet + amountPetMod;
            const amountPet = Math.min(1.5, adjustedBaseAmountPet + (0.01 * kg));
            
            const adjustedBaseAmountPlant = baseAmountPlant + amountPlantMod;
            const amountPlant = Math.min(30, adjustedBaseAmountPlant + (0.15 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, weaves a <strong>${range.toFixed(1)}</strong> stud web that lasts for <strong>${Utils.formatTime(duration)}</strong>. Pets on the web advance cooldown an extra <strong>${amountPet.toFixed(2)}s</strong> every second & plants grow an additional <strong>${amountPlant.toFixed(1)}s</strong> every second${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 4.8s (min 200s), increases range by 0.18 studs (max 36), increases duration by 0.1s (max 20s), increases pet cooldown advance by 0.01s/s (max 1.5s/s), and increases plant growth by 0.15s/s (max 30s/s)"
    },

    blackcat: {
        name: "Black Cat",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/f/fb/Blackcat.png",
            fallback: "🐈‍⬛"
        },
        type: "mammal",
        rarity: "Mythical",
        source: "Spooky Egg",
        probability: 8.5,
        obtainable: true,
        description: "Naps near Witch's Cauldron to enlarge nearby fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 62.00 (37.60 🌈), Range Max: 100.00 (80.00 🌈), Duration Max: 90.00 (80.00 🌈), Multiplier Max: 100.00 (80.00 🌈)";
            
            const baseCooldown = 244;
            const baseRange = 10;
            const baseDuration = 14.5;
            const baseMultiplier = 1;
            
            const cooldownMod = baseCooldown * modifier;
            const rangeMod = baseRange * modifier;
            const durationMod = baseDuration * modifier;
            const multiplierMod = baseMultiplier * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(120, adjustedBaseCooldown - (2 * kg));
            
            const adjustedBaseRange = baseRange + rangeMod;
            const range = Math.min(20, adjustedBaseRange + (0.1 * kg));
            
            const adjustedBaseDuration = baseDuration + durationMod;
            const duration = Math.min(28, adjustedBaseDuration + (0.15 * kg));
            
            const adjustedBaseMultiplier = baseMultiplier + multiplierMod;
            const multiplier = Math.min(2, adjustedBaseMultiplier + (0.1 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, goes to a Witch's Cauldron cosmetic and naps near it for <strong>${Utils.formatTime(duration)}</strong>. New fruit within <strong>${range.toFixed(1)}</strong> studs will be <strong>${multiplier.toFixed(2)}x</strong> larger${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 2s (min 120s), increases range by 0.1 studs (max 20), increases duration by 0.15s (max 28s), and increases multiplier by 0.1x (max 2x)"
    },

    headlesshorseman: {
        name: "Headless Horseman",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/3/3d/Headless_Horseman.png",
            fallback: "🐴"
        },
        type: "undead",
        rarity: "Prismatic",
        source: "Spooky Egg",
        probability: 0.5,
        obtainable: true,
        description: "Haunts pets and bestows chaotic mutations",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 60.17 (39.67 🌈), Level Min: 41.00 (33.00 🌈), Chance Max: 60.00 (60.00 🌈)";
            
            const baseCooldown = 2444; // in seconds (40.73 minutes)
            const baseLevel = 50.5;
            const baseChance = 6;
            
            const cooldownMod = baseCooldown * modifier;
            const levelMod = baseLevel * modifier;
            const chanceMod = baseChance * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(1000, adjustedBaseCooldown - (24 * kg));
            
            const adjustedBaseLevel = baseLevel - levelMod;
            const level = Math.max(30, adjustedBaseLevel - (0.5 * kg));
            
            const adjustedBaseChance = baseChance + chanceMod;
            const chance = Math.min(12, adjustedBaseChance + (0.1 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <font color='#FFD700'><strong>${Utils.formatTime(cooldown)}</strong></font>, haunts a random level <font color='#FFD700'><strong>${level.toFixed(1)}</strong></font> pet without a mutation, resetting it to <font color='#FF5555'>level 1</font> and bestowing one of four chaotic mutations:\n\n<font color='#8C2DAF'>Dreadbound</font>, <font color='#FF5528'>Soulflame</font>, or <font color='#5AC8FF'>Spectral</font> — with a rare <font color='#FF0064'><strong>${chance.toFixed(1)}%</strong></font> chance for <font color='#FF0064'>Nightmare</font>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 24s (min 1000s), decreases target level by 0.5 (min 30), and increases Nightmare chance by 0.1% (max 12%)"
    }
};
