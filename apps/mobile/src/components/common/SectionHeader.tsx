import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface SectionHeaderProps {
    title: string;
    onSeeAll?: () => void;
    seeAllText?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    onSeeAll,
    seeAllText = 'See All',
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {onSeeAll && (
                <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
                    <Text style={styles.seeAll}>{seeAllText}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
    },
    title: {
        ...theme.typography.styles.h2,
        color: theme.colors.text.primary,
    },
    seeAll: {
        ...theme.typography.styles.buttonSmall,
        color: theme.colors.primary.main,
    },
});
