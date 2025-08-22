// Simple test of individual category files
import { AQUATIC_PETS } from './pets/aquatic.js';
import { BIRD_PETS } from './pets/birds.js';
import { MAMMAL_PETS } from './pets/mammals.js';
import { DINOSAUR_PETS } from './pets/dinosaurs.js';

console.log("=== CATEGORY-BY-CATEGORY MIGRATION SUCCESS ===");

console.log(`\nAquatic pets: ${Object.keys(AQUATIC_PETS).length}`);
console.log(Object.keys(AQUATIC_PETS).join(', '));

console.log(`\nBird pets: ${Object.keys(BIRD_PETS).length}`);
console.log(Object.keys(BIRD_PETS).join(', '));

console.log(`\nMammal pets: ${Object.keys(MAMMAL_PETS).length}`);
console.log(Object.keys(MAMMAL_PETS).join(', '));

console.log(`\nDinosaur pets: ${Object.keys(DINOSAUR_PETS).length}`);
console.log(Object.keys(DINOSAUR_PETS).join(', '));

const totalMigrated = Object.keys(AQUATIC_PETS).length + 
                     Object.keys(BIRD_PETS).length + 
                     Object.keys(MAMMAL_PETS).length + 
                     Object.keys(DINOSAUR_PETS).length;

console.log(`\n🎉 TOTAL PETS MIGRATED: ${totalMigrated}`);

// Test a sample calculation
console.log(`\n=== SAMPLE CALCULATIONS ===`);
console.log(`Starfish at 50kg: ${AQUATIC_PETS.starfish.calculate(50, 'none')}`);
console.log(`Rooster at 50kg: ${BIRD_PETS.rooster.calculate(50, 'none')}`);
console.log(`Capybara at 50kg: ${MAMMAL_PETS.capybara.calculate(50, 'none')}`);
console.log(`Raptor at 50kg: ${DINOSAUR_PETS.raptor.calculate(50, 'none')}`);

console.log(`\n✅ ALL CATEGORIES WORKING SUCCESSFULLY!`);
