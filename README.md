# 🌱 GAG Pets - Grow a Garden Pet Calculator

A comprehensive web-based pet ability calculator and reference tool for the "Grow a Garden" game. Calculate pet abilities, explore recipes, and browse fruit types with an intuitive, responsive interface.

## ✨ Features

### 🐾 Pet Ability Calculator
- **23 different pet egg types** with detailed ability calculations
- **Dynamic weight-based calculations** with modifier support
- **Comprehensive pet database** including rarities, probabilities, and descriptions
- **Real-time ability updates** as you adjust pet weights

### 🍳 Recipe Browser
- **Complete recipe database** with ingredient requirements
- **Searchable recipe collection** with detailed information
- **Ingredient tracking** and recipe planning tools

### 🍎 Fruit Types Reference
- **Comprehensive fruit database** with growth information
- **Detailed fruit statistics** and characteristics
- **Quick reference guide** for game planning

### 🎨 User Experience
- **Dark/Light mode toggle** for comfortable viewing
- **Responsive design** that works on all devices
- **Fast, client-side calculations** for instant results
- **Clean, intuitive interface** with game-themed styling

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (required)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/goalkeepr/gagpets.git
   cd gagpets
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:8029`

That's it! The application should now be running locally.

## 📖 Usage Guide

### Pet Calculator
1. **Select a pet** from the dropdown menu
2. **Enter the pet's weight** in kilograms
3. **Choose modifiers** (if applicable) to see enhanced abilities
4. **View calculated abilities** updated in real-time

### Recipe Browser
1. Navigate to `/recipes` or use the navigation menu
2. **Browse recipes** in the grid layout
3. **Search for specific recipes** using the search function
4. **View ingredient requirements** and planning information

### Fruit Types Reference
1. Navigate to `/fruittypes` or use the navigation menu
2. **Browse fruit categories** and their characteristics
3. **Reference growth requirements** and statistics

## 🏗️ Project Structure

```
gagpets/
├── pets/                    # Pet ability data modules
│   ├── legendaryEgg.js     # Legendary pets definitions
│   ├── mythicalEgg.js      # Mythical pets definitions
│   └── ...                 # Other egg type definitions
├── utils/                   # Utility modules
│   ├── calculations.js     # Pet ability calculations
│   ├── modifiers.js        # Modifier system
│   └── petMigrator.js      # Data migration utilities
├── data/                    # Static data files
├── pets.html               # Main pet calculator interface
├── recipes.html            # Recipe browser interface
├── fruittypes.html         # Fruit types reference
├── server.js               # Express server configuration
├── styles.css              # Application styling
└── package.json            # Node.js dependencies
```

## 🔧 Development

### Local Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The server will restart automatically on file changes
```

### Key Development Files
- **`server.js`** - Express server with static file serving and routing
- **`petAbilities_modular.js`** - Main pet ability system orchestrator
- **`pets/`** - Individual pet definitions and calculations
- **`utils/`** - Shared utility functions and calculations
- **`global_bridge.js`** - Client-side module loader

### Adding New Pets
1. Create a new file in the `pets/` directory
2. Export pet definitions following the existing format
3. Include the new module in the main pet abilities system
4. Update documentation and tests as needed

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)
```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

### Using Docker Directly
```bash
# Build the image
docker build -t gagpets .

# Run the container
docker run -p 8029:8029 gagpets
```

### Production Deployment
```bash
# Use the production compose file
docker-compose -f docker-compose.prod.yml up -d
```

## 🔍 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /` | Main pet calculator interface |
| `GET /recipes` | Recipe browser interface |
| `GET /fruittypes` | Fruit types reference |
| `GET /health` | Health check for monitoring |

## 🎯 Game Integration

This tool is designed for players of the **"Grow a Garden"** game who want to:
- **Optimize pet abilities** through weight management
- **Plan breeding strategies** with probability calculations
- **Reference game data** quickly during gameplay
- **Calculate resource requirements** for recipes

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** following the existing code style
4. **Test your changes** thoroughly
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Coding Standards
- **ES6 modules** for all JavaScript code
- **Consistent naming** following existing conventions
- **Comprehensive comments** for complex calculations
- **Responsive design** principles for UI changes

### Areas for Contribution
- **New pet definitions** and ability calculations
- **Recipe database** expansions
- **UI/UX improvements** and accessibility
- **Performance optimizations**
- **Documentation** and tutorials

## 📊 Analytics & Monitoring

The application includes:
- **Google Analytics** for usage tracking
- **Health monitoring** endpoint for uptime checks
- **Error logging** for debugging and maintenance

## 🛠️ Technical Details

### Technology Stack
- **Backend**: Node.js 18+, Express.js
- **Frontend**: Vanilla JavaScript (ES6), HTML5, CSS3
- **Deployment**: Docker, Docker Compose
- **Analytics**: Google Analytics

### Performance Features
- **Client-side calculations** for instant feedback
- **Modular loading** for optimal bundle sizes
- **Static file serving** with proper MIME types
- **Responsive caching** strategies

## 📝 License

This project is open source. Please check the repository for license details.

## 🎮 About Grow a Garden

"Grow a Garden" is a popular online game where players cultivate gardens, raise pets, and manage resources. This calculator helps players optimize their strategies and make informed decisions about pet management.

---

**Made with 🌱 for the Grow a Garden community**