import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { HomeScreen } from '../screens/home/HomeScreen';
import { FindMechanicScreen } from '../screens/find/FindMechanicScreen';
import { BookingsScreen } from '../screens/bookings/BookingsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary.main,
                tabBarInactiveTintColor: colors.gray[400],
                tabBarStyle: {
                    borderTopColor: colors.gray[200],
                    backgroundColor: colors.background.primary,
                },
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Find" component={FindMechanicScreen} />
            <Tab.Screen name="Bookings" component={BookingsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};
