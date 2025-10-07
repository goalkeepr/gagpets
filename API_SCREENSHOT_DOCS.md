# Pet Card Screenshot API

The GAG Pets project now includes a powerful server-side screenshot API that can generate high-quality PNG images of pet cards programmatically.

## 🚀 API Endpoint

```
GET /api/pets/:petKey/screenshot
```

## 📝 Parameters

### Path Parameters
- **`petKey`** (string, required): The pet identifier (e.g., "trex", "griffin", "bunny")

### Query Parameters
- **`weight`** (number, optional): Pet weight in kg (default: 50)
- **`age`** (number, optional): Pet age (default: 1)  
- **`mutation`** (string, optional): Pet mutation type (default: "none")
  - Options: `none`, `golden`, `rainbow`, or any valid mutation
- **`width`** (number, optional): Image width in pixels (default: 760, min: 100, max: 2000)
- **`height`** (number, optional): Image height in pixels (default: 1080, min: 100, max: 3000)

## 🎯 Example Usage

### Basic Usage
```bash
# Simple T-Rex screenshot
curl http://localhost:8029/api/pets/trex/screenshot -o trex.png

# Griffin with specific weight and age
curl "http://localhost:8029/api/pets/griffin/screenshot?weight=75.5&age=42" -o griffin.png

# Rainbow T-Rex with custom dimensions
curl "http://localhost:8029/api/pets/trex/screenshot?weight=10&age=5&mutation=rainbow&width=800&height=1200" -o rainbow_trex.png
```

### JavaScript/Node.js Usage
```javascript
// Fetch screenshot as buffer
const response = await fetch('http://localhost:8029/api/pets/bunny/screenshot?weight=25&age=15');
const imageBuffer = await response.arrayBuffer();

// Save to file
const fs = require('fs');
fs.writeFileSync('bunny_card.png', Buffer.from(imageBuffer));
```

### Python Usage
```python
import requests

# Download screenshot
response = requests.get('http://localhost:8029/api/pets/phoenix/screenshot', params={
    'weight': 100,
    'age': 80,
    'mutation': 'golden',
    'width': 600,
    'height': 900
})

with open('phoenix_card.png', 'wb') as f:
    f.write(response.content)
```

### HTML Usage (Direct Image Display)
```html
<!-- Display screenshot directly in webpage -->
<img src="http://localhost:8029/api/pets/dragon/screenshot?weight=200&age=100&mutation=rainbow" 
     alt="Dragon Pet Card" />
```

## 📊 Response Details

### Success Response
- **Status**: 200 OK
- **Content-Type**: `image/png`
- **Content-Disposition**: `inline; filename="PetName_AgeX_XXkg_Pet_Card.png"`
- **Cache-Control**: `public, max-age=3600` (cached for 1 hour)
- **Body**: PNG image data

### Error Responses

#### Pet Not Found (404)
```json
{
  "error": "Pet not found",
  "message": "Pet 'invalidpet' not found"
}
```

#### Invalid Parameters (400)
```json
{
  "error": "Invalid weight",
  "message": "Weight must be a positive number"
}
```

#### Server Error (500)
```json
{
  "error": "Screenshot generation failed",
  "message": "Error details..."
}
```

## 🎨 Features

### Automatic Styling
- ✅ **Color Extraction**: Header colors extracted from pet images
- ✅ **Font Consistency**: Uses Outfit font family consistently
- ✅ **Glassmorphism Effects**: Preserves all visual effects
- ✅ **Mutation Styling**: Rainbow and golden mutations styled correctly
- ✅ **High Quality**: 2x device pixel ratio for crisp images

### Smart Formatting
- ✅ **Dynamic Weight Display**: Adjusts precision based on weight value
- ✅ **Clean Tab Display**: Only shows active ability tab
- ✅ **Professional Layout**: Removes UI elements not needed in screenshots
- ✅ **Proper Filename**: Descriptive filename with pet details

## 🔧 Technical Details

### Server-Side Rendering
- **Engine**: Puppeteer with headless Chromium
- **Viewport**: Configurable resolution with 2x scaling
- **Wait Strategy**: Waits for content load + color extraction completion
- **Error Handling**: Comprehensive error handling with cleanup

### Performance
- **Caching**: Screenshots cached for 1 hour
- **Resource Management**: Automatic browser cleanup
- **Concurrency**: Multiple requests handled efficiently
- **Timeout Protection**: 30-second timeout for generation

### Security
- **Parameter Validation**: All inputs validated and sanitized
- **Resource Limits**: Image dimensions limited for safety
- **CORS Ready**: Can be used from web applications
- **Error Sanitization**: No sensitive server info exposed

## 🌟 Use Cases

### Integration Examples
1. **Discord Bots**: Generate pet cards for game integration
2. **Web Applications**: Dynamic pet card generation for users
3. **Mobile Apps**: Server-side image generation for sharing
4. **Documentation**: Automated screenshot generation for guides
5. **Social Media**: Programmatic content creation for posts

### Batch Processing
```bash
# Generate screenshots for multiple pets
for pet in trex griffin phoenix dragon; do
  curl "http://localhost:8029/api/pets/$pet/screenshot?weight=50&age=25" -o "${pet}_card.png"
done
```

## 🎯 Performance Tips

1. **Use Caching**: Screenshots are cached for 1 hour - identical requests return cached results
2. **Reasonable Dimensions**: Larger images take longer to generate
3. **Batch Requests**: For multiple screenshots, consider spacing requests
4. **Error Handling**: Always handle potential 500 errors in production code

## 📈 Monitoring

The API includes built-in logging and error reporting. Check server logs for generation details:
- Request URLs and parameters
- Generation timing and success/failure
- Browser lifecycle management
- Error details for troubleshooting

---

🎉 **The Pet Card Screenshot API makes it easy to programmatically generate beautiful, high-quality pet cards for any integration or application!**