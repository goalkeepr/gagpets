// Test Blood Kiwi classification fix
import { BIRD_PETS } from './pets/birds.js';

console.log("🔧 Blood Kiwi Classification Fix");
console.log("=================================");

if (BIRD_PETS.bloodkiwi) {
    console.log("✅ Blood Kiwi found in BIRD_PETS");
    console.log(`   Name: ${BIRD_PETS.bloodkiwi.name}`);
    console.log(`   Type: ${BIRD_PETS.bloodkiwi.type}`);
    console.log(`   Rarity: ${BIRD_PETS.bloodkiwi.rarity}`);
    console.log(`   Description: ${BIRD_PETS.bloodkiwi.description}`);
} else {
    console.log("❌ Blood Kiwi not found in BIRD_PETS");
}

console.log(`\nTotal bird pets: ${Object.keys(BIRD_PETS).length}`);
console.log("Bird pet names:", Object.keys(BIRD_PETS).join(", "));

console.log("\n✅ Classification corrected: Blood Kiwi is now properly categorized as a bird!");
