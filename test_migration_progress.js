// Quick test of our modular pet system progress
import { petAbilities, getPetStats } from './petAbilities_modular.js';

console.log("=== MODULAR PET ABILITIES MIGRATION PROGRESS ===");

const stats = getPetStats();
console.log(`\nTotal pets migrated: ${stats.total}`);

console.log("\nBy Category:");
Object.entries(stats.categories).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} pets`);
});

console.log("\nBy Rarity:");
Object.entries(stats.byRarity).forEach(([rarity, count]) => {
    console.log(`  ${rarity}: ${count} pets`);
});

console.log("\nBy Type:");
Object.entries(stats.byType).forEach(([type, count]) => {
    console.log(`  ${type}: ${count} pets`);
});

// Test a few pet calculations
console.log("\n=== SAMPLE PET CALCULATIONS ===");

const testPets = ['starfish', 'rooster', 'capybara', 'raptor'];

testPets.forEach(petKey => {
    if (petAbilities[petKey]) {
        const pet = petAbilities[petKey];
        console.log(`\n${pet.name} (${pet.type}, ${pet.rarity}):`);
        console.log(`At 50kg: ${pet.calculate(50, 'none')}`);
    } else {
        console.log(`\n${petKey}: NOT FOUND`);
    }
});

console.log("\n=== MIGRATION COMPLETE ===");
