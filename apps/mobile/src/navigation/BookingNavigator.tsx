import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BookingFlowParamList } from './types';
import { SelectVehicleScreen } from '../screens/booking/SelectVehicleScreen';
import { SelectServiceScreen } from '../screens/booking/SelectServiceScreen';
import { DescribeIssueScreen } from '../screens/booking/DescribeIssueScreen';
import { ChooseDateTimeScreen } from '../screens/booking/ChooseDateTimeScreen';
import { SelectLocationScreen } from '../screens/booking/SelectLocationScreen';
import { ReviewConfirmScreen } from '../screens/booking/ReviewConfirmScreen';
import { View, Text } from 'react-native';

// Placeholder screens for other steps
const PlaceholderScreen = ({ route }: any) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{route.name}</Text>
    </View>
);

const Stack = createStackNavigator<BookingFlowParamList>();

export const BookingNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                // headerBackTitleVisible: false,
                headerTintColor: '#000',
            }}
        >
            <Stack.Screen
                name="SelectVehicle"
                component={SelectVehicleScreen}
                options={{ title: 'Booking' }}
            />
            <Stack.Screen
                name="SelectService"
                component={SelectServiceScreen}
                options={{ title: 'Select Service' }}
            />
            <Stack.Screen
                name="DescribeIssue"
                component={DescribeIssueScreen}
                options={{ title: 'Describe Issue' }}
            />
            <Stack.Screen
                name="ChooseDateTime"
                component={ChooseDateTimeScreen}
                options={{ title: 'Date & Time' }}
            />
            <Stack.Screen
                name="SelectLocation"
                component={SelectLocationScreen}
                options={{ title: 'Location' }}
            />
            <Stack.Screen
                name="ReviewConfirm"
                component={ReviewConfirmScreen}
                options={{ title: 'Review' }}
            />
        </Stack.Navigator>
    );
};
