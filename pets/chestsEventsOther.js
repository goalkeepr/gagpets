import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const CHESTS_EVENTS_OTHER_PETS = {
    goldenbee: {
        name: "Golden Bee",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/e/e8/GoldenBee.png",
            fallback: "🐝"
        },
        type: "insect",
        rarity: "Mythical",
        source: "Chests/Events/Other",
        probability: 50,
        obtainable: false,
        description: "Pollinates fruits and provides gold harvest chance",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1510;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(150, adjustedBaseSeconds - (16 * kg));
            const goldChance = 1 + (kg / 10);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit and pollinates it, applying Pollinated mutation!\n\n<strong>${goldChance.toFixed(1)}%</strong> chance harvested fruit becomes Gold on harvest!\nRarer crops have less chance to turn gold!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases pollination time by 16 seconds and increases gold harvest chance by 0.1%"
    },
    packbee: {
        name: "Pack Bee",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/f/fe/PackBee.png",
            fallback: "🐝"
        },
        type: "insect",
        rarity: "Mythical",
        source: "Chests/Events/Other",
        probability: 50,
        obtainable: true,
        description: "Pollinates fruits and increases backpack size",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const seconds = Math.max(150, 1510 - (16 * kg));
            const backpackIncrease = 25 + kg;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit and pollinates it, applying Pollinated mutation!\n\nIncreases player backpack size by <strong>${backpackIncrease}</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases pollination time by 16 seconds and increases backpack size by 1"
    },
    baconpig: {
        name: "Bacon Pig",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/b/b1/BaconPig.png",
            fallback: "🐷"
        },
        type: "mammal",
        rarity: "Legendary",
        source: "Culinarian Chest",
        probability: 34.5,
        obtainable: true,
        description: "Emits aura that boosts variant chance for new fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseCooldown = 120;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(5, adjustedBaseCooldown - kg);
            const duration = 15 + (0.15 * kg);
            const multiplier = 2 + (0.01 * kg);
            const range = 15 + (0.15 * kg);
            
            const durationMod = 15 * modifier;
            const multiplierMod = 2 * modifier;
            const rangeMod = 15 * modifier;
            const durationTotal = duration + durationMod;
            const multiplierTotal = multiplier + multiplierMod;
            const rangeTotal = range + rangeMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, emits an aura for <strong>${Utils.formatTime(durationTotal)}</strong> granting <strong>${multiplierTotal.toFixed(2)}x</strong> chance for new fruit to grow as variants within <strong>${rangeTotal.toFixed(2)}</strong> studs${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 1 second, increases duration by 0.15 seconds, increases variant multiplier by 0.01x, and increases range by 0.15 studs"
    },
    hamster: {
        name: "Hamster",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/c/c5/HamsterIcon.webp",
            fallback: "🐹"
        },
        type: "mammal",
        rarity: "Mythical",
        source: "Event",
        probability: 0,
        obtainable: false,
        description: "Reduces egg hatch times",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 15;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(20, adjustedBaseSeconds - kg);
            const reduction = 15 + (0.25 * kg);
            
            const reductionMod = 15 * modifier;
            const reductionTotal = reduction + reductionMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to the egg with the highest hatch time and reduces its hatch time by <strong>${Utils.formatTime(reductionTotal)}</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases action time by 1 second and increases hatch time reduction by 0.25 seconds"
    },
    monkey: {
        name: "Monkey",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/85/Monkey_Pet_V2.png",
            fallback: "🐒"
        },
        type: "mammal",
        rarity: "Rare",
        source: "Chests/Events/Other",
        probability: 0,
        obtainable: false,
        description: "Refunds fruits back to inventory",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const refundChance = 2.5 + (kg / 40);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${refundChance.toFixed(2)}%</strong> chance to refund fruit back to your inventory. Rarer plants have lower chance to refund!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases fruit refund chance by 0.025%"
    },
    mooncat: {
        name: "Moon Cat",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/e/ee/Moon_Cat.png",
            fallback: "🌙"
        },
        type: "mammal",
        rarity: "Legendary",
        source: "Twilight Shop",
        probability: 0,
        obtainable: false,
        description: "Naps to provide size bonuses and preserves Night type fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseNapInterval = 70;
            const napIntervalMod = baseNapInterval * modifier;
            const adjustedBaseNapInterval = baseNapInterval + napIntervalMod;
            const napInterval = Math.max(15, adjustedBaseNapInterval - kg);
            const napDuration = 20 + (kg / 5);
            const range = 15 + (kg / 10);
            const sizeMultiplier = 1.35 + (kg / 100);
            const preserveChance = 1.5 + (kg / 20);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(napInterval)}</strong>, naps for <strong>${Utils.formatTime(napDuration)}</strong>. New fruit within <strong>${range.toFixed(1)}</strong> studs will be <strong>${sizeMultiplier.toFixed(3)}x</strong> larger!\n\n<strong>${preserveChance.toFixed(2)}%</strong> chance Night type fruit stays after harvest!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases nap interval by 1 second, increases nap duration by 0.2 seconds, increases range by 0.1 studs, increases size multiplier by 0.01x, and increases night preservation chance by 0.05%"
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
        source: "Chests/Events/Other",
        probability: 0,
        obtainable: false,
        description: "Bathes in hot springs to boost all pets' passive abilities",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const basePassiveBoost = 2;
            const basePassiveBoostMod = basePassiveBoost * modifier;
            const adjustedBasePassiveBoost = basePassiveBoost + basePassiveBoostMod;
            const passiveBoost = Math.min(6, adjustedBasePassiveBoost + (kg/10));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `As long as you have a Hot Spring in your garden: The pet bathes in it and boosts all pets passive by <strong>${passiveBoost.toFixed(3)}%</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases all pets' passive boost by 0.1%"
    },
    panda: {
        name: "Panda",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/94/PandaPet.png",
            fallback: "🐼"
        },
        type: "mammal",
        rarity: "Legendary",
        source: "Chests/Events/Other",
        probability: 0,
        obtainable: false,
        description: "Eats bamboo for value bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 180;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(60, adjustedBaseSeconds - kg);
            const bonus = 1.5 + (0.015 * kg);
            
            const bonusMod = 1.5 * modifier;
            const bonusTotal = bonus + bonusMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, eats bamboo for a <strong>${bonusTotal.toFixed(3)}x</strong> value bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases feeding time by 1 second and increases value bonus by 0.015x"
    },
    chickenzombie: {
        name: "Chicken Zombie",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/b/be/Chicken_Zombie_Icon.png",
            fallback: "🧟"
        },
        type: "undead",
        rarity: "Mythical",
        source: "Chests/Events/Other",
        probability: 0,
        obtainable: false,
        description: "Zombifies fruits and increases egg hatch speed",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1600;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (18 * kg));
            const zombifyChance = 20 + (kg / 5);
            const hatchSpeed = 10 + (kg / 10);
            
            const hatchSpeedMod = 10 * modifier;
            const hatchSpeedTotal = hatchSpeed + hatchSpeedMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${zombifyChance.toFixed(1)}%</strong> chance a nearby fruit becomes Zombified!\n\nIncreases egg hatch speed by <strong>${hatchSpeedTotal.toFixed(1)}%</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases zombify time by 18 seconds, increases zombify chance by 0.2%, and increases egg hatch speed by 0.1%"
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
        source: "Chests/Events/Other",
        probability: 0,
        obtainable: true,
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
    },
    koi: {
        name: "Koi",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/2f/Koi.webp",
            fallback: "🐟"
        },
        type: "aquatic",
        rarity: "Mythical",
        source: "Chests/Events/Other",
        probability: 0,
        obtainable: false,
        description: "Provides chance to recover eggs when hatching",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseRecoveryChance = 3;
            const recoveryChanceMod = baseRecoveryChance * modifier;
            const adjustedBaseRecoveryChance = baseRecoveryChance + recoveryChanceMod;
            const recoveryChance = Math.min(8, adjustedBaseRecoveryChance + (kg * 0.22));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `When hatching eggs there is a <strong>${recoveryChance.toFixed(2)}%</strong> chance to get the egg back! Cannot recover Premium/Exotic Eggs.${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases egg recovery chance by 0.22%"
    },
    football: {
        name: "Football",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/1/10/FootballPet.png",
            fallback: "🏈"
        },
        type: "other",
        rarity: "Legendary",
        source: "Event",
        probability: 0,
        obtainable: false,
        description: "Touchdown: Occasionally runs to the Gear Shop or Seed Shop (whichever is farther) and does a touchdown which awards you with sheckles or a Watering Can",
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
            const seconds = Math.max(30, adjustedBaseSeconds - (0.6 * kg));
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
        source: "Chests/Events/Other",
        probability: 0,
        obtainable: false,
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
            url: "https://static.wikia.nocookie.net/growagarden/images/6/68/Corrupt_Kodama.png",
            fallback: "🌚"
        },
        type: "other",
        rarity: "Legendary",
        source: "Quest",
        probability: 4.35,
        obtainable: false,
        description: "Corrupted Tree Spirit: Collecting Zen type fruits have a chance to mutate with Corrupt.",
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
        source: "Event",
        probability: 0,
        obtainable: false,
        description: "Lightning Beast: Occasionally devours a fruit with Shocked for bonus value, spits a chain lightning that mutates fruit with Static or Shocked if its a Thunderstorm",
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
        source: "Chests/Events/Other",
        probability: 0,
        obtainable: false,
        description: "Nine-Tailed Curse: Occasionally, Removes 9 mutations from 9 different fruit. Applies Corrupted Chakra with a very rare chance for Corrupted Foxfire Chakra to 1 random fruit.",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1260;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(60, adjustedBaseSeconds - (3.6 * kg));
            const chakraChance = 20 + (kg / 5);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, launches cursed energy at 9 different fruits. Each fruit has <strong>${chakraChance.toFixed(2)}%</strong> to mutate with <span style="color: rgb(0, 85, 255);">Corrupt Chakra</span> with a very rare chance for <span style="color: rgb(0, 0, 255);">Corrupt Foxfire Chakra</span> instead!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cursed energy time by 3.6 seconds and increases Corrupt Chakra chance by 0.2%"
    },
    baldeagle: {
        name: "Bald Eagle",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/d/d2/BaldEagle.png",
            fallback: "🦅"
        },
        type: "bird",
        rarity: "Legendary",
        source: "Event",
        probability: 0,
        obtainable: false,
        description: "Takes flight and advances egg hatch times with chance for multiplied effect",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseInterval = 704;
            const baseIntervalMod = baseInterval * modifier;
            const baseIntervalTotal = baseInterval - baseIntervalMod;
            const baseAdvance = 70.4;
            const baseChancePercent = 70.4;
            const baseMultiplier = 1.8;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${baseIntervalTotal} seconds</strong>, takes flight and spreads its wings. All eggs advance their hatch time by <strong>${baseAdvance} seconds</strong>!\n\nThere's a <strong>${baseChancePercent}%</strong> chance for the time advance to be multiplied by <strong>${baseMultiplier.toFixed(2)}x</strong>!`;
        },
        perKgImpact: () => "Each additional kg increases multiplier by 0.18x"
    },
    cookedowl: {
        name: "Cooked Owl",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/f/fc/Cooked_Owl.png",
            fallback: "🍗"
        },
        type: "bird",
        rarity: "Mythical",
        source: "Chests/Events/Other",
        probability: 0,
        obtainable: false,
        description: "Cooks fruits and provides XP bonuses to all pets",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 806;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(60, adjustedBaseSeconds - (12 * kg));
            const cookChance = 15 + (kg / 4);
            const xpBonus = 0.15 + (0.03 * kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${cookChance.toFixed(2)}%</strong> chance to cook a nearby fruit. Usually Burnt.\n\nAll active pets gain an additional <strong>${xpBonus.toFixed(2)} XP/s</strong>! Also very tasty!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooking time by 12 seconds, increases cooking chance by 0.25%, and increases all pets' XP bonus by 0.03 XP/s"
    },
    kiwi: {
        name: "Kiwi",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/e/ea/Kiwi.png",
            fallback: "🥝"
        },
        type: "bird",
        rarity: "Rare",
        source: "Chests/Events/Other",
        probability: 0,
        obtainable: false,
        description: "Reduces egg hatch times",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(10, adjustedBaseSeconds - kg);
            const reduction = 25 + (kg / 4);
            
            const reductionMod = 25 * modifier;
            const reductionTotal = reduction + reductionMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to the egg with the highest hatch time and reduces its hatch time by <strong>${Utils.formatTime(reductionTotal)}</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases action time by 1 second and increases hatch time reduction by 0.25 seconds"
    },
    owl: {
        name: "Owl",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/4/46/Owlpng.png",
            fallback: "🦉"
        },
        type: "bird",
        rarity: "Mythical",
        source: "Chests/Events/Other",
        probability: 0,
        obtainable: false,
        description: "Provides XP bonuses to all active pets",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const xpBonus = 0.2 + (kg / 25);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All active pets gain an additional <strong>${xpBonus.toFixed(2)} XP/s</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases all pets' XP bonus by 0.04 XP/s"
    },
    tanchozuru: {
        name: "Tanchozuru",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/d/d3/Tanchozuru_.png",
            fallback: "🕊️"
        },
        type: "bird",
        rarity: "Legendary",
        source: "Chests/Events/Other",
        probability: 0,
        obtainable: false,
        description: "Meditates to grant Tranquil mutations to nearby fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseMeditateInterval = 627;
            const meditateIntervalMod = baseMeditateInterval * modifier;
            const adjustedBaseMeditateInterval = baseMeditateInterval + meditateIntervalMod;
            const meditateInterval = Math.max(1, adjustedBaseMeditateInterval - kg);
            const meditateDuration = 10 + (kg / 10);
            const range = 15 + (kg / 10);
            const tranquilChance = 5 + (kg / 20);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(meditateInterval)}</strong>, meditates for <strong>${Utils.formatTime(meditateDuration)}</strong>, nearby fruits in a <strong>${range.toFixed(1)}</strong> studs have a <strong>${tranquilChance.toFixed(2)}%</strong> chance every second to mutate into Tranquil!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases meditation interval by 1 second, increases meditation duration by 0.1 seconds, increases range by 0.1 studs, and increases tranquil chance by 0.05%"
    },
    bloodkiwi: {
        name: "Blood Moon Kiwi",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/79/Blood_Kiwi_Icon.png",
            fallback: "🥝"
        },
        type: "bird",
        rarity: "Mythical",
        source: "Chests/Events/Other",
        probability: 0,
        obtainable: false,
        description: "Reduces egg hatch times",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(10, adjustedBaseSeconds - kg);
            const reduction = 45 + (0.45 * kg);
            
            const reductionMod = 45 * modifier;
            const reductionTotal = reduction + reductionMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to the egg with the highest hatch time, and reduces its hatch time by <strong>${reductionTotal.toFixed(2)}</strong> seconds${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases action time by 1 second and increases hatch time reduction by 0.45 seconds"
    },
    bloodhedgehog: {
        name: "Blood Hedgehog",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/95/Blood_Hedgehog_Icon.png",
            fallback: "🦔"
        },
        type: "mammal",
        rarity: "Legendary",
        source: "Chests/Events/Other",
        probability: 0,
        obtainable: false,
        description: "Provides size and variant bonuses to prickly plants",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSizeRange = 30;
            const baseSizeBonus = 2;
            const baseVariantRange = 22;
            const baseVariantBonus = 1.15;
            
            const sizeRange = baseSizeRange + (kg / 5);
            const sizeBonus = baseSizeBonus + (kg / 50);
            const variantRange = baseVariantRange + (kg / 5);
            const variantBonus = baseVariantBonus + (kg / 90);
            
            const sizeRangeMod = baseSizeRange * modifier;
            const sizeBonusMod = baseSizeBonus * modifier;
            const variantRangeMod = baseVariantRange * modifier;
            const variantBonusMod = baseVariantBonus * modifier;
            
            const sizeRangeTotal = sizeRange + sizeRangeMod;
            const sizeBonusTotal = sizeBonus + sizeBonusMod;
            const variantRangeTotal = variantRange + variantRangeMod;
            const variantBonusTotal = variantBonus + variantBonusMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Grants prickly plants in <strong>${sizeRangeTotal.toFixed(1)}</strong> studs a <strong>${sizeBonusTotal.toFixed(2)}x</strong> size bonus and prickly plants in <strong>${variantRangeTotal.toFixed(1)}</strong> studs a <strong>${variantBonusTotal.toFixed(3)}x</strong> variant chance!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases size range by 0.2 studs, size bonus by 0.02x, variant range by 0.2 studs, and variant bonus by 0.011x"
    },
    bloodowl: {
        name: "Blood Owl",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/00/Blood_Owl_Icon.png",
            fallback: "🦉"
        },
        type: "bird",
        rarity: "Divine",
        source: "Chests/Events/Other",
        probability: 0,
        obtainable: false,
        description: "Provides XP bonuses to all active pets",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseXpBonus = 0.5;
            const xpBonus = baseXpBonus + (0.08 * kg);
            
            const xpBonusMod = baseXpBonus * modifier;
            const xpBonusTotal = xpBonus + xpBonusMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All active pets gain an additional <strong>${xpBonusTotal.toFixed(2)} XP/s</strong>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases all pets' XP bonus by 0.08 XP/s"
    }    
};
