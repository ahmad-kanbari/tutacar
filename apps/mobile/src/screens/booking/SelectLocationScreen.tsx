import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../theme';
import { Button } from '../../components/common/Button';
import { BookingFlowParamList } from '../../navigation/types';

type SelectLocationScreenNavigationProp = StackNavigationProp<
    BookingFlowParamList,
    'SelectLocation'
>;

export const SelectLocationScreen = () => {
    const navigation = useNavigation<SelectLocationScreenNavigationProp>();
    const [address, setAddress] = useState('');

    const handleNext = () => {
        navigation.navigate('ReviewConfirm');
    };

    const handleUseCurrentLocation = () => {
        // Placeholder for geolocation logic
        setAddress('123 Main St, New York, NY 10001');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <View style={styles.header}>
                <Text style={styles.stepText}>Step 5 of 6</Text>
                <Text style={styles.title}>Select Location</Text>
                <Text style={styles.subtitle}>
                    Where should the mechanic meet you?
                </Text>
            </View>

            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.currentLocationButton}
                    onPress={handleUseCurrentLocation}
                >
                    <Text style={styles.locationIcon}>📍</Text>
                    <Text style={styles.currentLocationText}>Use Current Location</Text>
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.divider} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Enter Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Street address, city, zip..."
                        placeholderTextColor={theme.colors.text.tertiary}
                        value={address}
                        onChangeText={setAddress}
                    />
                </View>

                {/* Map Placeholder */}
                <View style={styles.mapPlaceholder}>
                    <Text style={styles.mapText}>Map Preview</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Button
                    variant="primary"
                    size="large"
                    onPress={handleNext}
                    disabled={!address}
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
    currentLocationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.primary.main,
        marginTop: theme.spacing.md,
    },
    locationIcon: {
        fontSize: 20,
        marginRight: theme.spacing.sm,
    },
    currentLocationText: {
        ...theme.typography.styles.buttonSmall,
        color: theme.colors.primary.main,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: theme.spacing.lg,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: theme.colors.gray[200],
    },
    dividerText: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.tertiary,
        marginHorizontal: theme.spacing.md,
    },
    inputContainer: {
        marginBottom: theme.spacing.lg,
    },
    inputLabel: {
        ...theme.typography.styles.label,
        marginBottom: theme.spacing.xs,
    },
    input: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        ...theme.typography.styles.body,
        color: theme.colors.text.primary,
    },
    mapPlaceholder: {
        flex: 1,
        backgroundColor: theme.colors.gray[100],
        borderRadius: theme.radius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    mapText: {
        ...theme.typography.styles.h3,
        color: theme.colors.text.tertiary,
    },
    footer: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray[100],
    },
});
