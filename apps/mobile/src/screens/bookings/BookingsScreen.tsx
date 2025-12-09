import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { TabControl } from '../../components/common/TabControl';
import { BookingCard, BookingStatus } from '../../components/booking/BookingCard';

// Mock Data
const UPCOMING_BOOKINGS = [
    {
        id: '1',
        mechanicName: 'John Smith',
        serviceName: 'Oil Change',
        date: 'Dec 12, 2023',
        time: '10:00 AM',
        status: 'confirmed' as BookingStatus,
        price: '$45.00',
    },
    {
        id: '2',
        mechanicName: 'Mike Johnson',
        serviceName: 'Brake Inspection',
        date: 'Dec 15, 2023',
        time: '2:30 PM',
        status: 'pending' as BookingStatus,
        price: '$80.00',
    },
];

const PAST_BOOKINGS = [
    {
        id: '3',
        mechanicName: 'Sarah Davis',
        serviceName: 'Tire Rotation',
        date: 'Nov 28, 2023',
        time: '11:00 AM',
        status: 'completed' as BookingStatus,
        price: '$30.00',
    },
    {
        id: '4',
        mechanicName: 'AutoFix Pro',
        serviceName: 'Battery Replacement',
        date: 'Oct 15, 2023',
        time: '9:00 AM',
        status: 'completed' as BookingStatus,
        price: '$120.00',
    },
    {
        id: '5',
        mechanicName: 'Quick Lube',
        serviceName: 'Oil Change',
        date: 'Sep 05, 2023',
        time: '4:00 PM',
        status: 'cancelled' as BookingStatus,
        price: '$40.00',
    },
];

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

type BookingsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const BookingsScreen = () => {
    const navigation = useNavigation<BookingsScreenNavigationProp>();
    const [activeTab, setActiveTab] = useState('Upcoming');

    const handleBookingPress = (id: string) => {
        navigation.navigate('BookingDetails', { bookingId: id });
    };

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📅</Text>
            <Text style={styles.emptyTitle}>No Bookings Found</Text>
            <Text style={styles.emptyText}>
                You don't have any {activeTab.toLowerCase()} bookings.
            </Text>
        </View>
    );

    const data = activeTab === 'Upcoming' ? UPCOMING_BOOKINGS : PAST_BOOKINGS;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <View style={styles.header}>
                <Text style={styles.title}>My Bookings</Text>
            </View>

            <View style={styles.content}>
                <TabControl
                    tabs={['Upcoming', 'Past']}
                    activeTab={activeTab}
                    onTabPress={setActiveTab}
                />

                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <BookingCard
                            {...item}
                            onPress={handleBookingPress}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmptyState}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
    },
    header: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.background.primary,
    },
    title: {
        ...theme.typography.styles.h1,
        color: theme.colors.text.primary,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.lg,
    },
    listContent: {
        paddingBottom: theme.spacing.xl,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing.xl * 2,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: theme.spacing.md,
    },
    emptyTitle: {
        ...theme.typography.styles.h2,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
    },
    emptyText: {
        ...theme.typography.styles.body,
        color: theme.colors.text.secondary,
        textAlign: 'center',
    },
});
