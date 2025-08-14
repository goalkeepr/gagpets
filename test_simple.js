// Test just one import
console.log("Testing aquatic pets import...");

async function testImport() {
    try {
        const aquaticModule = await import('./pets/aquatic.js');
        console.log("Available exports:", Object.keys(aquaticModule));
        
        if (aquaticModule.AQUATIC_PETS) {
            console.log("✅ AQUATIC_PETS found!");
            console.log("Aquatic pets:", Object.keys(aquaticModule.AQUATIC_PETS));
            
            // Test a calculation
            const starfish = aquaticModule.AQUATIC_PETS.starfish;
            console.log(`Starfish at 50kg: ${starfish.calculate(50, 'none')}`);
        } else {
            console.log("❌ AQUATIC_PETS not found");
        }
    } catch (error) {
        console.error("Import error:", error.message);
    }
}

testImport();
