// Pet abilities data with improved structure

// Utility function for modifier calculations
const getModifierDetails = (modifierType) => {
    switch (modifierType) {
    case 'golden':
        return { value: 0.1, text: '[+Golden]', style: 'color: gold;' };
    case 'rainbow':
        return { value: 0.2, text: '[+Rainbow]', style: 'background: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet); -webkit-background-clip: text; -webkit-text-fill-color: transparent;' };
     case 'nightmare':
        return { value: 0.22, text: '[+Nightmare]', style: 'background: linear-gradient(45deg, #1a0033, #4a0080, #1a0033); -webkit-background-clip: text; -webkit-text-fill-color: transparent;' };
    case 'shocked':
        return { value: 0, text: '[+Shocked]', style: 'color: rgb(255, 255, 100);' };
    case 'frozen':
        return { value: 0, text: '[+Frozen]', style: 'color: rgb(108, 184, 255);' };
    case 'windy':
        return { value: 0, text: '[+Windy]', style: 'color: rgb(162, 185, 209);' };
    case 'ironskin':
        return { value: 0, text: '[+IronSkin]', style: 'color: rgb(206, 206, 206);' };
    case 'radiant':
        return { value: 0, text: '[+Radiant]', style: 'color: rgb(248, 108, 38);' };
    case 'ascended':
        return { value: 0, text: '[+Ascended]', style: 'color: rgb(247, 245, 184);' };
    case 'tranquil':
        return { value: 0, text: '[+Tranquil]', style: 'color: rgb(247, 245, 184);' };
    case 'corrupted':
        return { value: 0, text: '[+Corrupted]', style: 'color: rgb(247, 184, 184);' };
    default:
        return { value: 0, text: '', style: '' };
    }
};

// Utility function to get pet mutation description
const getPetMutationDescription = (modifierType, kg = 50) => {
    if (!petMutationOptions) {
        return '';
    }

    const mutationMap = {
        'shocked': 'Shocked Pet Mutation',
        'frozen': 'Frozen Pet Mutation',
        'windy': 'Windy Pet Mutation',
        'ironskin': 'IronSkin Pet Mutation',
        'radiant': 'Radiant Pet Mutation',
        'ascended': 'Ascended Pet Mutation',
        'tranquil': 'Tranquil Pet Mutation',
        'corrupted': 'Corrupted Pet Mutation'
    };

    const mutationKey = mutationMap[modifierType];
    if (!mutationKey || !petMutationOptions[mutationKey]) {
        return '';
    }

    // Use the calculate function with actual weight to get the mutation description
    if (typeof petMutationOptions[mutationKey].calculate === 'function') {
        return petMutationOptions[mutationKey].calculate(kg, 'none');
    }

    return '';
};

const petAbilities = {
    bunny: {
        name: 'Bunny',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/6/6b/BunnyPet.png',
            fallback: '🐰'
        },
        type: 'herbivore',
        rarity: 'Common',
        description: 'Eats carrots for value bonuses',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 45;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(5, adjustedBaseSeconds - kg);
            const bonus = 1.5 + (0.015 * kg);

            const bonusMod = 1.5 * modifier;
            const bonusTotal = bonus + bonusMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return result = `Every <strong>${Utils.formatTime(seconds)}</strong>, eats a carrot for a <strong>${bonusTotal.toFixed(3)}</strong> value bonus${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases feeding time by 1 second and increases value bonus by 0.015'
    },
    starfish: {
        name: 'Starfish',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/6/62/StarfishIcon.webp',
            fallback: '⭐'
        },
        type: 'aquatic',
        rarity: 'Common',
        description: 'Gains experience to grow older',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const exp = 5 + (kg / 2);

            const expMod = 5 * modifier;
            const expTotal = exp + expMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Wanders in the garden and gains <strong>${expTotal.toFixed(1)}</strong> experience points${displayText}, making it grow older.\nBest for opening pet slots.`;
        },
        perKgImpact: () => 'Each additional kg increases experience gain by 0.5 points'
    },
    crab: {
        name: 'Crab',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/b/b9/CrabIcon.webp',
            fallback: '🦀'
        },
        type: 'aquatic',
        rarity: 'Common',
        description: 'Steals money from other players',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 378;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (4.0 * kg));
            const sheckles = 225 + (25 * kg);

            const shecklesMod = 225 * modifier;
            const shecklesTotal = sheckles + shecklesMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to another random player and pinches them for their money and grants you <strong>${Utils.formatNumber(Math.round(shecklesTotal))}</strong> sheckles${displayText}.`;
        },
        perKgImpact: () => 'Each additional kg decreases action time by 4.0 seconds and increases sheckles gained by 25'
    },
    bee: {
        name: 'Bee',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/f/f2/Beee.png',
            fallback: '🐝'
        },
        type: 'insect',
        rarity: 'Uncommon',
        description: 'Pollinates fruits with mutations',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 1510;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (16 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit and pollinates it, applying Pollinated mutation${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases pollination time by 16 seconds'
    },
    rooster: {
        name: 'Rooster',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/2/2c/Rooster.png',
            fallback: '🐓'
        },
        type: 'bird',
        rarity: 'Rare',
        description: 'Increases egg hatch speed',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const speed = 20 + (kg / 5);

            const speedMod = 20 * modifier;
            const speedTotal = speed + speedMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Increases egg hatch speed by <strong>${speedTotal.toFixed(2)}%</strong>${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases egg hatch speed by 0.2%'
    },
    seaturtle: {
        name: 'Sea Turtle',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/a/ad/SeaTurtleIcon.webp',
            fallback: '🐢'
        },
        type: 'aquatic',
        rarity: 'Rare',
        description: 'Provides experience bonuses and water effects',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const expSeconds = Math.max(1, 720 - (6.5 * kg));
            const exp = 990 + (14 * kg);
            const splashSeconds = Math.max(1, 164 - (3 * kg));
            const wetChance = 12 + (0.2 * kg);

            const expMod = 990 * modifier;
            const wetChanceMod = 12 * modifier;
            const expTotal = exp + expMod;
            const wetChanceTotal = wetChance + wetChanceMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(expSeconds)}</strong>, grants <strong>${Utils.formatNumber(Math.round(expTotal))}</strong> bonus experience${displayText}!\n\nEvery <strong>${Utils.formatTime(splashSeconds)}</strong>, splashes water at a nearby fruit and it has a <strong>${wetChanceTotal.toFixed(2)}%</strong> chance to become Wet!`;
        },
        perKgImpact: () => 'Each additional kg decreases experience time by 8 seconds, increases experience by 15, decreases splash time by 3 seconds, and increases wet chance by 0.2%'
    },
    bloodkiwi: {
        name: 'Blood Kiwi',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/7/79/Blood_Kiwi_Icon.png',
            fallback: '🥝'
        },
        type: 'fruit',
        rarity: 'Mythical',
        description: 'Reduces egg hatch times',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            const reduction = 45 + (0.45 * kg);

            const reductionMod = 45 * modifier;
            const reductionTotal = reduction + reductionMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to the egg with the highest hatch time, and reduces its hatch time by <strong>${reductionTotal.toFixed(2)}</strong> seconds${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases action time by 1 second and increases hatch time reduction by 0.45 seconds'
    },
    ostrich: {
        name: 'Ostrich',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/8/82/OstrichIcon.webp',
            fallback: '🦓'
        },
        type: 'bird',
        rarity: 'Legendary',
        description: 'Provides age bonuses to hatched pets',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const maxAge = 4.5 + (kg / 2);

            const maxAgeMod = 4.5 * modifier;
            const maxAgeTotal = Math.min(10, maxAge + maxAgeMod);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Pets hatched from eggs have a bonus <strong>1 to ${maxAgeTotal.toFixed(1)}</strong> age to their age value${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases maximum bonus age by 0.5'
    },
    capybara: {
        name: 'Capybara',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/1/12/CapybaraIIcon.webp',
            fallback: '🦫'
        },
        type: 'mammal',
        rarity: 'Legendary',
        description: 'Provides area buffs to nearby pets',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const studs = 15.5 + (kg / 4);
            const xp = 3 + (0.3 * kg);

            const studsMod = 15.5 * modifier;
            const xpMod = 3 * modifier;
            const studsTotal = studs + studsMod;
            const xpTotal = xp + xpMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `All pets within <strong>${studsTotal.toFixed(1)}</strong> studs won't lose hunger and will gain <strong>${xpTotal.toFixed(1)}</strong> XP every second${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases buff range by 0.25 studs and XP gain by 0.3 per second'
    },
    raptor: {
        name: 'Raptor',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/6/64/Raptor_Icon.png',
            fallback: '🦖'
        },
        type: 'dinosaur',
        rarity: 'Legendary',
        description: 'Provides amber mutations and movement speed',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseChance = 2 + (kg / 5);
            const baseSpeed = 14 + (kg / 4);
            const chance = baseChance + (2 * modifier);
            const speed = baseSpeed + (14 * modifier);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${chance.toFixed(2)}%</strong> chance fruit gets Amber mutation after collecting.\nRarer plants have lesser chance.\n\nGrants additional <strong>${speed.toFixed(2)}%</strong> increase to player movement speed${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases amber mutation chance by 0.2% and movement speed by 0.25%'
    },
    stegosaurus: {
        name: 'Stegosaurus',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/7/70/Stegosaurus_Icon.webp',
            fallback: '🦕'
        },
        type: 'dinosaur',
        rarity: 'Legendary',
        description: 'Duplicates harvested fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseChance = 8 + (0.15 * kg);
            const extraChance = 5 + (kg / 10);

            const baseChanceMod = 8 * modifier;
            const extraChanceMod = 5 * modifier;
            const baseChanceTotal = baseChance + baseChanceMod;
            const extraChanceTotal = extraChance + extraChanceMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${baseChanceTotal.toFixed(2)}%</strong> chance harvested fruit duplicates!\nRarer crops have lower chance to duplicate.\n\n<strong>${extraChanceTotal.toFixed(2)}%</strong> extra chance for Prehistoric type fruit to duplicate${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases duplication chance by 0.15% and prehistoric fruit bonus by 0.1%'
    },
    brownmouse: {
        name: 'Brown Mouse',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/8/86/BrownMouse.png',
            fallback: '🐭'
        },
        type: 'mammal',
        rarity: 'Mythical',
        description: 'Provides experience and jump height bonuses',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

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

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, gains additional <strong>${Utils.formatNumber(Math.round(expTotal))}</strong> bonus experience${displayText}!\n\nGrants additional <strong>${jumpTotal.toFixed(2)}%</strong> increase to player jump height!`;
        },
        perKgImpact: () => 'Each additional kg decreases experience time by 5.89 seconds, increases experience by 11, and increases jump height by 0.1%'
    },
    snail: {
        name: 'Snail',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/d/d2/Snail_Icon.png',
            fallback: '🐌'
        },
        type: 'mollusk',
        rarity: 'Legendary',
        description: 'Increases seed drop chances',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const chance = 5 + (kg / 20);

            const chanceMod = 5 * modifier;
            const chanceTotal = chance + chanceMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${chanceTotal.toFixed(2)}%</strong> extra chance harvested plants drop seeds. Rarer plants have lower chance to duplicate.${displayText}`;
        },
        perKgImpact: () => 'Each additional kg adds 0.05% chance to drop seeds'
    },
    giantant: {
        name: 'Giant Ant',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/4/46/GiantAntImage.png',
            fallback: '🐜'
        },
        type: 'insect',
        rarity: 'Mythical',
        description: 'Duplicates candy-type fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseChance = 1.5 + (2 * kg);
            const extraChance = 5 + (0.15 * kg);

            const baseChanceMod = 1.5 * modifier;
            const extraChanceMod = 5 * modifier;
            const baseChanceTotal = baseChance + baseChanceMod;
            const extraChanceTotal = extraChance + extraChanceMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${baseChanceTotal.toFixed(2)}%</strong> chance Harvested fruit duplicate!\nRarer crops have lower chance to duplicate.\n\n<strong>${extraChanceTotal.toFixed(2)}%</strong> extra chance for Candy type fruit to duplicate!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases fruit duplication chance by 2% and candy fruit bonus by 0.15%'
    },
    raccoon: {
        name: 'Raccoon',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/7/7c/Raccoon.png',
            fallback: '🦝'
        },
        type: 'mammal',
        rarity: 'Divine',
        description: 'Steals and duplicates crops from other plots',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 904;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (4 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to another plot and duplicates a random crop and gives it to you${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases stealing time by 4 seconds'
    },
    discobee: {
        name: 'Disco Bee',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/f/f2/DiscoBeeIcon.gif',
            fallback: '🕺'
        },
        type: 'insect',
        rarity: 'Divine',
        description: 'Applies disco mutations to fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 905;
            const baseChance = 14;
            const chance = baseChance + kg;

            const secondsMod = baseSeconds * modifier;
            const chanceMod = baseChance * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const finalSeconds = Math.max(1, adjustedBaseSeconds - (12 * kg));
            const chanceTotal = chance + chanceMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(finalSeconds)}</strong>, <strong>${chanceTotal.toFixed(2)}%</strong> chance a nearby fruit becomes disco${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases action time by 12 seconds and increases disco chance by 1%'
    },
    trex: {
        name: 'T-Rex',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/5/5e/T-Rex_Icon.webp',
            fallback: '🦖'
        },
        type: 'dinosaur',
        rarity: 'Divine',
        description: 'Devours and spreads mutations throughout the garden',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 1224;
            const baseTargets = 3;
            const targets = baseTargets + (kg / 5);

            const secondsMod = baseSeconds * modifier;
            const targetsMod = baseTargets * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const finalSeconds = Math.max(1, adjustedBaseSeconds - (12 * kg));
            const targetsTotal = targets + targetsMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(finalSeconds)}</strong>, devours a random mutation from your garden, then spreads it to <strong>${targetsTotal.toFixed(1)}</strong> other random fruits in your garden${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases action time by 12 seconds and increases spread targets by 0.2'
    },
    redfox: {
        name: 'Red Fox',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/d/d5/RedFox.png',
            fallback: '🦊'
        },
        type: 'mammal',
        rarity: 'Divine',
        description: 'Steals seeds from other players\' crops',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 442.33;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const finalSeconds = Math.max(1, adjustedBaseSeconds - (5 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(finalSeconds)}</strong>, goes to another player's random crop and tries to get a seed from it.\nRarer seeds have lower chance to succeed${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases stealing time by 5 seconds'
    },
    butterfly: {
        name: 'Butterfly',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/1/18/Thy_Butterfly_V2.png',
            fallback: '🦋'
        },
        type: 'insect',
        rarity: 'Mythical',
        description: 'Transforms heavily mutated fruits into rainbow fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 1807.4;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (18 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit with 5+ mutations, removes all of them, and turns it rainbow!\nIgnores favorited fruit${displayText}.`;
        },
        perKgImpact: () => 'Each additional kg decreases transformation time by 18 seconds'
    },
    bloodhedgehog: {
        name: 'Blood Hedgehog',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/9/95/Blood_Hedgehog_Icon.png',
            fallback: '🦔'
        },
        type: 'mammal',
        rarity: 'Legendary',
        description: 'Provides size and variant bonuses to prickly plants',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

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

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Grants prickly plants in <strong>${sizeRangeTotal.toFixed(1)}</strong> studs a <strong>${sizeBonusTotal.toFixed(2)}x</strong> size bonus!\n\nGrants prickly plants in <strong>${variantRangeTotal.toFixed(1)}</strong> studs a <strong>${variantBonusTotal.toFixed(3)}x</strong> variant chance bonus${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases size bonus range by 0.2 studs and size bonus by 0.02x, increases variant range by 0.2 studs and variant bonus by 0.011x'
    },
    hedgehog: {
        name: 'Hedgehog',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/4/46/HedgehogPet.png',
            fallback: '🦔'
        },
        type: 'mammal',
        rarity: 'Rare',
        description: 'Provides size bonuses to prickly plants',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseRange = 30;
            const baseSizeBonus = 1.49;
            const range = baseRange + (kg / 5);
            const sizeBonus = baseSizeBonus + (0.015 * kg);

            const rangeMod = baseRange * modifier;
            const sizeBonusMod = baseSizeBonus * modifier;
            const rangeTotal = range + rangeMod;
            const sizeBonusTotal = sizeBonus + sizeBonusMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Grants prickly plants in <strong>${rangeTotal.toFixed(1)}</strong> studs a <strong>${sizeBonusTotal.toFixed(3)}x</strong> size bonus${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases buff range by 0.2 studs and size bonus by 0.015x'
    },
    seagull: {
        name: 'Seagull',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/5/59/SeagullIcon.webp',
            fallback: '🪶'
        },
        type: 'bird',
        rarity: 'Common',
        description: 'Increases seed drop chances for shoveling plants',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseChance = 3;
            const chance = baseChance + (0.3 * kg);

            const chanceMod = baseChance * modifier;
            const chanceTotal = chance + chanceMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Shoveling plants have a <strong>${chanceTotal.toFixed(1)}%</strong> chance to drop the equivalent seed! Does not work on fruit${displayText}.`;
        },
        perKgImpact: () => 'Each additional kg increases seed drop chance by 0.3%'
    },
    iguanodon: {
        name: 'Iguanodon',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/9/94/Iguanodon.png',
            fallback: '🦕'
        },
        type: 'dinosaur',
        rarity: 'Legendary',
        description: 'Provides XP bonuses to all active dinosaur pets',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseXpBonus = 0.6;
            const xpBonus = baseXpBonus + (0.06 * kg);

            const xpBonusMod = baseXpBonus * modifier;
            const xpBonusTotal = xpBonus + xpBonusMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `All active Dinosaur type pets gain an additional <strong>${xpBonusTotal.toFixed(2)} XP/s</strong>${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases dinosaur pet XP bonus by 0.06 XP/s'
    },
    brontosaurus: {
        name: 'Brontosaurus',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/2/2f/Brontosaurus_Icon.webp',
            fallback: '🦴'
        },
        type: 'dinosaur',
        rarity: 'Mythical',
        description: 'Increases size and weight of pets hatched from eggs',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseBonus = 5.25;
            const bonus = Math.min(30, baseBonus + (kg / 10));

            const bonusMod = baseBonus * modifier;
            const adjustedBaseBonus = Math.min(30, baseBonus + bonusMod);
            const bonusTotal = Math.min(30, adjustedBaseBonus + (kg / 10));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Pets hatched from eggs have a <strong>${bonusTotal.toFixed(2)}%</strong> increase in base size and weight! (Max bonus 30%, does not apply to Brontosauruses.)${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases size and weight bonus by 0.1% (capped at 30% total)'
    },
    pachycephalosaurus: {
        name: 'Pachycephalosaurus',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/5/54/Pachycephalosaurus.png',
            fallback: '🦕'
        },
        type: 'dinosaur',
        rarity: 'Legendary',
        description: 'Provides chances to duplicate crafted items',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseChance = 6;
            const chance = baseChance + (0.3 * kg);

            const chanceMod = baseChance * modifier;
            const chanceTotal = chance + chanceMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Grants a <strong>${chanceTotal.toFixed(1)}%</strong> chance to duplicate a crafted item${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases crafted item duplication chance by 0.3%'
    },
    bloodowl: {
        name: 'Blood Owl',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/0/00/Blood_Owl_Icon.png',
            fallback: '🦉'
        },
        type: 'bird',
        rarity: 'Divine',
        description: 'Provides XP bonuses to all active pets',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseXpBonus = 0.5;
            const xpBonus = baseXpBonus + (0.08 * kg);

            const xpBonusMod = baseXpBonus * modifier;
            const xpBonusTotal = xpBonus + xpBonusMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `All active pets gain an additional <strong>${xpBonusTotal.toFixed(2)} XP/s</strong>${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases all pets\' XP bonus by 0.08 XP/s'
    },
    greymouse: {
        name: 'Grey Mouse',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/8/88/GreyMouse.png',
            fallback: '🐭'
        },
        type: 'mammal',
        rarity: 'Mythical',
        description: 'Provides experience and movement speed bonuses',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

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

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, gains additional <strong>${Utils.formatNumber(Math.round(expTotal))}</strong> bonus experience${displayText}!\n\nGrants additional <strong>${speedTotal.toFixed(1)}%</strong> increase to player movement speed!`;
        },
        perKgImpact: () => 'Each additional kg decreases experience time by 8.18 seconds, increases experience by 8, and increases movement speed by 0.1%'
    },
    ankylosaurus: {
        name: 'Ankylosaurus',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/a/a7/Ankylosaurus.png',
            fallback: '🦕'
        },
        type: 'dinosaur',
        rarity: 'Mythical',
        description: 'Protects against fruit theft by duplicating stolen fruit',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseProtectionChance = 15.7;
            const protectionChance = baseProtectionChance + (kg / 4);

            const protectionChanceMod = baseProtectionChance * modifier;
            const protectionChanceTotal = protectionChance + protectionChanceMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `When another player steals fruit from you, grants a <strong>${protectionChanceTotal.toFixed(2)}%</strong> chance you get the stolen fruit as well${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases theft protection chance by 0.25%'
    },
    axolotl: {
        name: 'Axolotl',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/0/0f/AxolotlIcon.png',
            fallback: '🦎'
        },
        type: 'aquatic',
        rarity: 'Mythical',
        description: 'Preserves Summer type fruits after collecting',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const basePreserveChance = 6;
            const preserveChance = Math.min(13, basePreserveChance + (0.20 * kg));

            const preserveChanceMod = basePreserveChance * modifier;
            const preserveChanceTotal = preserveChance + preserveChanceMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${preserveChanceTotal.toFixed(1)}%</strong> chance Summer type fruit stays after collecting${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases preservation chance by 0.20%'
    },
    baconpig: {
        name: 'Bacon Pig',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/b/b1/BaconPig.png/revision/latest?cb=20250809053320',
            fallback: '🐷'
        },
        type: 'mammal',
        rarity: 'Legendary',
        description: 'Emits aura that boosts variant chance for new fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

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

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, emits an aura for <strong>${Utils.formatTime(durationTotal)}</strong> granting <strong>${multiplierTotal.toFixed(2)}x</strong> chance for new fruit to grow as variants within <strong>${rangeTotal.toFixed(2)}</strong> studs${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases cooldown by 1 second, increases duration by 0.15 seconds, increases variant multiplier by 0.01x, and increases range by 0.15 studs'
    },
    bagelbunny: {
        name: 'Bagel Bunny',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/5/51/BagelBunny.png/revision/latest?cb=20250806114811',
            fallback: '🥯'
        },
        type: 'herbivore',
        rarity: 'Legendary',
        description: 'Eats carrots for enhanced value bonuses',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseCooldown = 45;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(5, adjustedBaseCooldown - kg);
            const multiplier = 5 + (0.05 * kg);

            const multiplierMod = 5 * modifier;
            const multiplierTotal = multiplier + multiplierMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, eats a carrot for <strong>${multiplierTotal.toFixed(2)}x</strong> value bonus${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases cooldown by 1 second and increases value bonus by 0.05x'
    },
    bearbee: {
        name: 'Bear Bee',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/8/8b/Bearbeee1.png',
            fallback: '🐻'
        },
        type: 'insect',
        rarity: 'Mythical',
        description: 'Attempts to pollinate but creates Honey Glazed fruits instead',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 1510;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const finalSeconds = Math.max(1, adjustedBaseSeconds - (16 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(finalSeconds)}</strong>, goes to a nearby fruit and tries to pollinate it - but it's not a bee so it fails and turns it to Honey Glazed instead${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases honey glazing time by 16 seconds'
    },
    baldeagle: {
        name: 'Bald Eagle',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/d/d2/BaldEagle.png',
            fallback: '🦅'
        },
        type: 'bird',
        rarity: 'Legendary',
        description: 'Takes flight and advances egg hatch times with chance for multiplied effect',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseInterval = 704;
            const baseAdvance = 70.4;
            const baseChancePercent = 70.4;
            const baseMultiplier = 1.8;

            const multiplier = baseMultiplier + (0.18 * kg);
            const jumpBonus = 14 + (kg / 4);

            const multiplierMod = baseMultiplier * modifier;
            const jumpBonusMod = 14 * modifier;
            const multiplierTotal = multiplier + multiplierMod;
            const jumpBonusTotal = jumpBonus + jumpBonusMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${baseInterval} seconds</strong>, takes flight and spreads its wings. All eggs advance their hatch time by <strong>${baseAdvance} seconds</strong>!\n\nThere's a <strong>${baseChancePercent}%</strong> chance for the time advance to be multiplied by <strong>${multiplierTotal.toFixed(2)}x</strong>!\n\nGrants additional <strong>${jumpBonusTotal.toFixed(2)}%</strong> increase to player jump height${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases multiplier by 0.18x'
    },
    blackbunny: {
        name: 'Black Bunny',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/e/ec/Black_bunny_icon.png',
            fallback: '🐰'
        },
        type: 'herbivore',
        rarity: 'Uncommon',
        description: 'Eats carrots for value bonuses',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 45;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            const bonus = 1.5 + (0.015 * kg);

            const bonusMod = 1.5 * modifier;
            const bonusTotal = bonus + bonusMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, eats a carrot for a <strong>${bonusTotal.toFixed(3)}x</strong> value bonus${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases feeding time by 1 second and increases value bonus by 0.015x'
    },
    cat: {
        name: 'Cat',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/8/89/Catpet.png',
            fallback: '🐱'
        },
        type: 'mammal',
        rarity: 'Uncommon',
        description: 'Naps to provide size bonuses to nearby fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 80;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const napInterval = Math.max(1, adjustedBaseSeconds - kg);
            const napDuration = 10 + (kg / 10);
            const range = 10 + (kg / 10);
            const sizeMultiplier = 1.25 + (0.0025 * kg);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(napInterval)}</strong>, naps for <strong>${Utils.formatTime(napDuration)}</strong>. New fruit within <strong>${range.toFixed(1)}</strong> studs will be <strong>${sizeMultiplier.toFixed(4)}x</strong> larger!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases nap interval by 1 second, increases nap duration by 0.1 seconds, increases range by 0.1 studs, and increases size multiplier by 0.0025x'
    },
    caterpillar: {
        name: 'Caterpillar',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/3/3d/Caterpillar_Icon.png',
            fallback: '🐛'
        },
        type: 'insect',
        rarity: 'Legendary',
        description: 'Accelerates growth of leafy plants',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const growthMultiplier = 1.45 + (kg * 0.15);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `All leafy plants grow <strong>${growthMultiplier.toFixed(2)}x</strong> faster!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases leafy plant growth speed by 0.15x'
    },
    chicken: {
        name: 'Chicken',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/5/51/Chicken_Pet_V2.png',
            fallback: '🐔'
        },
        type: 'bird',
        rarity: 'Uncommon',
        description: 'Increases egg hatch speed',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const hatchSpeed = 10 + (kg / 10);

            const hatchSpeedMod = 10 * modifier;
            const hatchSpeedTotal = hatchSpeed + hatchSpeedMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Increases egg hatch speed by <strong>${hatchSpeedTotal.toFixed(1)}%</strong>!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases egg hatch speed by 0.1%'
    },
    chickenzombie: {
        name: 'Chicken Zombie',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/b/be/Chicken_Zombie_Icon.png',
            fallback: '🧟'
        },
        type: 'undead',
        rarity: 'Mythical',
        description: 'Zombifies fruits and increases egg hatch speed',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 1600;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (18 * kg));
            const zombifyChance = 20 + (kg / 5);
            const hatchSpeed = 10 + (kg / 10);

            const hatchSpeedMod = 10 * modifier;
            const hatchSpeedTotal = hatchSpeed + hatchSpeedMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${zombifyChance.toFixed(1)}%</strong> chance a nearby fruit becomes Zombified!\n\nIncreases egg hatch speed by <strong>${hatchSpeedTotal.toFixed(1)}%</strong>!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases zombify time by 18 seconds, increases zombify chance by 0.2%, and increases egg hatch speed by 0.1%'
    },
    cookedowl: {
        name: 'Cooked Owl',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/f/fc/Cooked_Owl.png',
            fallback: '🍗'
        },
        type: 'bird',
        rarity: 'Mythical',
        description: 'Cooks fruits and provides XP bonuses to all pets',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 806;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (12 * kg));
            const cookChance = 15 + (kg / 4);
            const xpBonus = 0.15 + (0.03 * kg);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${cookChance.toFixed(2)}%</strong> chance to cook a nearby fruit. Usually Burnt.\n\nAll active pets gain an additional <strong>${xpBonus.toFixed(2)} XP/s</strong>! Also very tasty!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases cooking time by 12 seconds, increases cooking chance by 0.25%, and increases all pets\' XP bonus by 0.03 XP/s'
    },
    cow: {
        name: 'Cow',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/8/84/Cow.png',
            fallback: '🐄'
        },
        type: 'mammal',
        rarity: 'Legendary',
        description: 'Provides growth bonuses to nearby plants',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const range = 10 + (kg / 10);
            const growthMultiplier = 1.25 + (kg / 80);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `All plants within <strong>${range.toFixed(1)}</strong> studs grow <strong>${growthMultiplier.toFixed(3)}x</strong> faster!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases buff range by 0.1 studs and growth speed by 0.0125x'
    },
    deer: {
        name: 'Deer',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/2/27/Deer.png',
            fallback: '🦌'
        },
        type: 'mammal',
        rarity: 'Uncommon',
        description: 'Preserves berry fruits after harvest',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const preserveChance = Math.min(5, 2.5 + (kg / 40));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${preserveChance.toFixed(2)}%</strong> chance berry fruit stays after harvest!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases berry preservation chance by 0.025%'
    },
    dilophosaurus: {
        name: 'Dilophosaurus',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/3/3c/Dilophosaurus.png',
            fallback: '🦖'
        },
        type: 'dinosaur',
        rarity: 'Mythical',
        description: 'Spits venom to advance cooldowns or grant XP to multiple pets',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 846;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (8.4 * kg));
            const targets = Math.min(5, 3 + (kg / 5));
            const cooldownAdvance = Math.min(100, 40 + (kg / 4));
            const xpGrant = Math.min(1500, 500 + (40 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, opens its frills and spits out venom! The venom spreads to <strong>${targets.toFixed(1)}</strong> other random pets, advancing cooldown by <strong>${Utils.formatTime(cooldownAdvance)}</strong> OR granting <strong>${Utils.formatNumber(Math.round(xpGrant))}</strong> XP!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases venom time by 8.4 seconds, increases targets by 0.2, increases cooldown advance by 0.5 seconds, and increases XP grant by 49'
    },
    dog: {
        name: 'Dog',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/2/29/DogPet.png',
            fallback: '🐕'
        },
        type: 'mammal',
        rarity: 'Common',
        description: 'Digs up random seeds',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(5, adjustedBaseSeconds - kg);
            const digChance = 5 + (kg / 20);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${digChance.toFixed(2)}%</strong> chance to dig up a random seed!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases digging time by 1 second and increases dig success chance by 0.05%'
    },
    dragonfly: {
        name: 'Dragonfly',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/c/c9/DragonflyIcon.png',
            fallback: '🪲'
        },
        type: 'insect',
        rarity: 'Divine',
        description: 'Turns fruits into gold',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 300;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (3 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, turns one random fruit gold!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases gold transformation time by 3 seconds'
    },
    echofrog: {
        name: 'Echo Frog',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/3/30/Echo_frog.png',
            fallback: '🐸'
        },
        type: 'amphibian',
        rarity: 'Mythical',
        description: 'Croaks to advance plant growth by 24 hours',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 303;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (6 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, croaks and a random nearby plant will advance growth by <strong>24 hours</strong>!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases croaking time by 6 seconds'
    },
    fennecfox: {
        name: 'Fennec Fox',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/e/e8/FennecFoxIcon.png',
            fallback: '🦊'
        },
        type: 'mammal',
        rarity: 'Divine',
        description: 'Copies mutations from other players\' fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 1350;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (13 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to another player's random fruit, has a chance to copy 1 random mutation and apply it to random fruit you own! The higher mutation multiplier the rarer chance to copy!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases mutation copying time by 13 seconds'
    },
    flamingo: {
        name: 'Flamingo',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/e/ec/FlamingoIcon.webp',
            fallback: '🦩'
        },
        type: 'bird',
        rarity: 'Rare',
        description: 'Stands on one leg to boost nearby plant and fruit growth',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 240;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (2 * kg));
            const duration = 15 + (kg / 2);
            const range = 13 + (0.3 * kg);
            const growthMultiplier = 15 + (kg / 4);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, stands on one leg for <strong>${Utils.formatTime(duration)}</strong>. All plants and fruits within <strong>${range.toFixed(1)}</strong> studs will grow <strong>${growthMultiplier.toFixed(1)}x</strong> faster!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases stance time by 2 seconds, increases stance duration by 0.5 seconds, increases range by 0.3 studs, and increases growth speed by 0.25x'
    },
    frog: {
        name: 'Frog',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/5/55/FrogV2.png',
            fallback: '🐸'
        },
        type: 'amphibian',
        rarity: 'Legendary',
        description: 'Croaks to advance plant growth by 24 hours',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 604.5;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (9 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, croaks and a random nearby plant will advance growth by <strong>24 hours</strong>!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases croaking time by 9 seconds'
    },
    giantant: {
        name: 'Giant Ant',
        icon: '🐜',
        type: 'insect',
        description: 'Duplicates harvested fruits with candy bonus',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseChance = 10 + (kg / 10);
            const extraChance = 5 + (0.15 * kg);

            const baseChanceMod = 10 * modifier;
            const extraChanceMod = 5 * modifier;
            const baseChanceTotal = baseChance + baseChanceMod;
            const extraChanceTotal = extraChance + extraChanceMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${baseChanceTotal.toFixed(1)}%</strong> chance harvested fruit duplicate!\nRarer crops have lower chance to duplicate.\n\n<strong>${extraChanceTotal.toFixed(2)}%</strong> extra chance for Candy type fruit to duplicate!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases fruit duplication chance by 0.1% and candy fruit bonus by 0.15%'
    },
    goldenbee: {
        name: 'Golden Bee',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/e/e8/GoldenBee.png',
            fallback: '🐝'
        },
        type: 'insect',
        rarity: 'Mythical',
        description: 'Pollinates fruits and provides gold harvest chance',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 1510;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (16 * kg));
            const goldChance = 1 + (kg / 10);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit and pollinates it, applying Pollinated mutation!\n\n<strong>${goldChance.toFixed(1)}%</strong> chance harvested fruit becomes Gold on harvest!\nRarer crops have less chance to turn gold!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases pollination time by 16 seconds and increases gold harvest chance by 0.1%'
    },
    goldenlab: {
        name: 'Golden Lab',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/f/f3/GoldenLabPet.png',
            fallback: '🐕‍🦺'
        },
        type: 'mammal',
        rarity: 'Common',
        description: 'Digs up random seeds with improved success rate',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(5, adjustedBaseSeconds - kg);
            const digChance = 10 + (kg / 10);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${digChance.toFixed(1)}%</strong> chance to dig up a random seed!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases digging time by 1 second and increases dig success chance by 0.1%'
    },
    hamster: {
        name: 'Hamster',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/c/c5/HamsterIcon.webp',
            fallback: '🐹'
        },
        type: 'mammal',
        rarity: 'Mythical',
        description: 'Runs in wheel to boost crafting speed',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 188;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (1.5 * kg));
            const craftingBoost = 30 + (0.3 * kg);
            const duration = 18 + (kg / 2);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, runs in a hamster wheel and boosts crafting speed by <strong>${craftingBoost.toFixed(1)}%</strong> for <strong>${Utils.formatTime(duration)}</strong>!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases wheel time by 1.5 seconds, increases crafting boost by 0.3%, and increases boost duration by 0.5 seconds'
    },
    honeybee: {
        name: 'Honey Bee',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/1/14/HoneyBee.png',
            fallback: '🐝'
        },
        type: 'insect',
        rarity: 'Rare',
        description: 'Pollinates fruits with mutations',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 1210;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (12 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit and pollinates it, applying Pollinated mutation!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases pollination time by 12 seconds'
    },
    hyacinthmacaw: {
        name: 'Hyacinth Macaw',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/7/77/HyacinthMacawIcon.png',
            fallback: '🦜'
        },
        type: 'bird',
        rarity: 'Mythical',
        description: 'Applies Cloudtouched mutations to nearby fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 486;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (4 * kg));
            const mutateChance = 15 + (kg / 20);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${mutateChance.toFixed(2)}%</strong> chance to mutate a nearby fruit, applying the Cloudtouched mutation!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases mutation time by 4 seconds and increases mutation chance by 0.05%'
    },
    kappa: {
        name: 'Kappa',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/8/84/Kappa_.png',
            fallback: '🥒'
        },
        type: 'aquatic',
        rarity: 'Mythical',
        description: 'Sprays water to apply Wet mutations with chance for Bloodlit',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 488;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (4 * kg));
            const range = 25 + (kg / 4);
            const bloodlitChance = 10 + (kg / 10);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, sprays water on all fruits within <strong>${range.toFixed(1)}</strong> studs, applying Wet mutation. Has a <strong>${bloodlitChance.toFixed(1)}%</strong> to replace Wet mutations already on fruit with Bloodlit mutation!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases spray time by 4 seconds, increases range by 0.25 studs, and increases bloodlit replacement chance by 0.1%'
    },
    kiwi: {
        name: 'Kiwi',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/e/ea/Kiwi.png',
            fallback: '🥝'
        },
        type: 'bird',
        rarity: 'Rare',
        description: 'Reduces egg hatch times',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            const reduction = 25 + (kg / 4);

            const reductionMod = 25 * modifier;
            const reductionTotal = reduction + reductionMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to the egg with the highest hatch time and reduces its hatch time by <strong>${Utils.formatTime(reductionTotal)}</strong>!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases action time by 1 second and increases hatch time reduction by 0.25 seconds'
    },
    kitsune: {
        name: 'Kitsune',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/4/4d/Kitsune_.png',
            fallback: '🦊'
        },
        type: 'mammal',
        rarity: 'Prismatic',
        description: 'Steals crops from other players with chakra mutations',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 1344.5;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (6 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to another player's crop, mutates it with <span style="color: rgb(255, 80, 65);">Chakra</span> then steals (duplicate) and gives it to you! Very rare chance to mutate with <span style="color: rgb(255, 0, 0);">Foxfire Chakra</span> mutation instead!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases stealing time by 6 seconds'
    },
    koi: {
        name: 'Koi',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/2/2f/Koi.webp',
            fallback: '🐟'
        },
        type: 'aquatic',
        rarity: 'Mythical',
        description: 'Provides chance to recover eggs when hatching',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseRecoveryChance = 3;
            const recoveryChanceMod = baseRecoveryChance * modifier;
            const adjustedBaseRecoveryChance = baseRecoveryChance + recoveryChanceMod;
            const recoveryChance = Math.min(8, adjustedBaseRecoveryChance + (kg * 0.22));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `When hatching eggs there is a <strong>${recoveryChance.toFixed(2)}%</strong> chance to get the egg back! Cannot recover Premium/Exotic Eggs.${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases egg recovery chance by 0.22%'
    },
    meerkat: {
        name: 'Meerkat',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/c/c2/Meerkat.png',
            fallback: '🦦'
        },
        type: 'mammal',
        rarity: 'Legendary',
        description: 'Does lookouts that advance other pets\' cooldowns',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseLookoutSeconds = 444;
            const lookoutSecondsMod = baseLookoutSeconds * modifier;
            const adjustedBaseLookoutSeconds = baseLookoutSeconds - lookoutSecondsMod;
            const lookoutSeconds = Math.max(15, adjustedBaseLookoutSeconds - (4.4 * kg));
            const cooldownAdvance = 20 + (kg / 2);
            const repeatChance = Math.min(100, 15 + (kg / 4));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(lookoutSeconds)}</strong>, goes to another pet and does a lookout. That pet advances cooldown by <strong>${Utils.formatTime(cooldownAdvance)}</strong>!\n\nHas a <strong>${repeatChance.toFixed(2)}%</strong> chance to do it again after each lookout.${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases lookout time by 4.4 seconds, increases cooldown advance by 0.5 seconds, and increases repeat chance by 0.25%'
    },
    mimicoctopus: {
        name: 'Mimic Octopus',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/0/00/MimicOctopusIcon.webp',
            fallback: '🐙'
        },
        type: 'aquatic',
        rarity: 'Mythical',
        description: 'Mimics and copies abilities from other pets',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 1212;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (12 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, mimics and copies an ability from another pet and performs its ability!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases mimicking time by 12 seconds'
    },
    mole: {
        name: 'Mole',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/6/63/Mole.png',
            fallback: '🦔'
        },
        type: 'mammal',
        rarity: 'Legendary',
        description: 'Digs underground to find treasure',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 10;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(10, adjustedBaseSeconds - (1 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, digs down underground to find treasure. Can dig up gear or sheckles!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases digging time by 1 second (minimum 10 seconds)'
    },
    monkey: {
        name: 'Monkey',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/8/85/Monkey_Pet_V2.png',
            fallback: '🐒'
        },
        type: 'mammal',
        rarity: 'Rare',
        description: 'Refunds fruits back to inventory',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const refundChance = 2.5 + (kg / 40);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${refundChance.toFixed(2)}%</strong> chance to refund fruit back to your inventory. Rarer plants have lower chance to refund!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases fruit refund chance by 0.025%'
    },
    mooncat: {
        name: 'Moon Cat',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/e/ee/Moon_Cat.png',
            fallback: '🌙'
        },
        type: 'mammal',
        rarity: 'Legendary',
        description: 'Naps to provide size bonuses and preserves Night type fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseNapInterval = 70;
            const napIntervalMod = baseNapInterval * modifier;
            const adjustedBaseNapInterval = baseNapInterval + napIntervalMod;
            const napInterval = Math.max(1, adjustedBaseNapInterval - kg);
            const napDuration = 20 + (kg / 5);
            const range = 20 + (kg / 5);
            const sizeMultiplier = 1.5 + (kg * 0.02);
            const nightChance = 6 + (0.6 * kg);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(napInterval)}</strong>, naps for <strong>${Utils.formatTime(napDuration)}</strong>. New fruit within <strong>${range.toFixed(1)}</strong> studs will be <strong>${sizeMultiplier.toFixed(2)}x</strong> larger!\n\n<strong>${nightChance.toFixed(1)}%</strong> chance Night type fruit stays after harvest!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases nap interval by 1 second, increases nap duration by 0.2 seconds, increases range by 0.2 studs, increases size multiplier by 0.02x, and increases night fruit preservation by 0.6%'
    },
    moth: {
        name: 'Moth',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/0/09/Moth.png',
            fallback: '🦋'
        },
        type: 'insect',
        rarity: 'Legendary',
        description: 'Sings to restore pet hunger',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 763;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (7 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, sings to a random pet and restores its hunger to 100%!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases singing time by 7 seconds'
    },
    nightowl: {
        name: 'Night Owl',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/0/07/Night_Owl_Icon.png',
            fallback: '🦉'
        },
        type: 'bird',
        rarity: 'Mythical',
        description: 'Provides XP bonuses to all active pets',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const xpBonus = 0.2 + (kg / 25);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `All active pets gain an additional <strong>${xpBonus.toFixed(2)} XP/s</strong>!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases all pets\' XP bonus by 0.04 XP/s'
    },
    nihonzaru: {
        name: 'Nihonzaru',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/d/db/Nihonzaru_.png',
            fallback: '🐒'
        },
        type: 'mammal',
        rarity: 'Rare',
        description: 'Bathes in hot springs to boost all pets\' passive abilities',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const basePassiveBoost = 2;
            const basePassiveBoostMod = basePassiveBoost * modifier;
            const adjustedBasePassiveBoost = basePassiveBoost + basePassiveBoostMod;
            const passiveBoost = Math.min(6, adjustedBasePassiveBoost + (kg / 10));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `As long as you have a Hot Spring in your garden: The pet bathes in it and boosts all pets passive by <strong>${passiveBoost.toFixed(3)}%</strong>!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases all pets\' passive boost by 0.1%'
    },
    orangetabby: {
        name: 'Orange Tabby',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/7/73/Orange_tabby_icon.png',
            fallback: '🐱'
        },
        type: 'mammal',
        rarity: 'Rare',
        description: 'Naps to provide size bonuses to nearby fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseNapInterval = 90;
            const napIntervalMod = baseNapInterval * modifier;
            const adjustedBaseNapInterval = baseNapInterval + napIntervalMod;
            const napInterval = Math.max(1, adjustedBaseNapInterval - kg);
            const napDuration = 15 + (0.15 * kg);
            const range = 15 + (0.15 * kg);
            const sizeMultiplier = 1.5 + (kg / 100);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(napInterval)}</strong>, naps for <strong>${Utils.formatTime(napDuration)}</strong>. New fruit within <strong>${range.toFixed(2)}</strong> studs will be <strong>${sizeMultiplier.toFixed(2)}x</strong> larger!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases nap interval by 1 second, increases nap duration by 0.15 seconds, increases range by 0.15 studs, and increases size multiplier by 0.01x'
    },
    orangutan: {
        name: 'Orangutan',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/4/47/OrangutanIcon.webp',
            fallback: '🦧'
        },
        type: 'mammal',
        rarity: 'Rare',
        description: 'Preserves crafting materials during recipes',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const preserveChance = 3 + (kg / 3);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `When crafting, each material used in the recipe has a <strong>${preserveChance.toFixed(2)}%</strong> chance to not get consumed!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases material preservation chance by ~0.33%'
    },
    owl: {
        name: 'Owl',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/4/46/Owlpng.png',
            fallback: '🦉'
        },
        type: 'bird',
        rarity: 'Mythical',
        description: 'Provides XP bonuses to all active pets',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const xpBonus = 0.2 + (kg / 25);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `All active pets gain an additional <strong>${xpBonus.toFixed(2)} XP/s</strong>!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases all pets\' XP bonus by 0.04 XP/s'
    },
    packbee: {
        name: 'Pack Bee',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/f/fe/PackBee.png',
            fallback: '🐝'
        },
        type: 'insect',
        rarity: 'Mythical',
        description: 'Pollinates fruits and increases backpack size',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const seconds = Math.max(1, 1510 - (16 * kg));
            const backpackIncrease = 25 + kg;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit and pollinates it, applying Pollinated mutation!\n\nIncreases player backpack size by <strong>${backpackIncrease}</strong>!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases pollination time by 16 seconds and increases backpack size by 1'
    },
    panda: {
        name: 'Panda',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/9/94/PandaPet.png',
            fallback: '🐼'
        },
        type: 'mammal',
        rarity: 'Legendary',
        description: 'Eats bamboo for value bonuses',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 180;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            const bonus = 1.5 + (0.015 * kg);

            const bonusMod = 1.5 * modifier;
            const bonusTotal = bonus + bonusMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, eats bamboo for a <strong>${bonusTotal.toFixed(3)}x</strong> value bonus${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases feeding time by 1 second and increases value bonus by 0.015x'
    },
    parasaurolophus: {
        name: 'Parasaurolophus',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/2/26/Parasaurolophus.png',
            fallback: '🦕'
        },
        type: 'dinosaur',
        rarity: 'Legendary',
        description: 'Reduces cosmetic crate open times with chance for multiplied effect',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 82;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (1.8 * kg));
            const reduction = 80 + (0.65 * kg);
            const chancePercent = 25.5 + (kg / 4);
            const multiplier = 1.5 + (kg / 5);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to the cosmetic crate with the highest open time and reduces its open time by <strong>${Utils.formatTime(reduction)}</strong>!\n\nThere is a <strong>${chancePercent.toFixed(2)}%</strong> chance for open time reduction to be multiplied by <strong>${multiplier.toFixed(1)}x</strong>!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases action time by 1.8 seconds, increases reduction by 0.65 seconds, increases multiplier chance by 0.25%, and increases multiplier by 0.2x'
    },
    peacock: {
        name: 'Peacock',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/6/61/Peacock.png',
            fallback: '🦚'
        },
        type: 'bird',
        rarity: 'Legendary',
        description: 'Fans feathers to advance nearby pets\' cooldowns',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 606;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(15, adjustedBaseSeconds - (6 * kg));
            const range = 20 + (kg / 5);
            const cooldownAdvance = 65 + (0.6 * kg);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, fans its feathers and all active pets within <strong>${range.toFixed(1)}</strong> studs will advance cooldown for their abilities by <strong>${Utils.formatTime(cooldownAdvance)}</strong>!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases feather time by 6 seconds, increases range by 0.2 studs, and increases cooldown advance by 0.6 seconds'
    },
    petalbee: {
        name: 'Petal Bee',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/5/52/Petalbee.png',
            fallback: '🌸'
        },
        type: 'insect',
        rarity: 'Legendary',
        description: 'Pollinates fruits and preserves Flower type fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const seconds = Math.max(1, 1510 - (16 * kg));
            const flowerChance = 1 + (kg / 10);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, flies to a nearby fruit and pollinates it applying Pollinated mutation!\n\n<strong>${flowerChance.toFixed(1)}%</strong> chance Flower type fruit stays after harvest!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases pollination time by 16 seconds and increases flower preservation chance by 0.1%'
    },
    pig: {
        name: 'Pig',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/8/82/Pig_no_back.png',
            fallback: '🐷'
        },
        type: 'mammal',
        rarity: 'Rare',
        description: 'Emits variant chance aura for nearby fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 120;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            const duration = 15 + (0.15 * kg);
            const variantMultiplier = 2 + (kg / 100);
            const range = 15 + (0.15 * kg);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, emits an aura for <strong>${Utils.formatTime(duration)}</strong> granting <strong>${variantMultiplier.toFixed(2)}x</strong> chance for new fruit to grow as variants within <strong>${range.toFixed(2)}</strong> studs!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases aura time by 1 second, increases duration by 0.15 seconds, increases variant chance by 0.01x, and increases range by 0.15 studs'
    },
    polarbear: {
        name: 'Polar Bear',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/2/25/Polarbear.png',
            fallback: '🐻‍❄️'
        },
        type: 'mammal',
        rarity: 'Legendary',
        description: 'Chills or freezes nearby fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 80;
            const chillChance = 10 + (kg / 10);

            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const finalSeconds = Math.max(1, adjustedBaseSeconds - kg);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(finalSeconds)}</strong>, <strong>${chillChance.toFixed(1)}%</strong> chance a nearby fruit becomes Chilled or Frozen!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases chill time by 1 second and increases chill chance by 0.1%'
    },
    prayingmantis: {
        name: 'Praying Mantis',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/2/25/PrayingMantis.png',
            fallback: '🦗'
        },
        type: 'insect',
        rarity: 'Mythical',
        description: 'Prays to grant variant chance bonuses to nearby fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 80;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            const duration = 10 + (kg / 10);
            const variantMultiplier = 1.5 + (kg / 200);
            const range = 10 + (kg / 10);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, prays for <strong>${Utils.formatTime(duration)}</strong> granting <strong>${variantMultiplier.toFixed(3)}x</strong> variant chance within <strong>${range.toFixed(1)}</strong> studs!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases prayer time by 1 second, increases prayer duration by 0.1 seconds, increases variant multiplier by 0.005x, and increases range by 0.1 studs'
    },
    pterodactyl: {
        name: 'Pterodactyl',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/7/7c/Pterodactyl_Icon.webp',
            fallback: '🦕'
        },
        type: 'dinosaur',
        rarity: 'Mythical',
        description: 'Flaps wings to send ripples causing fruit to get Windstruck with chance for Twisted',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 666;
            const baseFruits = 3;
            const baseTwistedChance = 18.2;
            const baseJumpBonus = 14;
            const fruits = baseFruits + (0.15 * kg);
            const twistedChance = baseTwistedChance + (kg / 4);
            const jumpBonus = baseJumpBonus + (kg / 4);

            const secondsMod = baseSeconds * modifier;
            const fruitsMod = baseFruits * modifier;
            const twistedChanceMod = baseTwistedChance * modifier;
            const jumpBonusMod = baseJumpBonus * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const finalSeconds = Math.max(1, adjustedBaseSeconds - (6 * kg));
            const fruitsTotal = fruits + fruitsMod;
            const twistedChanceTotal = twistedChance + twistedChanceMod;
            const jumpBonusTotal = jumpBonus + jumpBonusMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(finalSeconds)}</strong>, flaps its wings and sends out ripples of wind causing <strong>${fruitsTotal.toFixed(2)}</strong> random fruit to get Windstruck with a <strong>${twistedChanceTotal.toFixed(2)}%</strong> chance for Twisted to be applied as well!\n\nGrants additional <strong>${jumpBonusTotal.toFixed(2)}%</strong> increase to player jump height${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases flapping time by 6 seconds, increases fruit affected by 0.15, increases Twisted chance by 0.25%, and increases jump height by 0.25%'
    },
    queenbee: {
        name: 'Queen Bee',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/7/7a/Queen_bee.png',
            fallback: '👑'
        },
        type: 'insect',
        rarity: 'Divine',
        description: 'Pollinates fruits and refreshes pet abilities',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const basePollinateSeconds = 1220;
            const pollinateSecondsMod = basePollinateSeconds * modifier;
            const adjustedBasePollinateSeconds = basePollinateSeconds - pollinateSecondsMod;
            const pollinateSeconds = Math.max(1, adjustedBasePollinateSeconds - (16 * kg));

            const baseRefreshSeconds = 1328;
            const refreshSecondsMod = baseRefreshSeconds * modifier;
            const adjustedBaseRefreshSeconds = baseRefreshSeconds - refreshSecondsMod;
            const refreshSeconds = Math.max(1, adjustedBaseRefreshSeconds - (16 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(pollinateSeconds)}</strong>, a nearby fruit gets magically pollinated applying Pollinated mutation!\n\nEvery <strong>${Utils.formatTime(refreshSeconds)}</strong>, the pet with the highest cooldown refreshes its ability!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases pollination time by 16 seconds and refresh time by 16 seconds'
    },
    reddragon: {
        name: 'Red Dragon',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/6/6e/RedDragonRender.png',
            fallback: '🐉'
        },
        type: 'dragon',
        rarity: 'Prismatic',
        description: 'Burns nearby fruits with fiery breath',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 80;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);
            const burnChance = 20 + (kg / 5);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${burnChance.toFixed(1)}%</strong> chance nearby fruit becomes Burnt!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases burning time by 1 second and increases burn chance by 0.2%'
    },
    redgiantant: {
        name: 'Red Giant Ant',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/c/c8/RedGiantAntImage.png',
            fallback: '🐜'
        },
        type: 'insect',
        rarity: 'Mythical',
        description: 'Duplicates harvested fruits with fruit-type bonus',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseChance = 5 + (kg / 10);
            const fruitBonus = 5 + (kg / 10);

            const baseChanceMod = 5 * modifier;
            const fruitBonusMod = 5 * modifier;
            const baseChanceTotal = baseChance + baseChanceMod;
            const fruitBonusTotal = fruitBonus + fruitBonusMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${baseChanceTotal.toFixed(1)}%</strong> chance harvested fruit duplicate!\nRarer crops have lower chance to duplicate.\n\n<strong>${fruitBonusTotal.toFixed(1)}%</strong> extra chance for Fruit type crops to duplicate!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases fruit duplication chance by 0.1% and fruit-type bonus by 0.1%'
    },
    sandsnake: {
        name: 'Sand Snake',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/a/a4/SandSnakeIcon.png',
            fallback: '🐍'
        },
        type: 'reptile',
        rarity: 'Legendary',
        description: 'Duplicates purchased items from seed/gear shop',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const duplicateChance = 1 + (kg / 4);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Buying from the seed/gear shop has a <strong>${duplicateChance.toFixed(2)}%</strong> chance to duplicate the bought item!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases item duplication chance by 0.25%'
    },
    scarletmacaw: {
        name: 'Scarlet Macaw',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/2/21/ScarletMacawIcon.webp',
            fallback: '🦜'
        },
        type: 'bird',
        rarity: 'Legendary',
        description: 'Applies Verdant mutations to nearby fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 524;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (5 * kg));
            const mutateChance = 15 + (kg / 2);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${mutateChance.toFixed(1)}%</strong> chance to mutate a nearby fruit applying the Verdant mutation!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases mutation time by 5 seconds and increases mutation chance by 0.5%'
    },
    seaotter: {
        name: 'Sea Otter',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/c/c3/Sea_Otter.png',
            fallback: '🦦'
        },
        type: 'aquatic',
        rarity: 'Legendary',
        description: 'Sprays water on nearby plants',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 30;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - kg);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, sprays water on a nearby plant.${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases spraying time by 1 second'
    },
    seal: {
        name: 'Seal',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/f/f9/SealIcon.webp',
            fallback: '🦭'
        },
        type: 'aquatic',
        rarity: 'Rare',
        description: 'Provides chance to get pets back as eggs when selling',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseReturn = 2.5;
            const returnMod = baseReturn * modifier;
            const adjustedBaseReturn = baseReturn + returnMod;
            const returnChance = Math.max(0, adjustedBaseReturn + (0.22 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Selling pets have a <strong>${returnChance.toFixed(2)}%</strong> chance to get the pet back as its egg equivalent!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases pet return chance by 0.22%'
    },
    shibainu: {
        name: 'Shiba Inu',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/b/bb/Shiba_Inu.png',
            fallback: '🐕'
        },
        type: 'mammal',
        rarity: 'Uncommon',
        description: 'Digs up random seeds',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 60;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(5, adjustedBaseSeconds - kg);
            const digChance = 15 + (kg / 20);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, <strong>${digChance.toFixed(2)}%</strong> chance to dig up a random seed!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases digging time by 1 second and increases dig success chance by 0.05%'
    },
    silvermonkey: {
        name: 'Silver Monkey',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/a/a7/Silvermonkey.png',
            fallback: '🐒'
        },
        type: 'mammal',
        rarity: 'Legendary',
        description: 'Refunds fruits back to inventory',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const refundChance = 7.5 + (0.075 * kg);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${refundChance.toFixed(3)}%</strong> chance to refund fruit back to your inventory. Rarer plants have lower chance to refund!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases fruit refund chance by 0.075%'
    },
    spinosaurus: {
        name: 'Spinosaurus',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/2/24/Spinosaurus.png',
            fallback: '🦕'
        },
        type: 'dinosaur',
        rarity: 'Divine',
        description: 'Devours mutations and spreads them with roar',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 1224;
            const baseFruits = 3;
            const fruits = baseFruits + (kg / 5);

            const secondsMod = baseSeconds * modifier;
            const fruitsMod = baseFruits * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const finalSeconds = Math.max(1, adjustedBaseSeconds - (12 * kg));
            const fruitsTotal = fruits + fruitsMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(finalSeconds)}</strong>, devours a random mutation from <strong>${fruitsTotal.toFixed(1)}</strong> fruits in your garden each then roars spreading those mutations to 1 random fruit in your garden! Prioritizes applying mutations to a favorited fruit.${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases roaring time by 12 seconds and increases fruits affected by 0.2'
    },
    spotteddeer: {
        name: 'Spotted Deer',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/3/38/Spotteddeer.png',
            fallback: '🦌'
        },
        type: 'mammal',
        rarity: 'Rare',
        description: 'Preserves berry fruits after harvest',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const preserveChance = Math.min(10, 5 + (kg / 20));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${preserveChance.toFixed(2)}%</strong> chance berry fruit stays after harvest!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases berry preservation chance by 0.05%'
    },
    squirrel: {
        name: 'Squirrel',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/9/93/Squirrel_Icon.png',
            fallback: '🐿️'
        },
        type: 'mammal',
        rarity: 'Mythical',
        description: 'Provides Reclaimer efficiency and XP bonuses',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const reclaimerChance = 10 + (0.3 * kg);
            const xpBonus = 3 + (0.3 * kg);

            const reclaimerChanceMod = 10 * modifier;
            const xpBonusMod = 3 * modifier;
            const reclaimerChanceTotal = reclaimerChance + reclaimerChanceMod;
            const xpBonusTotal = xpBonus + xpBonusMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${reclaimerChanceTotal.toFixed(1)}%</strong> chance to not consume a use when using the Reclaimer!\n\nGains an additional <strong>${xpBonusTotal.toFixed(1)} XP</strong> per second!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases Reclaimer efficiency by 0.3% and XP gain by 0.3 per second'
    },
    stegosaurus: {
        name: 'Stegosaurus',
        icon: '🦕',
        type: 'dinosaur',
        description: 'Duplicates harvested fruits with prehistoric bonus',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseChance = 8 + (0.15 * kg);
            const extraChance = 5 + (kg / 10);

            const baseChanceMod = 8 * modifier;
            const extraChanceMod = 5 * modifier;
            const baseChanceTotal = baseChance + baseChanceMod;
            const extraChanceTotal = extraChance + extraChanceMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${baseChanceTotal.toFixed(2)}%</strong> chance harvested fruit duplicates!\nRarer crops have lower chance to duplicate.\n\n<strong>${extraChanceTotal.toFixed(2)}%</strong> extra chance for Prehistoric type fruit to duplicate${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases duplication chance by 0.15% and prehistoric fruit bonus by 0.1%'
    },
    tarantulahawk: {
        name: 'Tarantula Hawk',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/7/78/The_Tarantula_Hawk.png',
            fallback: '🕷️'
        },
        type: 'insect',
        rarity: 'Legendary',
        description: 'Pollinates fruits and stings pets to advance cooldowns',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

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

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(pollinateSeconds)}</strong>, flies to a nearby fruit and pollinates it applying Pollinated mutation!\n\nEvery <strong>${Utils.formatTime(stingSeconds)}</strong>, stings a random pet and advances its ability cooldown by <strong>${Utils.formatTime(cooldownAdvance)}</strong>!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases pollination time by 16 seconds, decreases sting time by 3 seconds, and increases cooldown advance by 0.8 seconds'
    },
    tanuki: {
        name: 'Tanuki',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/1/1f/Tanuki_.png',
            fallback: '🦝'
        },
        type: 'mammal',
        rarity: 'Legendary',
        description: 'Causes mischief and performs random actions in the garden',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 640;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (3.6 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, causes mischief, doing random different actions in your garden!`;
        },
        perKgImpact: () => 'Each additional kg decreases mischief time by 3.6 seconds'
    },
    tanchozuru: {
        name: 'Tanchozuru',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/d/d3/Tanchozuru_.png',
            fallback: '🕊️'
        },
        type: 'bird',
        rarity: 'Legendary',
        description: 'Meditates to grant Tranquil mutations to nearby fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseMeditateInterval = 627;
            const meditateIntervalMod = baseMeditateInterval * modifier;
            const adjustedBaseMeditateInterval = baseMeditateInterval + meditateIntervalMod;
            const meditateInterval = Math.max(1, adjustedBaseMeditateInterval - kg);
            const meditateDuration = 10 + (kg / 10);
            const range = 15 + (kg / 10);
            const tranquilChance = 5 + (kg / 20);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(meditateInterval)}</strong>, meditates for <strong>${Utils.formatTime(meditateDuration)}</strong>, nearby fruits in a <strong>${range.toFixed(1)}</strong> studs have a <strong>${tranquilChance.toFixed(2)}%</strong> chance every second to mutate into Tranquil!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases meditation interval by 1 second, increases meditation duration by 0.1 seconds, increases range by 0.1 studs, and increases tranquil chance by 0.05%'
    },
    toucan: {
        name: 'Toucan',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/1/10/ToucanIcon.webp',
            fallback: '🦜'
        },
        type: 'bird',
        rarity: 'Rare',
        description: 'Provides size and variant bonuses to tropical plants',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const range = 25 + (kg / 4);
            const sizeBonus = 1.2 + (kg / 20);
            const variantBonus = 1.15 + (kg / 10);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Grants all tropical plants within <strong>${range.toFixed(1)}</strong> studs a <strong>${sizeBonus.toFixed(2)}x</strong> size bonus!\n\nGrants all tropical plants within <strong>${range.toFixed(1)}</strong> studs a <strong>${variantBonus.toFixed(2)}x</strong> variant chance bonus!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases range by 0.25 studs, increases size bonus by 0.05x, and increases variant bonus by 0.1x'
    },
    turtle: {
        name: 'Turtle',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/b/b1/Turtle_icon.png',
            fallback: '🐢'
        },
        type: 'reptile',
        rarity: 'Legendary',
        description: 'Extends sprinkler duration',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const duration = 20 + (kg / 5);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `All Sprinklers last <strong>${duration.toFixed(1)}%</strong> longer!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases sprinkler duration by 0.2%'
    },
    wasp: {
        name: 'Wasp',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/f/f8/The_Wasp.png',
            fallback: '🐝'
        },
        type: 'insect',
        rarity: 'Rare',
        description: 'Pollinates fruits and stings pets to advance cooldowns',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

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

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(pollinateSeconds)}</strong>, flies to a nearby fruit and pollinates it applying Pollinated mutation!\n\nEvery <strong>${Utils.formatTime(stingSeconds)}</strong>, stings a random pet and advances its ability cooldown by <strong>${Utils.formatTime(cooldownAdvance)}</strong>!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases pollination time by 18 seconds, decreases sting time by 6 seconds, and increases cooldown advance by 0.6 seconds'
    },
    football: {
        name: 'Football',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/1/10/FootballPet.png',
            fallback: '🏈'
        },
        type: 'other',
        rarity: 'Legendary',
        description: 'Touchdown: Occasionally runs to the Gear Shop or Seed Shop (whichever is farther) and does a touchdown which awards you with sheckles or a Watering Can',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const wateringCanChance = 20 + (kg / 3);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(87)}</strong>, runs to the Gear Shop or Seed Shop (whichever is farther) and does a touchdown which awards you with <strong>${Utils.formatNumber(870)}</strong> Sheckles or <strong>${wateringCanChance.toFixed(2)}%</strong> chance for a Watering Can instead!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases watering can chance by 0.33%'
    },
    manekineko: {
        name: 'Maneki-neko',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/6/64/ManekiNeko.png',
            fallback: '🐱'
        },
        type: 'other',
        rarity: 'Uncommon',
        description: 'Fortune Cat: Occasionally does a wave of good luck and grants increased chance to get your fruit back after selling it',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 143;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (0.6 * kg));
            const refundChance = 8 + (0.15 * kg);
            const duration = 10 + (kg / 4);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, waves and invites good fortune that grants <strong>${refundChance.toFixed(2)}%</strong> chance to refund fruit back to your inventory for <strong>${Utils.formatTime(duration)}</strong>! Rarer fruit have rarer chance to refund.${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases wave time by 0.6 seconds, increases refund chance by 0.15%, and increases effect duration by 0.25 seconds'
    },
    tsuchinoko: {
        name: 'Tsuchinoko',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/f/fd/Tsuchinoko.png',
            fallback: '🐍'
        },
        type: 'reptile',
        rarity: 'Rare',
        description: 'Fat Snake: Increased lucky harvest chance!',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const chance = 5 + (kg / 20);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${chance.toFixed(2)}%</strong> extra chance harvested plants drop seeds. Rarer plants have lower chance to duplicate.${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases seed drop chance by 0.05%'
    },
    kodama: {
        name: 'Kodama',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/1/18/Kodama.png',
            fallback: '🌳'
        },
        type: 'other',
        rarity: 'Legendary',
        description: 'Tree Spirit: Collecting Zen type fruits have a chance to mutate with Tranquil.',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const chance = Math.min(12, 6 + (0.33 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(chance)}</strong>, collecting Zen type fruit has a <strong>${chance.toFixed(2)}%</strong> chance to mutate with Tranquil!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases Tranquil mutation chance by 0.33%'
    },
    corruptedkodama: {
        name: 'Corrupted Kodama',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/4/47/Placeholder.png',
            fallback: '🌚'
        },
        type: 'other',
        rarity: 'Legendary',
        description: 'Corrupted Tree Spirit: Collecting Zen type fruits have a chance to mutate with Corrupt.',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const chance = Math.min(12, 6 + (0.33 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Collecting Zen type fruit has a <strong>${chance.toFixed(2)}%</strong> chance to mutate with Corrupt!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases Corrupt mutation chance by 0.33%'
    },
    raiju: {
        name: 'Raiju',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/0/0d/Raiju.png',
            fallback: '⚡'
        },
        type: 'other',
        rarity: 'Mythical',
        description: 'Lightning Beast: Occasionally devours a fruit with Shocked for bonus value, spits a chain lightning that mutates fruit with Static or Shocked if its a Thunderstorm',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 622;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (2.6 * kg));
            const targets = 4 + (0.15 * kg);
            const shockedChance = 20 + (0.15 * kg);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, devours a fruit with Shocked mutation for <strong>1.5x</strong> sheckle value to Summon a chain of lightning to mutate <strong>${targets.toFixed(1)}</strong> fruits with Static! During a Thunderstorm: <strong>${shockedChance.toFixed(2)}%</strong> chance for Shocked instead!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases lightning time by 2.6 seconds, increases targets by 0.15, and increases Shocked chance by 0.15%'
    },
    mizuchi: {
        name: 'Mizuchi',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/1/1c/Mizuchi.png',
            fallback: '🐉'
        },
        type: 'other',
        rarity: 'Divine',
        description: 'Water Diety: When selling fruits with Wet/Drenched mutation, there is chance a random mutation from that fruit will be applied to a fruit in your garden!',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const chance = 4 + (kg / 10);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `When selling fruits with Wet/Drenched mutation: There is a <strong>${chance.toFixed(2)}%</strong> chance a random mutation from that fruit will be applied to a fruit in your garden!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases mutation spread chance by 0.1%'
    },
    corruptedkitsune: {
        name: 'Corrupted Kitsune',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/2/2a/CorruptedKitsune.png',
            fallback: '🦊'
        },
        type: 'other',
        rarity: 'Prismatic',
        description: 'Nine-Tailed Curse: Occasionally, Removes 9 mutations from 9 different fruit. Applies Corrupted Chakra with a very rare chance for Corrupted Foxfire Chakra to 1 random fruit.',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 1260;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1, adjustedBaseSeconds - (3.6 * kg));
            const chakraChance = 20 + (kg / 5);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, launches cursed energy at 9 different fruits. Each fruit has <strong>${chakraChance.toFixed(2)}%</strong> to mutate with <span style="color: rgb(0, 85, 255);">Corrupt Chakra</span> with a very rare chance for <span style="color: rgb(0, 0, 255);">Corrupt Foxfire Chakra</span> instead!${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases cursed energy time by 3.6 seconds and increases Corrupt Chakra chance by 0.2%'
    },
    bagelbunny: {
        name: 'Bagel Bunny',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/5/51/BagelBunny.png',
            fallback: '🥯'
        },
        type: 'food',
        rarity: 'Uncommon',
        description: 'Eats carrots for value bonuses',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 45;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(5, adjustedBaseSeconds - kg);
            const multiplier = 5 + (0.05 * kg);

            const multiplierMod = 5 * modifier;
            const multiplierTotal = multiplier + multiplierMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, eats a carrot for <strong>${multiplierTotal.toFixed(2)}x</strong> value bonus${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases cooldown by 1 second and increases multiplier by 0.05x'
    },
    pancakemole: {
        name: 'Pancake Mole',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/2/26/PancakeMole.png',
            fallback: '🥞'
        },
        type: 'food',
        rarity: 'Rare',
        description: 'Digs underground to find treasure',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 80;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(10, adjustedBaseSeconds - kg);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, digs down underground to find treasure. Can dig up gear or sheckles${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases cooldown by 1 second (minimum 10 seconds)'
    },
    sushibear: {
        name: 'Sushi Bear',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/5/5a/SushiBear.png',
            fallback: '🍣'
        },
        type: 'food',
        rarity: 'Legendary',
        description: 'Chills nearby fruits and feeds other pets',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds1 = 80;
            const baseSeconds2 = 670;
            const seconds1Mod = baseSeconds1 * modifier;
            const seconds2Mod = baseSeconds2 * modifier;
            const adjustedBaseSeconds1 = baseSeconds1 - seconds1Mod;
            const adjustedBaseSeconds2 = baseSeconds2 - seconds2Mod;
            const seconds1 = Math.max(10, adjustedBaseSeconds1 - kg);
            const seconds2 = Math.max(100, adjustedBaseSeconds2 - (3.5 * kg));
            const chance = 15 + (0.15 * kg);
            const amount = Math.min(0.5, 0.01); // Fixed: no kg scaling, max 0.5

            const chanceMod = 15 * modifier;
            const amountMod = 0.01 * modifier;
            const chanceTotal = chance + chanceMod;
            const amountTotal = Math.min(0.5, amount + amountMod);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds1)}</strong>, <strong>${chanceTotal.toFixed(1)}%</strong> chance a nearby fruit becomes Chilled or Frozen${displayText}!\n\nEvery <strong>${Utils.formatTime(seconds2)}</strong>, flings a sushi towards a random pet and feeds it for <strong>${(amountTotal * 100).toFixed(1)}%</strong> of its hunger!`;
        },
        perKgImpact: () => 'Each additional kg decreases cooldowns by 1 and 3.5 seconds respectively (minimums 10s and 100s), and increases chill chance by 0.15%'
    },
    spaghettisloth: {
        name: 'Spaghetti Sloth',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/8/8f/SpaghettiSloth.png',
            fallback: '🍝'
        },
        type: 'food',
        rarity: 'Legendary',
        description: 'Cooks nearby fruits with pasta mutations',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 845;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(200, adjustedBaseSeconds - (7.5 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, goes to a nearby fruit and does-a-cooking! Applying Pasta, Sauce or Meatball mutation${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg decreases cooldown by 7.5 seconds (minimum 200 seconds)'
    },
    frenchfryferret: {
        name: 'French Fry Ferret',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/7/7e/FrenchFryFerret.png',
            fallback: '🍟'
        },
        type: 'food',
        rarity: 'Mythical',
        description: 'Increases pet levels',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseSeconds = 3632;
            const secondsMod = baseSeconds * modifier;
            const adjustedBaseSeconds = baseSeconds - secondsMod;
            const seconds = Math.max(1200, adjustedBaseSeconds - (36 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(seconds)}</strong>, increases a random pet's level by 1! Ability cannot be mimicked or refreshed${displayText}.`;
        },
        perKgImpact: () => 'Each additional kg decreases cooldown by 36 seconds'
    },
    mochimouse: {
        name: 'Mochi Mouse',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/7/78/MochiMouse.png',
            fallback: '🍡'
        },
        type: 'food',
        rarity: 'Legendary',
        description: 'Provides XP bonuses to Food type pets',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseXpBonus = 0.75;
            const xpBonus = baseXpBonus + (0.15 * kg);

            const xpBonusMod = baseXpBonus * modifier;
            const xpBonusTotal = xpBonus + xpBonusMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `All active Food type pets gain an additional <strong>${xpBonusTotal.toFixed(2)} XP/s</strong>${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases Food type pets\' XP bonus by 0.15 XP/s'
    },
    corruptedkodama: {
        name: 'Corrupted Kodama',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/6/68/Corrupt_Kodama.png',
            fallback: '🌲'
        },
        type: 'spirit',
        rarity: 'Mythical',
        description: 'Corrupts Zen type fruits after collecting',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseChance = 6;
            const chance = Math.min(12, baseChance + (0.33 * kg));

            const chanceMod = baseChance * modifier;
            const chanceTotal = chance + chanceMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${chanceTotal.toFixed(2)}%</strong> chance Zen type fruit gets Corrupt mutation after collecting${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases corruption chance by 0.33% (max 12%)'
    },
    frenchfryferret: {
        name: 'French Fry Ferret',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/7/7e/FrenchFryFerret.png',
            fallback: '🍟'
        },
        type: 'food',
        rarity: 'Prismatic',
        description: 'Increases random pet levels - cannot be mimicked or refreshed',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseCooldown = 3632;
            const cooldownMod = baseCooldown * modifier;
            const adjustedBaseCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(1200, adjustedBaseCooldown - (36 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `Every <strong>${Utils.formatTime(cooldown)}</strong>, increases a random pet's level by 1! Ability cannot be mimicked or refreshed${displayText}.`;
        },
        perKgImpact: () => 'Each additional kg decreases cooldown by 36 seconds (minimum 20 minutes)'
    },
    kodama: {
        name: 'Kodama',
        icon: {
            type: 'image',
            url: 'https://static.wikia.nocookie.net/growagarden/images/1/18/Kodama.png',
            fallback: '🌳'
        },
        type: 'spirit',
        rarity: 'Legendary',
        description: 'Grants Tranquil mutations to Zen type fruits',
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseChance = 6;
            const chance = Math.min(12, baseChance + (0.33 * kg));

            const chanceMod = baseChance * modifier;
            const chanceTotal = chance + chanceMod;

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<strong>${chanceTotal.toFixed(2)}%</strong> chance Zen type fruit gets Tranquil mutation after collecting${displayText}!`;
        },
        perKgImpact: () => 'Each additional kg increases tranquil chance by 0.33% (max 12%)'
    }
};

// Pet Mutation Options - Additional abilities that can be applied to pets
const petMutationOptions = {
    'Shocked Pet Mutation': {
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseCooldown = 60;
            const cooldownMod = baseCooldown * modifier;
            const adjustedCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(45, adjustedCooldown - (0.6 * kg));

            const baseChance = 25;
            const chanceBonus = 0.02 * kg;
            const chance = Math.min(30, baseChance + chanceBonus);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<font color="rgb(255, 255, 100)">SHOCKED: During a Thunderstorm: Every <strong>${cooldown.toFixed(1)}s</strong>, has a <strong>${chance.toFixed(2)}%</strong> chance to attract lightning, shocking nearby fruits!</font>${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases cooldown by 0.6 seconds and increases lightning chance by 0.02%'
    },
    'Frozen Pet Mutation': {
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseCooldown = 300;
            const cooldownMod = baseCooldown * modifier;
            const adjustedCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(30, adjustedCooldown - (3 * kg));

            const baseChance = 20;
            const chanceBonus = 0.03 * kg;
            const chance = Math.min(30, baseChance + chanceBonus);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<font color="rgb(108, 184, 255)">FROZEN: Every <strong>${Utils.formatTime(cooldown)}</strong>, <strong>${chance.toFixed(2)}%</strong> chance a nearby fruit becomes Frozen!</font>${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases cooldown by 3 seconds and increases freeze chance by 0.03%'
    },
    'Windy Pet Mutation': {
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseCooldown = 300;
            const cooldownMod = baseCooldown * modifier;
            const adjustedCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(30, adjustedCooldown - (3 * kg));

            const baseChance = 20;
            const chanceBonus = 0.03 * kg;
            const chance = Math.min(30, baseChance + chanceBonus);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<font color="rgb(162, 185, 209)">WINDY: Every <strong>${Utils.formatTime(cooldown)}</strong>, <strong>${chance.toFixed(2)}%</strong> chance a nearby fruit becomes Windstruck!</font>${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases cooldown by 3 seconds and increases windstruck chance by 0.03%'
    },
    'IronSkin Pet Mutation': {
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseChance = 35;
            const chanceBonus = 0.2 * kg;
            const chance = Math.min(45, baseChance + chanceBonus);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<font color="rgb(206, 206, 206)">IRONSKIN: When another player steals fruit from you, grants a <strong>${chance.toFixed(2)}%</strong> chance you get the stolen fruit as well!</font>${displayText}`;
        },
        perKgImpact: () => 'Each additional kg increases protection chance by 0.2%'
    },
    'Radiant Pet Mutation': {
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseCooldown = 1800;
            const cooldownMod = baseCooldown * modifier;
            const adjustedCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(1200, adjustedCooldown - (9 * kg));

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<font color="rgb(248, 108, 38)">RADIANT: Every <strong>${Utils.formatTime(cooldown)}</strong>, emits sunshine at a random nearby plant and advances their growth by 24 hours!</font>${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases sunshine cooldown by 9 seconds'
    },
    'Ascended Pet Mutation': {
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseCooldown = 21621;
            const cooldownMod = baseCooldown * modifier;
            const adjustedCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(18000, adjustedCooldown - (21 * kg));

            const baseChance = 75;
            const chanceBonus = 0.03 * kg;
            const chance = Math.min(90, baseChance + chanceBonus);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<font color="rgb(247, 245, 184)">ASCENDED: Every <strong>${Utils.formatTime(cooldown)}</strong>, a nearby fruit ascends to a higher realm, applying the Dawnbound mutation with <strong>${chance.toFixed(2)}%</strong> success rate!</font>${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases ascension cooldown by 21 seconds and increases success rate by 0.03%'
    },
    'Tranquil Pet Mutation': {
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseCooldown = 1500;
            const cooldownMod = baseCooldown * modifier;
            const adjustedCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(1000, adjustedCooldown - (3 * kg));

            const baseChance = 20;
            const chanceBonus = 0.03 * kg;
            const chance = Math.min(30, baseChance + chanceBonus);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<font color="rgb(247, 245, 184)">TRANQUIL: Every <strong>${Utils.formatTime(cooldown)}</strong>, a nearby fruit finds inner peace, applying the Tranquil mutation with <strong>${chance.toFixed(2)}%</strong> success rate!</font>${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases tranquility cooldown by 3 seconds and increases success rate by 0.03%'
    },
    'Corrupted Pet Mutation': {
        calculate: (kg, modifierType = 'none') => {
            if (!Utils.isValidWeight(kg)) {
                return 'Invalid weight';
            }

            const { value: modifier, text: modifierText, style: modifierStyle } = getModifierDetails(modifierType);

            const baseCooldown = 1500;
            const cooldownMod = baseCooldown * modifier;
            const adjustedCooldown = baseCooldown - cooldownMod;
            const cooldown = Math.max(1000, adjustedCooldown - (3 * kg));

            const baseChance = 20;
            const chanceBonus = 0.03 * kg;
            const chance = Math.min(30, baseChance + chanceBonus);

            const displayText = modifier > 0 ? ` <span style='${modifierStyle}'>${modifierText}</span>` : '';

            return `<font color="rgba(247, 184, 184, 1)">CORRUPTED: Every <strong>${Utils.formatTime(cooldown)}</strong>, a nearby fruit is corrupted, applying the Corrupted mutation with <strong>${chance.toFixed(2)}%</strong> success rate!</font>${displayText}`;
        },
        perKgImpact: () => 'Each additional kg decreases tranquility cooldown by 3 seconds and increases success rate by 0.03%'
    }
};
