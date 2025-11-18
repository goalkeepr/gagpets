import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const SAFARI_PETS = {
    armadillo: {
        name: "Armadillo",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/9f/Armadillo.png",
            fallback: "🦔"
        },
        type: "mammal",
        rarity: "Rare",
        source: "Season Pass",
        probability: 30,
        obtainable: true,
        description: "Rolls into a ball and transforms you into an armadillo ball",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 60.00 (48.00 🌈), Duration Max: 100.00 (80.00 🌈)";
            
            const baseCooldown = 480;
            const baseDuration = 30;
            
            const cooldownMod = baseCooldown * modifier;
            const durationMod = baseDuration * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(240, adjustedBaseCooldown - (4 * kg));
            const duration = Math.min(60, baseDuration + durationMod + (0.3 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, rolls into a ball and transforms you into an armadillo ball for <strong>${duration.toFixed(1)}s</strong>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 4s (min 240s) and increases duration by 0.3s (max 60s)"
    },

    stagbeetle: {
        name: "Stag Beetle",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/a/a6/Stag_Beetle_GAG.png",
            fallback: "🪲"
        },
        type: "insect",
        rarity: "Legendary",
        source: "Season Pass",
        probability: 10,
        obtainable: true,
        description: "Initiates beetle battles with other players for rewards",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            const baseCooldown = 360;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(80, adjustedBaseCooldown - (2 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, initiates a battle with another player's Beetle. If your beetle wins you get a reward! The higher level and heavier the beetle the more likely it is to win${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 2s (min 80s) and increases win chance"
    },

    mantisshrimp: {
        name: "Mantis Shrimp",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/0c/Mantis_Shrimp.png",
            fallback: "🦐"
        },
        type: "crustacean",
        rarity: "Mythical",
        source: "Season Pass",
        probability: 5,
        obtainable: true,
        description: "Punches different things in your garden for different effects",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 92.50 (74.00 🌈)";
            
            const baseCooldown = 888;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(333, adjustedBaseCooldown - (6 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, punches different things in your garden for different effects${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 6s (min 333s)"
    },

    hydra: {
        name: "Hydra",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/9d/Hydra.png",
            fallback: "🐉"
        },
        type: "mythical",
        rarity: "Divine",
        source: "Season Pass",
        probability: 1,
        obtainable: true,
        description: "Ages itself up, hatches an egg and applies Terran mutation",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Terran Chance Max: 60.00 (48.00 🌈)";
            
            const baseCooldown = 2500;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(1250, adjustedBaseCooldown - (10 * kg));
            
            // Terran mutation passive effect
            const baseChance = 6;
            const chanceMod = baseChance * modifier;
            const chance = Math.min(12, baseChance + chanceMod + (0.1 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>Dual Ability:</strong><br>Every <strong>${Utils.formatTime(cooldown)}</strong>, ages itself up by 1, hatches an egg and applies Terran mutation. Cannot be mimicked or refreshed!<br>When selling fruits with Terran mutation: There is a <strong>${chance.toFixed(2)}%</strong> chance a random mutation from that fruit will be applied to a fruit in your garden${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 10s (min 1250s) and increases Terran transfer chance by 0.1% (max 12%)"
    },

    oxpecker: {
        name: "Oxpecker",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/6/6d/Oxpecker.png",
            fallback: "🐦"
        },
        type: "bird",
        rarity: "Common",
        source: "Safari Egg",
        probability: 50,
        obtainable: true,
        description: "Reduces cooldown for Safari type pets when they finish abilities",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Reduction Max: 40.00 (32.00 🌈)";
            
            const baseReduction = 14;
            const reductionMod = baseReduction * modifier;
            const reduction = Math.min(30, baseReduction + reductionMod + (0.4 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `When Safari type pets finish their abilities, they start their cooldown with <strong>${reduction.toFixed(1)}s</strong> less${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases cooldown reduction by 0.4s (max 30s)"
    },

    zebra: {
        name: "Zebra",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/3/37/Zebra.png",
            fallback: "🦓"
        },
        type: "mammal",
        rarity: "Rare",
        source: "Safari Egg",
        probability: 30,
        obtainable: true,
        description: "All Zebras stampede for Safari rewards with chance to trigger again",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Chance Max: 100.00 (80.00 🌈)";
            
            const baseChance = 10;
            const chanceMod = baseChance * modifier;
            const chance = Math.min(20, baseChance + chanceMod + (0.1 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every 30 minutes on the clock, All Zebras stampede back and forth from the Seed Shop to Gear Shop or vice-versa, and grants you a random Safari related reward! Has <strong>${chance.toFixed(2)}%</strong> chance to trigger again on each stampede${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases stampede retrigger chance by 0.1% (max 20%)"
    },

    giraffe: {
        name: "Giraffe",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/6/60/Giraffe.png",
            fallback: "🦒"
        },
        type: "mammal",
        rarity: "Legendary",
        source: "Safari Egg",
        probability: 10,
        obtainable: true,
        description: "Eats tall fruits for bonus sell value and advances plant growth",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Multiplier Max: 31.00 (25.80 🌈), Growth Advance Max: 107.00 (89.00 🌈)";
            
            const baseCooldown = 888;
            const baseMultiplier = 1.45;
            const baseAmount = 3990;
            
            const cooldownMod = baseCooldown * modifier;
            const multiplierMod = baseMultiplier * modifier;
            const amountMod = baseAmount * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(333, adjustedBaseCooldown - (4.4 * kg));
            const multiplier = Math.min(3, baseMultiplier + multiplierMod + (0.05 * kg));
            const amount = Math.min(7200, baseAmount + amountMod + (30 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, eats fruit that are at least 10 studs high for <strong>${multiplier.toFixed(2)}x</strong> sell value. The plant the fruit came from advances growth by <strong>${Utils.formatTime(amount)}</strong>! Also applies Arid mutation to all other fruits on that plant${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 4.4s (min 333s), increases sell multiplier by 0.05x (max 3x), and increases growth advance by 30s (max 7200s)"
    },

    rhino: {
        name: "Rhino",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/c/c2/Rhino.png",
            fallback: "🦏"
        },
        type: "mammal",
        rarity: "Mythical",
        source: "Safari Egg",
        probability: 5,
        obtainable: true,
        description: "Charges into eggs to halve hatch time or fruits to apply Mirage mutation",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 55.50 (44.40 🌈)";
            
            const baseCooldown = 888;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(444, adjustedBaseCooldown - (8 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, charges into a random egg or random fruit in your garden: Rammed eggs have hatch time halved, rammed fruits get Mirage mutation${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 8s (min 444s)"
    },

    elephant: {
        name: "Elephant",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/6/60/Elephant.png",
            fallback: "🐘"
        },
        type: "mammal",
        rarity: "Divine",
        source: "Safari Egg",
        probability: 1,
        obtainable: true,
        description: "Resets pet age to 1 and increases base weight",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 76.00 (60.80 🌈), Weight Cap Max: 30.00 (24.00 🌈)";
            
            const baseCooldown = 1388;
            const baseAge = 50.25;
            const baseMax = 2;
            
            const cooldownMod = baseCooldown * modifier;
            const ageMod = baseAge * modifier;
            const maxMod = baseMax * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(400, adjustedBaseCooldown - (13 * kg));
            const age = Math.max(50, baseAge - ageMod - (0.25 * kg));
            const max = Math.min(3.5, baseMax + maxMod + (0.05 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, blesses an age <strong>${Math.floor(age)}</strong> pet, resetting its age back to 1, increasing its base weight by 0.1 KG if its base weight is less than <strong>${max.toFixed(2)} KG</strong>! Cannot bless other Elephants. Cannot be mimicked or refreshed${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 13s (min 400s), decreases age requirement by 0.25 (min 50), and increases weight cap by 0.05 KG (max 3.5 KG)"
    },

    giantarmadillo: {
        name: "GIANT Armadillo",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/9f/Armadillo.png",
            fallback: "🦔"
        },
        type: "mammal",
        rarity: "Rare",
        source: "Season Pass",
        probability: 30,
        obtainable: true,
        description: "Enhanced version - rolls into a ball and transforms you longer",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 30.00 (24.00 🌈), Duration Max: 100.00 (80.00 🌈)";
            
            const baseCooldown = 240;
            const baseDuration = 45;
            
            const cooldownMod = baseCooldown * modifier;
            const durationMod = baseDuration * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(120, adjustedBaseCooldown - (4 * kg));
            const duration = Math.min(90, baseDuration + durationMod + (0.45 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, rolls into a ball and transforms you into a armadillo ball for <strong>${duration.toFixed(1)}s</strong>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 4s (min 120s) and increases duration by 0.45s (max 90s)"
    },

    rainbowstagbeetle: {
        name: "Rainbow Stag Beetle",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/a/a6/Stag_Beetle_GAG.png",
            fallback: "🌈"
        },
        type: "insect",
        rarity: "Legendary",
        source: "Season Pass",
        probability: 10,
        obtainable: true,
        description: "Enhanced beetle battles with faster cooldown",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            const baseCooldown = 260;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(40, adjustedBaseCooldown - (2 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, initiates a battle with another player's Beetle. If your beetle wins you get a reward! The higher level and heavier the beetle the more likely it is to win${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 2s (min 40s) and increases win chance"
    },

    giantmantisshrimp: {
        name: "GIANT Mantis Shrimp",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/0c/Mantis_Shrimp.png",
            fallback: "🦐"
        },
        type: "crustacean",
        rarity: "Mythical",
        source: "Season Pass",
        probability: 5,
        obtainable: true,
        description: "Enhanced version - punches things faster for various effects",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 55.50 (44.40 🌈)";
            
            const baseCooldown = 444;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(222, adjustedBaseCooldown - (4 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, punches different things in your garden for different effects${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 4s (min 222s)"
    },

    rainbowhydra: {
        name: "Rainbow Hydra",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/9d/Hydra.png",
            fallback: "🌈"
        },
        type: "mythical",
        rarity: "Divine",
        source: "Season Pass",
        probability: 1,
        obtainable: true,
        description: "Enhanced version - ages up faster and better Terran mutation transfer",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 70.00 (56.00 🌈), Terran Chance Max: 60.00 (48.00 🌈)";
            
            const baseCooldown = 1500;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(800, adjustedBaseCooldown - (10 * kg));
            
            // Terran mutation passive effect
            const baseChance = 12;
            const chanceMod = baseChance * modifier;
            const chance = Math.min(24, baseChance + chanceMod + (0.2 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>Dual Ability:</strong><br>Every <strong>${Utils.formatTime(cooldown)}</strong>, ages itself up by 1, hatches an egg and applies Terran mutation. Cannot be mimicked or refreshed!<br>When selling fruits with Terran mutation: There is a <strong>${chance.toFixed(2)}%</strong> chance a random mutation from that fruit will be applied to a fruit in your garden${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 10s (min 800s) and increases Terran transfer chance by 0.2% (max 24%)"
    },

    rainbowoxpecker: {
        name: "Rainbow Oxpecker",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/1/11/RainbowOxpecker.png",
            fallback: "🌈"
        },
        type: "bird",
        rarity: "Common",
        source: "Exotic Safari Egg",
        probability: 50,
        obtainable: true,
        description: "Enhanced cooldown reduction for Safari type pets",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Reduction Max: 52.00 (41.60 🌈)";
            
            const baseReduction = 24;
            const reductionMod = baseReduction * modifier;
            const reduction = Math.min(50, baseReduction + reductionMod + (0.5 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `When Safari type pets finish their abilities, they start their cooldown with <strong>${reduction.toFixed(1)}s</strong> less${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases cooldown reduction by 0.5s (max 50s)"
    },

    rainbowzebra: {
        name: "Rainbow Zebra",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/3/36/RainbowZebra.png",
            fallback: "🌈"
        },
        type: "mammal",
        rarity: "Rare",
        source: "Exotic Safari Egg",
        probability: 30,
        obtainable: true,
        description: "Enhanced stampede with higher retrigger chance",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Chance Max: 100.00 (80.00 🌈)";
            
            const baseChance = 20;
            const chanceMod = baseChance * modifier;
            const chance = Math.min(40, baseChance + chanceMod + (0.2 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every 30 minutes on the clock, All Zebras stampede back and forth from the Seed Shop to Gear Shop or vice-versa, and grants you a random Safari related reward! Has <strong>${chance.toFixed(2)}%</strong> chance to trigger again on each stampede${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases stampede retrigger chance by 0.2% (max 40%)"
    },

    rainbowgiraffe: {
        name: "Rainbow Giraffe",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/6/60/Giraffe.png",
            fallback: "🌈"
        },
        type: "mammal",
        rarity: "Legendary",
        source: "Exotic Safari Egg",
        probability: 10,
        obtainable: true,
        description: "Enhanced tall fruit eating with better multipliers and growth advance",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Multiplier Max: 20.00 (16.00 🌈), Growth Advance Max: 105.00 (84.00 🌈)";
            
            const baseCooldown = 444;
            const baseMultiplier = 2;
            const baseAmount = 4990;
            
            const cooldownMod = baseCooldown * modifier;
            const multiplierMod = baseMultiplier * modifier;
            const amountMod = baseAmount * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(222, adjustedBaseCooldown - (2.2 * kg));
            const multiplier = Math.min(4, baseMultiplier + multiplierMod + (0.1 * kg));
            const amount = Math.min(9200, baseAmount + amountMod + (40 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, eats fruit that are at least 10 studs high for <strong>${multiplier.toFixed(2)}x</strong> sell value. The plant the fruit came from advances growth by <strong>${Utils.formatTime(amount)}</strong>! Also applies Arid mutation to all other fruits on that plant${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 2.2s (min 222s), increases sell multiplier by 0.1x (max 4x), and increases growth advance by 40s (max 9200s)"
    },

    rainbowrhino: {
        name: "Rainbow Rhino",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/c/c2/Rhino.png",
            fallback: "🌈"
        },
        type: "mammal",
        rarity: "Mythical",
        source: "Exotic Safari Egg",
        probability: 5,
        obtainable: true,
        description: "Enhanced charging with faster cooldown",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 55.50 (44.40 🌈)";
            
            const baseCooldown = 666;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(333, adjustedBaseCooldown - (6 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, charges into a random egg or random fruit in your garden: Rammed eggs have hatch time halved, rammed fruits get Mirage mutation${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 6s (min 333s)"
    },

    rainbowelephant: {
        name: "Rainbow Elephant",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/06/RainbowElephant.png",
            fallback: "🌈"
        },
        type: "mammal",
        rarity: "Divine",
        source: "Exotic Safari Egg",
        probability: 1,
        obtainable: true,
        description: "Enhanced blessing with faster cooldown and higher weight cap",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 50.00 (40.00 🌈), Weight Cap Max: 50.00 (40.00 🌈)";
            
            const baseCooldown = 900;
            const baseAge = 40.25;
            const baseMax = 3;
            
            const cooldownMod = baseCooldown * modifier;
            const ageMod = baseAge * modifier;
            const maxMod = baseMax * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(450, adjustedBaseCooldown - (9 * kg));
            const age = Math.max(40, baseAge + ageMod - (0.25 * kg));
            const max = Math.min(5.5, baseMax + maxMod + (0.05 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, blesses an age <strong>${Math.floor(age)}</strong> pet, resetting its age back to 1, increasing its base weight by 0.1 KG if its base weight is less than <strong>${max.toFixed(2)} KG</strong>! Cannot bless other Elephants. Cannot be mimicked or refreshed${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 9s (min 450s), decreases age requirement by 0.25 (min 1), and increases weight cap by 0.05 KG (max 5.5 KG)"
    },

    gecko: {
        name: "Gecko",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/1/16/Gecko.png",
            fallback: "🦎"
        },
        type: "reptile",
        rarity: "Common",
        source: "Safari Shop",
        probability: 50,
        obtainable: true,
        description: "Increases variant chance for Safari type plants",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Multiplier Max: 16.00 (12.80 🌈), Range Max: (99.20 🌈)";
            
            const baseMultiplier = 0.6;
            const baseRange = 29;
            
            const multiplierMod = baseMultiplier * modifier;
            const rangeMod = baseRange * modifier;
            
            const multiplier = Math.min(1.4, baseMultiplier + multiplierMod + (0.05 * kg));
            const range = Math.min(60, baseRange + rangeMod + (0.25 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Safari type plants within <strong>${range.toFixed(1)}</strong> studs have <strong>${multiplier.toFixed(2)}x</strong> increased variant chance${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases multiplier by 0.05x (max 1.4x) and increases range by 0.25 studs (max 60)"
    },

    hyena: {
        name: "Hyena",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/95/Hyena.png",
            fallback: "🐺"
        },
        type: "mammal",
        rarity: "Uncommon",
        source: "Safari Shop",
        probability: 40,
        obtainable: true,
        description: "Gains bonus XP per Hyena in garden",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "XP Bonus Max: 100.00 (80.00 🌈)";
            
            const baseAmount = 4;
            const amountMod = baseAmount * modifier;
            const amount = Math.min(8, baseAmount + amountMod + (0.04 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Gains an additional <strong>${amount.toFixed(2)} XP/s</strong> for every Hyena in your garden! Requires another non-Hyena pet equipped to activate this effect${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases XP bonus by 0.04 XP/s per Hyena (max 8 XP/s)"
    },

    capebuffalo: {
        name: "Cape Buffalo",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/a/a8/Cape_Buffalo.png",
            fallback: "🐃"
        },
        type: "mammal",
        rarity: "Rare",
        source: "Safari Shop",
        probability: 30,
        obtainable: true,
        description: "Dual ability: General fruit duplication and Safari fruit bonus",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "General Dupe Max: 66.67 (53.33 🌈), Safari Dupe Max: 100.00 (90.00 🌈)";
            
            const baseChance = 10;
            const baseSafariChance = 5;
            
            const chanceMod = baseChance * modifier;
            const safariChanceMod = baseSafariChance * modifier;
            
            const chance = Math.min(20, baseChance + chanceMod + (0.15 * kg));
            const safariChance = Math.min(15, baseSafariChance + safariChanceMod + (0.1 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>Dual Ability:</strong><br><strong>${chance.toFixed(2)}%</strong> chance harvested fruit duplicates! Rarer crops have lower chance to duplicate.<br><strong>${safariChance.toFixed(2)}%</strong> extra chance for Safari type fruit to duplicate${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases general duplication by 0.15% (max 20%) and Safari duplication by 0.1% (max 15%)"
    },

    hippo: {
        name: "Hippo",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/f/f3/Hippo.png",
            fallback: "🦛"
        },
        type: "mammal",
        rarity: "Legendary",
        source: "Safari Shop",
        probability: 10,
        obtainable: true,
        description: "Dual ability: Eats Watermelons and applies Monsoon mutation",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Watermelon Cooldown Min: (100.00 🌈), Seed Chance Max: 100.00 (80.00 🌈), Monsoon Cooldown Min: 80.82 (64.65 🌈)";
            
            // Watermelon eating ability
            const baseCooldown1 = 200;
            const baseMultiplier = 2;
            const baseChance = 30;
            
            const cooldownMod1 = baseCooldown1 * modifier;
            const multiplierMod = baseMultiplier * modifier;
            const chanceMod = baseChance * modifier;
            
            const adjustedBaseCooldown1 = baseCooldown1 - cooldownMod1;
            const cooldown1 = Math.max(60, adjustedBaseCooldown1 - (1 * kg));
            const multiplier = Math.min(8, baseMultiplier + multiplierMod + (0.02 * kg));
            const chance = Math.min(60, baseChance + chanceMod + (0.3 * kg));
            
            // Monsoon mutation ability
            const baseCooldown2 = 1111;
            const cooldownMod2 = baseCooldown2 * modifier;
            const adjustedBaseCooldown2 = baseCooldown2 - cooldownMod2;
            const cooldown2 = Math.max(222, adjustedBaseCooldown2 - (11 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>Dual Ability:</strong><br>Every <strong>${Utils.formatTime(cooldown1)}</strong>, eats a Watermelon for <strong>${multiplier.toFixed(2)}x</strong> value bonus and has a <strong>${chance.toFixed(2)}%</strong> chance to recover the Watermelon seed!<br>Every <strong>${Utils.formatTime(cooldown2)}</strong>, goes to a nearby fruit and applies Monsoon mutation${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases watermelon cooldown by 1s (min 60s), increases multiplier by 0.02x (max 8x), increases seed recovery by 0.3% (max 60%), and decreases monsoon cooldown by 11s (min 222s)"
    },

    crocodile: {
        name: "Crocodile",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/d/d6/Crocodile.png",
            fallback: "🐊"
        },
        type: "reptile",
        rarity: "Mythical",
        source: "Safari Shop",
        probability: 5,
        obtainable: true,
        description: "Death rolls on plants/pets to boost growth and XP",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Min: 90.91 (54.55 🌈)";
            
            const baseCooldown = 1200;
            const baseDuration = 30;
            const basePlantAmount = 45;
            const baseXPAmount = 35;
            
            const cooldownMod = baseCooldown * modifier;
            const durationMod = baseDuration * modifier;
            const plantMod = basePlantAmount * modifier;
            const xpMod = baseXPAmount * modifier;
            
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(600, adjustedBaseCooldown - (6.6 * kg));
            const duration = Math.min(50, baseDuration + durationMod + (0.1 * kg));
            const plantAmount = Math.min(90, basePlantAmount + plantMod + (0.1 * kg));
            const xpAmount = Math.min(65, baseXPAmount + xpMod + (0.1 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, bites on to a random Plant or Pet for <strong>${duration.toFixed(1)}s</strong> and performs a roll. Plants grow an additional <strong>${plantAmount.toFixed(1)}s/s</strong> and Pets get additional <strong>${xpAmount.toFixed(1)} XP/s</strong>${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 6.6s (min 600s), increases duration by 0.1s (max 50s), increases plant growth by 0.1s/s (max 90s/s), and increases pet XP by 0.1 XP/s (max 65 XP/s)"
    },

    lion: {
        name: "Lion",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/4/47/Lion.png",
            fallback: "🦁"
        },
        type: "mammal",
        rarity: "Divine",
        source: "Safari Shop",
        probability: 1,
        obtainable: true,
        description: "Dual ability: Roars to advance pet cooldowns and apply Safari mutations",
        calculate: (kg, modifierType = "none", customModifierValue = null) => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType, customModifierValue);
            
            // KG limits to reach maximum values - format: "base (rainbow)"
            const kgLimits = "Cooldown Advancement Cooldown Min: (88.00 🌈), Total Advancement Max: 100.00 (80.00 🌈), Per Pet Max Max: 100.00 (80.00 🌈), Safari Mutation Cooldown Min: 71.43 (51.43 🌈)";
            
            // Cooldown advancement ability
            const baseCooldown1 = 800;
            const baseAmount = 400;
            const baseMaxAmount = 60;
            
            const cooldownMod1 = baseCooldown1 * modifier;
            const amountMod = baseAmount * modifier;
            const maxAmountMod = baseMaxAmount * modifier;
            
            const adjustedBaseCooldown1 = baseCooldown1 - cooldownMod1;
            const cooldown1 = Math.max(200, adjustedBaseCooldown1 - (5 * kg));
            const amount = Math.min(800, baseAmount + amountMod + (4 * kg));
            const maxAmount = Math.min(120, baseMaxAmount + maxAmountMod + (0.6 * kg));
            
            // Safari mutation ability
            const baseCooldown2 = 1400;
            const cooldownMod2 = baseCooldown2 * modifier;
            const adjustedBaseCooldown2 = baseCooldown2 - cooldownMod2;
            const cooldown2 = Math.max(400, adjustedBaseCooldown2 - (14 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>Dual Ability:</strong><br>Every <strong>${Utils.formatTime(cooldown1)}</strong>, roars, calls pets in your garden to move toward it. <strong>${amount.toFixed(0)}s</strong> total cooldown advancement is shared across each pet (max <strong>${maxAmount.toFixed(1)}s</strong> per pet).<br>Every <strong>${Utils.formatTime(cooldown2)}</strong>, roars and mutates fruit up to the number of Safari type pets you have in your garden with a random Safari Mutation${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown advancement cooldown by 5s (min 200s), increases total advancement by 4s (max 800s), increases per-pet max by 0.6s (max 120s), and decreases safari mutation cooldown by 14s (min 400s)"
    }
};
