import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';
import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';

const zenEggPets = {
    shibainu: {
        name: "Shiba Inu",
        icon: ICONS.SHIBAINU,
        type: "mammal",
        rarity: "Uncommon",
        description: "Independent spirit that provides steady resource generation",
        source: "Zen Egg",
        probability: 40,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 120;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(12, adjustedBaseSeconds - (1.8 * kg));
            const resourceGen = 4 + (kg * 0.1);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, shows independent spirit! Generates <strong>${resourceGen.toFixed(1)}</strong> steady resources${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases generation time by 1.8 seconds and increases resource generation by 0.1"
    },

    nihonzaru: {
        name: "Nihon-zaru",
        icon: ICONS.NIHONZARU,
        type: "mammal",
        rarity: "Uncommon",
        description: "Japanese macaque that enjoys hot springs for relaxation bonuses",
        source: "Zen Egg",
        probability: 31,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 450;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(45, adjustedBaseSeconds - (4.5 * kg));
            const relaxationBonus = 22 + (kg * 0.35);
            const hotSpringEffect = 18 + (kg * 0.3);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, enjoys hot springs! Provides <strong>${relaxationBonus.toFixed(1)}%</strong> relaxation and <strong>${hotSpringEffect.toFixed(1)}%</strong> stress relief to nearby pets${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases spring time by 4.5 seconds, increases relaxation by 0.35%, and increases stress relief by 0.3%"
    },

    tanuki: {
        name: "Tanuki",
        icon: ICONS.TANUKI,
        type: "mythical",
        rarity: "Rare",
        description: "Shapeshifting raccoon dog that brings luck and mischief",
        source: "Zen Egg",
        probability: 20.82,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 300;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(30, adjustedBaseSeconds - (4 * kg));
            const luckBonus = 18 + (kg * 0.3);
            const mischiefChance = 12 + (kg * 0.2);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, causes mischief! Provides <strong>${luckBonus.toFixed(1)}%</strong> luck bonus and <strong>${mischiefChance.toFixed(1)}%</strong> chance for unexpected surprises${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases mischief time by 4 seconds, increases luck by 0.3%, and increases surprise chance by 0.2%"
    },

    tanchozuru: {
        name: "Tancho-zuru",
        icon: ICONS.TANCHOZURU,
        type: "mythical",
        rarity: "Legendary",
        description: "Sacred crane that brings longevity and prosperity",
        source: "Zen Egg",
        probability: 4.60,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseLongevity = 25;
            const longevity = baseLongevity + (kg * 0.4);
            const prosperity = 20 + (kg * 0.35);
            const range = 25 + (kg * 0.5);
            
            const longevityMod = baseLongevity * modifier;
            const longevityTotal = longevity + longevityMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Sacred presence! All pets within <strong>${range.toFixed(1)}</strong> studs gain <strong>${longevityTotal.toFixed(1)}%</strong> longevity and <strong>${prosperity.toFixed(1)}%</strong> prosperity bonuses${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases longevity by 0.4%, prosperity by 0.35%, and range by 0.5 studs"
    },

    kappa: {
        name: "Kappa",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/84/Kappa_.png",
            fallback: "🥒"
        },
        type: "aquatic",
        rarity: "Mythical",
        description: "Sprays water to apply Wet mutations with chance for Bloodlit",
        source: "Zen Egg",
        probability: 3.50,
        obtainable: false,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 488;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (4 * kg));
            const range = 25 + (kg / 4);
            const bloodlitChance = 10 + (kg / 10);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, sprays water on all fruits within <strong>${range.toFixed(1)}</strong> studs, applying Wet mutation. Has a <strong>${bloodlitChance.toFixed(1)}%</strong> to replace Wet mutations already on fruit with Bloodlit mutation!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases spray time by 4 seconds, increases range by 0.25 studs, and increases bloodlit replacement chance by 0.1%"
    },

    kitsune: {
        name: "Kitsune",
        icon: ICONS.KITSUNE,
        type: "mythical",
        rarity: "Prismatic",
        source: "Zen Egg",
        probability: 0.08,
        obtainable: false,
        description: "Steals crops from other players with chakra mutations",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1344.5;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(60, adjustedBaseSeconds - (6 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to another player's crop, mutates it with <span style="color: rgb(255, 80, 65);">Chakra</span> then steals (duplicate) and gives it to you! Very rare chance to mutate with <span style="color: rgb(255, 0, 0);">Foxfire Chakra</span> mutation instead!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases stealing time by 6 seconds"
    }
};

export { zenEggPets as ZEN_EGG_PETS };
