// Test aquatic import directly
try {
    const { AQUATIC_PETS } = await import('./pets/aquatic.js');
    console.log("✅ AQUATIC_PETS imported successfully");
    console.log(`Found ${Object.keys(AQUATIC_PETS).length} pets:`, Object.keys(AQUATIC_PETS));
} catch (error) {
    console.log("❌ Import failed:", error.message);
    console.log("Full error:", error);
}
