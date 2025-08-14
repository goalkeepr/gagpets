import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const MAMMAL_PETS = {
    capybara: {
        name: "Capybara",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/1/12/CapybaraIIcon.webp",
            fallback: "🦫"
        },
        type: "mammal",
        rarity: "Legendary",
        description: "Provides area buffs to nearby pets",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const studs = 15.5 + (kg / 4);
            const xp = 3 + (0.3 * kg);
            
            const studsMod = 15.5 * modifier;
            const xpMod = 3 * modifier;
            const studsTotal = studs + studsMod;
            const xpTotal = xp + xpMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All pets within <strong>${studsTotal.toFixed(1)}</strong> studs won't lose hunger and will gain <strong>${xpTotal.toFixed(1)}</strong> XP every second${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases buff range by 0.25 studs and XP gain by 0.3"
    },
    brownmouse: {
        name: "Brown Mouse",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/86/BrownMouse.png",
            fallback: "🐭"
        },
        type: "mammal",
        rarity: "Mythical",
        description: "Provides experience and jump height bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 502;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (5.89 * kg));
            const exp = 750 + (11 * kg);
            const jump = 12 + (kg / 10);
            
            const expMod = 750 * modifier;
            const jumpMod = 12 * modifier;
            const expTotal = exp + expMod;
            const jumpTotal = jump + jumpMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, gains additional <strong>${Utils.formatNumber(Math.round(expTotal))}</strong> bonus experience${displayText}!\n\nGrants additional <strong>${jumpTotal.toFixed(1)}%</strong> increase to player jump height!`;
        },
        perKgImpact: () => "Each additional kg decreases experience time by 5.89 seconds, increases experience by 11, and increases jump height by 0.1%"
    },
    raccoon: {
        name: "Raccoon",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/7c/Raccoon.png",
            fallback: "🦝"
        },
        type: "mammal",
        rarity: "Divine",
        description: "Steals and duplicates crops from other plots",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 904;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (4 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to another plot and duplicates a random crop and gives it to you${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases stealing time by 4 seconds"
    },
    redfox: {
        name: "Red Fox",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/d/d5/RedFox.png",
            fallback: "🦊"
        },
        type: "mammal",
        rarity: "Divine",
        description: "Steals seeds from other players' crops",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 442.33;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const finalSeconds = Math.max(1, adjustedBaseSeconds - (5 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(finalSeconds)}</strong>, goes to another player's random crop and tries to get a seed from it.\nRarer seeds have lower chance to succeed${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases stealing time by 5 seconds"
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
    hedgehog: {
        name: "Hedgehog",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/4/46/HedgehogPet.png",
            fallback: "🦔"
        },
        type: "mammal",
        rarity: "Rare",
        description: "Provides size bonuses to prickly plants",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseRange = 30;
            const baseSizeBonus = 1.49;
            const range = baseRange + (kg / 5);
            const sizeBonus = baseSizeBonus + (0.015 * kg);
            
            const rangeMod = baseRange * modifier;
            const sizeBonusMod = baseSizeBonus * modifier;
            const rangeTotal = range + rangeMod;
            const sizeBonusTotal = sizeBonus + sizeBonusMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Grants prickly plants in <strong>${rangeTotal.toFixed(1)}</strong> studs a <strong>${sizeBonusTotal.toFixed(3)}x</strong> size bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases buff range by 0.2 studs and size bonus by 0.015x"
    },
    greymouse: {
        name: "Grey Mouse",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/88/GreyMouse.png",
            fallback: "🐭"
        },
        type: "mammal",
        rarity: "Mythical",
        description: "Provides experience and movement speed bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 603;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (8.18 * kg));
            const exp = 500 + (8 * kg);
            const speed = 12 + (kg / 10);
            
            const expMod = 500 * modifier;
            const speedMod = 12 * modifier;
            const expTotal = exp + expMod;
            const speedTotal = speed + speedMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, gains additional <strong>${Utils.formatNumber(Math.round(expTotal))}</strong> bonus experience${displayText}!\n\nGrants additional <strong>${speedTotal.toFixed(1)}%</strong> increase to player movement speed!`;
        },
        perKgImpact: () => "Each additional kg decreases experience time by 8.18 seconds, increases experience by 8, and increases movement speed by 0.1%"
    },
    baconpig: {
        name: "Bacon Pig",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/b/b1/BaconPig.png/revision/latest?cb=20250809053320",
            fallback: "🐷"
        },
        type: "mammal",
        rarity: "Legendary",
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
    cat: {
        name: "Cat",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/89/Catpet.png",
            fallback: "🐱"
        },
        type: "mammal",
        rarity: "Uncommon",
        description: "Naps to provide size bonuses to nearby fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 80;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const napInterval = Math.max(1, adjustedBaseSeconds - kg);
            const napDuration = 10 + (kg / 10);
            const range = 10 + (kg / 10);
            const sizeMultiplier = 1.25 + (0.0025 * kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(napInterval)}</strong>, naps for <strong>${Utils.formatTime(napDuration)}</strong>. New fruit within <strong>${range.toFixed(1)}</strong> studs will be <strong>${sizeMultiplier.toFixed(4)}x</strong> larger!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases nap interval by 1 second, increases nap duration by 0.1 seconds, increases range by 0.1 studs, and increases size multiplier by 0.0025x"
    },
    cow: {
        name: "Cow",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/84/Cow.png",
            fallback: "🐄"
        },
        type: "mammal",
        rarity: "Legendary",
        description: "Provides growth bonuses to nearby plants",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const range = 10 + (kg / 10);
            const growthMultiplier = 1.25 + (kg / 80);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `All plants within <strong>${range.toFixed(1)}</strong> studs grow <strong>${growthMultiplier.toFixed(3)}x</strong> faster!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases buff range by 0.1 studs and growth speed by 0.0125x"
    },
    deer: {
        name: "Deer",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/27/Deer.png",
            fallback: "🦌"
        },
        type: "mammal",
        rarity: "Uncommon",
        description: "Preserves berry fruits after harvest",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseChance = 1;
            const chanceMod = baseChance * modifier;
            const adjustedBaseChance = baseChance + chanceMod;
            const preserveChance = Math.min(4, adjustedBaseChance + (kg / 10));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${preserveChance.toFixed(1)}%</strong> chance Berry type fruit stays after harvest!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases berry preservation chance by 0.1%"
    },
    dog: {
        name: "Dog",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/29/DogPet.png",
            fallback: "🐕"
        },
        type: "mammal",
        rarity: "Common",
        description: "Digs up random seeds",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(5, adjustedBaseSeconds - kg);
            const digChance = 5 + (kg / 20);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${digChance.toFixed(2)}%</strong> chance to dig up a random seed!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases digging time by 1 second and increases dig success chance by 0.05%"
    },
    fennecfox: {
        name: "Fennec Fox",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/e/e8/FennecFoxIcon.png",
            fallback: "🦊"
        },
        type: "mammal",
        rarity: "Divine",
        description: "Copies mutations from other players' fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1350;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (13 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to another player's random fruit, has a chance to copy 1 random mutation and apply it to random fruit you own! The higher mutation multiplier the rarer chance to copy!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases mutation copying time by 13 seconds"
    },
    goldenlab: {
        name: "Golden Lab",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/f/f3/GoldenLabPet.png",
            fallback: "🐕‍🦺"
        },
        type: "mammal",
        rarity: "Common",
        description: "Digs up random seeds with improved success rate",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(5, adjustedBaseSeconds - kg);
            const digChance = 10 + (kg / 10);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${digChance.toFixed(1)}%</strong> chance to dig up a random seed!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases digging time by 1 second and increases dig success chance by 0.1%"
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
        description: "Reduces egg hatch times",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 15;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            const reduction = 15 + (0.25 * kg);
            
            const reductionMod = 15 * modifier;
            const reductionTotal = reduction + reductionMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to the egg with the highest hatch time and reduces its hatch time by <strong>${Utils.formatTime(reductionTotal)}</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases action time by 1 second and increases hatch time reduction by 0.25 seconds"
    },
    kitsune: {
        name: "Kitsune",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/4/4d/Kitsune_.png",
            fallback: "🦊"
        },
        type: "mammal",
        rarity: "Prismatic",
        description: "Steals crops from other players with chakra mutations",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1344.5;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (6 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to another player's crop, mutates it with <span style="color: rgb(255, 80, 65);">Chakra</span> then steals (duplicate) and gives it to you! Very rare chance to mutate with <span style="color: rgb(255, 0, 0);">Foxfire Chakra</span> mutation instead!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases stealing time by 6 seconds"
    },
    meerkat: {
        name: "Meerkat",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/c/c2/Meerkat.png",
            fallback: "🦦"
        },
        type: "mammal",
        rarity: "Legendary",
        description: "Does lookouts that advance other pets' cooldowns",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            const advance = 15 + (kg / 4);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, does a lookout and advances all pets' cooldowns by <strong>${Utils.formatTime(advance)}</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases lookout time by 1 second and increases cooldown advance by 0.25 seconds"
    },
    mole: {
        name: "Mole",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/6/63/Mole.png",
            fallback: "🦔"
        },
        type: "mammal",
        rarity: "Legendary",
        description: "Digs underground to find treasure",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 10;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(10, adjustedBaseSeconds - (1 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, digs down underground to find treasure. Can dig up gear or sheckles!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases digging time by 1 second (minimum 10 seconds)"
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
        description: "Naps to provide size bonuses and preserves Night type fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseNapInterval = 70;
            const napIntervalMod = baseNapInterval * modifier;
            const adjustedBaseNapInterval = baseNapInterval + napIntervalMod;
            const napInterval = Math.max(1, adjustedBaseNapInterval - kg);
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
    orangetabby: {
        name: "Orange Tabby",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/73/Orange_tabby_icon.png",
            fallback: "🐱"
        },
        type: "mammal",
        rarity: "Rare",
        description: "Naps to provide size bonuses to nearby fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseNapInterval = 90;
            const napIntervalMod = baseNapInterval * modifier;
            const adjustedBaseNapInterval = baseNapInterval + napIntervalMod;
            const napInterval = Math.max(1, adjustedBaseNapInterval - kg);
            const napDuration = 15 + (0.15 * kg);
            const range = 15 + (0.15 * kg);
            const sizeMultiplier = 1.5 + (kg / 100);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(napInterval)}</strong>, naps for <strong>${Utils.formatTime(napDuration)}</strong>. New fruit within <strong>${range.toFixed(2)}</strong> studs will be <strong>${sizeMultiplier.toFixed(3)}x</strong> larger!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases nap interval by 1 second, increases nap duration by 0.15 seconds, increases range by 0.15 studs, and increases size multiplier by 0.01x"
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
        description: "Eats bamboo for value bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 180;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            const bonus = 1.5 + (0.015 * kg);
            
            const bonusMod = 1.5 * modifier;
            const bonusTotal = bonus + bonusMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, eats bamboo for a <strong>${bonusTotal.toFixed(3)}x</strong> value bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases feeding time by 1 second and increases value bonus by 0.015x"
    },

    spotteddeer: {
        name: "Spotted Deer",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/3/38/Spotteddeer.png",
            fallback: "🦌"
        },
        type: "mammal",
        rarity: "Rare",
        description: "Preserves berry fruits after harvest",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const preserveChance = Math.min(10, 5 + (kg / 20));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${preserveChance.toFixed(2)}%</strong> chance berry fruit stays after harvest!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases berry preservation chance by 0.05%"
    }
};
