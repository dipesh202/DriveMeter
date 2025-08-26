import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Chip,
} from '@mui/material';
import {
  DirectionsCar,
  AccountCircle,
  Dashboard,
  Search,
  Business,
  AccountBalance,
  ExitToApp,
  Person,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleProfileMenuClose();
  };

  const isActive = (path) => location.pathname === path;

  const navigationItems = [
    { path: '/', label: 'Home', icon: <DirectionsCar /> },
    { path: '/lookup', label: 'Vehicle Lookup', icon: <Search /> },
    { path: '/rto', label: 'RTO Services', icon: <AccountBalance /> },
    { path: '/marketplace', label: 'Marketplace', icon: <Business /> },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar>
        {/* Logo and Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
          <DirectionsCar sx={{ mr: 1, fontSize: 28 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: 700,
              textDecoration: 'none',
              color: 'inherit',
              letterSpacing: '0.5px'
            }}
          >
            DriveMeter
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontWeight: isActive(item.path) ? 600 : 400,
                backgroundColor: isActive(item.path) ? 'rgba(255,255,255,0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
                borderRadius: 2,
                px: 2,
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Authentication Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isAuthenticated && user ? (
            <>
              {/* Dashboard Button for Authenticated Users */}
              <Button
                component={Link}
                to="/dashboard"
                startIcon={<Dashboard />}
                variant={isActive('/dashboard') ? 'contained' : 'outlined'}
                sx={{
                  color: isActive('/dashboard') ? 'primary.main' : 'white',
                  borderColor: 'white',
                  backgroundColor: isActive('/dashboard') ? 'white' : 'transparent',
                  '&:hover': {
                    backgroundColor: isActive('/dashboard') ? 'grey.100' : 'rgba(255,255,255,0.1)',
                  },
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Dashboard
              </Button>

              {/* User Profile Menu */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={user.name}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 500,
                  }}
                />
                <IconButton
                  onClick={handleProfileMenuOpen}
                  sx={{ color: 'white' }}
                >
                  <Avatar sx={{ width: 32, height: 32, backgroundColor: 'secondary.main' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {user.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={() => handleNavigation('/dashboard')}>
                  <Dashboard sx={{ mr: 2 }} />
                  Dashboard
                </MenuItem>
                <MenuItem onClick={() => handleNavigation('/profile')}>
                  <Person sx={{ mr: 2 }} />
                  Profile Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 2 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {/* Login/Register Buttons for Non-Authenticated Users */}
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white',
                  },
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
