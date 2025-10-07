#!/usr/bin/env node

/**
 * Test script for the Pet Card Screenshot API
 * This script tests the new /api/pets/:petKey/screenshot endpoint
 */

import fs from 'fs';
import path from 'path';

const API_BASE = 'http://localhost:8029';

async function testScreenshotAPI() {
    console.log('🧪 Testing Pet Card Screenshot API...\n');

    const testCases = [
        {
            name: 'T-Rex with Rainbow Mutation',
            url: `${API_BASE}/api/pets/trex/screenshot?weight=10&age=5&mutation=rainbow`,
            filename: 'test_trex_rainbow.png'
        },
        {
            name: 'Griffin Default',
            url: `${API_BASE}/api/pets/griffin/screenshot?weight=50&age=25`,
            filename: 'test_griffin_default.png'
        },
        {
            name: 'Bunny Small Size',
            url: `${API_BASE}/api/pets/bunny/screenshot?weight=25&age=1&width=400&height=600`,
            filename: 'test_bunny_small.png'
        }
    ];

    for (const testCase of testCases) {
        try {
            console.log(`📸 Testing: ${testCase.name}`);
            console.log(`   URL: ${testCase.url}`);
            
            const response = await fetch(testCase.url);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.log(`   ❌ Failed: ${response.status} ${response.statusText}`);
                console.log(`   Error: ${errorText}\n`);
                continue;
            }

            const buffer = await response.arrayBuffer();
            const outputPath = path.join(process.cwd(), 'screenshots', testCase.filename);
            
            // Create screenshots directory if it doesn't exist
            const screenshotDir = path.dirname(outputPath);
            if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir, { recursive: true });
            }

            fs.writeFileSync(outputPath, Buffer.from(buffer));
            
            console.log(`   ✅ Success: Screenshot saved to ${outputPath}`);
            console.log(`   📊 Size: ${(buffer.byteLength / 1024).toFixed(2)} KB`);
            console.log(`   🏷️  Content-Type: ${response.headers.get('content-type')}\n`);
            
        } catch (error) {
            console.log(`   ❌ Error: ${error.message}\n`);
        }
    }

    // Test API documentation
    console.log('📚 Testing API Documentation...');
    try {
        const response = await fetch(`${API_BASE}/api`);
        const apiInfo = await response.json();
        
        if (apiInfo.endpoints && apiInfo.endpoints['GET /api/pets/:petKey/screenshot']) {
            console.log('   ✅ Screenshot endpoint documented in API');
        } else {
            console.log('   ⚠️  Screenshot endpoint not found in API documentation');
        }
    } catch (error) {
        console.log(`   ❌ Error checking API docs: ${error.message}`);
    }

    console.log('\n🎉 Test completed! Check the screenshots folder for generated images.');
}

// Run the test
testScreenshotAPI().catch(console.error);