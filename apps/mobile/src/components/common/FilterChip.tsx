import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme';

interface FilterChipProps {
    label: string;
    selected?: boolean;
    onPress: () => void;
    style?: ViewStyle;
}

export const FilterChip: React.FC<FilterChipProps> = ({
    label,
    selected = false,
    onPress,
    style,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                selected && styles.selectedContainer,
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text
                style={[
                    styles.label,
                    selected && styles.selectedLabel,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.radius.full,
        backgroundColor: theme.colors.background.secondary,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        marginRight: theme.spacing.sm,
    },
    selectedContainer: {
        backgroundColor: theme.colors.primary.main,
        borderColor: theme.colors.primary.main,
    },
    label: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.secondary,
        fontWeight: '500',
    },
    selectedLabel: {
        color: theme.colors.white,
    },
});
