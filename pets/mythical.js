import { ICONS } from '../data/icons.js';
import { RARITIES, TYPES } from '../data/constants.js';
import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

export const MYTHICAL_PETS = {
    kitsune: {
        name: "Kitsune",
        icon: ICONS.KITSUNE,
        type: TYPES.MYTHICAL,
        rarity: RARITIES.LEGENDARY,
        description: "Nine-tailed fox spirit that provides mystical wisdom",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseWisdom = 30;
            const wisdom = baseWisdom + (kg * 0.5);
            const mysticalBonus = 15 + (kg * 0.25);
            
            const wisdomMod = baseWisdom * modifier;
            const wisdomTotal = wisdom + wisdomMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Provides mystical wisdom! Grants <strong>${wisdomTotal.toFixed(1)}%</strong> experience bonus and <strong>${mysticalBonus.toFixed(1)}%</strong> luck to all spiritual activities${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases wisdom by 0.5% and mystical bonus by 0.25%"
    },

    corruptedkitsune: {
        name: "Corrupted Kitsune",
        icon: ICONS.CORRUPTEDKITSUNE,
        type: TYPES.MYTHICAL,
        rarity: RARITIES.MYTHICAL,
        description: "Dark fox spirit that provides sinister power bonuses",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 666;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(60, adjustedBaseSeconds - (5 * kg));
            const corruptionPower = 25 + (kg * 0.4);
            const darkBonus = 20 + (kg * 0.3);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, channels dark energy! Provides <strong>${corruptionPower.toFixed(1)}%</strong> power bonus and <strong>${darkBonus.toFixed(1)}%</strong> dark magic enhancement${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases channeling time by 5 seconds, increases power by 0.4%, and increases dark bonus by 0.3%"
    },

    mizuchi: {
        name: "Mizuchi",
        icon: ICONS.MIZUCHI,
        type: TYPES.MYTHICAL,
        rarity: RARITIES.MYTHICAL,
        description: "Water dragon that controls rain and river flow",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1200;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(120, adjustedBaseSeconds - (8 * kg));
            const waterControl = 35 + (kg * 0.6);
            const rainBonus = 40 + (kg * 0.7);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, controls water flow! Provides <strong>${waterControl.toFixed(1)}%</strong> irrigation efficiency and <strong>${rainBonus.toFixed(1)}%</strong> rain blessing${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases control time by 8 seconds, increases water control by 0.6%, and increases rain bonus by 0.7%"
    },

    raiju: {
        name: "Raiju",
        icon: ICONS.RAIJU,
        type: TYPES.MYTHICAL,
        rarity: RARITIES.LEGENDARY,
        description: "Lightning beast that charges the air with electrical energy",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 180;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(20, adjustedBaseSeconds - (3 * kg));
            const electricCharge = 30 + (kg * 0.5);
            const energyBonus = 25 + (kg * 0.4);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, releases lightning! Charges the area with <strong>${electricCharge.toFixed(1)}%</strong> electrical energy and <strong>${energyBonus.toFixed(1)}%</strong> activity speed${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases lightning time by 3 seconds, increases charge by 0.5%, and increases energy bonus by 0.4%"
    },

    reddragon: {
        name: "Red Dragon",
        icon: ICONS.REDDRAGON,
        type: TYPES.MYTHICAL,
        rarity: RARITIES.DIVINE,
        description: "Mighty dragon that breathes fire and protects treasures",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1800;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(180, adjustedBaseSeconds - (10 * kg));
            const fireBreath = 50 + (kg * 0.8);
            const treasureGuard = 60 + (kg * 1.0);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, breathes mighty fire! Provides <strong>${fireBreath.toFixed(1)}%</strong> area protection and <strong>${treasureGuard.toFixed(1)}%</strong> treasure value bonus${displayText}!`;
        },
        perKgImpact: () => "Each additional kg decreases breath time by 10 seconds, increases fire power by 0.8%, and increases treasure bonus by 1.0%"
    },

    tanuki: {
        name: "Tanuki",
        icon: ICONS.TANUKI,
        type: TYPES.MYTHICAL,
        rarity: RARITIES.RARE,
        description: "Shapeshifting raccoon dog that brings luck and mischief",
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

    tsuchinoko: {
        name: "Tsuchinoko",
        icon: ICONS.TSUCHINOKO,
        type: TYPES.MYTHICAL,
        rarity: RARITIES.MYTHICAL,
        description: "Mysterious snake that brings extraordinary fortune",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseFortune = 45;
            const fortune = baseFortune + (kg * 0.8);
            const mysteryBonus = 35 + (kg * 0.6);
            
            const fortuneMod = baseFortune * modifier;
            const fortuneTotal = fortune + fortuneMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Brings mysterious fortune! Grants <strong>${fortuneTotal.toFixed(1)}%</strong> extraordinary luck and <strong>${mysteryBonus.toFixed(1)}%</strong> rare event probability${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases fortune by 0.8% and mystery bonus by 0.6%"
    },

    tanchozuru: {
        name: "Tancho-zuru",
        icon: ICONS.TANCHOZURU,
        type: TYPES.MYTHICAL,
        rarity: RARITIES.LEGENDARY,
        description: "Sacred crane that brings longevity and prosperity",
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
    }
};
