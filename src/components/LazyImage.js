import React, { useState, useCallback } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { DirectionsCar } from '@mui/icons-material';

const LazyImage = ({ 
  src, 
  alt, 
  height = 200, 
  width = '100%',
  fallbackIcon = <DirectionsCar sx={{ fontSize: 48, color: 'grey.400' }} />
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  if (error) {
    return (
      <Box sx={{ 
        height, 
        width,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'grey.100',
        flexDirection: 'column'
      }}>
        {fallbackIcon}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Image unavailable
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', height, width, overflow: 'hidden' }}>
      {loading && (
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'grey.100',
          zIndex: 1
        }}>
          <CircularProgress size={24} />
        </Box>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.3s ease-in-out',
          opacity: loading ? 0 : 1,
          display: 'block'
        }}
      />
    </Box>
  );
};

export default LazyImage;
