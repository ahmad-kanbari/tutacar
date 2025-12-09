import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { SectionHeader } from '../../components/common/SectionHeader';
import { ServiceCategory } from '../../components/home/ServiceCategory';
import { MechanicCard } from '../../components/mechanic/MechanicCard';

type HomeScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Home'>;

// Mock Data
const SERVICES = [
    { id: '1', name: 'Oil Change', icon: '🛢️' },
    { id: '2', name: 'Brakes', icon: '🛑' },
    { id: '3', name: 'Tires', icon: '🛞' },
    { id: '4', name: 'Battery', icon: '🔋' },
    { id: '5', name: 'Engine', icon: '⚙️' },
    { id: '6', name: 'AC', icon: '❄️' },
];

const FEATURED_MECHANICS = [
    {
        id: '1',
        name: 'John Smith',
        specialty: 'European Cars',
        rating: 4.8,
        reviewCount: 124,
        distance: '2.5 km',
    },
    {
        id: '2',
        name: 'Mike Johnson',
        specialty: 'Diesel Engines',
        rating: 4.9,
        reviewCount: 89,
        distance: '3.1 km',
    },
    {
        id: '3',
        name: 'Sarah Davis',
        specialty: 'General Repair',
        rating: 4.7,
        reviewCount: 215,
        distance: '1.8 km',
    },
];

export const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const handleSearchPress = () => {
        navigation.navigate('Find');
    };

    const handleServicePress = (id: string) => {
        // Navigate to Find with category filter
        navigation.navigate('Find');
    };

    const handleMechanicPress = (id: string) => {
        // Navigate to mechanic profile (will be implemented later)
        console.log('Mechanic pressed:', id);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hello, Driver! 👋</Text>
                    <Text style={styles.location}>📍 Downtown, City</Text>
                </View>
                <TouchableOpacity style={styles.notificationButton}>
                    <Text style={styles.notificationIcon}>🔔</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Search Bar */}
                <TouchableOpacity
                    style={styles.searchBar}
                    onPress={handleSearchPress}
                    activeOpacity={0.9}
                >
                    <Text style={styles.searchIcon}>🔍</Text>
                    <Text style={styles.searchPlaceholder}>Find a mechanic or service...</Text>
                </TouchableOpacity>

                {/* Services Section */}
                <View style={styles.section}>
                    <SectionHeader title="Services" onSeeAll={() => navigation.navigate('Find')} />
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalList}
                    >
                        {SERVICES.map((service) => (
                            <ServiceCategory
                                key={service.id}
                                id={service.id}
                                name={service.name}
                                icon={service.icon}
                                onPress={handleServicePress}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Featured Mechanics Section */}
                <View style={styles.section}>
                    <SectionHeader title="Top Rated Mechanics" onSeeAll={() => navigation.navigate('Find')} />
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalList}
                    >
                        {FEATURED_MECHANICS.map((mechanic) => (
                            <MechanicCard
                                key={mechanic.id}
                                {...mechanic}
                                onPress={handleMechanicPress}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Recent Activity / Promo Banner (Placeholder) */}
                <View style={[styles.section, styles.promoSection]}>
                    <View style={styles.promoBanner}>
                        <View style={styles.promoContent}>
                            <Text style={styles.promoTitle}>Get 20% Off</Text>
                            <Text style={styles.promoText}>On your first booking with code WELCOME20</Text>
                        </View>
                        <Text style={styles.promoIcon}>🏷️</Text>
                    </View>
                </View>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    greeting: {
        ...theme.typography.styles.h2,
        color: theme.colors.text.primary,
    },
    location: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.secondary,
        marginTop: 2,
    },
    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.background.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationIcon: {
        fontSize: 20,
    },
    scrollContent: {
        paddingBottom: theme.spacing.xl,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        marginHorizontal: theme.spacing.lg,
        marginVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
        height: 48,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        ...theme.shadows.sm,
    },
    searchIcon: {
        fontSize: 18,
        marginRight: theme.spacing.sm,
    },
    searchPlaceholder: {
        ...theme.typography.styles.body,
        color: theme.colors.text.tertiary,
    },
    section: {
        marginTop: theme.spacing.lg,
    },
    horizontalList: {
        paddingHorizontal: theme.spacing.lg,
    },
    promoSection: {
        paddingHorizontal: theme.spacing.lg,
    },
    promoBanner: {
        backgroundColor: theme.colors.primary.main,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...theme.shadows.md,
    },
    promoContent: {
        flex: 1,
    },
    promoTitle: {
        ...theme.typography.styles.h2,
        color: theme.colors.white,
        marginBottom: 4,
    },
    promoText: {
        ...theme.typography.styles.bodySmall,
        color: theme.colors.white,
        opacity: 0.9,
    },
    promoIcon: {
        fontSize: 40,
    },
});
