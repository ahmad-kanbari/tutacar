import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';

interface ServiceGridItemProps {
    id: string;
    label: string;
    icon: string; // Emoji for now
    selected?: boolean;
    onPress: (id: string) => void;
}

export const ServiceGridItem: React.FC<ServiceGridItemProps> = ({
    id,
    label,
    icon,
    selected = false,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={[styles.container, selected && styles.selectedContainer]}
            onPress={() => onPress(id)}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer, selected && styles.selectedIconContainer]}>
                <Text style={styles.icon}>{icon}</Text>
            </View>
            <Text style={[styles.label, selected && styles.selectedLabel]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.spacing.xs,
        borderWidth: 2,
        borderColor: 'transparent',
        ...theme.shadows.sm,
    },
    selectedContainer: {
        borderColor: theme.colors.primary.main,
        backgroundColor: theme.colors.primary.light + '10',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.gray[100],
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    selectedIconContainer: {
        backgroundColor: theme.colors.white,
    },
    icon: {
        fontSize: 24,
    },
    label: {
        ...theme.typography.styles.bodySmall,
        color: theme.colors.text.primary,
        textAlign: 'center',
        fontWeight: '500',
    },
    selectedLabel: {
        color: theme.colors.primary.main,
        fontWeight: '600',
    },
});
