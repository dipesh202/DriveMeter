import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { emailService } from '../services/emailService';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('drivemeter_token');
        const userData = localStorage.getItem('drivemeter_user');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          // Verify token is not expired (simple check)
          const tokenData = JSON.parse(atob(token.split('.')[1]));
          if (tokenData.exp * 1000 > Date.now()) {
            setUser(parsedUser);
          } else {
            // Token expired, clear storage
            localStorage.removeItem('drivemeter_token');
            localStorage.removeItem('drivemeter_user');
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('drivemeter_token');
        localStorage.removeItem('drivemeter_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      
      // Simulate API call - In production, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication - replace with real API call
      if (email && password.length >= 6) {
        const mockUser = {
          id: 'user_' + Date.now(),
          email: email,
          name: email.split('@')[0].replace(/[^a-zA-Z]/g, ''),
          phone: '+91 9876543210',
          createdAt: new Date().toISOString()
        };

        // Create mock JWT token
        const mockToken = btoa(JSON.stringify({
          userId: mockUser.id,
          email: mockUser.email,
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
        }));

        // Store in localStorage
        localStorage.setItem('drivemeter_token', mockToken);
        localStorage.setItem('drivemeter_user', JSON.stringify(mockUser));
        
        setUser(mockUser);
        toast.success('Login successful!');
        return true;
      } else {
        toast.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration - replace with real API call
      if (name && email && password.length >= 6) {
        const mockUser = {
          id: 'user_' + Date.now(),
          email: email,
          name: name,
          phone: phone,
          createdAt: new Date().toISOString()
        };

        // Create mock JWT token
        const mockToken = btoa(JSON.stringify({
          userId: mockUser.id,
          email: mockUser.email,
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
        }));

        // Store in localStorage
        localStorage.setItem('drivemeter_token', mockToken);
        localStorage.setItem('drivemeter_user', JSON.stringify(mockUser));
        
        setUser(mockUser);
        
        // Send welcome email
        try {
          const emailResult = await emailService.sendWelcomeEmail({
            userName: name,
            userEmail: email,
            registrationDate: mockUser.createdAt || new Date().toISOString()
          });
          
          if (emailResult.success) {
            console.log('Welcome email sent successfully');
          } else {
            console.warn('Failed to send welcome email:', emailResult.message);
          }
        } catch (emailError) {
          console.error('Error sending welcome email:', emailError);
        }
        
        toast.success('Registration successful! Welcome to DriveMeter 🚗');
        return true;
      } else {
        toast.error('Please fill all required fields');
        return false;
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('drivemeter_token');
    localStorage.removeItem('drivemeter_user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = async (userData) => {
    try {
      if (!user) return false;
      
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('drivemeter_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      toast.error('Failed to update profile');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
