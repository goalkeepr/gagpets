// Test the recipe parser with the provided HTML data

// Sample HTML data (abbreviated version for testing)
const sampleRecipeHTML = `
<div class="tabber wds-tabber">
    <div class="wds-tabs__wrapper with-bottom-border">
        <ul class="wds-tabs">
            <li class="wds-tabs__tab wds-is-current" data-hash="Salad">
                <div class="wds-tabs__tab-label"><a href="#">Salad</a></div>
            </li>
            <li class="wds-tabs__tab" data-hash="Sandwich">
                <div class="wds-tabs__tab-label"><a href="#">Sandwich</a></div>
            </li>
        </ul>
    </div>
    <div class="wds-tab__content wds-is-current">
        <div class="tabber wds-tabber">
            <div class="wds-tabs__wrapper with-bottom-border">
                <ul class="wds-tabs">
                    <li class="wds-tabs__tab wds-is-current" data-hash="Normal">
                        <div class="wds-tabs__tab-label"><a href="#">Normal</a></div>
                    </li>
                    <li class="wds-tabs__tab" data-hash="Mythical">
                        <div class="wds-tabs__tab-label"><a href="#">Mythical</a></div>
                    </li>
                </ul>
            </div>
            <div class="wds-tab__content wds-is-current">
                <p>Normal</p>
                <p><u>1st Option ✅</u>:</p>
                <ul>
                    <li>2x Tomato</li>
                </ul>
                <p><u>2nd Option ✅️</u>:</p>
                <ul>
                    <li>1x Strawberry</li>
                    <li>1x Bell Pepper</li>
                </ul>
            </div>
            <div class="wds-tab__content">
                <p>Mythical</p>
                <p><u>1st Option ✅</u>:</p>
                <ul>
                    <li>1x Tomato</li>
                    <li>1x Prismatic Crop</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="wds-tab__content">
        <div class="tabber wds-tabber">
            <div class="wds-tabs__wrapper with-bottom-border">
                <ul class="wds-tabs">
                    <li class="wds-tabs__tab wds-is-current" data-hash="Normal">
                        <div class="wds-tabs__tab-label"><a href="#">Normal</a></div>
                    </li>
                </ul>
            </div>
            <div class="wds-tab__content wds-is-current">
                <p>Normal</p>
                <p><u>1st Option</u>:</p>
                <ul>
                    <li>2x Tomato</li>
                    <li>1x Corn</li>
                </ul>
            </div>
        </div>
    </div>
</div>
`;

// Function to demonstrate the parser
function testRecipeParser() {
    // Import the parser (in browser environment, this would already be loaded)
    const { CookingEventRecipeParser } = require('./recipe_parser.js');
    
    const parser = new CookingEventRecipeParser();
    const result = parser.parseRecipeHTML(sampleRecipeHTML);
    
    console.log('Parsed Recipe Data:');
    console.log('Headers:', result.headers);
    console.log('Number of recipes:', result.recipeCount);
    console.log('Number of unique ingredients:', result.ingredientCount);
    
    console.log('\nSample rows:');
    result.rows.slice(0, 3).forEach((row, index) => {
        console.log(`Row ${index + 1}:`, row);
    });
    
    // Generate CSV
    const csv = parser.exportToCSV(result);
    console.log('\nCSV output (first 500 chars):');
    console.log(csv.substring(0, 500) + '...');
    
    return result;
}

// Function to process your full HTML data
function processFullRecipeData(htmlString) {
    const { CookingEventRecipeParser } = require('./recipe_parser.js');
    
    const parser = new CookingEventRecipeParser();
    const result = parser.parseRecipeHTML(htmlString);
    
    console.log(`Successfully parsed ${result.recipeCount} recipes with ${result.ingredientCount} unique ingredients`);
    
    // Generate outputs
    const csv = parser.exportToCSV(result);
    const json = parser.exportToJSON(result);
    const htmlTable = parser.createHTMLTable(result);
    
    return {
        data: result,
        csv: csv,
        json: json,
        htmlTable: htmlTable
    };
}

// Helper function to save outputs to files (Node.js environment)
function saveOutputs(outputs, baseFilename = 'recipes') {
    const fs = require('fs');
    
    // Save CSV
    fs.writeFileSync(`${baseFilename}.csv`, outputs.csv);
    console.log(`Saved ${baseFilename}.csv`);
    
    // Save JSON
    fs.writeFileSync(`${baseFilename}.json`, outputs.json);
    console.log(`Saved ${baseFilename}.json`);
    
    // Save HTML table
    const htmlWrapper = `<!DOCTYPE html>
<html>
<head>
    <title>Recipe Table</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .verified-yes { background-color: #d4edda; }
        .verified-no { background-color: #f8d7da; }
    </style>
</head>
<body>
    <h1>Cooking Event Recipes</h1>
    ${outputs.htmlTable}
</body>
</html>`;
    
    fs.writeFileSync(`${baseFilename}.html`, htmlWrapper);
    console.log(`Saved ${baseFilename}.html`);
}

// Example usage:
if (require.main === module) {
    // Test with sample data
    console.log('Testing with sample data...');
    testRecipeParser();
    
    // To use with your full HTML data, uncomment and provide the HTML:
    /*
    const yourFullHTML = `<!-- paste your full HTML here -->`;
    const outputs = processFullRecipeData(yourFullHTML);
    saveOutputs(outputs, 'cooking_recipes');
    */
}

module.exports = {
    testRecipeParser,
    processFullRecipeData,
    saveOutputs,
    sampleRecipeHTML
};
