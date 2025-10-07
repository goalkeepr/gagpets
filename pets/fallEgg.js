import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const FALL_EGG_PETS = {
    robin: {
        name: "Robin",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/1/1b/Robin.png",
            fallback: "🐦"
        },
        type: "bird",
        rarity: "Common",
        source: "Fall Egg",
        probability: 55,
        obtainable: true,
        description: "Provides decreased player size bonus",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Player Size Max: 100.00 (80.00 🌈)";
            
            const baseChance = 10;
            const chanceMod = baseChance * modifier;
            const adjustedBaseChance = baseChance + chanceMod;
            const chance = Math.min(20, adjustedBaseChance + (0.1 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Grants <strong>${chance.toFixed(1)}%</strong> decreased player size${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases player size decrease by 0.1% (max 20%)"
    },

    badger: {
        name: "Badger",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/f/ff/Badger.png",
            fallback: "🦡"
        },
        type: "mammal",
        rarity: "Rare",
        source: "Fall Egg",
        probability: 32.5,
        obtainable: true,
        description: "Digs around to displace ground and apply Cracked mutations",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 77.33 (56.53 🌈), Duration Max: 100.00 (80.00 🌈), Range Max: 80.00 (64.00 🌈), Chance Max: 100.00 (80.00 🌈)";

            const baseCooldown = 312;
            const baseDuration = 10;
            const baseRange = 20;
            const baseChance = 10;
            
            const cooldownMod = baseCooldown * modifier;
            const durationMod = baseDuration * modifier;
            const rangeMod = baseRange * modifier;
            const chanceMod = baseChance * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(80, adjustedBaseCooldown - (3 * kg));
            const duration = Math.min(20, baseDuration + durationMod + (0.1 * kg));
            const range = Math.min(40, baseRange + rangeMod + (0.25 * kg));
            const chance = Math.min(20, baseChance + chanceMod + (0.1 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, digs around for <strong>${Utils.formatTime(duration)}</strong>, displacing the ground. Nearby fruits within <strong>${range.toFixed(1)}</strong> studs have a <strong>${chance.toFixed(1)}%</strong> chance every second to get Cracked mutation${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 3s (min 80s), increases duration by 0.1s (max 20s), increases range by 0.25 studs (max 40), and increases chance by 0.1% (max 20%)"
    },

    grizzlybear: {
        name: "Grizzly Bear",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/94/GrizzlyBear.png",
            fallback: "🐻"
        },
        type: "mammal",
        rarity: "Legendary",
        source: "Fall Egg",
        probability: 10,
        obtainable: true,
        description: "Dual ability: Applies Fall mutations and increases player size",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Fall Cooldown Min: 105.00 (81.00 🌈), Fall Chance Max: no limit (no limit 🌈), Player Size Max: 80.00 (64.00 🌈)";

            // First ability - Fall mutation
            const baseCooldown1 = 240;
            const baseChance1 = 10;
            const cooldown1 = Math.max(30, baseCooldown1 - (2 * kg));
            const chance1 = Math.min(30, baseChance1 + (0.1 * kg));
            
            // Second ability - Player size increase (passive)
            const baseChance2 = 8;
            const chance2 = Math.min(16, baseChance2 + (0.1 * kg));
            
            // Apply modifiers
            const cooldown1Mod = baseCooldown1 * modifier;
            const chance1Mod = baseChance1 * modifier;
            const chance2Mod = baseChance2 * modifier;
            
            const adjustedBaseCooldown1 = baseCooldown1 - cooldown1Mod;
            const cooldown1Total = Math.max(30, adjustedBaseCooldown1 - (2 * kg));
            const chance1Total = Math.min(30, chance1 + chance1Mod);
            const chance2Total = Math.min(16, chance2 + chance2Mod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>Dual Ability:</strong><br>Every <strong>${Utils.formatTime(cooldown1Total)}</strong>, <strong>${chance1Total.toFixed(1)}%</strong> chance a nearby fruit gets the Fall mutation!<br>Grants <strong>${chance2Total.toFixed(1)}%</strong> increased player size${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases Fall cooldown by 2s (min 30s), increases Fall chance by 0.1% (max 30%), and increases player size by 0.1% (max 16%)"
    },

    barnowl: {
        name: "Barn Owl",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/c/cc/BarnOwl.png",
            fallback: "🦉"
        },
        type: "bird",
        rarity: "Mythical",
        source: "Fall Egg",
        probability: 1.5,
        obtainable: true,
        description: "Dual ability: Provides bonus weight to shop pets and XP to Fall type pets",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Shop Pet Weight Limit: 11.00 (9.20 🌈), XP Bonus Limit: 23.33 (21.33 🌈)";

            // First ability - Bonus weight to shop pets (passive)
            const baseWeight = 0.18;
            const weight = Math.min(0.4, baseWeight + (0.02 * kg));
            
            // Second ability - XP bonus to Fall type pets (passive)
            const baseXpBonus = 0.6;
            const xpBonus = Math.min(2, baseXpBonus + (0.06 * kg));
            
            // Apply modifiers
            const weightMod = baseWeight * modifier;
            const xpBonusMod = baseXpBonus * modifier;
            
            const weightTotal = Math.min(0.4, weight + weightMod);
            const xpBonusTotal = Math.min(2, xpBonus + xpBonusMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>Dual Ability:</strong><br>Pets bought directly from shops have a bonus 0.1 - <strong>${weightTotal.toFixed(2)} KG</strong> to their base weight! (Max 3 KG)<br>All active Fall type pets gain an additional <strong>${xpBonusTotal.toFixed(2)} XP/s</strong>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases shop pet weight bonus by 0.02 KG (max 0.4 KG) and increases Fall type pets' XP bonus by 0.06 XP/s (max 2 XP/s)"
    },

    swan: {
        name: "Swan",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/87/Swan.png",
            fallback: "🦢"
        },
        type: "bird",
        rarity: "Divine",
        source: "Fall Egg",
        probability: 1,
        obtainable: true,
        description: "Dual ability: Befriends other players' pets and applies Graceful mutations",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Befriend Cooldown Min: 100.00 (60.00 🌈), Grace Cooldown Min: no limit (84.00 🌈)";

            // First ability - Befriend other players' pets
            const baseCooldown1 = 1500;
            const cooldown1 = Math.max(750, baseCooldown1 - (7.5 * kg));
            
            // Second ability - Apply Graceful mutation
            const baseCooldown2 = 360;
            const cooldown2 = Math.max(120, baseCooldown2 - (2 * kg));
            
            // Apply modifiers
            const cooldown1Mod = baseCooldown1 * modifier;
            const cooldown2Mod = baseCooldown2 * modifier;
            
            const adjustedBaseCooldown1 = baseCooldown1 - cooldown1Mod;
            const adjustedBaseCooldown2 = baseCooldown2 - cooldown2Mod;
            const cooldown1Total = Math.max(750, adjustedBaseCooldown1 - (7.5 * kg));
            const cooldown2Total = Math.max(120, adjustedBaseCooldown2 - (2 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>Dual Ability:</strong><br>Every <strong>${Utils.formatTime(cooldown1Total)}</strong>, goes to another player's pet and befriends it and performs its ability!<br>Every <strong>${Utils.formatTime(cooldown2Total)}</strong>, graces a fruit with Graceful mutation${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases befriend cooldown by 7.5s (min 12:30) and decreases grace cooldown by 2s (min 2:00)"
    }
};
