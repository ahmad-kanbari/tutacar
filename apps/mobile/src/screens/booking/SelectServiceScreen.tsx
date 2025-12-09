import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../theme';
import { Button } from '../../components/common/Button';
import { ServiceGridItem } from '../../components/booking/ServiceGridItem';
import { BookingFlowParamList } from '../../navigation/types';

// Mock Data
const SERVICES = [
    { id: '1', label: 'Oil Change', icon: '🛢️' },
    { id: '2', label: 'Brakes', icon: '🛑' },
    { id: '3', label: 'Diagnostics', icon: '💻' },
    { id: '4', label: 'Tires', icon: '🛞' },
    { id: '5', label: 'Electrical', icon: '⚡' },
    { id: '6', label: 'AC & Heat', icon: '❄️' },
    { id: '7', label: 'General', icon: '🔧' },
    { id: '8', label: 'Other', icon: '📝' },
];

type SelectServiceScreenNavigationProp = StackNavigationProp<
    BookingFlowParamList,
    'SelectService'
>;

export const SelectServiceScreen = () => {
    const navigation = useNavigation<SelectServiceScreenNavigationProp>();
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

    const handleNext = () => {
        if (selectedServiceId) {
            navigation.navigate('DescribeIssue');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <View style={styles.header}>
                <Text style={styles.stepText}>Step 2 of 6</Text>
                <Text style={styles.title}>Select Service</Text>
                <Text style={styles.subtitle}>
                    What type of service do you need?
                </Text>
            </View>

            <View style={styles.content}>
                <FlatList
                    data={SERVICES}
                    renderItem={({ item }) => (
                        <ServiceGridItem
                            {...item}
                            selected={selectedServiceId === item.id}
                            onPress={setSelectedServiceId}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={styles.columnWrapper}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <View style={styles.footer}>
                <Button
                    variant="primary"
                    size="large"
                    onPress={handleNext}
                    disabled={!selectedServiceId}
                >
                    Next Step
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
        paddingHorizontal: theme.spacing.md, // Reduced padding for grid
    },
    listContent: {
        paddingVertical: theme.spacing.md,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    footer: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray[100],
    },
});
