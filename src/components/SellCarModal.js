import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Chip,
  IconButton
} from '@mui/material';
import { Close, DirectionsCar, Assessment, AttachMoney } from '@mui/icons-material';
import toast from 'react-hot-toast';

const SellCarModal = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [carDetails, setCarDetails] = useState({
    make: '',
    model: '',
    year: '',
    variant: '',
    fuelType: '',
    transmission: '',
    kmDriven: '',
    location: '',
    ownerName: '',
    phone: '',
    email: ''
  });
  const [valuation, setValuation] = useState(null);

  const steps = ['Car Details', 'Contact Info', 'Valuation'];

  const carMakes = [
    'Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Honda', 'Toyota', 
    'Kia', 'Volkswagen', 'Skoda', 'Renault', 'Nissan', 'Ford'
  ];

  const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'];
  const transmissionTypes = ['Manual', 'Automatic', 'CVT', 'AMT'];

  const handleInputChange = (field, value) => {
    setCarDetails(prev => ({ ...prev, [field]: value }));
  };

  const calculateValuation = () => {
    // AI-powered valuation simulation
    const basePrice = {
      'Maruti Suzuki': 600000,
      'Hyundai': 800000,
      'Tata': 700000,
      'Mahindra': 900000,
      'Honda': 1000000,
      'Toyota': 1200000,
      'Kia': 1100000,
      'Volkswagen': 950000
    };

    const currentYear = new Date().getFullYear();
    const carAge = currentYear - parseInt(carDetails.year);
    const kmDriven = parseInt(carDetails.kmDriven);
    
    let estimatedPrice = basePrice[carDetails.make] || 800000;
    
    // Depreciation based on age
    estimatedPrice = estimatedPrice * Math.pow(0.85, carAge);
    
    // Adjustment based on km driven
    if (kmDriven > 100000) estimatedPrice *= 0.8;
    else if (kmDriven > 50000) estimatedPrice *= 0.9;
    
    // Fuel type adjustment
    if (carDetails.fuelType === 'Diesel') estimatedPrice *= 1.1;
    if (carDetails.fuelType === 'Electric') estimatedPrice *= 1.3;
    
    setValuation(Math.round(estimatedPrice));
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!carDetails.make || !carDetails.model || !carDetails.year) {
        toast.error('Please fill all required fields');
        return;
      }
    }
    if (activeStep === 1) {
      if (!carDetails.ownerName || !carDetails.phone) {
        toast.error('Please fill all required fields');
        return;
      }
      calculateValuation();
    }
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    toast.success('Car listing submitted successfully! Our team will contact you within 24 hours.');
    onClose();
    // Reset form
    setActiveStep(0);
    setCarDetails({
      make: '', model: '', year: '', variant: '', fuelType: '', transmission: '',
      kmDriven: '', location: '', ownerName: '', phone: '', email: ''
    });
    setValuation(null);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <TextField
                fullWidth
                select
                label="Car Make *"
                value={carDetails.make}
                onChange={(e) => handleInputChange('make', e.target.value)}
              >
                {carMakes.map((make) => (
                  <MenuItem key={make} value={make}>{make}</MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Car Model *"
                value={carDetails.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                placeholder="e.g., Swift, i20, City"
              />
              <TextField
                fullWidth
                select
                label="Year *"
                value={carDetails.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
              >
                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <MenuItem key={year} value={year.toString()}>{year}</MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Variant"
                value={carDetails.variant}
                onChange={(e) => handleInputChange('variant', e.target.value)}
                placeholder="e.g., VXI, SX, ZX"
              />
              <TextField
                fullWidth
                select
                label="Fuel Type"
                value={carDetails.fuelType}
                onChange={(e) => handleInputChange('fuelType', e.target.value)}
              >
                {fuelTypes.map((fuel) => (
                  <MenuItem key={fuel} value={fuel}>{fuel}</MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                select
                label="Transmission"
                value={carDetails.transmission}
                onChange={(e) => handleInputChange('transmission', e.target.value)}
              >
                {transmissionTypes.map((trans) => (
                  <MenuItem key={trans} value={trans}>{trans}</MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="KM Driven"
                type="number"
                value={carDetails.kmDriven}
                onChange={(e) => handleInputChange('kmDriven', e.target.value)}
                placeholder="e.g., 25000"
              />
              <TextField
                fullWidth
                label="Location"
                value={carDetails.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Mumbai, Maharashtra"
              />
            </Box>
          </Box>
        );
      
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6">Contact Information</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <TextField
                fullWidth
                label="Owner Name *"
                value={carDetails.ownerName}
                onChange={(e) => handleInputChange('ownerName', e.target.value)}
              />
              <TextField
                fullWidth
                label="Phone Number *"
                value={carDetails.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
              />
            </Box>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={carDetails.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="owner@example.com"
            />
          </Box>
        );
      
      case 2:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Assessment sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" fontWeight={600} sx={{ mb: 1 }}>
              AI Valuation Complete
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Based on market analysis and your car details
            </Typography>
            
            <Paper sx={{ p: 3, mb: 3, backgroundColor: 'primary.50' }}>
              <Typography variant="h3" fontWeight={700} color="primary.main">
                ₹{valuation ? (valuation / 100000).toFixed(1) : '0'}L
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estimated Market Value
              </Typography>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
              <Chip label="AI Powered" color="primary" size="small" />
              <Chip label="Market Analysis" color="secondary" size="small" />
              <Chip label="Real-time Data" color="success" size="small" />
            </Box>

            <Typography variant="body2" color="text.secondary">
              Our AI considers 50+ factors including market trends, condition, location, and demand to provide accurate valuations.
            </Typography>
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DirectionsCar sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">Sell Your Car</Typography>
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent()}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose}>Cancel</Button>
        {activeStep > 0 && (
          <Button onClick={handleBack}>Back</Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="contained" onClick={handleSubmit} startIcon={<AttachMoney />}>
            Submit for Valuation
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SellCarModal;
