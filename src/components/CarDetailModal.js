import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Paper
} from '@mui/material';
import {
  Close,
  DirectionsCar,
  Speed,
  LocalGasStation,
  LocationOn,
  Phone,
  Person,
  CalendarToday,
  Settings,
  CheckCircle
} from '@mui/icons-material';

const CarDetailModal = ({ open, onClose, car }) => {
  if (!car) return null;

  const handleCall = () => {
    window.open(`tel:${car.seller?.phone}`, '_self');
  };

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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DirectionsCar sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">{car.make} {car.model} {car.variant}</Typography>
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {/* Car Image */}
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <img
                src={car.images?.[0]}
                alt={`${car.make} ${car.model}`}
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: 'auto',
                  borderRadius: '8px'
                }}
              />
            </Paper>
          </Box>

          {/* Car Details */}
          <Box sx={{ flex: 1 }}>
            {/* Price and Seller Info */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Box>
                  <Typography variant="h4" fontWeight={700} color="primary">
                    {formatPrice(car.price)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {car.year} • {car.transmission}
                  </Typography>
                </Box>
                {car.seller?.verified && (
                  <Chip 
                    label="Verified Seller" 
                    color="success" 
                    size="small" 
                  />
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Seller: {car.seller?.name}
                </Typography>
              </Box>
            </Box>

            {/* Description */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Description
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {car.description}
              </Typography>
            </Box>

            {/* Basic Details */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Vehicle Details
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarToday sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Year</Typography>
                    <Typography variant="body2" fontWeight={500}>{car.year}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Speed sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Mileage</Typography>
                    <Typography variant="body2" fontWeight={500}>{car.mileage?.toLocaleString()} km</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalGasStation sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Fuel Type</Typography>
                    <Typography variant="body2" fontWeight={500}>{car.fuelType}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Settings sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Transmission</Typography>
                    <Typography variant="body2" fontWeight={500}>{car.transmission}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Location</Typography>
                    <Typography variant="body2" fontWeight={500}>{car.location}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Seller</Typography>
                    <Typography variant="body2" fontWeight={500}>{car.seller?.name}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Features */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Key Features
              </Typography>
              <List dense>
                {car.features?.map((feature, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle sx={{ fontSize: 18, color: 'success.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button 
          variant="contained" 
          startIcon={<Phone />}
          onClick={handleCall}
          sx={{ ml: 2 }}
        >
          Call {car.seller?.name}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CarDetailModal;
