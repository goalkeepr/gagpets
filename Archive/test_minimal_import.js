async function testMinimal() {
    try {
        const mod = await import('./test_minimal.js');
        console.log("Minimal test exports:", Object.keys(mod));
    } catch (error) {
        console.error("Error:", error.message);
    }
}

testMinimal();
