async function testStep1() {
    try {
        const mod = await import('./test_step1.js');
        console.log("Step 1 exports:", Object.keys(mod));
        console.log("TEST_PETS keys:", Object.keys(mod.TEST_PETS));
    } catch (error) {
        console.error("Error:", error.message);
    }
}

testStep1();
