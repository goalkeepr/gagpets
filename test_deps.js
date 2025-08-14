async function testDeps() {
    try {
        console.log("Testing icons import...");
        const icons = await import('./data/icons.js');
        console.log("Icons exports:", Object.keys(icons));
        
        console.log("Testing constants import...");
        const constants = await import('./data/constants.js');
        console.log("Constants exports:", Object.keys(constants));
        
        console.log("Testing utils import...");
        const utils = await import('./utils/calculations.js');
        console.log("Utils exports:", Object.keys(utils));
        
    } catch (error) {
        console.error("Dependency import error:", error.message);
    }
}

testDeps();
