import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Paper,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Search,
  DirectionsCar,
  AccountBalance,
  Store,
  Dashboard,
  Security,
  Speed,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SimpleHomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleQuickSearch = async () => {
    if (!searchValue.trim()) {
      toast.error('Please enter a vehicle registration number');
      return;
    }

    setIsSearching(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate(`/lookup?reg=${encodeURIComponent(searchValue)}`);
    } catch (error) {
      toast.error('Please check the registration number format');
    } finally {
      setIsSearching(false);
    }
  };

  const features = [
    {
      icon: <Search sx={{ fontSize: 40 }} />,
      title: 'Vehicle Lookup',
      description: 'Get complete vehicle information by entering registration number',
      color: theme.palette.primary.main,
      link: '/lookup'
    },
    {
      icon: <AccountBalance sx={{ fontSize: 40 }} />,
      title: 'RTO Services',
      description: 'RC search, challan check, and nearest RTO office finder',
      color: theme.palette.secondary.main,
      link: '/rto'
    },
    {
      icon: <Dashboard sx={{ fontSize: 40 }} />,
      title: 'Vehicle Dashboard',
      description: 'Manage your vehicles, track services, and get reminders',
      color: '#4caf50',
      link: '/dashboard'
    },
    {
      icon: <Store sx={{ fontSize: 40 }} />,
      title: 'Marketplace',
      description: 'Buy/sell vehicles and find nearest showrooms',
      color: '#ff9800',
      link: '/marketplace'
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Your AI-Powered
                <br />
                <Box component="span" sx={{ color: theme.palette.secondary.main }}>
                  Vehicle Assistant
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                Get complete vehicle information, RTO services, AI recommendations, 
                and manage all your vehicles in one place.
              </Typography>
              
              {/* Quick Search */}
              <Paper
                sx={{
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3,
                  backgroundColor: 'rgba(255,255,255,0.95)',
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Enter vehicle registration number (e.g., MH12AB1234)"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === 'Enter' && handleQuickSearch()}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleQuickSearch}
                  disabled={isSearching}
                  sx={{ ml: 1, minWidth: 120 }}
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </Paper>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  icon={<Security />}
                  label="Verified Data"
                  sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  icon={<Speed />}
                  label="Instant Results"
                  sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              </Box>
            </Box>
            
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
              <DirectionsCar
                sx={{
                  fontSize: 300,
                  opacity: 0.3,
                  color: 'white',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 2, fontWeight: 700 }}
        >
          Everything You Need
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Comprehensive vehicle management and information platform
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                width: { xs: '100%', sm: '45%', md: '22%' },
                minWidth: 250,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ color: feature.color, mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {feature.description}
                </Typography>
                <Button
                  component={Link}
                  to={feature.link}
                  sx={{ color: feature.color }}
                >
                  Explore →
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={700} sx={{ mb: 2 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Join thousands of users managing their vehicles smarter
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{ minWidth: 160 }}
            >
              Get Started Free
            </Button>
            <Button
              component={Link}
              to="/lookup"
              variant="outlined"
              size="large"
              sx={{ minWidth: 160 }}
            >
              Try Vehicle Lookup
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SimpleHomePage;
