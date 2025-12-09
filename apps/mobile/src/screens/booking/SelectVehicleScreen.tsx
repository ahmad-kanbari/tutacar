import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../theme';
import { Button } from '../../components/common/Button';
import { VehicleCard } from '../../components/vehicle/VehicleCard';
import { BookingFlowParamList } from '../../navigation/types';

// Mock Data
const VEHICLES = [
    {
        id: '1',
        make: 'Toyota',
        model: 'Camry',
        year: '2019',
        licensePlate: 'ABC-1234',
    },
    {
        id: '2',
        make: 'Honda',
        model: 'CR-V',
        year: '2021',
        licensePlate: 'XYZ-5678',
    },
    {
        id: '3',
        make: 'Ford',
        model: 'F-150',
        year: '2018',
        licensePlate: 'TRK-9012',
    },
];

type SelectVehicleScreenNavigationProp = StackNavigationProp<
    BookingFlowParamList,
    'SelectVehicle'
>;

export const SelectVehicleScreen = () => {
    const navigation = useNavigation<SelectVehicleScreenNavigationProp>();
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

    const handleNext = () => {
        if (selectedVehicleId) {
            navigation.navigate('SelectService');
        }
    };

    const handleAddVehicle = () => {
        // Navigate to add vehicle screen (to be implemented)
        console.log('Add Vehicle');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <View style={styles.header}>
                <Text style={styles.stepText}>Step 1 of 6</Text>
                <Text style={styles.title}>Select Vehicle</Text>
                <Text style={styles.subtitle}>
                    Choose the vehicle you want to service
                </Text>
            </View>

            <View style={styles.content}>
                <FlatList
                    data={VEHICLES}
                    renderItem={({ item }) => (
                        <VehicleCard
                            {...item}
                            selected={selectedVehicleId === item.id}
                            onPress={setSelectedVehicleId}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        <TouchableOpacity style={styles.addButton} onPress={handleAddVehicle}>
                            <Text style={styles.addIcon}>+</Text>
                            <Text style={styles.addText}>Add New Vehicle</Text>
                        </TouchableOpacity>
                    }
                />
            </View>

            <View style={styles.footer}>
                <Button
                    variant="primary"
                    size="large"
                    onPress={handleNext}
                    disabled={!selectedVehicleId}
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
        paddingHorizontal: theme.spacing.lg,
    },
    listContent: {
        paddingVertical: theme.spacing.md,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.primary.main,
        borderStyle: 'dashed',
        borderRadius: theme.radius.lg,
        marginTop: theme.spacing.sm,
    },
    addIcon: {
        fontSize: 20,
        color: theme.colors.primary.main,
        marginRight: theme.spacing.sm,
    },
    addText: {
        ...theme.typography.styles.buttonSmall,
        color: theme.colors.primary.main,
    },
    footer: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray[100],
    },
});
