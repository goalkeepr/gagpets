import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const CHUBBY_CHIPMUNK_PETS = {
    chubbychipmunk: {
        name: "Chubby Chipmunk",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/5/52/ChubbyChipmunkPet.png",
            fallback: "🐿️"
        },
        type: "mammal",
        rarity: "Rare",
        source: "Chubby Chipmunk Event",
        probability: 100,
        obtainable: true,
        description: "Eats fruits to gain weight and spawns acorns",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 56.67 (40.67 🌈)";
            
            const baseSeconds = 120;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(35, adjustedBaseSeconds - (1.5 * kg));
            
            const baseAmount = 0.009;
            const amountMod = baseAmount * modifier;
            const adjustedBaseAmount = baseAmount + amountMod;
            const amount = Math.min(0.06, adjustedBaseAmount + (0.001 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong style="color: #FFD700;">${Utils.formatTime(seconds)}</strong>, eats a fruit in your garden and gains <strong style="color: #FFD700;">${amount.toFixed(3)} kg</strong> weight! <span style="color: #AAAAAA;">(Ignores favorited or single-harvest fruits)</span>\n\nAfter eating, an <strong style="color: #FFD700;">Acorn</strong> will spawn somewhere! Collecting it grants a random reward!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 1.5 seconds and increases weight gain by 0.001 kg (max 0.06 kg)"
    },
    farmerchipmunk: {
        name: "Farmer Chipmunk",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/04/Farmer_Chipmunk.png",
            fallback: "🌰"
        },
        type: "mammal",
        rarity: "Rare",
        source: "Chubby Chipmunk Event",
        probability: 34.5,
        obtainable: true,
        description: "Makes Nut type plants grow faster",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            const range = 30;
            const baseMultiplier = 1.5;
            const multiplierMod = baseMultiplier * modifier;
            const adjustedBaseMultiplier = baseMultiplier + multiplierMod;
            const multiplier = Math.min(4, adjustedBaseMultiplier + (0.05 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All Nut type plants within <strong>${range} studs</strong> grow <strong>${multiplier.toFixed(2)}x faster</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases growth multiplier by 0.05x (max 4x)"
    },
    idolchipmunk: {
        name: "Idol Chipmunk",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/99/IdolChipmunk.png",
            fallback: "🎤"
        },
        type: "mammal",
        rarity: "Legendary",
        source: "Chubby Chipmunk Event",
        probability: 14.5,
        obtainable: true,
        description: "Performs songs to restore hunger to all pets",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: No Limit (107.43 🌈)";
            
            const baseSeconds = 720;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(200, adjustedBaseSeconds - (3.5 * kg));
            
            const baseDuration = 8;
            const durationMod = baseDuration * modifier;
            const adjustedBaseDuration = baseDuration + durationMod;
            const duration = Math.min(25, adjustedBaseDuration + (0.4 * kg));
            
            const baseAmount = 0.01;
            const amountMod = baseAmount * modifier;
            const adjustedBaseAmount = baseAmount + amountMod;
            const amount = Math.min(0.03, adjustedBaseAmount + (0.004 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, performs a song for <strong>${duration.toFixed(1)}s</strong> and all other pets in your garden restore <strong>${(amount * 100).toFixed(2)}%</strong> hunger per second!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 3.5 seconds, increases duration by 0.4s (max 25s), and increases hunger restore by 0.4% per second (max 3%)"
    },
    chinchilla: {
        name: "Chinchilla",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/e/e8/Chinchilla.png",
            fallback: "🐭"
        },
        type: "mammal",
        rarity: "Divine",
        source: "Chubby Chipmunk Event",
        probability: 1,
        obtainable: true,
        description: "Makes other pets perform abilities multiple times",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: No Limit (76.67 🌈)";
            
            const baseSeconds = 2400;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1000, adjustedBaseSeconds - (12 * kg));
            
            const baseAmount = 3;
            const amountMod = baseAmount * modifier;
            const adjustedBaseAmount = baseAmount + amountMod;
            const amount = Math.min(6, adjustedBaseAmount + (0.02 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to another pet, rolls around in dust and makes that pet perform its ability <strong>${amount.toFixed(2)}</strong> times in a row!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 12 seconds and increases ability count by 0.02 (max 6)"
    },
    hyrax: {
        name: "Hyrax",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/5/5b/Hyrax.png",
            fallback: "🐹"
        },
        type: "mammal",
        rarity: "Uncommon",
        source: "Chubby Chipmunk Event",
        probability: 0,
        obtainable: true,
        description: "Converts fruits into Fissure Berry seeds",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: 80.00 (60.00 🌈)";
            
            const baseSeconds = 300;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(60, adjustedBaseSeconds - (3 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, consumes a random fruit in your garden and converts it into a Fissure Berry seed! Ignores favorited fruit!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 3 seconds"
    },
    fortunesquirrel: {
        name: "Fortune Squirrel",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/28/FortuneSquirrel.png",
            fallback: "🐿️"
        },
        type: "mammal",
        rarity: "Legendary",
        source: "Chubby Chipmunk Event",
        probability: 0,
        obtainable: true,
        description: "Applies Jackpot mutation to fruits",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            const kgLimits = "Cooldown Min: No Limit (110.40 🌈)";
            
            const baseSeconds = 420;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(60, adjustedBaseSeconds - (2.5 * kg));
            
            const baseChance = 17;
            const chanceMod = baseChance * modifier;
            const adjustedBaseChance = baseChance + chanceMod;
            const chance = Math.min(34, adjustedBaseChance + (0.17 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, has <strong>${chance.toFixed(2)}%</strong> chance to apply the Jackpot mutation!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 2.5 seconds and increases chance by 0.17% (max 34%)"
    }
};
