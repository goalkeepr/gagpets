async function testModifiers() {
    try {
        console.log("Testing modifiers import...");
        const modifiers = await import('./utils/modifiers.js');
        console.log("Modifiers exports:", Object.keys(modifiers));
        
    } catch (error) {
        console.error("Modifiers import error:", error.message);
    }
}

testModifiers();
