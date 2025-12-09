import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface BookingSummaryCardProps {
    vehicle: string;
    service: string;
    date: string;
    time: string;
    location: string;
    price: string;
}

export const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({
    vehicle,
    service,
    date,
    time,
    location,
    price,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Booking Summary</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.label}>Vehicle</Text>
                    <Text style={styles.value}>{vehicle}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.label}>Service</Text>
                    <Text style={styles.value}>{service}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.label}>Date & Time</Text>
                    <Text style={styles.value}>{date} at {time}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.label}>Location</Text>
                    <Text style={styles.value} numberOfLines={2}>{location}</Text>
                </View>

                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Estimated Price</Text>
                    <Text style={styles.totalValue}>{price}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
        overflow: 'hidden',
        ...theme.shadows.sm,
    },
    header: {
        backgroundColor: theme.colors.gray[50],
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[100],
    },
    headerTitle: {
        ...theme.typography.styles.h4,
        color: theme.colors.text.primary,
    },
    content: {
        padding: theme.spacing.lg,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.sm,
    },
    label: {
        ...theme.typography.styles.bodySmall,
        color: theme.colors.text.secondary,
        width: '30%',
    },
    value: {
        ...theme.typography.styles.body,
        color: theme.colors.text.primary,
        fontWeight: '500',
        width: '70%',
        textAlign: 'right',
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.gray[100],
        marginVertical: theme.spacing.sm,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.md,
        paddingTop: theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray[200],
    },
    totalLabel: {
        ...theme.typography.styles.h4,
        color: theme.colors.text.primary,
    },
    totalValue: {
        ...theme.typography.styles.h2,
        color: theme.colors.primary.main,
    },
});
