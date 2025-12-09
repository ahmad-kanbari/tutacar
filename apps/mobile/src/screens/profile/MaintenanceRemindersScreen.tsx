import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';

const MOCK_REMINDERS = [
    {
        id: '1',
        title: 'Oil Change',
        dueDate: 'Dec 20, 2023',
        status: 'upcoming', // upcoming, overdue, completed
        vehicle: 'Toyota Camry',
        description: 'Regular oil change and filter replacement.',
    },
    {
        id: '2',
        title: 'Tire Rotation',
        dueDate: 'Nov 15, 2023',
        status: 'overdue',
        vehicle: 'Toyota Camry',
        description: 'Rotate tires to ensure even wear.',
    },
    {
        id: '3',
        title: 'Brake Inspection',
        dueDate: 'Jan 10, 2024',
        status: 'upcoming',
        vehicle: 'Honda Civic',
        description: 'Check brake pads and rotors.',
    },
];

export const MaintenanceRemindersScreen = () => {
    const navigation = useNavigation();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming': return theme.colors.primary.main;
            case 'overdue': return theme.colors.error;
            case 'completed': return theme.colors.success;
            default: return theme.colors.gray[500];
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'upcoming': return 'Due Soon';
            case 'overdue': return 'Overdue';
            case 'completed': return 'Completed';
            default: return status;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Maintenance</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={MOCK_REMINDERS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={[styles.statusStrip, { backgroundColor: getStatusColor(item.status) }]} />
                        <View style={styles.cardContent}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                                        {getStatusLabel(item.status)}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.vehicleText}>{item.vehicle}</Text>
                            <Text style={styles.description}>{item.description}</Text>

                            <View style={styles.footer}>
                                <View style={styles.dateContainer}>
                                    <Text style={styles.dateIcon}>📅</Text>
                                    <Text style={[styles.dateText, item.status === 'overdue' && styles.overdueText]}>
                                        {item.dueDate}
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.actionButtonText}>Book Service</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
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
    card: {
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
        marginBottom: theme.spacing.md,
        overflow: 'hidden',
        ...theme.shadows.sm,
    },
    statusStrip: {
        width: 6,
    },
    cardContent: {
        flex: 1,
        padding: theme.spacing.md,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    cardTitle: {
        ...theme.typography.styles.h3,
        color: theme.colors.text.primary,
        flex: 1,
        marginRight: theme.spacing.sm,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusText: {
        ...theme.typography.styles.caption,
        fontWeight: '600',
        textTransform: 'uppercase',
        fontSize: 10,
    },
    vehicleText: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.secondary,
        marginBottom: 8,
        fontWeight: '500',
    },
    description: {
        ...theme.typography.styles.bodySmall,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.md,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray[100],
        paddingTop: theme.spacing.sm,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    dateText: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.primary,
    },
    overdueText: {
        color: theme.colors.error,
        fontWeight: '600',
    },
    actionButton: {
        backgroundColor: theme.colors.primary.main,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: 6,
        borderRadius: theme.radius.full,
    },
    actionButtonText: {
        ...theme.typography.styles.caption,
        color: theme.colors.white,
        fontWeight: '600',
    },
});
