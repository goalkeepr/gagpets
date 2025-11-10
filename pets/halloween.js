import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const HALLOWEEN_PETS = {
    crow: {
        name: "Crow",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/f/fa/Crow.png",
            fallback: "🦅"
        },
        type: "bird",
        rarity: "Common",
        source: "Grave Digging",
        probability: 50,
        obtainable: true,
        description: "Spooky type plants have increased growth speed",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Multiplier Max: 16.00 (13.20 🌈), Range Max: 112.00 (86.40 🌈)";
            
            const baseMultiplier = 1.4;
            const baseRange = 32;
            
            const multiplierMod = baseMultiplier * modifier;
            const rangeMod = baseRange * modifier;
            
            const adjustedBaseMultiplier = baseMultiplier + multiplierMod;
            const multiplier = Math.min(3, adjustedBaseMultiplier + (0.1 * kg));
            const range = Math.min(60, baseRange + rangeMod + (0.25 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Spooky type plants within <strong>${range.toFixed(1)}</strong> studs have <strong>${multiplier.toFixed(2)}x</strong> increased growth speed${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases multiplier by 0.1x (max 3x) and increases range by 0.25 studs (max 60)"
    },

    goat: {
        name: "Goat",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/5/52/Goat.png",
            fallback: "🐐"
        },
        type: "mammal",
        rarity: "Uncommon",
        source: "Creepy Critters Shop",
        probability: 40,
        obtainable: true,
        description: "Rams and launches random players",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 81.56 (48.94 🌈)";
            
            const baseCooldown = 522;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(261, adjustedBaseCooldown - (3.2 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, goes to a random player and rams them, knocking and launching them away${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 3.2s (min 261s)"
    },

    goblin: {
        name: "Goblin",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/d/d2/Goblin.png",
            fallback: "👺"
        },
        type: "humanoid",
        rarity: "Rare",
        source: "Grave Digging",
        probability: 30,
        obtainable: true,
        description: "Carries random players to you",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 52.00 (31.60 🌈)";
            
            const baseCooldown = 612;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(300, adjustedBaseCooldown - (6 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, goes to another random player and carries them and brings them to you! Player can jump to be released${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 6s (min 300s)"
    },

    darkspriggan: {
        name: "Dark Spriggan",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/d/dd/Dark_Spriggan.png",
            fallback: "🌿"
        },
        type: "plant",
        rarity: "Mythical",
        source: "Creepy Critters Shop",
        probability: 5,
        obtainable: true,
        description: "Spreads Blight mutations to nearby fruits",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 121.67 (92.47 🌈), Chance Max: 100.00 (96.47 🌈), Range Max: 100.00 (93.68 🌈)";
            
            const baseCooldown = 730;
            const baseChance = 15;
            const baseRange = 30;
            const baseMaxAmount = 35;
            
            const cooldownMod = baseCooldown * modifier;
            const chanceMod = baseChance * modifier;
            const rangeMod = baseRange * modifier;
            const maxAmountMod = baseMaxAmount * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(600, adjustedBaseCooldown - (6 * kg));
            const chance = Math.min(30, baseChance + chanceMod + (0.15 * kg));
            const range = Math.min(60, baseRange + rangeMod + (0.3 * kg));
            const maxAmount = Math.min(60, baseMaxAmount + maxAmountMod + (0.1 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, spreads its roots and nearest <strong>${Math.floor(maxAmount)}</strong> fruit within <strong>${range.toFixed(1)}</strong> studs have a <strong>${chance.toFixed(2)}%</strong> chance to get the Blight mutation${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 6s (min 600s), increases chance by 0.15% (max 30%), increases range by 0.3 studs (max 60), and increases max fruit affected by 0.1 (max 60)"
    },

    hexserpent: {
        name: "Hex Serpent",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/6/6d/HexSerpent.png",
            fallback: "🐍"
        },
        type: "reptile",
        rarity: "Divine",
        source: "Grave Digging",
        probability: 1,
        obtainable: true,
        description: "Performs ritual consuming plants in Hex Circle cosmetic for rewards",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 137.14 (105.14 🌈)";
            
            const baseCooldown = 960;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(240, adjustedBaseCooldown - (3.5 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `You must plant 5 single-harvest plants in a Hex Circle cosmetic and every <strong>${Utils.formatTime(cooldown)}</strong>: The Hex Serpent will perform a ritual, consuming the plants, granting random rewards! The rarer plants and better variants grant better effects${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 3.5s (min 240s)"
    },

    ghostlydarkspriggan: {
        name: "Ghostly Dark Spriggan",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/8c/Ghostly_Dark_Spriggan_Icon.png",
            fallback: "👻"
        },
        type: "plant",
        rarity: "Mythical",
        source: "Creepy Critters Shop",
        probability: 5,
        obtainable: true,
        description: "Spreads Blight or rare Necrotic mutations to nearby fruits",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 104.29 (79.96 🌈), Chance Max: 100.00 (96.47 🌈), Range Max: 100.00 (88.75 🌈)";
            
            const baseCooldown = 730;
            const baseChance = 30;
            const baseRange = 45;
            const baseMaxAmount = 55;
            
            const cooldownMod = baseCooldown * modifier;
            const chanceMod = baseChance * modifier;
            const rangeMod = baseRange * modifier;
            const maxAmountMod = baseMaxAmount * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(300, adjustedBaseCooldown - (3.5 * kg));
            const chance = Math.min(60, baseChance + chanceMod + (0.3 * kg));
            const range = Math.min(90, baseRange + rangeMod + (0.45 * kg));
            const maxAmount = Math.min(110, baseMaxAmount + maxAmountMod + (0.2 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, spreads its roots and nearest <strong>${Math.floor(maxAmount)}</strong> fruit within <strong>${range.toFixed(1)}</strong> studs have a <strong>${chance.toFixed(2)}%</strong> chance to get the Blight or a rare chance for Necrotic mutation instead${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 3.5s (min 300s), increases chance by 0.3% (max 60%), increases range by 0.45 studs (max 90), and increases max fruit affected by 0.2 (max 110)"
    },

    scarab: {
        name: "Scarab",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/7e/Scarab_GAG.png",
            fallback: "🪲"
        },
        type: "insect",
        rarity: "Uncommon",
        source: "Spooky Chest",
        probability: 40,
        obtainable: true,
        description: "Spooky type plants have increased growth size",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Multiplier Max: 6.40 (5.97 🌈)";
            
            const baseRange = 32;
            const baseMultiplier = 0.32;
            
            const rangeMod = baseRange * modifier;
            const multiplierMod = baseMultiplier * modifier;
            
            const range = Math.min(60, baseRange + rangeMod + (0.25 * kg));
            const multiplier = Math.min(0.64, baseMultiplier + multiplierMod + (0.05 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Spooky type plants within <strong>${range.toFixed(1)}</strong> studs have <strong>${multiplier.toFixed(2)}x</strong> increased growth size${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases range by 0.25 studs (max 60) and increases multiplier by 0.05x (max 0.64x)"
    },

    tombmarmot: {
        name: "Tomb Marmot",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/5/50/TombMarmot.png",
            fallback: "🦫"
        },
        type: "mammal",
        rarity: "Legendary",
        source: "Spooky Chest",
        probability: 10,
        obtainable: true,
        description: "Hides in Tombstones for Graveyard cosmetic rewards",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 70.00 (56.00 🌈)";
            
            const baseCooldown = 700;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(110, adjustedBaseCooldown - (3 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, digs down and hides in a random Tombstone. Going to the tombstone awards a random Graveyard cosmetic${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 3s (min 110s)"
    },

    mummy: {
        name: "Mummy",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/70/Mummy.png",
            fallback: "🧟"
        },
        type: "humanoid",
        rarity: "Divine",
        source: "Spooky Chest",
        probability: 1,
        obtainable: true,
        description: "Provides bonus weight to pets from chests",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Weight Bonus Max: 11.00 (8.80 🌈)";
            
            const baseWeightBonus = 0.55;
            const amountMod = baseWeightBonus * modifier;
            const amount = Math.min(0.5, baseWeightBonus + amountMod + (0.02 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Pets you get from chest have a bonus 0.1 - <strong>${amount.toFixed(2)} KG</strong> to their base weight! (Max 3.5 KG)${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases bonus weight by 0.02 KG (max 0.5 KG)"
    },

    ghostlyspookyscarab: {
        name: "Ghostly Spooky Scarab",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/7e/Scarab_GAG.png",
            fallback: "👻"
        },
        type: "insect",
        rarity: "Uncommon",
        source: "Exotic Spooky Chest",
        probability: 40,
        obtainable: true,
        description: "Enhanced Spooky type plants growth size boost",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Multiplier Max: 9.60 (9.20 🌈)";
            
            const baseRange = 45;
            const baseMultiplier = 0.52;
            
            const rangeMod = baseRange * modifier;
            const multiplierMod = baseMultiplier * modifier;
            
            const range = Math.min(90, baseRange + rangeMod + (0.25 * kg));
            const multiplier = Math.min(1, baseMultiplier + multiplierMod + (0.05 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Spooky type plants within <strong>${range.toFixed(1)}</strong> studs have <strong>${multiplier.toFixed(2)}x</strong> increased growth size${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases range by 0.25 studs (max 90) and increases multiplier by 0.05x (max 1x)"
    },

    ghostlytombmarmot: {
        name: "Ghostly Tomb Marmot",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/72/GhostlyTombMarmot.png",
            fallback: "👻"
        },
        type: "mammal",
        rarity: "Legendary",
        source: "Exotic Spooky Chest",
        probability: 10,
        obtainable: true,
        description: "Enhanced Tombstone hiding for Graveyard cosmetic rewards",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 40.00 (31.43 🌈)";
            
            const baseCooldown = 600;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(80, adjustedBaseCooldown - (2 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, digs down and hides in a random Tombstone. Going to the tombstone awards a random Graveyard cosmetic${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 2s (min 80s)"
    },

    ghostlymummy: {
        name: "Ghostly Mummy",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/a/af/GhostlyMummy.png",
            fallback: "👻"
        },
        type: "humanoid",
        rarity: "Divine",
        source: "Exotic Spooky Chest",
        probability: 1,
        obtainable: true,
        description: "Dual ability: Provides bonus weight to chest pets and applies Gold to plants near Sarcophagus",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Weight Bonus Max: 5.50 (3.60 🌈), Cooldown Min: 95.14 (76.11 🌈), Duration Max: 22.00 (20.00 🌈)";
            
            // First ability - Bonus weight to chest pets (passive)
            const baseAmount = 0.38;
            const amountMod = baseAmount * modifier;
            const amount = Math.min(0.6, baseAmount + amountMod + (0.04 * kg));
            
            // Second ability - Apply Gold near Sarcophagus
            const baseCooldown = 666;
            const baseRange = 45;
            const baseDuration = 44;
            const maxDuration = 300;
            
            const cooldownMod = baseCooldown * modifier;
            const rangeMod = baseRange * modifier;
            const durationMod = baseDuration * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(333, adjustedBaseCooldown - (3.5 * kg));
            const range = Math.min(90, baseRange + rangeMod + (0.25 * kg));
            const duration = Math.min(88, baseDuration + durationMod + (2 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>Dual Ability:</strong><br>Pets you get from chest have a bonus 0.1 - <strong>${amount.toFixed(2)} KG</strong> to their base weight! (Max 3.5 KG)<br>Every <strong>${Utils.formatTime(cooldown)}</strong> goes to a Sarcophagus cosmetic in your garden and applies Gold to the nearest plant in <strong>${range.toFixed(1)}</strong> studs for <strong>${duration.toFixed(0)}s</strong>! Target plant can't exceed <strong>${maxDuration}s</strong> of being gold${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases weight bonus by 0.04 KG (max 0.6 KG), decreases cooldown by 3.5s (min 333s), increases range by 0.25 studs (max 90), and increases duration by 2s (max 88s)"
    },

    lich: {
        name: "Lich",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/86/Lich.png",
            fallback: "💀"
        },
        type: "undead",
        rarity: "Divine",
        source: "Lich Crystal",
        probability: 1,
        obtainable: true,
        description: "Dual ability: Boosts Spooky plants and provides XP to Halloween pets",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Variant Max: 18.00 (15.60 🌈), Growth Max: 16.00 (13.20 🌈), Size Max: 11.60 (9.92 🌈), XP Max: 52.00 (46.40 🌈)";
            
            // First ability - Spooky plant bonuses (passive)
            const baseVariant = 0.6;
            const baseGrowth = 1.4;
            const baseSize = 0.42;
            const baseRange = 32;
            
            const variantMod = baseVariant * modifier;
            const growthMod = baseGrowth * modifier;
            const sizeMod = baseSize * modifier;
            const rangeMod = baseRange * modifier;
            
            const variant = Math.min(1.5, baseVariant + variantMod + (0.05 * kg));
            const growth = Math.min(3, baseGrowth + growthMod + (0.1 * kg));
            const size = Math.min(1, baseSize + sizeMod + (0.05 * kg));
            const range = Math.min(60, baseRange + rangeMod + (0.25 * kg));
            
            // Second ability - XP bonus to Halloween pets (passive)
            const baseXP = 1.4;
            const xpMod = baseXP * modifier;
            const xp = Math.min(4, baseXP + xpMod + (0.05 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>Dual Ability:</strong><br>Spooky type plants within <strong>${range.toFixed(1)}</strong> studs have increased <strong>${variant.toFixed(2)}x</strong> variant chance, <strong>${growth.toFixed(2)}x</strong> growth speed and <strong>${size.toFixed(2)}x</strong> size bonus!<br>All active Halloween type pets gain an additional <strong>${xp.toFixed(2)} XP/s</strong>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases variant multiplier by 0.05x (max 1.5x), growth by 0.1x (max 3x), size by 0.05x (max 1x), range by 0.25 studs (max 60), and Halloween pet XP by 0.05 XP/s (max 4 XP/s)"
    },

    woody: {
        name: "Woody",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/25/Woody.png",
            fallback: "🤠"
        },
        type: "humanoid",
        rarity: "Legendary",
        source: "Admin Abuse",
        probability: 10,
        obtainable: true,
        description: "Dances to apply Leeched mutations to fruits",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 70.77 (52.31 🌈)";
            
            const baseCooldown = 600;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(140, adjustedBaseCooldown - (6.5 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, goes to nearby fruit and dances, applying Leeched mutation${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 6.5s (min 140s)"
    }
};
