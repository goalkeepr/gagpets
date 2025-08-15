// Other pets module
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const OTHER_PETS = {
    football: {
        name: "Football",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/1/10/FootballPet.png",
            fallback: "🏈"
        },
        type: "other",
        rarity: "Legendary",
        description: "Touchdown: Occasionally runs to the Gear Shop or Seed Shop (whichever is farther) and does a touchdown which awards you with sheckles or a Watering Can",
        source: "Event",
        probability: 0,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const wateringCanChance = 20 + (kg / 3);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(87)}</strong>, runs to the Gear Shop or Seed Shop (whichever is farther) and does a touchdown which awards you with <strong>${Utils.formatNumber(870)}</strong> Sheckles or <strong>${wateringCanChance.toFixed(2)}%</strong> chance for a Watering Can instead!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases watering can chance by 0.33%"
    },
    manekineko: {
        name: "Maneki-neko",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/6/64/ManekiNeko.png",
            fallback: "🐱"
        },
        type: "other",
        rarity: "Uncommon",
        source: "Kitsune Chest",
        probability: 34.50,
        obtainable: false,
        description: "Fortune Cat: Occasionally does a wave of good luck and grants increased chance to get your fruit back after selling it",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 143;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (0.6 * kg));
            const refundChance = 8 + (0.15 * kg);
            const duration = 10 + (kg / 4);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, waves and invites good fortune that grants <strong>${refundChance.toFixed(2)}%</strong> chance to refund fruit back to your inventory for <strong>${Utils.formatTime(duration)}</strong>! Rarer fruit have rarer chance to refund.${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases wave time by 0.6 seconds, increases refund chance by 0.15%, and increases effect duration by 0.25 seconds"
    },
    kodama: {
        name: "Kodama",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/1/18/Kodama.png",
            fallback: "🌳"
        },
        type: "other",
        rarity: "Legendary",
        description: "Tree Spirit: Collecting Zen type fruits have a chance to mutate with Tranquil.",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const chance = Math.min(12, 6 + (0.33 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(chance)}</strong>, collecting Zen type fruit has a <strong>${chance.toFixed(2)}%</strong> chance to mutate with Tranquil!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases Tranquil mutation chance by 0.33%"
    },
    corruptedkodama: {
        name: "Corrupted Kodama",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/4/47/Placeholder.png",
            fallback: "🌚"
        },
        type: "other",
        rarity: "Legendary",
        description: "Corrupted Tree Spirit: Collecting Zen type fruits have a chance to mutate with Corrupt.",
        source: "Quest",
        probability: 4.35,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const chance = Math.min(12, 6 + (0.33 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Collecting Zen type fruit has a <strong>${chance.toFixed(2)}%</strong> chance to mutate with Corrupt!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases Corrupt mutation chance by 0.33%"
    },
    raiju: {
        name: "Raiju",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/0d/Raiju.png",
            fallback: "⚡"
        },
        type: "other",
        rarity: "Mythical",
        description: "Lightning Beast: Occasionally devours a fruit with Shocked for bonus value, spits a chain lightning that mutates fruit with Static or Shocked if its a Thunderstorm",
        source: "Event",
        probability: 0,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 622;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(60, adjustedBaseSeconds - (2.6 * kg));
            const targets = Math.min(9, 4 + (0.15 * kg));
            const shockedChance = Math.min(35, 20 + (0.15 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, devours a fruit with Shocked mutation for <strong>1.5x</strong> sheckle value to Summon a chain of lightning to mutate <strong>${targets.toFixed(1)}</strong> fruits with Static! During a Thunderstorm: <strong>${shockedChance.toFixed(2)}%</strong> chance for Shocked instead!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases lightning time by 2.6 seconds, increases targets by 0.15, and increases Shocked chance by 0.15%"
    },

    corruptedkitsune: {
        name: "Corrupted Kitsune",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/2a/CorruptedKitsune.png",
            fallback: "🦊"
        },
        type: "other",
        rarity: "Prismatic",
        description: "Nine-Tailed Curse: Occasionally, Removes 9 mutations from 9 different fruit. Applies Corrupted Chakra with a very rare chance for Corrupted Foxfire Chakra to 1 random fruit.",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1260;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (3.6 * kg));
            const chakraChance = 20 + (kg / 5);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, launches cursed energy at 9 different fruits. Each fruit has <strong>${chakraChance.toFixed(2)}%</strong> to mutate with <span style="color: rgb(0, 85, 255);">Corrupt Chakra</span> with a very rare chance for <span style="color: rgb(0, 0, 255);">Corrupt Foxfire Chakra</span> instead!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cursed energy time by 3.6 seconds and increases Corrupt Chakra chance by 0.2%"
    }
};
