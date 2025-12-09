import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../theme';
import { Button } from '../../components/common/Button';
import { BookingSummaryCard } from '../../components/booking/BookingSummaryCard';
import { BookingFlowParamList, RootStackParamList } from '../../navigation/types';

type ReviewConfirmScreenNavigationProp = StackNavigationProp<
    BookingFlowParamList & RootStackParamList,
    'ReviewConfirm'
>;

export const ReviewConfirmScreen = () => {
    const navigation = useNavigation<ReviewConfirmScreenNavigationProp>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleConfirm = () => {
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            Alert.alert(
                'Booking Confirmed!',
                'Your mechanic has been notified and will be in touch shortly.',
                [
                    {
                        text: 'View Bookings',
                        onPress: () => {
                            navigation.reset({
                                index: 0,
                                routes: [
                                    {
                                        name: 'MainTabs',
                                        state: {
                                            routes: [{ name: 'Bookings' }],
                                        },
                                    } as any,
                                ],
                            });
                        },
                    },
                ]
            );
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.stepText}>Step 6 of 6</Text>
                    <Text style={styles.title}>Review & Confirm</Text>
                    <Text style={styles.subtitle}>
                        Please review your booking details before confirming.
                    </Text>
                </View>

                <View style={styles.content}>
                    <BookingSummaryCard
                        vehicle="2019 Toyota Camry"
                        service="Oil Change"
                        date="Dec 12, 2023"
                        time="10:00 AM"
                        location="123 Main St, New York, NY 10001"
                        price="$45.00"
                    />

                    <Text style={styles.disclaimer}>
                        * Final price may vary based on additional parts or labor required.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    variant="primary"
                    size="large"
                    onPress={handleConfirm}
                    loading={isSubmitting}
                >
                    Confirm Booking
                </Button>
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
        flexGrow: 1,
    },
    header: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    stepText: {
        ...theme.typography.styles.caption,
        color: theme.colors.primary.main,
        fontWeight: '600',
        marginBottom: theme.spacing.xs,
    },
    title: {
        ...theme.typography.styles.h2,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    subtitle: {
        ...theme.typography.styles.body,
        color: theme.colors.text.secondary,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.lg,
    },
    disclaimer: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.tertiary,
        marginTop: theme.spacing.md,
        textAlign: 'center',
    },
    footer: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray[100],
    },
});
