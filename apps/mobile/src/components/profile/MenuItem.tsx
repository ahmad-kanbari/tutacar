import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';

interface MenuItemProps {
    label: string;
    icon: string; // Emoji for now
    onPress: () => void;
    isDestructive?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    label,
    icon,
    onPress,
    isDestructive = false,
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.leftContent}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{icon}</Text>
                </View>
                <Text
                    style={[
                        styles.label,
                        isDestructive && styles.destructiveLabel,
                    ]}
                >
                    {label}
                </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[100],
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.background.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    icon: {
        fontSize: 16,
    },
    label: {
        ...theme.typography.styles.body,
        color: theme.colors.text.primary,
    },
    destructiveLabel: {
        color: theme.colors.error,
    },
    chevron: {
        fontSize: 20,
        color: theme.colors.text.tertiary,
        fontWeight: '300',
    },
});
