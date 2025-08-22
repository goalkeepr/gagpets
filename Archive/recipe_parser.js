// Recipe Parser for Cooking Event HTML Data
// Parses the recipe HTML and creates a structured table format

class RecipeParser {
    constructor() {
        this.recipes = [];
        this.allIngredients = new Set();
    }

    // Parse HTML content and extract recipe data
    parseRecipeHTML(htmlContent) {
        // Create a DOM parser to work with the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        
        // Get all main tabs (food items)
        const mainTabs = doc.querySelectorAll('.wds-tabs__tab');
        const mainTabContents = doc.querySelectorAll('.wds-tab__content');
        
        // Process each main tab (food item)
        mainTabs.forEach((tab, index) => {
            const itemName = tab.querySelector('a').textContent.trim();
            const tabContent = mainTabContents[index];
            
            if (tabContent) {
                this.parseItemContent(itemName, tabContent);
            }
        });
        
        return this.createRecipeTable();
    }

    // Parse content for a specific food item
    parseItemContent(itemName, content) {
        // Find nested tabber for rarities
        const rarityTabs = content.querySelectorAll('.wds-tabs__tab');
        const rarityContents = content.querySelectorAll('.wds-tab__content');
        
        rarityTabs.forEach((tab, index) => {
            const rarity = tab.querySelector('a').textContent.trim();
            const rarityContent = rarityContents[index];
            
            if (rarityContent) {
                this.parseRarityContent(itemName, rarity, rarityContent);
            }
        });
    }

    // Parse content for a specific rarity level
    parseRarityContent(itemName, rarity, content) {
        // Find all option sections
        const optionSections = this.extractOptions(content);
        
        optionSections.forEach((optionData, index) => {
            const optionNumber = index + 1;
            const ingredients = this.parseIngredients(optionData.ingredients);
            
            // Add all ingredients to our set
            ingredients.forEach(ing => this.allIngredients.add(ing.name));
            
            this.recipes.push({
                item: itemName,
                rarity: rarity,
                option: optionNumber,
                verified: optionData.verified,
                ingredients: ingredients,
                note: optionData.note || ''
            });
        });
    }

    // Extract options from content
    extractOptions(content) {
        const options = [];
        const text = content.textContent;
        
        // Look for option patterns
        const optionRegex = /(\d+(?:st|nd|rd|th)\s+Option[^:]*):?\s*([✅❌🟡]*)\s*(.*?)(?=\d+(?:st|nd|rd|th)\s+Option|$)/gs;
        let match;
        
        while ((match = optionRegex.exec(text)) !== null) {
            const [, optionLabel, verified, ingredientText] = match;
            
            // Extract ingredients from lists
            const ingredientItems = content.querySelectorAll('ul li');
            const ingredients = [];
            
            ingredientItems.forEach(li => {
                const liText = li.textContent.trim();
                if (liText && this.isIngredientLine(liText)) {
                    ingredients.push(liText);
                }
            });
            
            options.push({
                label: optionLabel.trim(),
                verified: verified.includes('✅'),
                ingredients: ingredients,
                note: this.extractNote(ingredientText)
            });
        }
        
        // Fallback: if no options found with regex, try parsing ul elements directly
        if (options.length === 0) {
            const allLists = content.querySelectorAll('ul');
            allLists.forEach((ul, index) => {
                const ingredients = [];
                ul.querySelectorAll('li').forEach(li => {
                    const liText = li.textContent.trim();
                    if (this.isIngredientLine(liText)) {
                        ingredients.push(liText);
                    }
                });
                
                if (ingredients.length > 0) {
                    options.push({
                        label: `Option ${index + 1}`,
                        verified: false,
                        ingredients: ingredients,
                        note: ''
                    });
                }
            });
        }
        
        return options;
    }

    // Check if a line contains ingredient information
    isIngredientLine(text) {
        // Look for patterns like "2x Tomato" or "1x Apple"
        return /^\d+x?\s+[A-Z]/.test(text) || text.includes('x ');
    }

    // Parse individual ingredients from text
    parseIngredients(ingredientTexts) {
        const ingredients = [];
        
        ingredientTexts.forEach(text => {
            // Extract quantity and ingredient name
            const match = text.match(/^(\d+)x?\s+(.+?)(?:\s+\(|$)/);
            if (match) {
                const [, quantity, name] = match;
                ingredients.push({
                    name: this.cleanIngredientName(name),
                    quantity: parseInt(quantity)
                });
            }
        });
        
        return ingredients;
    }

    // Clean ingredient names
    cleanIngredientName(name) {
        // Remove common suffixes and clean up
        return name
            .replace(/\s+or\s+.+$/, '') // Remove "or" alternatives
            .replace(/\s*\([^)]+\)/, '') // Remove parenthetical notes
            .trim();
    }

    // Extract notes from text
    extractNote(text) {
        // Look for special notes or conditions
        const notePatterns = [
            /has to be \d+kg\+/,
            /must be in order/i,
            /at least \d+/i,
            /sometimes gives/i
        ];
        
        for (const pattern of notePatterns) {
            const match = text.match(pattern);
            if (match) {
                return match[0];
            }
        }
        
        return '';
    }

    // Create the final recipe table
    createRecipeTable() {
        const ingredientsList = Array.from(this.allIngredients).sort();
        
        // Create header
        const headers = ['Item', 'Rarity', 'Option', 'Verified', 'Note', ...ingredientsList];
        
        // Create rows
        const rows = this.recipes.map(recipe => {
            const row = {
                Item: recipe.item,
                Rarity: recipe.rarity,
                Option: recipe.option,
                Verified: recipe.verified ? 'Yes' : 'No',
                Note: recipe.note
            };
            
            // Initialize all ingredient columns to 0
            ingredientsList.forEach(ingredient => {
                row[ingredient] = 0;
            });
            
            // Set actual quantities
            recipe.ingredients.forEach(ingredient => {
                if (row.hasOwnProperty(ingredient.name)) {
                    row[ingredient.name] = ingredient.quantity;
                }
            });
            
            return row;
        });
        
        return {
            headers: headers,
            rows: rows,
            ingredientCount: ingredientsList.length,
            recipeCount: this.recipes.length
        };
    }

    // Export to CSV format
    exportToCSV(data) {
        const csvRows = [];
        
        // Add headers
        csvRows.push(data.headers.join(','));
        
        // Add data rows
        data.rows.forEach(row => {
            const csvRow = data.headers.map(header => {
                const value = row[header] || 0;
                // Escape values that contain commas
                if (typeof value === 'string' && value.includes(',')) {
                    return `"${value}"`;
                }
                return value;
            });
            csvRows.push(csvRow.join(','));
        });
        
        return csvRows.join('\n');
    }

    // Export to JSON format
    exportToJSON(data) {
        return JSON.stringify(data, null, 2);
    }

    // Create HTML table
    createHTMLTable(data) {
        let html = '<table border="1" style="border-collapse: collapse;">\n';
        
        // Headers
        html += '  <thead>\n    <tr>\n';
        data.headers.forEach(header => {
            html += `      <th>${header}</th>\n`;
        });
        html += '    </tr>\n  </thead>\n';
        
        // Body
        html += '  <tbody>\n';
        data.rows.forEach(row => {
            html += '    <tr>\n';
            data.headers.forEach(header => {
                const value = row[header] || 0;
                html += `      <td>${value}</td>\n`;
            });
            html += '    </tr>\n';
        });
        html += '  </tbody>\n</table>';
        
        return html;
    }
}

// Enhanced parser that handles the specific HTML structure from your data
class CookingEventRecipeParser extends RecipeParser {
    parseRecipeHTML(htmlContent) {
        this.recipes = [];
        this.allIngredients = new Set();
        
        // Your HTML has a specific nested tabber structure
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        
        // Find the main tabber
        const mainTabber = doc.querySelector('.tabber.wds-tabber');
        if (!mainTabber) {
            console.error('Main tabber not found');
            return { headers: [], rows: [], ingredientCount: 0, recipeCount: 0 };
        }
        
        // Get all main tabs (food items)
        const mainTabs = mainTabber.querySelectorAll(':scope > .wds-tabs__wrapper > .wds-tabs > .wds-tabs__tab');
        const mainContents = mainTabber.querySelectorAll(':scope > .wds-tab__content');
        
        mainTabs.forEach((tab, index) => {
            const itemName = tab.querySelector('a').textContent.trim();
            const content = mainContents[index];
            
            if (content) {
                this.parseItemTabContent(itemName, content);
            }
        });
        
        return this.createRecipeTable();
    }
    
    parseItemTabContent(itemName, content) {
        // Look for nested tabber within this content
        const nestedTabber = content.querySelector('.tabber.wds-tabber');
        
        if (nestedTabber) {
            // Has rarity tabs
            const rarityTabs = nestedTabber.querySelectorAll(':scope > .wds-tabs__wrapper > .wds-tabs > .wds-tabs__tab');
            const rarityContents = nestedTabber.querySelectorAll(':scope > .wds-tab__content');
            
            rarityTabs.forEach((tab, index) => {
                const rarity = tab.querySelector('a').textContent.trim();
                const rarityContent = rarityContents[index];
                
                if (rarityContent) {
                    this.parseRarityContentAdvanced(itemName, rarity, rarityContent);
                }
            });
        } else {
            // No rarity tabs, parse directly
            this.parseRarityContentAdvanced(itemName, 'Normal', content);
        }
    }
    
    parseRarityContentAdvanced(itemName, rarity, content) {
        const textContent = content.textContent;
        const htmlContent = content.innerHTML;
        
        // Look for option patterns with better regex
        const optionMatches = [];
        
        // Pattern for "1st Option", "2nd Option", etc.
        const optionRegex = /(\d+(?:st|nd|rd|th)\s+Option[^:]*):?\s*([✅❌🟡]*)/g;
        let match;
        
        while ((match = optionRegex.exec(textContent)) !== null) {
            optionMatches.push({
                index: match.index,
                label: match[1].trim(),
                verified: match[2].includes('✅'),
                fullMatch: match[0]
            });
        }
        
        // Find ingredient lists after each option
        const allLists = content.querySelectorAll('ul');
        
        if (optionMatches.length > 0) {
            // Match options with their ingredient lists
            optionMatches.forEach((optionMatch, optionIndex) => {
                const nextOptionIndex = optionIndex + 1 < optionMatches.length ? 
                    optionMatches[optionIndex + 1].index : textContent.length;
                
                // Find lists that appear after this option but before the next
                const relevantLists = [];
                allLists.forEach(list => {
                    const listText = list.textContent;
                    const listIndex = textContent.indexOf(listText);
                    
                    if (listIndex > optionMatch.index && listIndex < nextOptionIndex) {
                        relevantLists.push(list);
                    }
                });
                
                // Parse ingredients from the first relevant list
                if (relevantLists.length > 0) {
                    const ingredients = this.parseIngredientList(relevantLists[0]);
                    
                    if (ingredients.length > 0) {
                        ingredients.forEach(ing => this.allIngredients.add(ing.name));
                        
                        this.recipes.push({
                            item: itemName,
                            rarity: rarity,
                            option: optionIndex + 1,
                            verified: optionMatch.verified,
                            ingredients: ingredients,
                            note: this.extractNoteFromContext(textContent, optionMatch.index, nextOptionIndex)
                        });
                    }
                }
            });
        } else {
            // No explicit options found, treat each list as an option
            allLists.forEach((list, index) => {
                const ingredients = this.parseIngredientList(list);
                
                if (ingredients.length > 0) {
                    ingredients.forEach(ing => this.allIngredients.add(ing.name));
                    
                    this.recipes.push({
                        item: itemName,
                        rarity: rarity,
                        option: index + 1,
                        verified: false,
                        ingredients: ingredients,
                        note: ''
                    });
                }
            });
        }
    }
    
    parseIngredientList(listElement) {
        const ingredients = [];
        const listItems = listElement.querySelectorAll('li');
        
        listItems.forEach(li => {
            const text = li.textContent.trim();
            const ingredient = this.parseIngredientText(text);
            
            if (ingredient) {
                ingredients.push(ingredient);
            }
        });
        
        return ingredients;
    }
    
    parseIngredientText(text) {
        // More sophisticated ingredient parsing
        // Handle cases like "2x Tomato", "1x Corn or Violet Corn", etc.
        
        // First, try the standard pattern
        let match = text.match(/^(\d+)x?\s+(.+?)(?:\s+\(|$)/);
        
        if (match) {
            const [, quantity, nameWithExtras] = match;
            let name = nameWithExtras;
            
            // Handle "or" cases by taking the first option
            if (name.includes(' or ')) {
                name = name.split(' or ')[0];
            }
            
            // Clean up the name
            name = name
                .replace(/\s*\([^)]+\).*$/, '') // Remove everything after parentheses
                .trim();
            
            return {
                name: name,
                quantity: parseInt(quantity)
            };
        }
        
        return null;
    }
    
    extractNoteFromContext(textContent, startIndex, endIndex) {
        const contextText = textContent.substring(startIndex, endIndex);
        
        // Look for special notes
        const notePatterns = [
            /\(has to be \d+kg\+[^)]*\)/i,
            /must be in order/i,
            /everything should be in order/i,
            /at least \d+ .+? type/i,
            /sometimes gives .+?\]/i,
            /this one can be in any order/i,
            /rarer .+? have .+? chance/i
        ];
        
        for (const pattern of notePatterns) {
            const match = contextText.match(pattern);
            if (match) {
                return match[0];
            }
        }
        
        return '';
    }
}

// Usage example and export functions
function parseRecipeData(htmlString) {
    const parser = new CookingEventRecipeParser();
    return parser.parseRecipeHTML(htmlString);
}

function generateCSV(htmlString) {
    const parser = new CookingEventRecipeParser();
    const data = parser.parseRecipeHTML(htmlString);
    return parser.exportToCSV(data);
}

function generateJSON(htmlString) {
    const parser = new CookingEventRecipeParser();
    const data = parser.parseRecipeHTML(htmlString);
    return parser.exportToJSON(data);
}

function generateHTMLTable(htmlString) {
    const parser = new CookingEventRecipeParser();
    const data = parser.parseRecipeHTML(htmlString);
    return parser.createHTMLTable(data);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RecipeParser,
        CookingEventRecipeParser,
        parseRecipeData,
        generateCSV,
        generateJSON,
        generateHTMLTable
    };
}
