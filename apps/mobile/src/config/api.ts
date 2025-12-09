import { Platform } from 'react-native';

// Use 10.0.2.2 for Android Emulator, localhost for iOS Simulator
const LOCALHOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const API_URL = `http://${LOCALHOST}:3000/api/trpc`;

export const getRpcUrl = (path: string) => `${API_URL}/${path}`;
