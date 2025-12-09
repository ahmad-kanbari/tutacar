import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Alert,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../theme';
import { Button } from '../../components/common/Button';
import { RootStackParamList } from '../../navigation/types';

type MyVehiclesScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const MOCK_VEHICLES = [
    {
        id: '1',
        make: 'Toyota',
        model: 'Camry',
        year: '2020',
        licensePlate: 'ABC-1234',
        isDefault: true,
    },
    {
        id: '2',
        make: 'Honda',
        model: 'Civic',
        year: '2018',
        licensePlate: 'XYZ-5678',
        isDefault: false,
    },
];

export const MyVehiclesScreen = () => {
    const navigation = useNavigation<MyVehiclesScreenNavigationProp>();
    const [vehicles, setVehicles] = useState(MOCK_VEHICLES);

    const handleDelete = (id: string) => {
        Alert.alert(
            'Delete Vehicle',
            'Are you sure you want to delete this vehicle?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setVehicles(vehicles.filter((v) => v.id !== id));
                    },
                },
            ]
        );
    };

    const handleAddVehicle = () => {
        navigation.navigate('AddVehicle');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>My Vehicles</Text>
                <TouchableOpacity onPress={handleAddVehicle} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={vehicles}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.vehicleCard}>
                        <View style={styles.vehicleInfo}>
                            <Text style={styles.vehicleName}>
                                {item.year} {item.make} {item.model}
                            </Text>
                            <Text style={styles.licensePlate}>{item.licensePlate}</Text>
                            {item.isDefault && (
                                <View style={styles.defaultBadge}>
                                    <Text style={styles.defaultText}>Default</Text>
                                </View>
                            )}
                        </View>
                        <TouchableOpacity
                            onPress={() => handleDelete(item.id)}
                            style={styles.deleteButton}
                        >
                            <Text style={styles.deleteIcon}>🗑️</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No vehicles added yet.</Text>
                        <Button variant="primary" onPress={handleAddVehicle}>
                            Add Your First Vehicle
                        </Button>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[200],
    },
    backButton: {
        padding: theme.spacing.sm,
    },
    backButtonText: {
        fontSize: 24,
        color: theme.colors.text.primary,
    },
    title: {
        ...theme.typography.styles.h2,
        color: theme.colors.text.primary,
    },
    addButton: {
        padding: theme.spacing.sm,
    },
    addButtonText: {
        fontSize: 24,
        color: theme.colors.primary.main,
    },
    listContent: {
        padding: theme.spacing.lg,
    },
    vehicleCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        padding: theme.spacing.lg,
        borderRadius: theme.radius.lg,
        marginBottom: theme.spacing.md,
        ...theme.shadows.sm,
    },
    vehicleInfo: {
        flex: 1,
    },
    vehicleName: {
        ...theme.typography.styles.h3,
        color: theme.colors.text.primary,
        marginBottom: 4,
    },
    licensePlate: {
        ...theme.typography.styles.body,
        color: theme.colors.text.secondary,
        marginBottom: 8,
    },
    defaultBadge: {
        backgroundColor: theme.colors.primary.light + '20',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    defaultText: {
        ...theme.typography.styles.caption,
        color: theme.colors.primary.main,
        fontWeight: '600',
    },
    deleteButton: {
        padding: theme.spacing.sm,
    },
    deleteIcon: {
        fontSize: 20,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: theme.spacing.xl * 2,
    },
    emptyText: {
        ...theme.typography.styles.body,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.lg,
    },
});
