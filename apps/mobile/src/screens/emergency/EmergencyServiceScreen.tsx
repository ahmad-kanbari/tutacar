import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { Button } from '../../components/common/Button';

const SERVICES = [
    { id: 'tow', label: 'Tow Truck', icon: '🚛' },
    { id: 'battery', label: 'Jump Start', icon: '🔋' },
    { id: 'tire', label: 'Flat Tire', icon: '🔧' },
    { id: 'lockout', label: 'Lockout', icon: '🔑' },
];

export const EmergencyServiceScreen = () => {
    const navigation = useNavigation();
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [isLocating, setIsLocating] = useState(true);
    const [location, setLocation] = useState<string | null>(null);
    const [isRequesting, setIsRequesting] = useState(false);

    useEffect(() => {
        // Simulate location finding
        const timer = setTimeout(() => {
            setIsLocating(false);
            setLocation('123 Main St, New York, NY (Near Central Park)');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleRequestHelp = () => {
        if (!selectedService) {
            Alert.alert('Select Service', 'Please select the type of service you need.');
            return;
        }

        setIsRequesting(true);

        // Simulate API request
        setTimeout(() => {
            setIsRequesting(false);
            Alert.alert(
                'Help is on the way!',
                `A ${SERVICES.find(s => s.id === selectedService)?.label} has been dispatched to your location. ETA: 15 mins.`,
                [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]
            );
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <View style={styles.header}>
                <Text style={styles.title}>Emergency Assistance 🚨</Text>
                <Text style={styles.subtitle}>We'll get you back on the road.</Text>
            </View>

            <View style={styles.content}>
                {/* Location Status */}
                <View style={styles.locationCard}>
                    <Text style={styles.locationLabel}>Your Location</Text>
                    {isLocating ? (
                        <View style={styles.locatingContainer}>
                            <ActivityIndicator size="small" color={theme.colors.primary.main} />
                            <Text style={styles.locatingText}>Locating you...</Text>
                        </View>
                    ) : (
                        <View style={styles.locationInfo}>
                            <Text style={styles.locationIcon}>📍</Text>
                            <Text style={styles.locationText}>{location}</Text>
                        </View>
                    )}
                </View>

                {/* Service Selection */}
                <Text style={styles.sectionTitle}>What do you need help with?</Text>
                <View style={styles.grid}>
                    {SERVICES.map((service) => (
                        <TouchableOpacity
                            key={service.id}
                            style={[
                                styles.serviceCard,
                                selectedService === service.id && styles.serviceCardSelected,
                            ]}
                            onPress={() => setSelectedService(service.id)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.serviceIcon}>{service.icon}</Text>
                            <Text
                                style={[
                                    styles.serviceLabel,
                                    selectedService === service.id && styles.serviceLabelSelected,
                                ]}
                            >
                                {service.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.footer}>
                <Button
                    variant="primary" // Should be error/danger color ideally, but primary is fine for now
                    size="large"
                    onPress={handleRequestHelp}
                    loading={isRequesting}
                    disabled={isLocating || !selectedService}
                    style={styles.requestButton}
                >
                    REQUEST HELP NOW
                </Button>
                <Text style={styles.disclaimer}>
                    By requesting help, you agree to share your location with service providers.
                </Text>
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
        padding: theme.spacing.xl,
        alignItems: 'center',
    },
    title: {
        ...theme.typography.styles.h1,
        color: theme.colors.error, // Red for emergency
        marginBottom: theme.spacing.xs,
    },
    subtitle: {
        ...theme.typography.styles.body,
        color: theme.colors.text.secondary,
    },
    content: {
        flex: 1,
        padding: theme.spacing.lg,
    },
    locationCard: {
        backgroundColor: theme.colors.white,
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        marginBottom: theme.spacing.xl,
        ...theme.shadows.sm,
    },
    locationLabel: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.tertiary,
        marginBottom: theme.spacing.sm,
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    locatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locatingText: {
        marginLeft: theme.spacing.sm,
        color: theme.colors.text.secondary,
    },
    locationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        fontSize: 20,
        marginRight: theme.spacing.sm,
    },
    locationText: {
        ...theme.typography.styles.body,
        color: theme.colors.text.primary,
        fontWeight: '500',
        flex: 1,
    },
    sectionTitle: {
        ...theme.typography.styles.h3,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    serviceCard: {
        width: '48%',
        backgroundColor: theme.colors.white,
        padding: theme.spacing.lg,
        borderRadius: theme.radius.lg,
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        borderWidth: 2,
        borderColor: 'transparent',
        ...theme.shadows.sm,
    },
    serviceCardSelected: {
        borderColor: theme.colors.primary.main,
        backgroundColor: theme.colors.primary.light + '10',
    },
    serviceIcon: {
        fontSize: 32,
        marginBottom: theme.spacing.sm,
    },
    serviceLabel: {
        ...theme.typography.styles.body,
        fontWeight: '600',
        color: theme.colors.text.secondary,
    },
    serviceLabelSelected: {
        color: theme.colors.primary.main,
    },
    footer: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray[100],
    },
    requestButton: {
        backgroundColor: theme.colors.error, // Override to red
    },
    disclaimer: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.tertiary,
        textAlign: 'center',
        marginTop: theme.spacing.md,
    },
});
