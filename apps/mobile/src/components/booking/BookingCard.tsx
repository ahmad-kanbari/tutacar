import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

interface BookingCardProps {
    id: string;
    mechanicName: string;
    serviceName: string;
    date: string;
    time: string;
    status: BookingStatus;
    price: string;
    onPress: (id: string) => void;
}

const getStatusColor = (status: BookingStatus) => {
    switch (status) {
        case 'confirmed':
            return theme.colors.success;
        case 'pending':
            return theme.colors.warning;
        case 'completed':
            return theme.colors.primary.main;
        case 'cancelled':
            return theme.colors.error;
        default:
            return theme.colors.gray[500];
    }
};

const getStatusLabel = (status: BookingStatus) => {
    switch (status) {
        case 'confirmed':
            return 'Confirmed';
        case 'pending':
            return 'Pending';
        case 'completed':
            return 'Completed';
        case 'cancelled':
            return 'Cancelled';
        default:
            return status;
    }
};

export const BookingCard: React.FC<BookingCardProps> = ({
    id,
    mechanicName,
    serviceName,
    date,
    time,
    status,
    price,
    onPress,
}) => {
    const statusColor = getStatusColor(status);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(id)}
            activeOpacity={0.7}
        >
            <View style={styles.header}>
                <View>
                    <Text style={styles.serviceName}>{serviceName}</Text>
                    <Text style={styles.mechanicName}>{mechanicName}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                    <Text style={[styles.statusText, { color: statusColor }]}>
                        {getStatusLabel(status)}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.footer}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoIcon}>📅</Text>
                    <Text style={styles.infoText}>
                        {date} • {time}
                    </Text>
                </View>
                <Text style={styles.price}>{price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        ...theme.shadows.sm,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.sm,
    },
    serviceName: {
        ...theme.typography.styles.h3,
        color: theme.colors.text.primary,
        marginBottom: 2,
    },
    mechanicName: {
        ...theme.typography.styles.bodySmall,
        color: theme.colors.text.secondary,
    },
    statusBadge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        borderRadius: theme.radius.full,
    },
    statusText: {
        ...theme.typography.styles.caption,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.gray[100],
        marginVertical: theme.spacing.sm,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoIcon: {
        fontSize: 14,
        marginRight: theme.spacing.xs,
    },
    infoText: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.secondary,
    },
    price: {
        ...theme.typography.styles.h3,
        color: theme.colors.primary.main,
    },
});
