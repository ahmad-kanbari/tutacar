import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { theme } from '../../theme';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

export const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    // Check if user is authenticated
    // For now, navigate to onboarding after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>🚗</Text>
        </View>
        <Text style={styles.appName}>CarConnect</Text>
        <Text style={styles.tagline}>Your trusted car care companion</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  logoText: {
    fontSize: 60,
  },
  appName: {
    ...theme.typography.styles.h1,
    color: theme.colors.white,
    marginBottom: theme.spacing.sm,
  },
  tagline: {
    ...theme.typography.styles.body,
    color: theme.colors.white,
    opacity: 0.9,
  },
});
