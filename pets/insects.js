import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const INSECT_PETS = {
    bee: {
        name: "Bee",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/d/d4/The_bee.png",
            fallback: "🐝"
        },
        type: "insect",
        rarity: "Uncommon",
        description: "Pollinates fruits with mutations",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1800;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (18 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit and pollinates it, applying Pollinated mutation!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases pollination time by 18 seconds"
    },
    giantant: {
        name: "Giant Ant",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/c/c5/Giant_ant.png",
            fallback: "🐜"
        },
        type: "insect",
        rarity: "Mythical",
        description: "Duplicates harvested fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseChance = 5 + (kg / 10);
            const chanceMod = 5 * modifier;
            const totalChance = baseChance + chanceMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${totalChance.toFixed(1)}%</strong> chance harvested fruit duplicate!<br>Rarer crops have lower chance to duplicate${displayText}.`;
        },
        perKgImpact: () => "Each additional kg increases duplication chance by 0.1%"
    },
    discobee: {
        name: "Disco Bee",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/b/ba/DiscoBee.png",
            fallback: "🕺"
        },
        type: "insect",
        rarity: "Divine",
        description: "Pollinates fruits and boosts nearby plant growth",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1610;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (16 * kg));
            const growthMultiplier = 1.55 + (kg * 0.01);
            const range = 10 + (kg / 10);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit and pollinates it, applying Pollinated mutation!\n\nNearby plants within <strong>${range.toFixed(1)}</strong> studs grow <strong>${growthMultiplier.toFixed(2)}x</strong> faster!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases pollination time by 16 seconds, increases growth multiplier by 0.01x, and increases range by 0.1 studs"
    },
    butterfly: {
        name: "Butterfly",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/1/18/Thy_Butterfly_V2.png",
            fallback: "🦋"
        },
        type: "insect",
        rarity: "Mythical",
        description: "Transforms heavily mutated fruits into rainbow fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1807.4;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (18 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit with 5+ mutations, removes all of them, and turns it rainbow!\nIgnores favorited fruit${displayText}.`;
        },
        perKgImpact: () => "Each additional kg decreases transformation time by 18 seconds"
    },
    bearbee: {
        name: "Bear Bee",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/8b/Bearbeee1.png",
            fallback: "🐻"
        },
        type: "insect",
        rarity: "Mythical",
        description: "Attempts to pollinate but creates Honey Glazed fruits instead",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1510;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const finalSeconds = Math.max(1, adjustedBaseSeconds - (16 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(finalSeconds)}</strong>, goes to a nearby fruit and tries to pollinate it - but it's not a bee so it fails and turns it to Honey Glazed instead${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases honey glazing time by 16 seconds"
    },
    caterpillar: {
        name: "Caterpillar",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/3/3d/Caterpillar_Icon.png",
            fallback: "🐛"
        },
        type: "insect",
        rarity: "Legendary",
        description: "Accelerates growth of leafy plants",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const growthMultiplier = 1.45 + (kg * 0.15);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All leafy plants grow <strong>${growthMultiplier.toFixed(2)}x</strong> faster!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases leafy plant growth speed by 0.15x"
    },
    dragonfly: {
        name: "Dragonfly",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/c/c9/DragonflyIcon.png",
            fallback: "🪲"
        },
        type: "insect",
        rarity: "Divine",
        description: "Turns fruits into gold",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 300;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (3 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, turns one random fruit gold!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases gold transformation time by 3 seconds"
    },
    goldenbee: {
        name: "Golden Bee",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/e/e8/GoldenBee.png",
            fallback: "🐝"
        },
        type: "insect",
        rarity: "Mythical",
        description: "Pollinates fruits and provides gold harvest chance",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1510;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (16 * kg));
            const goldChance = 1 + (kg / 10);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit and pollinates it, applying Pollinated mutation!\n\n<strong>${goldChance.toFixed(1)}%</strong> chance harvested fruit becomes Gold on harvest!\nRarer crops have less chance to turn gold!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases pollination time by 16 seconds and increases gold harvest chance by 0.1%"
    },
    honeybee: {
        name: "Honey Bee",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/1/14/HoneyBee.png",
            fallback: "🐝"
        },
        type: "insect",
        rarity: "Rare",
        description: "Pollinates fruits with mutations",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1210;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (12 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit and pollinates it, applying Pollinated mutation!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases pollination time by 12 seconds"
    },
    moth: {
        name: "Moth",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/09/Moth.png",
            fallback: "🦋"
        },
        type: "insect",
        rarity: "Legendary",
        description: "Sings to restore pet hunger",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 763;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (7 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, sings to a random pet and restores its hunger to 100%!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases singing time by 7 seconds"
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
        description: "Pollinates fruits and increases backpack size",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const seconds = Math.max(1, 1510 - (16 * kg));
            const backpackIncrease = 25 + kg;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit and pollinates it, applying Pollinated mutation!\n\nIncreases player backpack size by <strong>${backpackIncrease}</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases pollination time by 16 seconds and increases backpack size by 1"
    },
    petalbee: {
        name: "Petal Bee",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/5/52/Petalbee.png",
            fallback: "🌸"
        },
        type: "insect",
        rarity: "Legendary",
        description: "Pollinates fruits and preserves Flower type fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const seconds = Math.max(1, 1510 - (16 * kg));
            const flowerChance = 1 + (kg / 10);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit and pollinates it applying Pollinated mutation!\n\n<strong>${flowerChance.toFixed(1)}%</strong> chance Flower type fruit stays after harvest!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases pollination time by 16 seconds and increases flower preservation chance by 0.1%"
    },
    prayingmantis: {
        name: "Praying Mantis",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/25/PrayingMantis.png",
            fallback: "🦗"
        },
        type: "insect",
        rarity: "Mythical",
        description: "Prays to grant variant chance bonuses to nearby fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 80;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            const duration = 10 + (kg / 10);
            const variantMultiplier = 1.5 + (kg / 200);
            const range = 10 + (kg / 10);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, prays for <strong>${Utils.formatTime(duration)}</strong> granting <strong>${variantMultiplier.toFixed(3)}x</strong> variant chance within <strong>${range.toFixed(1)}</strong> studs!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases prayer time by 1 second, increases prayer duration by 0.1 seconds, increases variant multiplier by 0.005x, and increases range by 0.1 studs"
    },
    queenbee: {
        name: "Queen Bee",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/7a/Queen_bee.png",
            fallback: "👑"
        },
        type: "insect",
        rarity: "Divine",
        description: "Pollinates fruits and refreshes pet abilities",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const basePollinateSeconds = 1220;
            const pollinateSecondsMod = basePollinateSeconds *  modifier;
            const adjustedBasePollinateSeconds = basePollinateSeconds - pollinateSecondsMod;
            const pollinateSeconds = Math.max(1, adjustedBasePollinateSeconds - (16 * kg));
            
            const baseRefreshSeconds = 1328;
            const refreshSecondsMod = baseRefreshSeconds * modifier;
            const adjustedBaseRefreshSeconds = baseRefreshSeconds - refreshSecondsMod;
            const refreshSeconds = Math.max(1, adjustedBaseRefreshSeconds - (16 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(pollinateSeconds)}</strong>, a nearby fruit gets magically pollinated applying Pollinated mutation!\n\nEvery <strong>${Utils.formatTime(refreshSeconds)}</strong>, the pet with the highest cooldown refreshes its ability!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases pollination time by 16 seconds and refresh time by 16 seconds"
    },
    redgiantant: {
        name: "Red Giant Ant",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/c/c8/RedGiantAntImage.png",
            fallback: "🐜"
        },
        type: "insect",
        rarity: "Mythical",
        description: "Duplicates harvested fruits with fruit-type bonus",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseChance = 5 + (kg / 10);
            const fruitBonus = 5 + (kg / 10);
            
            const baseChanceMod = 5 * modifier;
            const fruitBonusMod = 5 * modifier;
            const baseChanceTotal = baseChance + baseChanceMod;
            const fruitBonusTotal = fruitBonus + fruitBonusMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${baseChanceTotal.toFixed(1)}%</strong> chance harvested fruit duplicate!\nRarer crops have lower chance to duplicate.\n\n<strong>${fruitBonusTotal.toFixed(1)}%</strong> extra chance for Fruit type crops to duplicate!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases fruit duplication chance by 0.1% and fruit-type bonus by 0.1%"
    },
    tarantulahawk: {
        name: "Tarantula Hawk",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/78/The_Tarantula_Hawk.png",
            fallback: "🕷️"
        },
        type: "insect",
        rarity: "Legendary",
        description: "Pollinates fruits and stings pets to advance cooldowns",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const basePollinateSeconds = 1510;
            const pollinateSecondsMod = basePollinateSeconds * modifier;
            const adjustedBasePollinateSeconds = basePollinateSeconds + pollinateSecondsMod;
            const pollinateSeconds = Math.max(1, adjustedBasePollinateSeconds - (16 * kg));
            
            const baseStingSeconds = 302;
            const stingSecondsMod = baseStingSeconds * modifier;
            const adjustedBaseStingSeconds = baseStingSeconds + stingSecondsMod;
            const stingSeconds = Math.max(1, adjustedBaseStingSeconds - (3 * kg));
            const cooldownAdvance = 80 + (0.8 * kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(pollinateSeconds)}</strong>, flies to a nearby fruit and pollinates it applying Pollinated mutation!\n\nEvery <strong>${Utils.formatTime(stingSeconds)}</strong>, stings a random pet and advances its ability cooldown by <strong>${Utils.formatTime(cooldownAdvance)}</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases pollination time by 16 seconds, decreases sting time by 3 seconds, and increases cooldown advance by 0.8 seconds"
    },
    wasp: {
        name: "Wasp",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/f/f8/The_Wasp.png",
            fallback: "🐝"
        },
        type: "insect",
        rarity: "Rare",
        description: "Pollinates fruits and stings pets to advance cooldowns",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const basePollinateSeconds = 1800;
            const pollinateSecondsMod = basePollinateSeconds * modifier;
            const adjustedBasePollinateSeconds = basePollinateSeconds + pollinateSecondsMod;
            const pollinateSeconds = Math.max(1, adjustedBasePollinateSeconds - (18 * kg));
            
            const baseStingSeconds = 602;
            const stingSecondsMod = baseStingSeconds * modifier;
            const adjustedBaseStingSeconds = baseStingSeconds + stingSecondsMod;
            const stingSeconds = Math.max(1, adjustedBaseStingSeconds - (6 * kg));
            const cooldownAdvance = 60 + (0.6 * kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(pollinateSeconds)}</strong>, flies to a nearby fruit and pollinates it applying Pollinated mutation!\n\nEvery <strong>${Utils.formatTime(stingSeconds)}</strong>, stings a random pet and advances its ability cooldown by <strong>${Utils.formatTime(cooldownAdvance)}</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases pollination time by 18 seconds, decreases sting time by 6 seconds, and increases cooldown advance by 0.6 seconds"
    }
};
