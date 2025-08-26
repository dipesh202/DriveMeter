# 🚗 DriveMeter - Complete Vehicle Management Platform

DriveMeter is a comprehensive vehicle information and management platform built with **pure JavaScript** that provides real-time vehicle data, government services integration, and an advanced car marketplace with professional UI/UX.

## ✨ Key Features

### 🔍 **Vehicle Information Lookup**
- Complete vehicle details by registration number
- Owner information, specifications, and documentation status
- Insurance, PUC, and tax verification with expiry tracking
- Professional search interface with real-time validation

### 🏛️ **Government Services Integration**
- Complete RTO services guide with office locations
- RC (Registration Certificate) verification
- Traffic challan checking and payment
- Real-time government database integration

### 🛒 **Advanced Car Marketplace**
- **4 premium car listings** with authentic vehicle images
- Detailed car specifications and feature lists
- **Interactive car detail modals** with comprehensive information
- **AI-powered car valuation** system for selling
- Advanced search and filtering with active filter display
- Direct seller contact functionality
- Favorites system with heart icons

### 🔐 **User Management**
- Secure authentication system with JWT
- Personal dashboard for vehicle tracking
- Protected routes and user profiles
- Profile management with settings

### 🎨 **Modern UI/UX**
- **Material-UI v7** with responsive design
- **Lazy image loading** for optimal performance
- Smooth animations and hover effects
- Mobile-first responsive layout
- Professional card-based interface
- Enhanced filter panel with proper alignment

## 🛠️ Technology Stack

- **Frontend**: React 19 with **Pure JavaScript** (converted from TypeScript)
- **UI Framework**: Material-UI (MUI) v7.3.1
- **State Management**: React Context API
- **Routing**: React Router v7.8.2
- **HTTP Client**: Axios v1.11.0
- **Notifications**: React Hot Toast v2.6.0
- **Build Tool**: Create React App v5.0.1
- **Memory Management**: Optimized Node.js heap allocation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 8+

### Installation

1. **Clone and setup**
```bash
git clone <repository-url>
cd drivemeter-working
npm install
```

2. **Environment configuration**
```bash
cp .env.example .env
# Configure your API keys in .env
```

3. **Start development server**
```bash
npm start
```

Application runs at: `http://localhost:3001`

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_USE_REAL_API` | Enable real government APIs | No |
| `REACT_APP_USE_FREE_API` | Enable free API fallback | No |
| `REACT_APP_RAPIDAPI_FREE_KEY` | RapidAPI key for vehicle data | Yes |
| `REACT_APP_INSTANTPAY_API_KEY` | InstantPay API for government data | Optional |

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components (JavaScript)
│   ├── CarDetailModal.js     # Car detail popup modal
│   ├── LazyImage.js          # Optimized image loading
│   ├── Navigation.js         # Main navigation bar
│   ├── ProtectedRoute.js     # Route protection
│   └── SellCarModal.js       # Car selling form modal
├── contexts/            # React context providers
│   └── AuthContext.js        # Authentication state management
├── pages/              # Main application pages (JavaScript)
│   ├── SimpleHomePage.js          # Landing page
│   ├── SimpleVehicleLookupPage.js # Vehicle search
│   ├── MarketplacePage.js         # Car marketplace
│   ├── RTOServicesPage.js         # Government services
│   ├── DashboardPage.js           # User dashboard
│   ├── ProfilePage.js             # User profile management
│   ├── LoginPage.js               # User authentication
│   └── RegisterPage.js            # User registration
├── services/           # API integration layer (JavaScript)
│   ├── vehicleAPI.js           # Vehicle data service
│   ├── freeVehicleAPI.js       # Free API integration
│   ├── realVehicleAPI.js       # Government API service
│   ├── instantPayAPI.js        # InstantPay integration
│   ├── realGovAPI.js           # Government API service
│   ├── emailService.js         # Email notifications
│   └── carMarketplaceAPI.js    # Marketplace API
└── core files/         # Application core
    ├── index.js                # Application entry point
    ├── App.js                  # Main app component
    ├── reportWebVitals.js      # Performance monitoring
    └── setupTests.js           # Test configuration
```

## 🎯 Core Features Breakdown

### Vehicle Lookup System
- **Smart Search**: Registration number validation and formatting
- **Comprehensive Data**: Owner details, vehicle specs, document status
- **Status Tracking**: Insurance, PUC, tax expiry with visual indicators
- **AI Recommendations**: Personalized suggestions based on vehicle profile

### Car Marketplace
- **Rich Listings**: 4 premium cars with authentic vehicle images and detailed specs
- **Interactive Details**: Full-screen modals with comprehensive information
- **Smart Filtering**: Advanced search by price, fuel type, location, and more
- **Active Filter Display**: Visual chips showing applied filters with remove functionality
- **AI Valuation**: Machine learning-powered price estimation for sellers
- **Favorites System**: Heart icons for saving preferred vehicles

### Government Integration
- **Real APIs**: Integration with Vahan database and e-Challan systems
- **Free Fallback**: Backup APIs for continuous service availability
- **RTO Services**: Complete government service integration

## 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Grid Layouts**: 1-4 column responsive car grid
- **Touch-Friendly**: Large buttons and intuitive navigation
- **Performance**: Lazy loading and optimized images

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Netlify Deployment
The project includes `netlify.toml` with optimized settings:
- SPA routing support
- Asset caching and compression
- Security headers
- Performance optimizations

## 📊 Performance Features

- **Lazy Loading**: Images load on demand
- **Memoization**: Optimized React rendering
- **Code Splitting**: Efficient bundle loading
- **Caching**: Browser and CDN optimization
- **Compression**: Minified assets

## 🔒 Security

- **Environment Variables**: Secure API key management
- **Protected Routes**: Authentication-based access control
- **Input Validation**: Form validation and sanitization
- **Security Headers**: Configured via Netlify

## 📋 Available Scripts

- `npm start`: Start development server on port 3001 (with optimized memory allocation)
- `npm run build`: Build for production (with memory optimization)
- `npm test`: Run test suite
- `npm run eject`: Eject from Create React App

## 🔧 Recent Updates & Improvements

### ✅ **TypeScript to JavaScript Conversion**
- **Complete Migration**: All 27+ files converted from TypeScript to pure JavaScript
- **Removed Dependencies**: TypeScript, @types packages removed from package.json
- **Clean Configuration**: Removed tsconfig.json and TypeScript-specific files
- **Maintained Functionality**: All features preserved during conversion

### ✅ **UI/UX Enhancements**
- **Enhanced Filter Panel**: Professional layout with proper alignment and spacing
- **Authentic Vehicle Images**: Real car images matching vehicle names (Swift, i20, Nexon, City)
- **Improved Card Design**: Better hover effects, consistent styling, color-coded chips
- **Fixed Modal Functionality**: CarDetailModal now works with proper data mapping

### ✅ **Performance Optimizations**
- **Memory Management**: Fixed JavaScript heap out of memory error
- **Node.js Heap**: Increased allocation to 4GB for smooth development
- **Lazy Loading**: Optimized image loading for better performance
- **Responsive Design**: Enhanced mobile and desktop layouts

### ✅ **Bug Fixes**
- **Import Statements**: Fixed named vs default import issues
- **Component Props**: Corrected property mappings in CarDetailModal
- **Filter Alignment**: Resolved marketplace filter panel layout issues
- **Color Theme**: Consistent primary/secondary color usage throughout

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For support and queries, please open an issue in the repository.

---

**Built with ❤️ using React 19 and Material-UI v7**
