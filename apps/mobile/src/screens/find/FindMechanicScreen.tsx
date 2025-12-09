import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { FilterChip } from '../../components/common/FilterChip';
import { MechanicListItem } from '../../components/mechanic/MechanicListItem';

// Mock Data
const FILTERS = [
    'All',
    'Brakes',
    'Engine',
    'Oil Change',
    'Tires',
    'Electrical',
    'Body Work',
];

const MECHANICS = [
    {
        id: '1',
        name: 'John Smith',
        specialty: 'European Cars',
        rating: 4.8,
        reviewCount: 124,
        distance: '2.5 km',
        priceRange: '$$',
    },
    {
        id: '2',
        name: 'Mike Johnson',
        specialty: 'Diesel Engines',
        rating: 4.9,
        reviewCount: 89,
        distance: '3.1 km',
        priceRange: '$$$',
    },
    {
        id: '3',
        name: 'Sarah Davis',
        specialty: 'General Repair',
        rating: 4.7,
        reviewCount: 215,
        distance: '1.8 km',
        priceRange: '$',
    },
    {
        id: '4',
        name: 'AutoFix Pro',
        specialty: 'Body & Paint',
        rating: 4.5,
        reviewCount: 56,
        distance: '5.2 km',
        priceRange: '$$',
    },
    {
        id: '5',
        name: 'Quick Lube',
        specialty: 'Oil & Fluids',
        rating: 4.2,
        reviewCount: 312,
        distance: '0.8 km',
        priceRange: '$',
    },
];

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

type FindMechanicScreenNavigationProp = StackNavigationProp<RootStackParamList>;

import { mechanicService, Mechanic } from '../../services/mechanic';

export const FindMechanicScreen = () => {
    const navigation = useNavigation<FindMechanicScreenNavigationProp>();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [isMapView, setIsMapView] = useState(false);
    const [mechanics, setMechanics] = useState<any[]>(MECHANICS);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        const fetchMechanics = async () => {
            setLoading(true);
            try {
                const data = await mechanicService.search();
                if (data && data.length > 0) {
                    // Map API data to UI model
                    const mappedMechanics = data.map((m: Mechanic) => ({
                        id: m.id,
                        name: m.user.full_name,
                        specialty: m.specializations[0] || 'General',
                        rating: m.rating_average || 0,
                        reviewCount: m.rating_count || 0,
                        distance: '2.5 km', // Placeholder for now
                        priceRange: '$$', // Placeholder
                    }));
                    setMechanics(mappedMechanics);
                }
            } catch (error) {
                console.log('Failed to fetch mechanics, using mock data');
            } finally {
                setLoading(false);
            }
        };

        fetchMechanics();
    }, []);

    const handleMechanicPress = (id: string) => {
        navigation.navigate('MechanicProfile', { mechanicId: id });
    };

    const filteredMechanics = mechanics.filter(mechanic => {
        const matchesSearch = mechanic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mechanic.specialty.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = selectedFilter === 'All' || mechanic.specialty.includes(selectedFilter);
        return matchesSearch && matchesFilter;
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search mechanics, services..."
                        placeholderTextColor={theme.colors.text.tertiary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity
                    style={styles.mapToggle}
                    onPress={() => setIsMapView(!isMapView)}
                >
                    <Text style={styles.mapIcon}>{isMapView ? '📋' : '🗺️'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.filtersContainer}>
                <FlatList
                    data={FILTERS}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <FilterChip
                            label={item}
                            selected={selectedFilter === item}
                            onPress={() => setSelectedFilter(item)}
                        />
                    )}
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.filtersContent}
                />
            </View>

            {isMapView ? (
                <View style={styles.mapPlaceholder}>
                    <Text style={styles.mapPlaceholderText}>Map View Coming Soon 🗺️</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredMechanics}
                    renderItem={({ item }) => (
                        <MechanicListItem
                            {...item}
                            onPress={handleMechanicPress}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshing={loading}
                    onRefresh={() => { }}
                />
            )}
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
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        height: 48,
        borderRadius: theme.radius.lg,
        paddingHorizontal: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        marginRight: theme.spacing.md,
        ...theme.shadows.sm,
    },
    searchIcon: {
        fontSize: 18,
        marginRight: theme.spacing.sm,
    },
    searchInput: {
        flex: 1,
        ...theme.typography.styles.body,
        color: theme.colors.text.primary,
        height: '100%',
    },
    mapToggle: {
        width: 48,
        height: 48,
        borderRadius: theme.radius.lg,
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        ...theme.shadows.sm,
    },
    mapIcon: {
        fontSize: 24,
    },
    filtersContainer: {
        marginBottom: theme.spacing.md,
    },
    filtersContent: {
        paddingHorizontal: theme.spacing.lg,
    },
    listContent: {
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
    },
    mapPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.gray[100],
        margin: theme.spacing.lg,
        borderRadius: theme.radius.lg,
    },
    mapPlaceholderText: {
        ...theme.typography.styles.h3,
        color: theme.colors.text.secondary,
    },
});
