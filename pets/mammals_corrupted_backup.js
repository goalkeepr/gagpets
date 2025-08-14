import { ICONS } from '../data/icons.js';
import { TYPES, RARITIES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const MAMMAL_PETS = {
    capybara: {
        name: "Capybara",
        icon: ICONS.CAPYBARA,
        type: TYPES.MAMMAL,
        rarity: RARITIES.LEGENDARY,
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
        perKgImpact: () => "Each additional kg increases buff range by 0.25 studs and XP gain by 0.3 per second"
    },
    
    brownmouse: {
        name: "Brown Mouse",
        icon: ICONS.BROWNMOUSE,
        type: TYPES.MAMMAL,
        rarity: RARITIES.MYTHICAL,
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
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, gains additional <strong>${Utils.formatNumber(Math.round(expTotal))}</strong> bonus experience${displayText}!\n\nGrants additional <strong>${jumpTotal.toFixed(2)}%</strong> increase to player jump height!`;
        },
        perKgImpact: () => "Each additional kg decreases experience time by 5.89 seconds, increases experience by 11, and increases jump height by 0.1%"
    },
    
    raccoon: {
        name: "Raccoon",
        icon: ICONS.RACCOON,
        type: TYPES.MAMMAL,
        rarity: RARITIES.DIVINE,
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
        icon: ICONS.REDFOX,
        type: TYPES.MAMMAL,
        rarity: RARITIES.DIVINE,
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
        icon: ICONS.BLOODHEDGEHOG,
        type: TYPES.MAMMAL,
        rarity: RARITIES.LEGENDARY,
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
            
            return `Prickly plants within <strong>${sizeRangeTotal.toFixed(1)}</strong> studs will be <strong>${sizeBonusTotal.toFixed(2)}x</strong> larger! Prickly plants within <strong>${variantRangeTotal.toFixed(1)}</strong> studs have <strong>${variantBonusTotal.toFixed(3)}x</strong> variant chance!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases size range by 0.2 studs, increases size bonus by 0.02x, increases variant range by 0.2 studs, and increases variant bonus by 0.011x"
    },
    
    greymouse: {
        name: "Grey Mouse",
        icon: ICONS.GREYMOUSE,
        type: TYPES.MAMMAL,
        rarity: RARITIES.MYTHICAL,
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
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, gains additional <strong>${Utils.formatNumber(Math.round(expTotal))}</strong> bonus experience${displayText}!\n\nGrants additional <strong>${speedTotal.toFixed(2)}%</strong> increase to player movement speed!`;
        },
        perKgImpact: () => "Each additional kg decreases experience time by 8.18 seconds, increases experience by 8, and increases movement speed by 0.1%"
    },
    
    baconpig: {
        name: "Bacon Pig",
        icon: ICONS.BACONPIG,
        type: TYPES.MAMMAL,
        rarity: RARITIES.LEGENDARY,
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
            
            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, emits a variant aura for <strong>${Utils.formatTime(durationTotal)}</strong>! New fruits within <strong>${rangeTotal.toFixed(1)}</strong> studs have <strong>${multiplierTotal.toFixed(2)}x</strong> variant chance!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooldown by 1 second, increases duration by 0.15 seconds, increases multiplier by 0.01x, and increases range by 0.15 studs"
    },
    
    cat: {
        name: "Cat",
        icon: ICONS.CAT,
        type: TYPES.MAMMAL,
        rarity: RARITIES.UNCOMMON,
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
    
    spotteddeer: {
        name: "Spotted Deer",
        icon: ICONS.SPOTTEDDEER,
        type: TYPES.MAMMAL,
        rarity: RARITIES.RARE,
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
