import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface ServiceCategoryProps {
    id: string;
    name: string;
    icon: string; // Emoji for now, can be replaced with icon component later
    onPress: (id: string) => void;
}

export const ServiceCategory: React.FC<ServiceCategoryProps> = ({
    id,
    name,
    icon,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(id)}
            activeOpacity={0.7}
        >
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>{icon}</Text>
            </View>
            <Text style={styles.name} numberOfLines={2}>
                {name}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 80,
        marginRight: theme.spacing.md,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.background.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
        ...theme.shadows.sm,
    },
    icon: {
        fontSize: 28,
    },
    name: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.primary,
        textAlign: 'center',
        fontWeight: '500',
    },
});
