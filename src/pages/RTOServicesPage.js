import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from '@mui/material';
import {
  DirectionsCar,
  Assignment,
  Security,
  CreditCard,
  CheckCircle,
  Schedule,
  LocationOn,
  Phone,
  Email,
  Info,
  Warning,
  AccountBalance,
  Description,
  Person,
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const RTOServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    vehicleNumber: '',
    serviceType: '',
    documents: [],
    additionalInfo: ''
  });

  const rtoServices = [
    {
      id: 'vehicle-registration',
      title: 'Vehicle Registration',
      description: 'Register your new vehicle and get RC',
      icon: <DirectionsCar />,
      color: 'primary',
      documents: ['Invoice', 'Insurance', 'PUC', 'Form 20', 'Form 21'],
      fees: '₹500 - ₹2,000',
      timeline: '7-15 days',
    },
    {
      id: 'license-services',
      title: 'Driving License Services',
      description: 'Apply for new license or renew existing',
      icon: <Assignment />,
      color: 'secondary',
      documents: ['Form 1', 'Age Proof', 'Address Proof', 'Medical Certificate'],
      fees: '₹200 - ₹1,000',
      timeline: '15-30 days',
    },
    {
      id: 'transfer-ownership',
      title: 'Transfer of Ownership',
      description: 'Transfer vehicle ownership (NOC)',
      icon: <Person />,
      color: 'success',
      documents: ['RC', 'Insurance', 'PUC', 'Form 29', 'Form 30'],
      fees: '₹300 - ₹500',
      timeline: '7-10 days',
    },
    {
      id: 'duplicate-documents',
      title: 'Duplicate Documents',
      description: 'Get duplicate RC, License, or other documents',
      icon: <Description />,
      color: 'warning',
      documents: ['FIR Copy', 'Affidavit', 'Identity Proof', 'Address Proof'],
      fees: '₹100 - ₹300',
      timeline: '3-7 days',
    },
    {
      id: 'fitness-certificate',
      title: 'Fitness Certificate',
      description: 'Get fitness certificate for commercial vehicles',
      icon: <Security />,
      color: 'info',
      documents: ['RC', 'Insurance', 'PUC', 'Tax Receipt'],
      fees: '₹400 - ₹800',
      timeline: '1-3 days',
    },
    {
      id: 'permit-services',
      title: 'Permit Services',
      description: 'Apply for various vehicle permits',
      icon: <AccountBalance />,
      color: 'error',
      documents: ['RC', 'Insurance', 'Fitness Certificate', 'Route Details'],
      fees: '₹500 - ₹2,500',
      timeline: '10-20 days',
    },
  ];

  const rtoOffices = [
    {
      name: 'RTO Mumbai Central',
      address: 'Tardeo Road, Mumbai - 400034',
      phone: '+91-22-2354-5678',
      email: 'rto.mumbai@gov.in',
      timings: 'Mon-Fri: 10:00 AM - 5:00 PM',
    },
    {
      name: 'RTO Delhi',
      address: 'IP Estate, New Delhi - 110002',
      phone: '+91-11-2337-4567',
      email: 'rto.delhi@gov.in',
      timings: 'Mon-Fri: 9:30 AM - 5:30 PM',
    },
    {
      name: 'RTO Bangalore',
      address: 'Koramangala, Bangalore - 560034',
      phone: '+91-80-2553-4567',
      email: 'rto.bangalore@gov.in',
      timings: 'Mon-Sat: 10:00 AM - 4:00 PM',
    },
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleApplyService = (service) => {
    setSelectedService(service);
    setFormData(prev => ({ ...prev, serviceType: service.title }));
    setServiceDialogOpen(true);
    setActiveStep(0);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep(prev => prev + 1);
    } else {
      handleSubmitApplication();
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmitApplication = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setServiceDialogOpen(false);
      setActiveStep(0);
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        vehicleNumber: '',
        serviceType: '',
        documents: [],
        additionalInfo: ''
      });
      
      toast.success(`Application for ${selectedService.title} submitted successfully! Reference ID: RTO${Date.now()}`);
    }, 2000);
  };

  const steps = ['Personal Details', 'Vehicle Information', 'Review & Submit'];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => handleFormChange('fullName', e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => handleFormChange('phoneNumber', e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => handleFormChange('email', e.target.value)}
              required
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Vehicle Number (if applicable)"
              value={formData.vehicleNumber}
              onChange={(e) => handleFormChange('vehicleNumber', e.target.value)}
              placeholder="e.g., MH12AB1234"
            />
            <TextField
              fullWidth
              label="Additional Information"
              multiline
              rows={4}
              value={formData.additionalInfo}
              onChange={(e) => handleFormChange('additionalInfo', e.target.value)}
              placeholder="Any additional details or special requirements..."
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" gutterBottom>Review Your Application</Typography>
            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Typography variant="subtitle2" gutterBottom>Service: {formData.serviceType}</Typography>
              <Typography variant="body2" gutterBottom>Name: {formData.fullName}</Typography>
              <Typography variant="body2" gutterBottom>Phone: {formData.phoneNumber}</Typography>
              <Typography variant="body2" gutterBottom>Email: {formData.email}</Typography>
              {formData.vehicleNumber && (
                <Typography variant="body2" gutterBottom>Vehicle: {formData.vehicleNumber}</Typography>
              )}
              {formData.additionalInfo && (
                <Typography variant="body2">Additional Info: {formData.additionalInfo}</Typography>
              )}
            </Paper>
            <Alert severity="info">
              You will receive a confirmation email with further instructions and document upload links.
            </Alert>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <AccountBalance sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
          RTO Services
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Complete guide to RTO services and procedures
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="body1">
          <Info sx={{ mr: 1, verticalAlign: 'middle' }} />
          All RTO services are now available online. Visit the official Parivahan portal or use our integrated services.
        </Typography>
      </Alert>

      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Available Services
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {rtoServices.map((service) => (
          <Grid item xs={12} md={6} lg={4} key={service.id}>
            <Card 
              sx={{ 
                height: '100%', 
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                }
              }}
              onClick={() => handleServiceSelect(service)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: `${service.color}.main`, mr: 2 }}>
                    {service.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600}>
                    {service.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {service.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Chip
                    label={service.fees}
                    color={service.color}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={service.timeline}
                    color="default"
                    size="small"
                    icon={<Schedule />}
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  color={service.color}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplyService(service);
                  }}
                >
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedService && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {selectedService.title} - Required Documents
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                Required Documents:
              </Typography>
              <List dense>
                {selectedService.documents.map((doc, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={doc} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                Service Details:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CreditCard fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Fees" secondary={selectedService.fees} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Schedule fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Processing Time" secondary={selectedService.timeline} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      )}

      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        RTO Office Locations
      </Typography>

      <Grid container spacing={3}>
        {rtoOffices.map((office, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  {office.name}
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={office.address} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={office.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Email fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={office.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Schedule fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={office.timings} />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<LocationOn />}>
                  Get Directions
                </Button>
                <Button size="small" startIcon={<Phone />}>
                  Call
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Service Application Dialog */}
      <Dialog 
        open={serviceDialogOpen} 
        onClose={() => setServiceDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Apply for {selectedService?.title}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            {renderStepContent(activeStep)}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setServiceDialogOpen(false)}>
            Cancel
          </Button>
          {activeStep > 0 && (
            <Button onClick={handleBack}>
              Back
            </Button>
          )}
          <Button 
            variant="contained" 
            onClick={handleNext}
            disabled={loading || (activeStep === 0 && (!formData.fullName || !formData.phoneNumber || !formData.email))}
          >
            {loading ? (
              <CircularProgress size={20} />
            ) : activeStep === steps.length - 1 ? (
              'Submit Application'
            ) : (
              'Next'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RTOServicesPage;
