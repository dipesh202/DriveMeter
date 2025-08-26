import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  Paper,
  Divider,
  IconButton,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  DirectionsCar,
  Assignment,
  Security,
  Warning,
  CheckCircle,
  Add,
  Edit,
  Delete,
  Notifications,
  TrendingUp,
  CalendarToday,
  Speed,
  LocalGasStation,
  Build,
  AccountBalance,
  Person,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockVehicles = [
      {
        id: 1,
        registrationNumber: 'MH12AB1234',
        make: 'Maruti Suzuki',
        model: 'Swift',
        year: 2020,
        fuelType: 'Petrol',
        insuranceExpiry: '2024-12-15',
        pucExpiry: '2024-10-20',
        rcExpiry: '2030-05-10',
        lastService: '2024-06-15',
        mileage: 25000,
        status: 'active',
      },
      {
        id: 2,
        registrationNumber: 'DL08CA9876',
        make: 'Hyundai',
        model: 'i20',
        year: 2019,
        fuelType: 'Petrol',
        insuranceExpiry: '2024-09-30',
        pucExpiry: '2024-08-15',
        rcExpiry: '2029-03-20',
        lastService: '2024-05-20',
        mileage: 35000,
        status: 'active',
      },
    ];

    const mockNotifications = [
      {
        id: 1,
        type: 'warning',
        title: 'Insurance Expiring Soon',
        message: 'Your vehicle MH12AB1234 insurance expires on Dec 15, 2024',
        date: '2024-08-20',
        priority: 'high',
      },
      {
        id: 2,
        type: 'info',
        title: 'Service Reminder',
        message: 'Your Swift is due for service (last serviced 2 months ago)',
        date: '2024-08-18',
        priority: 'medium',
      },
      {
        id: 3,
        type: 'success',
        title: 'Document Verified',
        message: 'RC verification completed for DL08CA9876',
        date: '2024-08-15',
        priority: 'low',
      },
    ];

    setTimeout(() => {
      setVehicles(mockVehicles);
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  const getExpiryStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: 'expired', color: 'error', text: 'Expired' };
    } else if (diffDays <= 30) {
      return { status: 'expiring', color: 'warning', text: `${diffDays} days left` };
    } else {
      return { status: 'valid', color: 'success', text: 'Valid' };
    }
  };

  const handleAddVehicle = () => {
    toast.success('Add vehicle feature will be available soon!');
  };

  const handleEditVehicle = (vehicleId) => {
    toast.success(`Edit vehicle ${vehicleId} feature will be available soon!`);
  };

  const handleDeleteVehicle = (vehicleId) => {
    toast.success(`Delete vehicle ${vehicleId} feature will be available soon!`);
  };

  const handleRenewDocument = (docType, vehicleId) => {
    toast.success(`Renew ${docType} for vehicle ${vehicleId} feature will be available soon!`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LinearProgress />
        <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
          Loading dashboard...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.dark', mr: 2 }}>
              <Person />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={700}>
                Welcome back, {user?.name || 'User'}!
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Manage your vehicles and stay compliant
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            onClick={handleAddVehicle}
            sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
          >
            Add Vehicle
          </Button>
        </Box>
      </Paper>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <DirectionsCar sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700}>
                {vehicles.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Vehicles
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Warning sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700}>
                {notifications.filter(n => n.priority === 'high').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Urgent Alerts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700}>
                {vehicles.filter(v => v.status === 'active').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Vehicles
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700}>
                {vehicles.reduce((total, v) => total + v.mileage, 0).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total KM
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* My Vehicles */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  My Vehicles
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={handleAddVehicle}
                  size="small"
                >
                  Add Vehicle
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {vehicle.make} {vehicle.model}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {vehicle.registrationNumber} • {vehicle.year} • {vehicle.fuelType}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton size="small" onClick={() => handleEditVehicle(vehicle.id)}>
                          <Edit />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDeleteVehicle(vehicle.id)}>
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Security sx={{ color: getExpiryStatus(vehicle.insuranceExpiry).color + '.main' }} />
                          <Typography variant="body2" fontWeight={600}>
                            Insurance
                          </Typography>
                          <Chip
                            label={getExpiryStatus(vehicle.insuranceExpiry).text}
                            color={getExpiryStatus(vehicle.insuranceExpiry).color}
                            size="small"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Assignment sx={{ color: getExpiryStatus(vehicle.pucExpiry).color + '.main' }} />
                          <Typography variant="body2" fontWeight={600}>
                            PUC
                          </Typography>
                          <Chip
                            label={getExpiryStatus(vehicle.pucExpiry).text}
                            color={getExpiryStatus(vehicle.pucExpiry).color}
                            size="small"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center' }}>
                          <AccountBalance sx={{ color: getExpiryStatus(vehicle.rcExpiry).color + '.main' }} />
                          <Typography variant="body2" fontWeight={600}>
                            RC
                          </Typography>
                          <Chip
                            label={getExpiryStatus(vehicle.rcExpiry).text}
                            color={getExpiryStatus(vehicle.rcExpiry).color}
                            size="small"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Build sx={{ color: 'info.main' }} />
                          <Typography variant="body2" fontWeight={600}>
                            Last Service
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(vehicle.lastService).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleRenewDocument('Insurance', vehicle.id)}
                      >
                        Renew Insurance
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleRenewDocument('PUC', vehicle.id)}
                      >
                        Renew PUC
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleRenewDocument('Service', vehicle.id)}
                      >
                        Book Service
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications & Alerts */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Notifications sx={{ mr: 1 }} />
                Recent Alerts
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List dense>
                {notifications.map((notification) => (
                  <ListItem key={notification.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      {notification.type === 'warning' && <Warning color="warning" />}
                      {notification.type === 'info' && <DirectionsCar color="info" />}
                      {notification.type === 'success' && <CheckCircle color="success" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={notification.title}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {notification.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(notification.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              {notifications.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    No alerts at the moment
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Quick Actions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<DirectionsCar />}
                    onClick={() => toast.success('Vehicle lookup feature available!')}
                    size="small"
                  >
                    Lookup Vehicle
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Assignment />}
                    onClick={() => toast.success('RTO services feature available!')}
                    size="small"
                  >
                    RTO Services
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Security />}
                    onClick={() => toast.success('Insurance feature coming soon!')}
                    size="small"
                  >
                    Insurance
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Build />}
                    onClick={() => toast.success('Service booking coming soon!')}
                    size="small"
                  >
                    Book Service
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
