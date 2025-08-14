import { getModifierDetails } from '../utils/modifiers.js';
import Utils from '../utils/calculations.js';

const birdPets = {
    rooster: {
        name: "Rooster",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/2c/Rooster.png",
            fallback: "🐓"
        },
        type: "bird",
        rarity: "Rare",
        description: "Increases egg hatch speed",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const speed = 20 + (kg / 5);
            
            const speedMod = 20 * modifier;
            const speedTotal = speed + speedMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Increases egg hatch speed by <strong>${speedTotal.toFixed(2)}%</strong>${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases egg hatch speed by 0.2%"
    },

    ostrich: {
        name: "Ostrich",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/8/82/OstrichIcon.webp",
            fallback: "🦓"
        },
        type: "bird",
        rarity: "Legendary",
        description: "Provides age bonuses to hatched pets",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const maxAge = 4.5 + (kg / 2);
            
            const maxAgeMod = 4.5 * modifier;
            const maxAgeTotal = Math.min(10, maxAge + maxAgeMod);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Pets hatched from eggs have a bonus <strong>1 to ${maxAgeTotal.toFixed(1)}</strong> age to their age value${displayText}!`;
        },
        perKgImpact: () => "Each additional kg increases maximum bonus age by 0.5"
    },

    seagull: {
        name: "Seagull",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/5/59/SeagullIcon.webp",
            fallback: "🪶"
        },
        type: "bird",
        rarity: "Common",
        description: "Increases seed drop chances for shoveling plants",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseChance = 3;
            const chance = baseChance + (0.3 * kg);
            
            const chanceMod = baseChance * modifier;
            const chanceTotal = chance + chanceMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Shoveling plants have a <strong>${chanceTotal.toFixed(1)}%</strong> chance to drop the equivalent seed! Does not work on fruit${displayText}.`;
        },
        perKgImpact: () => "Each additional kg increases seed drop chance by 0.3%"
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

    chicken: {
        name: "Chicken",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/5/51/Chicken_Pet_V2.png",
            fallback: "🐔"
        },
        type: "bird",
        rarity: "Uncommon",
        description: "Increases egg hatch speed",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const hatchSpeed = 10 + (kg / 10);
            
            const hatchSpeedMod = 10 * modifier;
            const hatchSpeedTotal = hatchSpeed + hatchSpeedMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Increases egg hatch speed by <strong>${hatchSpeedTotal.toFixed(1)}%</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases egg hatch speed by 0.1%"
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
        description: "Cooks fruits and provides XP bonuses to all pets",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 806;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (12 * kg));
            const cookChance = 15 + (kg / 4);
            const xpBonus = 0.15 + (0.03 * kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${cookChance.toFixed(2)}%</strong> chance to cook a nearby fruit. Usually Burnt.\n\nAll active pets gain an additional <strong>${xpBonus.toFixed(2)} XP/s</strong>! Also very tasty!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases cooking time by 12 seconds, increases cooking chance by 0.25%, and increases all pets' XP bonus by 0.03 XP/s"
    },

    flamingo: {
        name: "Flamingo",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/e/ec/FlamingoIcon.webp",
            fallback: "🦩"
        },
        type: "bird",
        rarity: "Rare",
        description: "Stands on one leg to boost nearby plant and fruit growth",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 240;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (2 * kg));
            const duration = 15 + (kg / 2);
            const range = 13 + (0.3 * kg);
            const growthMultiplier = 15 + (kg / 4);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, stands on one leg for <strong>${Utils.formatTime(duration)}</strong>. All plants and fruits within <strong>${range.toFixed(1)}</strong> studs will grow <strong>${growthMultiplier.toFixed(1)}x</strong> faster!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases stance time by 2 seconds, increases stance duration by 0.5 seconds, increases range by 0.3 studs, and increases growth speed by 0.25x"
    },

    hyacinthmacaw: {
        name: "Hyacinth Macaw",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/7/77/HyacinthMacawIcon.png",
            fallback: "🦜"
        },
        type: "bird",
        rarity: "Mythical",
        description: "Applies Cloudtouched mutations to nearby fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 486;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (4 * kg));
            const mutateChance = 15 + (kg / 20);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${mutateChance.toFixed(2)}%</strong> chance to mutate a nearby fruit, applying the Cloudtouched mutation!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases mutation time by 4 seconds and increases mutation chance by 0.05%"
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
        description: "Reduces egg hatch times",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            const reduction = 25 + (kg / 4);
            
            const reductionMod = 25 * modifier;
            const reductionTotal = reduction + reductionMod;
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to the egg with the highest hatch time and reduces its hatch time by <strong>${Utils.formatTime(reductionTotal)}</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases action time by 1 second and increases hatch time reduction by 0.25 seconds"
    },

    nightowl: {
        name: "Night Owl",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/0/07/Night_Owl_Icon.png",
            fallback: "🦉"
        },
        type: "bird",
        rarity: "Mythical",
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

    owl: {
        name: "Owl",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/4/46/Owlpng.png",
            fallback: "🦉"
        },
        type: "bird",
        rarity: "Mythical",
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

    peacock: {
        name: "Peacock",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/6/61/Peacock.png",
            fallback: "🦚"
        },
        type: "bird",
        rarity: "Legendary",
        description: "Fans feathers to advance nearby pets' cooldowns",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 606;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (6 * kg));
            const range = 20 + (kg / 5);
            const cooldownAdvance = 65 + (0.6 * kg);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, fans its feathers and all active pets within <strong>${range.toFixed(1)}</strong> studs will advance cooldown for their abilities by <strong>${Utils.formatTime(cooldownAdvance)}</strong>!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases feather time by 6 seconds, increases range by 0.2 studs, and increases cooldown advance by 0.6 seconds"
    },

    scarletmacaw: {
        name: "Scarlet Macaw",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/2/21/ScarletMacawIcon.webp",
            fallback: "🦜"
        },
        type: "bird",
        rarity: "Legendary",
        description: "Applies Verdant mutations to nearby fruits",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const baseSeconds = 524;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (5 * kg));
            const mutateChance = 15 + (kg / 2);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${mutateChance.toFixed(1)}%</strong> chance to mutate a nearby fruit applying the Verdant mutation!${displayText}`;
        },
        perKgImpact: () => "Each additional kg decreases mutation time by 5 seconds and increases mutation chance by 0.5%"
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

    toucan: {
        name: "Toucan",
        icon: {
            type: "image",
            url: "https://static.wikia.nocookie.net/growagarden/images/1/10/ToucanIcon.webp",
            fallback: "🦜"
        },
        type: "bird",
        rarity: "Rare",
        description: "Provides size and variant bonuses to tropical plants",
        calculate: (kg, modifierType = "none") => {
            if (!Utils.isValidWeight(kg)) return "Invalid weight";
            
            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);
            
            const range = 25 + (kg / 4);
            const sizeBonus = 1.2 + (kg / 20);
            const variantBonus = 1.15 + (kg / 10);
            
            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : "";
            
            return `Grants all tropical plants within <strong>${range.toFixed(1)}</strong> studs a <strong>${sizeBonus.toFixed(2)}x</strong> size bonus!\n\nGrants all tropical plants within <strong>${range.toFixed(1)}</strong> studs a <strong>${variantBonus.toFixed(2)}x</strong> variant chance bonus!${displayText}`;
        },
        perKgImpact: () => "Each additional kg increases range by 0.25 studs, increases size bonus by 0.05x, and increases variant bonus by 0.1x"
    }
};

export { birdPets as BIRD_PETS };
