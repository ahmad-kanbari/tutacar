import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const AddVehicleScreen = () => {
    const navigation = useNavigation();
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        if (!make || !model || !year || !licensePlate) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Vehicle added successfully.', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Add Vehicle</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Input
                    label="Make"
                    placeholder="e.g. Toyota"
                    value={make}
                    onChangeText={setMake}
                    containerStyle={styles.input}
                />
                <Input
                    label="Model"
                    placeholder="e.g. Camry"
                    value={model}
                    onChangeText={setModel}
                    containerStyle={styles.input}
                />
                <Input
                    label="Year"
                    placeholder="e.g. 2020"
                    value={year}
                    onChangeText={setYear}
                    keyboardType="numeric"
                    containerStyle={styles.input}
                />
                <Input
                    label="License Plate"
                    placeholder="e.g. ABC-1234"
                    value={licensePlate}
                    onChangeText={setLicensePlate}
                    containerStyle={styles.input}
                />

                <Button
                    variant="primary"
                    onPress={handleSave}
                    loading={loading}
                    style={styles.saveButton}
                >
                    Save Vehicle
                </Button>
            </ScrollView>
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
    content: {
        padding: theme.spacing.lg,
    },
    input: {
        marginBottom: theme.spacing.lg,
    },
    saveButton: {
        marginTop: theme.spacing.xl,
    },
});
