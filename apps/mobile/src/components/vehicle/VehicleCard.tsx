import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../theme';

interface VehicleCardProps {
    id: string;
    make: string;
    model: string;
    year: string;
    licensePlate: string;
    selected?: boolean;
    onPress: (id: string) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
    id,
    make,
    model,
    year,
    licensePlate,
    selected = false,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={[styles.container, selected && styles.selectedContainer]}
            onPress={() => onPress(id)}
            activeOpacity={0.7}
        >
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>🚗</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>
                    {year} {make} {model}
                </Text>
                <Text style={styles.subtitle}>{licensePlate}</Text>
            </View>
            {selected && (
                <View style={styles.checkContainer}>
                    <Text style={styles.checkIcon}>✓</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderWidth: 2,
        borderColor: 'transparent',
        ...theme.shadows.sm,
    },
    selectedContainer: {
        borderColor: theme.colors.primary.main,
        backgroundColor: theme.colors.primary.light + '10', // 10% opacity
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.gray[100],
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    icon: {
        fontSize: 24,
    },
    info: {
        flex: 1,
    },
    title: {
        ...theme.typography.styles.h4,
        color: theme.colors.text.primary,
        marginBottom: 2,
    },
    subtitle: {
        ...theme.typography.styles.bodySmall,
        color: theme.colors.text.secondary,
    },
    checkContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.primary.main,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: theme.spacing.md,
    },
    checkIcon: {
        color: theme.colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
});
