import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface TabControlProps {
    tabs: string[];
    activeTab: string;
    onTabPress: (tab: string) => void;
}

export const TabControl: React.FC<TabControlProps> = ({
    tabs,
    activeTab,
    onTabPress,
}) => {
    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, isActive && styles.activeTab]}
                        onPress={() => onTabPress(tab)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.gray[100],
        borderRadius: theme.radius.lg,
        padding: 4,
        marginBottom: theme.spacing.lg,
    },
    tab: {
        flex: 1,
        paddingVertical: theme.spacing.sm,
        alignItems: 'center',
        borderRadius: theme.radius.md,
    },
    activeTab: {
        backgroundColor: theme.colors.white,
        ...theme.shadows.sm,
    },
    tabText: {
        ...theme.typography.styles.buttonSmall,
        color: theme.colors.text.secondary,
    },
    activeTabText: {
        color: theme.colors.primary.main,
        fontWeight: '600',
    },
});
