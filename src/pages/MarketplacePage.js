import React, { useState, useCallback, useMemo } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
  Paper,
  Divider,
} from '@mui/material';
import {
  DirectionsCar,
  Add,
  Search,
  FilterList,
  LocationOn,
  Speed,
  LocalGasStation,
  CalendarToday,
  Close,
  Phone,
  Email,
  Favorite,
  FavoriteBorder,
  Share,
} from '@mui/icons-material';
import LazyImage from '../components/LazyImage';
import SellCarModal from '../components/SellCarModal';
import CarDetailModal from '../components/CarDetailModal';
import toast from 'react-hot-toast';

const MarketplacePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [location, setLocation] = useState('');
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [carDetailModalOpen, setCarDetailModalOpen] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // Mock car data with proper vehicle images
  const cars = [
    {
      id: 1,
      make: 'Maruti Suzuki',
      model: 'Swift',
      variant: 'VXI',
      year: 2020,
      price: 650000,
      mileage: 25000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      location: 'Mumbai, Maharashtra',
      images: [
        'https://imgd.aeplcdn.com/664x374/n/cw/ec/130591/swift-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80',
        'https://imgd.aeplcdn.com/664x374/n/cw/ec/130591/swift-exterior-right-side-view.jpeg?isig=0&q=80'
      ],
      seller: {
        name: 'Rahul Sharma',
        phone: '+91 98765 43210',
        email: 'rahul.sharma@email.com',
        verified: true
      },
      features: ['ABS', 'Airbags', 'Power Steering', 'AC', 'Music System'],
      description: 'Well maintained car with complete service history. Single owner vehicle.',
    },
    {
      id: 2,
      make: 'Hyundai',
      model: 'i20',
      variant: 'Sportz',
      year: 2019,
      price: 750000,
      mileage: 35000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      location: 'Delhi, NCR',
      images: [
        'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/i20-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80',
        'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/i20-exterior-right-side-view.jpeg?isig=0&q=80'
      ],
      seller: {
        name: 'Priya Singh',
        phone: '+91 87654 32109',
        email: 'priya.singh@email.com',
        verified: true
      },
      features: ['ABS', 'Airbags', 'Power Windows', 'AC', 'Bluetooth'],
      description: 'Excellent condition with all original parts. Recently serviced.',
    },
    {
      id: 3,
      make: 'Tata',
      model: 'Nexon',
      variant: 'XZ+',
      year: 2021,
      price: 950000,
      mileage: 15000,
      fuelType: 'Diesel',
      transmission: 'Manual',
      location: 'Bangalore, Karnataka',
      images: [
        'https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg?isig=0&q=80',
        'https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-exterior-right-side-view.jpeg?isig=0&q=80'
      ],
      seller: {
        name: 'Amit Patel',
        phone: '+91 76543 21098',
        email: 'amit.patel@email.com',
        verified: false
      },
      features: ['ABS', 'Airbags', 'Sunroof', 'Touchscreen', 'Reverse Camera'],
      description: 'Like new condition SUV with premium features. Under warranty.',
    },
    {
      id: 4,
      make: 'Honda',
      model: 'City',
      variant: 'VX',
      year: 2018,
      price: 850000,
      mileage: 45000,
      fuelType: 'Petrol',
      transmission: 'CVT',
      location: 'Pune, Maharashtra',
      images: [
        'https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-front-three-quarter-76.jpeg?isig=0&q=80',
        'https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-side-view.jpeg?isig=0&q=80'
      ],
      seller: {
        name: 'Sneha Reddy',
        phone: '+91 65432 10987',
        email: 'sneha.reddy@email.com',
        verified: true
      },
      features: ['ABS', 'Airbags', 'Cruise Control', 'Leather Seats', 'Sunroof'],
      description: 'Premium sedan in excellent condition. All services done at authorized center.',
    },
  ];

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = searchTerm === '' || 
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrice = priceRange === '' || 
        (priceRange === 'under-5' && car.price < 500000) ||
        (priceRange === '5-10' && car.price >= 500000 && car.price < 1000000) ||
        (priceRange === 'above-10' && car.price >= 1000000);
      
      const matchesFuel = fuelType === '' || car.fuelType === fuelType;
      
      const matchesLocation = location === '' || 
        car.location.toLowerCase().includes(location.toLowerCase());
      
      return matchesSearch && matchesPrice && matchesFuel && matchesLocation;
    });
  }, [cars, searchTerm, priceRange, fuelType, location]);

  const handleViewDetails = useCallback((car) => {
    setSelectedCar(car);
    setCarDetailModalOpen(true);
  }, []);

  const handleCloseCarDetail = useCallback(() => {
    setCarDetailModalOpen(false);
    setSelectedCar(null);
  }, []);

  const handleToggleFavorite = useCallback((carId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(carId)) {
        newFavorites.delete(carId);
        toast.success('Removed from favorites');
      } else {
        newFavorites.add(carId);
        toast.success('Added to favorites');
      }
      return newFavorites;
    });
  }, []);

  const handleContactSeller = useCallback((seller) => {
    toast.success(`Contact details: ${seller.phone}`);
  }, []);

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <DirectionsCar sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
          Car Marketplace
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Find your perfect car or sell your current one
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Paper 
        elevation={3}
        sx={{ 
          p: { xs: 3, md: 4 }, 
          mb: 4,
          borderRadius: 3,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1, color: 'primary.main' }}>
            Find Your Perfect Car
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Use filters below to narrow down your search
          </Typography>
        </Box>
        
        <Grid container spacing={3} alignItems="end">
          {/* Search Field */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Cars"
              placeholder="Make, model, variant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                }
              }}
            />
          </Grid>

          {/* Price Range */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Price Range</InputLabel>
              <Select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                label="Price Range"
                sx={{
                  height: 56,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                <MenuItem value="">All Prices</MenuItem>
                <MenuItem value="under-5">Under ₹5L</MenuItem>
                <MenuItem value="5-10">₹5L - ₹10L</MenuItem>
                <MenuItem value="above-10">Above ₹10L</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Fuel Type */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Fuel Type</InputLabel>
              <Select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                label="Fuel Type"
                sx={{
                  height: 56,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                <MenuItem value="">All Fuels</MenuItem>
                <MenuItem value="Petrol">Petrol</MenuItem>
                <MenuItem value="Diesel">Diesel</MenuItem>
                <MenuItem value="CNG">CNG</MenuItem>
                <MenuItem value="Electric">Electric</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Location */}
          <Grid item xs={12} sm={8} md={2}>
            <TextField
              fullWidth
              label="Location"
              placeholder="City, State"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                }
              }}
            />
          </Grid>

          {/* More Filters Button */}
          <Grid item xs={12} sm={4} md={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<FilterList />}
              sx={{ 
                height: 56,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: 2,
                '&:hover': {
                  bgcolor: 'primary.dark',
                  boxShadow: 4,
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              More Filters
            </Button>
          </Grid>
        </Grid>

        {/* Active Filters Display */}
        {(searchTerm || priceRange || fuelType || location) && (
          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Active Filters:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {searchTerm && (
                <Chip
                  label={`Search: ${searchTerm}`}
                  onDelete={() => setSearchTerm('')}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              )}
              {priceRange && (
                <Chip
                  label={`Price: ${priceRange === 'under-5' ? 'Under ₹5L' : priceRange === '5-10' ? '₹5L - ₹10L' : 'Above ₹10L'}`}
                  onDelete={() => setPriceRange('')}
                  color="secondary"
                  variant="outlined"
                  size="small"
                />
              )}
              {fuelType && (
                <Chip
                  label={`Fuel: ${fuelType}`}
                  onDelete={() => setFuelType('')}
                  color="success"
                  variant="outlined"
                  size="small"
                />
              )}
              {location && (
                <Chip
                  label={`Location: ${location}`}
                  onDelete={() => setLocation('')}
                  color="info"
                  variant="outlined"
                  size="small"
                />
              )}
            </Box>
          </Box>
        )}
      </Paper>

      {/* Results Count */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          {filteredCars.length} cars found
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setSellModalOpen(true)}
        >
          Sell Your Car
        </Button>
      </Box>

      {/* Car Listings */}
      <Grid container spacing={3}>
        {filteredCars.map((car) => (
          <Grid item xs={12} md={6} lg={4} key={car.id}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}
            >
              <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
                <LazyImage
                  src={car.images[0]}
                  alt={`${car.make} ${car.model}`}
                  height={220}
                  style={{ 
                    width: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: 2,
                    '&:hover': { 
                      bgcolor: 'rgba(255, 255, 255, 1)',
                      transform: 'scale(1.1)'
                    }
                  }}
                  onClick={() => handleToggleFavorite(car.id)}
                >
                  {favorites.has(car.id) ? 
                    <Favorite color="error" /> : 
                    <FavoriteBorder color="action" />
                  }
                </IconButton>
                <Chip
                  label={car.year}
                  size="small"
                  sx={{
                    position: 'absolute',
                    bottom: 12,
                    left: 12,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    fontWeight: 600,
                    boxShadow: 1
                  }}
                />
              </Box>
              
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1, color: 'text.primary' }}>
                  {car.make} {car.model} {car.variant}
                </Typography>
                
                <Typography variant="h5" color="primary.main" fontWeight={700} sx={{ mb: 2 }}>
                  {formatPrice(car.price)}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip
                    icon={<Speed fontSize="small" />}
                    label={`${car.mileage.toLocaleString()} km`}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                  <Chip
                    icon={<LocalGasStation fontSize="small" />}
                    label={car.fuelType}
                    size="small"
                    variant="outlined"
                    color="secondary"
                  />
                  <Chip
                    icon={<CalendarToday fontSize="small" />}
                    label={car.year}
                    size="small"
                    variant="outlined"
                    color="info"
                  />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn fontSize="small" color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {car.location}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.4
                  }}
                >
                  {car.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                      Seller: {car.seller.name}
                    </Typography>
                    {car.seller.verified && (
                      <Chip label="Verified" color="success" size="small" />
                    )}
                  </Box>
                </Box>
              </CardContent>
              
              <Box sx={{ p: 3, pt: 0 }}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="medium"
                      onClick={() => handleViewDetails(car)}
                      sx={{
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        '&:hover': {
                          borderColor: 'primary.dark',
                          bgcolor: 'primary.light'
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="medium"
                      startIcon={<Phone />}
                      onClick={() => handleContactSeller(car.seller)}
                      sx={{
                        bgcolor: 'primary.main',
                        '&:hover': {
                          bgcolor: 'primary.dark'
                        }
                      }}
                    >
                      Contact
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredCars.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <DirectionsCar sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No cars found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or filters
          </Typography>
        </Paper>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="sell car"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setSellModalOpen(true)}
      >
        <Add />
      </Fab>

      {/* Modals */}
      <SellCarModal
        open={sellModalOpen}
        onClose={() => setSellModalOpen(false)}
      />

      <CarDetailModal
        open={carDetailModalOpen}
        onClose={handleCloseCarDetail}
        car={selectedCar}
      />
    </Container>
  );
};

export default MarketplacePage;
