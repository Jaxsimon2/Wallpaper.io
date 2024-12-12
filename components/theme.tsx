import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const theme = {
  colors: {
    background: '#0A0A0A',
    surface: '#1A1A1A',
    primary: '#FFD700',
    secondary: '#C0C0C0',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    accent: '#FF4500',
    accent2: '#E91E63', 
  },
  fonts: {
    regular: 'Montserrat-Regular',
    medium: 'Montserrat-Medium',
    bold: 'Montserrat-Bold',
    logo: 'Playfair Display',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 16,
  },
  dimensions: {
    width,
    height,
  },
  screenPadding: {
    xs: width * 0.02,
    s: width * 0.04,
    m: width * 0.06,
    l: width * 0.08,
    xl: width * 0.1,
  },
};

