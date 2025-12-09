import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { SplashScreen } from '../components/screens/SplashScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { AuthNavigator } from './AuthNavigator';
import { TabNavigator } from './TabNavigator';
import { BookingNavigator } from './BookingNavigator';
import { MechanicProfileScreen } from '../screens/mechanic/MechanicProfileScreen';
import { BookingDetailsScreen } from '../screens/bookings/BookingDetailsScreen';
import { AIDiagnosisScreen } from '../screens/ai/AIDiagnosisScreen';
import { EmergencyServiceScreen } from '../screens/emergency/EmergencyServiceScreen';
import { ChatListScreen } from '../screens/chat/ChatListScreen';
import { ChatScreen } from '../screens/chat/ChatScreen';
import { MyVehiclesScreen } from '../screens/profile/MyVehiclesScreen';
import { AddVehicleScreen } from '../screens/profile/AddVehicleScreen';
import { MaintenanceRemindersScreen } from '../screens/profile/MaintenanceRemindersScreen';
import { LoyaltyScreen } from '../screens/profile/LoyaltyScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Splash"
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="BookingFlow" component={BookingNavigator} />
            <Stack.Screen name="MechanicProfile" component={MechanicProfileScreen} />
            <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
            <Stack.Screen name="AIDiagnosis" component={AIDiagnosisScreen} />
            <Stack.Screen name="EmergencyService" component={EmergencyServiceScreen} />
            <Stack.Screen name="ChatList" component={ChatListScreen} />
            <Stack.Screen name="ChatRoom" component={ChatScreen} />
            <Stack.Screen name="MyVehicles" component={MyVehiclesScreen} />
            <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
            <Stack.Screen name="MaintenanceReminders" component={MaintenanceRemindersScreen} />
            <Stack.Screen name="Loyalty" component={LoyaltyScreen} />
        </Stack.Navigator>
    );
};
