import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../theme';
import { Button } from '../../components/common/Button';
import { ServiceListItem } from '../../components/mechanic/ServiceListItem';
import { ReviewCard } from '../../components/mechanic/ReviewCard';
import { RootStackParamList } from '../../navigation/types';

type MechanicProfileScreenRouteProp = RouteProp<RootStackParamList, 'MechanicProfile'>;
type MechanicProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MechanicProfile'>;

export const MechanicProfileScreen = () => {
    const navigation = useNavigation<MechanicProfileScreenNavigationProp>();
    const route = useRoute<MechanicProfileScreenRouteProp>();
    const { mechanicId } = route.params;

    // Mock Data (In a real app, fetch based on mechanicId)
    const mechanic = {
        id: mechanicId,
        name: 'John Doe',
        photo: 'https://via.placeholder.com/150', // Placeholder
        rating: 4.8,
        reviewCount: 124,
        specialty: 'General Mechanic',
        bio: 'Certified mechanic with over 10 years of experience specializing in Japanese and European cars. Committed to providing honest and reliable service.',
        address: '123 Main St, New York, NY 10001',
        services: [
            { name: 'Oil Change', price: '$45', duration: '30 min' },
            { name: 'Brake Pad Replacement', price: '$120', duration: '1 hr' },
            { name: 'Diagnostic', price: '$80', duration: '45 min' },
            { name: 'Tire Rotation', price: '$30', duration: '20 min' },
        ],
        reviews: [
            {
                id: '1',
                reviewerName: 'Alice Smith',
                rating: 5,
                date: '2 days ago',
                comment: 'Great service! John was very professional and explained everything clearly.',
            },
            {
                id: '2',
                reviewerName: 'Bob Jones',
                rating: 4,
                date: '1 week ago',
                comment: 'Good work, but took a bit longer than expected.',
            },
        ],
    };

    const handleBookAppointment = () => {
        navigation.navigate('BookingFlow');
    };

    const handleChat = () => {
        console.log('Chat with mechanic');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.photoContainer}>
                        <Text style={styles.photoPlaceholder}>👨‍🔧</Text>
                    </View>
                    <Text style={styles.name}>{mechanic.name}</Text>
                    <Text style={styles.specialty}>{mechanic.specialty}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.star}>⭐</Text>
                        <Text style={styles.rating}>{mechanic.rating}</Text>
                        <Text style={styles.reviewCount}>({mechanic.reviewCount} reviews)</Text>
                    </View>
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>✅ Verified Mechanic</Text>
                    </View>
                </View>

                {/* About */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <Text style={styles.bio}>{mechanic.bio}</Text>
                </View>

                {/* Services */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Services</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    {mechanic.services.map((service, index) => (
                        <ServiceListItem key={index} {...service} />
                    ))}
                </View>

                {/* Photos */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Photos</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosContainer}>
                        {[1, 2, 3, 4].map((i) => (
                            <Image
                                key={i}
                                source={{ uri: `https://via.placeholder.com/300x200?text=Shop+Photo+${i}` }}
                                style={styles.photoItem}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Reviews */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Reviews</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    {mechanic.reviews.map((review) => (
                        <ReviewCard key={review.id} {...review} />
                    ))}
                </View>

                {/* Location */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Location</Text>
                    <View style={styles.mapPlaceholder}>
                        <Text style={styles.mapText}>Map Preview</Text>
                    </View>
                    <Text style={styles.address}>{mechanic.address}</Text>
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
                    <Text style={styles.chatIcon}>💬</Text>
                </TouchableOpacity>
                <View style={styles.bookButtonContainer}>
                    <Button variant="primary" size="large" onPress={handleBookAppointment}>
                        Book Appointment
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
    },
    scrollContent: {
        paddingBottom: 100, // Space for bottom bar
    },
    header: {
        alignItems: 'center',
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[100],
    },
    photoContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.gray[100],
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    photoPlaceholder: {
        fontSize: 40,
    },
    name: {
        ...theme.typography.styles.h2,
        color: theme.colors.text.primary,
        marginBottom: 4,
    },
    specialty: {
        ...theme.typography.styles.body,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.sm,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    star: {
        fontSize: 16,
        marginRight: 4,
    },
    rating: {
        ...theme.typography.styles.h4,
        color: theme.colors.text.primary,
        marginRight: 4,
    },
    reviewCount: {
        ...theme.typography.styles.bodySmall,
        color: theme.colors.text.tertiary,
    },
    badgeContainer: {
        backgroundColor: theme.colors.secondary.light + '20',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.radius.full,
    },
    badgeText: {
        ...theme.typography.styles.caption,
        color: theme.colors.success,
        fontWeight: '600',
    },
    section: {
        backgroundColor: theme.colors.white,
        marginTop: theme.spacing.md,
        padding: theme.spacing.lg,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray[100],
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[100],
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        ...theme.typography.styles.h3,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
    },
    seeAll: {
        ...theme.typography.styles.buttonSmall,
        color: theme.colors.primary.main,
    },
    bio: {
        ...theme.typography.styles.body,
        color: theme.colors.text.secondary,
        lineHeight: 22,
    },
    mapPlaceholder: {
        height: 150,
        backgroundColor: theme.colors.gray[100],
        borderRadius: theme.radius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    mapText: {
        color: theme.colors.text.tertiary,
    },
    address: {
        ...theme.typography.styles.bodySmall,
        color: theme.colors.text.secondary,
    },
    photosContainer: {
        flexDirection: 'row',
        marginBottom: theme.spacing.sm,
    },
    photoItem: {
        width: 120,
        height: 80,
        borderRadius: theme.radius.md,
        marginRight: theme.spacing.md,
        backgroundColor: theme.colors.gray[100],
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.white,
        flexDirection: 'row',
        padding: theme.spacing.lg,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray[100],
        ...theme.shadows.md,
    },
    chatButton: {
        width: 48,
        height: 48,
        borderRadius: theme.radius.lg,
        backgroundColor: theme.colors.background.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
    },
    chatIcon: {
        fontSize: 24,
    },
    bookButtonContainer: {
        flex: 1,
    },
});
