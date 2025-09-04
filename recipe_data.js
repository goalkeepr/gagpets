// Complete recipe data structured for easy consumption
// No HTML parsing required - all data is pre-structured

const recipeData = {
    items: {
        'Salad': {
            rarities: {
                'Normal': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Tomato': 2 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Strawberry': 1, 'Bell Pepper': 1 }
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Tomato': 1, 'Carrot': 1 }
                    },
                    {
                        option: 4,
                        verified: false,
                        ingredients: { 'Onion': 1, 'Pear': 1 }
                    }
                ],
                'Mythical': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Tomato': 1, 'Prismatic Crop': 1 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Tomato': 1, 'Pepper': 2 }
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Bamboo': 1, 'Pepper': 1 }
                    }
                ],
                'Divine': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Tomato': 1, 'Prismatic Crop': 3 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Bamboo': 1, 'Pepper': 1, 'Prismatic Crop': 2 }
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Pineapple': 1, 'Pepper': 1, 'Prismatic Crop': 3 }
                    }
                ],
                'Prismatic': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Tomato': 1, 'Bone Blossom': 4 }
                    }
                ]
            }
        },
        'Sandwich': {
            rarities: {
                'Normal': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Tomato': 2, 'Corn': 1 }
                    }
                ],
                'Legendary': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Tomato': 1, 'Corn': 1, 'Cacao': 1 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Tomato': 1, 'Corn': 1, 'Prickly Pear': 2 }
                    },
                    {
                        option: 3,
                        verified: true,
                        ingredients: { 'Tomato': 2, 'Corn': 1, 'Sugar Apple': 2 }
                    }
                ],
                'Mythical': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Tomato': 1, 'Corn': 1, 'Elder Strawberry': 1 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Tomato': 1, 'Corn': 1, 'Sugar Apple': 3 }
                    }
                ],
                'Divine': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Tomato': 1, 'Corn': 1, 'Bone Blossom': 3 },
                        note: 'Corn or Violet Corn'
                    }
                ]
            }
        },
        'Pie': {
            rarities: {
                'Normal': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Sugar Apple': 1, 'Pumpkin': 1, 'Giant Pinecone': 1, 'Apple': 1, 'Corn': 1 }
                    }
                ],
                'Legendary': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Pumpkin': 1, 'Moon Melon': 1 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Pumpkin': 1, 'Giant Pinecone': 1, 'Corn': 1, 'Apple': 1 }
                    }
                ],
                'Mythical': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Apple': 1, 'Pumpkin': 1 }
                    }
                ],
                'Divine': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Coconut': 1, 'Beanstalk': 1 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Sugar Apple': 2, 'Cacao': 1, 'Ember Lily': 1, 'Coconut': 1 }
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Sugarglaze': 1, 'Beanstalk': 1 }
                    }
                ],
                'Prismatic': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Bone Blossom': 4, 'Pumpkin': 1 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Bone Blossom': 4, 'Coconut': 1 }
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Bone Blossom': 3, 'Coconut': 1 },
                        note: 'Coconut has to be 30kg+ but not confirmed'
                    }
                ]
            }
        },
        'Waffle': {
            rarities: {
                'Normal': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Pumpkin': 1, 'Watermelon': 1 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Sugar Apple': 1, 'Watermelon': 1 }
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Strawberry': 1, 'Coconut': 1 }
                    }
                ],
                'Legendary': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Coconut': 1, 'Apple': 1, 'Dragon Fruit': 1, 'Mango': 1 }
                    }
                ],
                'Mythical': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Coconut': 1, 'Pineapple': 1 }
                    }
                ],
                'Divine': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Sugar Apple': 1, 'Coconut': 1 }
                    }
                ],
                'Prismatic': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Sugar Apple': 1, 'Coconut': 1, 'Bone Blossom': 3 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Sugar Apple': 1, 'Sugarglaze': 1, 'Bone Blossom': 3 }
                    }
                ]
            }
        },
        'Hot Dog': {
            rarities: {
                'Normal': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Pepper': 1, 'Corn': 1 },
                        note: 'Corn or Banana'
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Corn': 2, 'Watermelon': 1 }
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Pink Lily': 1, 'Elephant Ears': 1, 'Bone Blossom': 1, 'Violet Corn': 1 }
                    },
                    {
                        option: 4,
                        verified: false,
                        ingredients: { 'Bone Blossom': 2, 'Pepper': 1, 'Corn': 1 }
                    },
                    {
                        option: 5,
                        verified: false,
                        ingredients: { 'Bone Blossom': 2, 'Violet Corn': 1 },
                        note: '1x or 2x Bone Blossom'
                    }
                ],
                'Legendary': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Pepper': 1, 'Corn': 1 }
                    }
                ],
                'Divine': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Bone Blossom': 3, 'Lucky Bamboo': 1, 'Violet Corn': 1 },
                        note: 'Recipe order matters - follow as is to be safe'
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Violet Corn': 1, 'Pepper': 1, 'Bone Blossom': 3 }
                    },
                    {
                        option: 3,
                        verified: true,
                        ingredients: { 'Ember Lily': 1, 'Corn': 1, 'Bone Blossom': 2 }
                    },
                    {
                        option: 4,
                        verified: true,
                        ingredients: { 'Beanstalk': 2, 'Corn': 1, 'Bone Blossom': 2 }
                    },
                    {
                        option: 5,
                        verified: true,
                        ingredients: { 'Corn': 1, 'Elder Strawberry': 1, 'Bone Blossom': 3 }
                    }
                ],
                'Prismatic': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Corn': 1, 'Bone Blossom': 4 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Violet Corn': 1, 'Bone Blossom': 3, 'Elder Strawberry': 1 }
                    }
                ]
            }
        },
        'Ice Cream': {
            rarities: {
                'Uncommon': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Corn': 1, 'Blueberry': 1 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Corn': 1, 'Strawberry': 1 }
                    }
                ],
                'Legendary': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Banana': 2 }
                    }
                ],
                'Mythical': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Sugar Apple': 1, 'Banana': 1 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Sugar Apple': 1, 'Corn': 1 }
                    }
                ],
                'Divine': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Sugar Apple': 1, 'Sugarglaze': 1 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Sugar Apple': 3, 'Corn': 1 }
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Sugar Apple': 2, 'Banana': 1, 'Tranquil Bloom': 1, 'Bone Blossom': 1 }
                    }
                ],
                'Prismatic': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Sugarglaze': 1, 'Sugar Apple': 1, 'Bone Blossom': 3 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Banana': 1, 'Sugar Apple': 1, 'Bone Blossom': 3 }
                    }
                ]
            }
        },
        'Donut': {
            rarities: {
                'Normal': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Strawberry': 1, 'Tomato': 1, 'Apple': 1 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Corn': 2, 'Watermelon': 1 }
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Corn': 2, 'Banana': 1, 'Pumpkin': 1 }
                    }
                ],
                'Rare': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Corn': 1, 'Blueberry': 1, 'Apple': 1 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Tomato': 1, 'Corn': 1, 'Banana': 1 }
                    }
                ],
                'Legendary': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Foxglove': 1, 'Corn': 1, 'Grape': 1 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Corn': 1, 'Banana': 1, 'Sugar Apple': 1 }
                    }
                ],
                'Mythical': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Sugar Apple': 2, 'Corn': 1 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Sugar Apple': 2, 'Violet Corn': 1 }
                    }
                ],
                'Divine': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Banana': 1, 'Prismatic Crop': 2 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Sugarglaze': 1, 'Prismatic Crop': 2 }
                    },
                    {
                        option: 3,
                        verified: true,
                        ingredients: { 'Corn': 1, 'Prismatic Crop': 3 },
                        note: 'At least 1 Sweet Type'
                    },
                    {
                        option: 4,
                        verified: false,
                        ingredients: { 'Tranquil Bloom': 4, 'Banana': 1 }
                    }
                ],
                'Prismatic': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Bone Blossom': 3, 'Sugar Apple': 1, 'Banana': 1 },
                        note: 'Everything should be in order'
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Bone Blossom': 2, 'Elder Strawberry': 2, 'Sugarglaze': 1 },
                        note: 'This one can be in any order'
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Sugarglaze': 1, 'Bone Blossom': 4 }
                    }
                ]
            }
        },
        'Pizza': {
            rarities: {
                'Normal': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Banana': 1, 'Tomato': 1 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Ember Lily': 1, 'Corn': 1, 'Tomato': 1 }
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Giant Pinecone': 1, 'Corn': 1, 'Apple': 1, 'Pepper': 1, 'Strawberry': 1 },
                        note: 'Sometimes gives Divine'
                    },
                    {
                        option: 4,
                        verified: false,
                        ingredients: { 'Strawberry': 1, 'Pepper': 1, 'Corn': 1, 'Tomato': 1 }
                    }
                ],
                'Legendary': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Tomato': 1, 'Banana': 1, 'Corn': 2 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Corn': 2, 'Apple': 2, 'Pepper': 1 }
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Bell Pepper': 1, 'Pepper': 1, 'Tomato': 1, 'Corn': 1, 'Peach': 1 }
                    },
                    {
                        option: 4,
                        verified: true,
                        ingredients: { 'Sugar Apple': 1, 'Cactus': 1, 'Corn': 1, 'Pear': 2 }
                    }
                ],
                'Mythical': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Pepper': 1, 'Tomato': 1, 'Corn': 1, 'Sugar Apple': 2 }
                    }
                ],
                'Divine': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Sugar Apple': 1, 'Pepper': 1, 'Banana': 1 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Sugar Apple': 2, 'Corn': 1, 'Bone Blossom': 2 }
                    },
                    {
                        option: 3,
                        verified: true,
                        ingredients: { 'Sugar Apple': 1, 'Corn': 1, 'Bone Blossom': 3 }
                    }
                ],
                'Prismatic': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Giant Pinecone': 1, 'Apple': 1, 'Pepper': 1, 'Banana': 1, 'Mushroom': 1 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Violet Corn': 1, 'Sugar Apple': 1, 'Bone Blossom': 3 }
                    }
                ]
            }
        },
        'Sushi': {
            rarities: {
                'Normal': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Bamboo': 4, 'Corn': 1 }
                    }
                ],
                'Legendary': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Bamboo': 3, 'Corn': 1, 'Maple Apple': 1 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Bamboo': 3, 'Hive Fruit': 1, 'Corn': 1 }
                    }
                ],
                'Mythical': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Bamboo': 2, 'Corn': 1, 'Bone Blossom': 2 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Sugar Apple': 3, 'Bamboo': 1, 'Corn': 1 }
                    }
                ],
                'Divine': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Bamboo': 1, 'Corn': 1, 'Bone Blossom': 3 }
                    }
                ],
                'Prismatic': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Bamboo': 2, 'Bone Blossom': 2, 'Corn': 1 }
                    }
                ]
            }
        },
        'Cake': {
            rarities: {
                'Uncommon': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Corn': 2, 'Strawberry': 2 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Blueberry': 2, 'Corn': 1, 'Tomato': 1 }
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Ember Lily': 1, 'Peach': 2 }
                    },
                    {
                        option: 4,
                        verified: false,
                        ingredients: { 'Banana': 2, 'Strawberry': 2, 'Pumpkin': 1 }
                    }
                ],
                'Rare': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Corn': 2, 'Watermelon': 2 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Corn': 2, 'Banana': 2, 'Watermelon': 1 }
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Blueberry': 1, 'Grape': 1, 'Apple': 1, 'Corn': 1 }
                    }
                ],
                'Legendary': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Kiwi': 2, 'Banana': 2 },
                        note: 'Banana or Corn'
                    }
                ],
                'Mythical': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Sugar Apple': 2, 'Corn': 2 }
                    },
                    {
                        option: 2,
                        verified: false,
                        ingredients: { 'Corn': 1, 'Bone Blossom': 1, 'Sakura Bush': 1, 'Sugar Apple': 1 }
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Sweet Type Crops': 4, 'Corn': 4 }
                    },
                    {
                        option: 4,
                        verified: false,
                        ingredients: { 'Sakura Bush': 1, 'Cacao': 1, 'Corn': 1, 'Giant Pinecone': 1, 'Spiked Mango': 1 }
                    },
                    {
                        option: 5,
                        verified: false,
                        ingredients: { 'Banana': 1, 'Kiwi': 1, 'Bone Blossom': 3 },
                        note: 'Banana or Corn'
                    }
                ],
                'Divine': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Banana': 1, 'Prismatic Crop': 3 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Corn': 1, 'Elder Strawberry': 2, 'Sugar Apple': 2 }
                    },
                    {
                        option: 3,
                        verified: false,
                        ingredients: { 'Corn': 1, 'Prismatic Crop': 4 },
                        note: 'At least 1 Sweet Type'
                    }
                ],
                'Prismatic': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Banana': 1, 'Bone Blossom': 3 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Bone Blossom': 2, 'Elder Strawberry': 1, 'Sugarglaze': 1, 'Sugar Apple': 1 }
                    },
                    {
                        option: 3,
                        verified: true,
                        ingredients: { 'Sugar Apple': 4, 'Banana': 1 },
                        note: 'Must be in order'
                    }
                ]
            }
        },
        'Burger': {
            rarities: {
                'Legendary': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Pepper': 1, 'Corn': 1, 'Tomato': 1 }
                    }
                ],
                'Mythical': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Pepper': 1, 'Corn': 1, 'Tomato': 1, 'Bone Blossom': 1, 'Beanstalk': 1 }
                    },
                    {
                        option: 2,
                        verified: true,
                        ingredients: { 'Pepper': 1, 'Corn': 1, 'Tomato': 1, 'Beanstalk': 2 }
                    },
                    {
                        option: 3,
                        verified: true,
                        ingredients: { 'Sugar Apple': 2, 'Pepper': 1, 'Corn': 1, 'Tomato': 1 }
                    }
                ],
                'Divine': [
                    {
                        option: 1,
                        verified: true,
                        ingredients: { 'Corn': 1, 'Tomato': 1, 'Bone Blossom': 3 },
                        note: 'Corn or Violet Corn'
                    }
                ],
                'Prismatic': [
                    {
                        option: 1,
                        verified: false,
                        ingredients: { 'Pepper': 1, 'Corn': 1, 'Tomato': 1, 'Bone Blossom': 2 }
                    }
                ]
            }
        }
    }
};

// Get all unique ingredients across all recipes
function getAllIngredients() {
    const ingredients = new Set();

    Object.values(recipeData.items).forEach(item => {
        Object.values(item.rarities).forEach(recipes => {
            recipes.forEach(recipe => {
                Object.keys(recipe.ingredients).forEach(ingredient => {
                    ingredients.add(ingredient);
                });
            });
        });
    });

    return Array.from(ingredients).sort();
}

// Convert structured data to flat table format
function getRecipeTable() {
    const allIngredients = getAllIngredients();
    const rows = [];

    Object.entries(recipeData.items).forEach(([itemName, item]) => {
        Object.entries(item.rarities).forEach(([rarity, recipes]) => {
            recipes.forEach(recipe => {
                const row = {
                    Item: itemName,
                    Rarity: rarity,
                    Option: recipe.option,
                    Verified: recipe.verified ? 'Yes' : 'No',
                    Note: recipe.note || ''
                };

                // Initialize all ingredient columns to 0
                allIngredients.forEach(ingredient => {
                    row[ingredient] = 0;
                });

                // Set actual quantities
                Object.entries(recipe.ingredients).forEach(([ingredient, quantity]) => {
                    row[ingredient] = quantity;
                });

                rows.push(row);
            });
        });
    });

    const headers = ['Item', 'Rarity', 'Option', 'Verified', 'Note', ...allIngredients];

    return {
        headers,
        rows,
        ingredientCount: allIngredients.length,
        recipeCount: rows.length
    };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        recipeData,
        getAllIngredients,
        getRecipeTable
    };
}
