import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

const aquaticPets = {
    starfish: {
        name: "Starfish",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/9/9c/StarfishIcon.webp",
            fallback: "⭐"
        },
        type: "aquatic",
        rarity: "Common",
        source: "Common Summer Egg",
        probability: 50,
        obtainable: true,
        description: "Gains experience to grow older",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (0.5 * kg));
            const exp = 25 + (3 * kg);
            
            const expMod = 25 * modifier;
            const expTotal = exp + expMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, grants <strong>${Utils.formatNumber(Math.round(expTotal))}</strong> experience!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases experience time by 0.5 seconds and increases experience by 3"
    },

    crab: {
        name: "Crab",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/b/b9/CrabIcon.webp",
            fallback: "🦀"
        },
        type: "aquatic",
        rarity: "Common",
        source: "Common Summer Egg",
        probability: 25,
        obtainable: true,
        description: "Steals money from other players",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 378;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (4.0 * kg));
            const sheckles = 225 + (25 * kg);
            
            const shecklesMod = 225 * modifier;
            const shecklesTotal = sheckles + shecklesMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to another random player and pinches them for their money and grants you <strong>${Utils.formatNumber(Math.round(shecklesTotal))}</strong> sheckles${displayText}.`;
        },
        perKgImpact: () => "Each additional kg decreases action time by 4.0 seconds and increases sheckles gained by 25"
    },

    seaturtle: {
        name: "Sea Turtle",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/a/ad/SeaTurtleIcon.webp",
            fallback: "🐢"
        },
        type: "aquatic",
        rarity: "Rare",
        description: "Provides experience bonuses and water effects",
        source: "Rare Summer Egg",
        probability: 20,
        obtainable: true,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const expSeconds = Math.max(1, 720 - (6.5 * kg));
            const exp = 990 + (14 * kg);
            const splashSeconds = Math.max(1, 164 - (3 * kg));
            const wetChance = 12 + (0.2 * kg);
            
            const expMod = 990 * modifier;
            const wetChanceMod = 12 * modifier;
            const expTotal = exp + expMod;
            const wetChanceTotal = wetChance + wetChanceMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(expSeconds)}</strong>, grants <strong>${Utils.formatNumber(Math.round(expTotal))}</strong> bonus experience${displayText}!\n\nEvery <strong>${Utils.formatTime(splashSeconds)}</strong>, splashes water at a nearby fruit and it has a <strong>${wetChanceTotal.toFixed(2)}%</strong> chance to become Wet!`;
        },
        perKgImpact: () => "Each additional kg decreases experience time by 8 seconds, increases experience by 15, decreases splash time by 3 seconds, and increases wet chance by 0.2%"
    },

    axolotl: {
        name: "Axolotl",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/0f/AxolotlIcon.png",
            fallback: "🦎"
        },
        type: "aquatic",
        rarity: "Mythical",
        source: "Oasis Egg",
        probability: 15,
        obtainable: false,
        description: "Preserves Summer type fruits after collecting",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const basePreserveChance = 6;
            const preserveChance = Math.min(13, basePreserveChance + (0.20 * kg));
            
            const preserveChanceMod = basePreserveChance * modifier;
            const preserveChanceTotal = preserveChance + preserveChanceMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `<strong>${preserveChanceTotal.toFixed(1)}%</strong> chance Summer type fruit stays after collecting${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases preservation chance by 0.20%"
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

    koi: {
        name: "Koi",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/2f/Koi.webp",
            fallback: "🐟"
        },
        type: "aquatic",
        rarity: "Mythical",
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

    mimicoctopus: {
        name: "Mimic Octopus",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/00/MimicOctopusIcon.webp",
            fallback: "🐙"
        },
        type: "aquatic",
        rarity: "Mythical",
        source: "Paradise Egg",
        probability: 1,
        obtainable: true,
        description: "Mimics and copies abilities from other pets",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 1212;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (12 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, mimics and copies an ability from another pet and performs its ability!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases mimicking time by 12 seconds"
    },

    seaotter: {
        name: "Sea Otter",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/c/c3/Sea_Otter.png",
            fallback: "🦦"
        },
        type: "aquatic",
        rarity: "Legendary",
        source: "Legendary Egg",
        probability: 10.64,
        obtainable: false,
        description: "Sprays water on nearby plants",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 30;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, sprays water on a nearby plant.${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases spraying time by 1 second"
    },

    seal: {
        name: "Seal",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/f/f9/SealIcon.webp",
            fallback: "🦭"
        },
        type: "aquatic",
        rarity: "Rare",
        description: "Provides chance to get pets back as eggs when selling",
        source: "Rare Summer Egg",
        probability: 10,
        obtainable: true,
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseReturn = 2.5;
            const returnMod = baseReturn * modifier;
            const adjustedBaseReturn = baseReturn + returnMod;
            const returnChance = Math.max(0, adjustedBaseReturn + (0.22 * kg));
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Selling pets have a <strong>${returnChance.toFixed(2)}%</strong> chance to get the pet back as its egg equivalent!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases pet return chance by 0.22%"
    }
};

export { aquaticPets as AQUATIC_PETS };
