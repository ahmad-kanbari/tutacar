import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert,
    StatusBar,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../theme';
import { Button } from '../../components/common/Button';
import { RootStackParamList } from '../../navigation/types';

type BookingDetailsScreenRouteProp = RouteProp<RootStackParamList, 'BookingDetails'>;
type BookingDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BookingDetails'>;

// Mock Data
const MOCK_BOOKING = {
    id: '1',
    mechanicName: 'John Smith',
    mechanicPhoto: 'https://via.placeholder.com/150',
    serviceName: 'Oil Change',
    date: 'Dec 12, 2023',
    time: '10:00 AM',
    status: 'confirmed', // pending, confirmed, completed, cancelled
    price: '$45.00',
    address: '123 Main St, New York, NY',
    vehicle: 'Toyota Camry 2020',
    issueDescription: 'Regular maintenance check.',
    timeline: [
        { status: 'Booking Created', time: 'Dec 10, 09:00 AM', completed: true },
        { status: 'Mechanic Confirmed', time: 'Dec 10, 10:30 AM', completed: true },
        { status: 'Service In Progress', time: '-', completed: false },
        { status: 'Service Completed', time: '-', completed: false },
    ],
};

export const BookingDetailsScreen = () => {
    const navigation = useNavigation<BookingDetailsScreenNavigationProp>();
    const route = useRoute<BookingDetailsScreenRouteProp>();
    const { bookingId } = route.params;
    const [booking, setBooking] = useState(MOCK_BOOKING);

    const handleCancel = () => {
        Alert.alert(
            'Cancel Booking',
            'Are you sure you want to cancel this booking?',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes, Cancel',
                    style: 'destructive',
                    onPress: () => {
                        setBooking({ ...booking, status: 'cancelled' });
                        Alert.alert('Booking Cancelled', 'Your booking has been cancelled.');
                    },
                },
            ]
        );
    };

    const handleReschedule = () => {
        Alert.alert('Reschedule', 'Rescheduling feature coming soon.');
    };

    const handleReview = () => {
        Alert.alert('Review', 'Review feature coming soon.');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return theme.colors.success;
            case 'pending': return theme.colors.warning;
            case 'completed': return theme.colors.primary.main;
            case 'cancelled': return theme.colors.error;
            default: return theme.colors.gray[500];
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.serviceName}>{booking.serviceName}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '20' }]}>
                        <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                            {booking.status.toUpperCase()}
                        </Text>
                    </View>
                </View>

                {/* Mechanic Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Mechanic</Text>
                    <View style={styles.mechanicInfo}>
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarText}>{booking.mechanicName.charAt(0)}</Text>
                        </View>
                        <View>
                            <Text style={styles.mechanicName}>{booking.mechanicName}</Text>
                            <Text style={styles.address}>{booking.address}</Text>
                        </View>
                    </View>
                </View>

                {/* Booking Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Details</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Date & Time</Text>
                        <Text style={styles.detailValue}>{booking.date} at {booking.time}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Vehicle</Text>
                        <Text style={styles.detailValue}>{booking.vehicle}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Total Price</Text>
                        <Text style={styles.price}>{booking.price}</Text>
                    </View>
                </View>

                {/* Timeline */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Status Tracking</Text>
                    <View style={styles.timeline}>
                        {booking.timeline.map((item, index) => (
                            <View key={index} style={styles.timelineItem}>
                                <View style={styles.timelineLeft}>
                                    <View style={[styles.timelineDot, item.completed && styles.timelineDotActive]} />
                                    {index < booking.timeline.length - 1 && (
                                        <View style={[styles.timelineLine, item.completed && styles.timelineLineActive]} />
                                    )}
                                </View>
                                <View style={styles.timelineContent}>
                                    <Text style={[styles.timelineStatus, item.completed && styles.timelineStatusActive]}>
                                        {item.status}
                                    </Text>
                                    <Text style={styles.timelineTime}>{item.time}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Actions */}
            <View style={styles.footer}>
                {booking.status === 'completed' ? (
                    <Button variant="primary" onPress={handleReview}>Write a Review</Button>
                ) : booking.status === 'cancelled' ? (
                    <Button variant="outline" onPress={() => navigation.goBack()}>Back to Bookings</Button>
                ) : (
                    <View style={styles.actionButtons}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                            <Button variant="outline" onPress={handleCancel}>Cancel</Button>
                        </View>
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <Button variant="primary" onPress={handleReschedule}>Reschedule</Button>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
    },
    scrollContent: {
        padding: theme.spacing.lg,
    },
    header: {
        marginBottom: theme.spacing.xl,
    },
    serviceName: {
        ...theme.typography.styles.h1,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: 4,
        borderRadius: theme.radius.full,
    },
    statusText: {
        ...theme.typography.styles.caption,
        fontWeight: '600',
    },
    section: {
        marginBottom: theme.spacing.xl,
        backgroundColor: theme.colors.white,
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        ...theme.shadows.sm,
    },
    sectionTitle: {
        ...theme.typography.styles.h3,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
    },
    mechanicInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.colors.primary.light,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    avatarText: {
        ...theme.typography.styles.h3,
        color: theme.colors.primary.main,
    },
    mechanicName: {
        ...theme.typography.styles.body,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    address: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.secondary,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.sm,
    },
    detailLabel: {
        ...theme.typography.styles.body,
        color: theme.colors.text.secondary,
    },
    detailValue: {
        ...theme.typography.styles.body,
        color: theme.colors.text.primary,
        fontWeight: '500',
    },
    price: {
        ...theme.typography.styles.h3,
        color: theme.colors.primary.main,
    },
    timeline: {
        marginTop: theme.spacing.sm,
    },
    timelineItem: {
        flexDirection: 'row',
        minHeight: 60,
    },
    timelineLeft: {
        alignItems: 'center',
        marginRight: theme.spacing.md,
        width: 20,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: theme.colors.gray[300],
        zIndex: 1,
    },
    timelineDotActive: {
        backgroundColor: theme.colors.success,
    },
    timelineLine: {
        width: 2,
        flex: 1,
        backgroundColor: theme.colors.gray[200],
        position: 'absolute',
        top: 12,
        bottom: -12,
    },
    timelineLineActive: {
        backgroundColor: theme.colors.success,
    },
    timelineContent: {
        flex: 1,
        paddingBottom: theme.spacing.md,
    },
    timelineStatus: {
        ...theme.typography.styles.body,
        color: theme.colors.text.tertiary,
        marginBottom: 2,
    },
    timelineStatusActive: {
        color: theme.colors.text.primary,
        fontWeight: '500',
    },
    timelineTime: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.tertiary,
    },
    footer: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray[100],
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
