import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const MENU_ITEMS = [
    { id: 'vehicles', label: 'My Vehicles', icon: '🚗', route: 'MyVehicles' },
    { id: 'loyalty', label: 'Loyalty & Rewards', icon: '🎁', route: 'Loyalty' },
    { id: 'reminders', label: 'Maintenance Reminders', icon: '📅', route: 'MaintenanceReminders' },
    { id: 'payments', label: 'Payment Methods', icon: '💳', route: null },
    { id: 'settings', label: 'Settings', icon: '⚙️', route: null },
    { id: 'help', label: 'Help & Support', icon: '❓', route: null },
];

export const ProfileScreen = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const handlePress = (item: typeof MENU_ITEMS[0]) => {
        if (item.route) {
            // @ts-ignore - Dynamic navigation
            navigation.navigate(item.route);
        } else {
            Alert.alert('Coming Soon', `${item.label} feature is coming soon.`);
        }
    };

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: () => {
                    // Reset navigation to Auth stack
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Auth' }],
                    });
                },
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <ScrollView contentContainerStyle={styles.content}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>JD</Text>
                    </View>
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.email}>john.doe@example.com</Text>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {MENU_ITEMS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuItem}
                            onPress={() => handlePress(item)}
                        >
                            <View style={styles.menuLeft}>
                                <Text style={styles.menuIcon}>{item.icon}</Text>
                                <Text style={styles.menuLabel}>{item.label}</Text>
                            </View>
                            <Text style={styles.chevron}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                <Text style={styles.version}>Version 1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
    },
    content: {
        paddingBottom: theme.spacing.xl,
    },
    header: {
        alignItems: 'center',
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[200],
        marginBottom: theme.spacing.lg,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.primary.light + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: theme.colors.primary.main,
    },
    name: {
        ...theme.typography.styles.h2,
        color: theme.colors.text.primary,
        marginBottom: 4,
    },
    email: {
        ...theme.typography.styles.body,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.md,
    },
    editButton: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.radius.full,
        borderWidth: 1,
        borderColor: theme.colors.primary.main,
    },
    editButtonText: {
        ...theme.typography.styles.button,
        color: theme.colors.primary.main,
        fontSize: 14,
    },
    menuContainer: {
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.colors.gray[200],
        marginBottom: theme.spacing.xl,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[100],
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: 20,
        marginRight: theme.spacing.md,
        width: 24,
        textAlign: 'center',
    },
    menuLabel: {
        ...theme.typography.styles.body,
        color: theme.colors.text.primary,
    },
    chevron: {
        fontSize: 20,
        color: theme.colors.text.tertiary,
        fontWeight: 'bold',
    },
    logoutButton: {
        marginHorizontal: theme.spacing.lg,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.error,
        marginBottom: theme.spacing.lg,
    },
    logoutText: {
        ...theme.typography.styles.button,
        color: theme.colors.error,
    },
    version: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.tertiary,
        textAlign: 'center',
    },
});
