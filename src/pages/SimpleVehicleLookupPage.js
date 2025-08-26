import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Search,
  DirectionsCar,
  Person,
  CalendarToday,
  Security,
  LocalGasStation,
  Settings,
  Warning,
  CheckCircle,
  ExpandMore,
  LocationOn,
  Phone,
  Email,
} from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { vehicleAPI } from '../services/vehicleAPI';
import toast from 'react-hot-toast';

const SimpleVehicleLookupPage = () => {
  const [searchParams] = useSearchParams();
  const [registrationNumber, setRegistrationNumber] = useState(
    searchParams.get('reg') || ''
  );
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!registrationNumber.trim()) {
      toast.error('Please enter a registration number');
      return;
    }

    setLoading(true);
    setError(null);
    setVehicleData(null);

    try {
      const response = await vehicleAPI.getVehicleInfo(registrationNumber.trim());
      // vehicleAPI.getVehicleInfo returns { success, data, message }
      setVehicleData(response?.data || null);
      toast.success('Vehicle details retrieved successfully!');
    } catch (err) {
      setError(err.message || 'Failed to fetch vehicle details');
      toast.error('Failed to fetch vehicle details');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatRegistrationNumber = (regNo) => {
    return regNo?.toUpperCase().replace(/\s+/g, '') || '';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <DirectionsCar sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" fontWeight={700} sx={{ mb: 1, color: 'text.primary' }}>
          Vehicle Lookup
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Get comprehensive vehicle information instantly
        </Typography>
      </Box>

      <Card elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 3, color: 'primary.main' }}>
            Enter Vehicle Registration Number
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'stretch', flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              fullWidth
              label="Registration Number"
              placeholder="Enter vehicle registration number (e.g., MH12AB1234)"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              sx={{ flexGrow: 1 }}
              InputProps={{
                sx: { height: 56 }
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleSearch}
              disabled={loading || !registrationNumber.trim()}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Search />}
              sx={{ 
                px: 4, 
                py: 1.5,
                height: 56,
                minWidth: { xs: '100%', sm: 'auto' },
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              {loading ? 'Searching...' : 'Search Vehicle'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {vehicleData && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <DirectionsCar sx={{ mr: 1 }} />
                  Vehicle Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <Settings />
                    </ListItemIcon>
                    <ListItemText
                      primary="Registration Number"
                      secondary={formatRegistrationNumber(vehicleData.registrationNumber)}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DirectionsCar />
                    </ListItemIcon>
                    <ListItemText
                      primary="Make & Model"
                      secondary={`${vehicleData.make || 'N/A'} ${vehicleData.model || ''}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarToday />
                    </ListItemIcon>
                    <ListItemText
                      primary="Registration Date"
                      secondary={vehicleData.registrationDate || 'N/A'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocalGasStation />
                    </ListItemIcon>
                    <ListItemText
                      primary="Fuel Type"
                      secondary={vehicleData.fuelType || 'N/A'}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ mr: 1 }} />
                  Owner Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText
                      primary="Owner Name"
                      secondary={vehicleData.ownerName || 'N/A'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText
                      primary="Address"
                      secondary={vehicleData.address || 'N/A'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone"
                      secondary={vehicleData.phone || 'N/A'}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {vehicleData.challans && vehicleData.challans.length > 0 && (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Warning sx={{ mr: 1, color: 'warning.main' }} />
                    Pending Challans ({vehicleData.challans.length})
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {vehicleData.challans.map((challan, index) => (
                    <Accordion key={index}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <Typography sx={{ flexGrow: 1 }}>
                            Challan #{challan.challanNumber || index + 1}
                          </Typography>
                          <Chip
                            label={`₹${challan.fineAmount || challan.amount || 'N/A'}`}
                            color="error"
                            size="small"
                            sx={{ mr: 2 }}
                          />
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                              Violation
                            </Typography>
                            <Typography variant="body1">
                              {challan.violationType || challan.violation || 'N/A'}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                              Date
                            </Typography>
                            <Typography variant="body1">
                              {challan.violationDate || challan.date || 'N/A'}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                              Location
                            </Typography>
                            <Typography variant="body1">
                              {challan.location || 'N/A'}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                              Status
                            </Typography>
                            <Chip
                              label={challan.status || 'Pending'}
                              color={challan.status === 'Paid' ? 'success' : 'error'}
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          )}

          <Grid item xs={12}>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'success.contrastText' }}>
              <CheckCircle sx={{ mr: 1 }} />
              <Typography variant="body1">
                Vehicle information retrieved successfully from official records
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default SimpleVehicleLookupPage;
