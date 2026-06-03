import 'react-native-gesture-handler/jestSetup';

jest.mock('expo-image', () => ({
  Image: 'Image',
}));

jest.mock('expo-av', () => ({
  Video: 'Video',
  ResizeMode: {
    CONTAIN: 'contain',
    COVER: 'cover',
    STRETCH: 'stretch',
  },
}));

jest.mock('expo-linking', () => ({
  openURL: jest.fn(),
  canOpenURL: jest.fn(() => Promise.resolve(true)),
}));

jest.mock('expo-modules-core', () => ({
  requireNativeModule: jest.fn(),
}));

jest.useFakeTimers();
