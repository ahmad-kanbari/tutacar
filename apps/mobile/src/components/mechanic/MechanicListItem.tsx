import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../theme';

interface MechanicListItemProps {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviewCount: number;
    distance: string;
    priceRange: string;
    imageUrl?: string;
    onPress: (id: string) => void;
}

export const MechanicListItem: React.FC<MechanicListItemProps> = ({
    id,
    name,
    specialty,
    rating,
    reviewCount,
    distance,
    priceRange,
    imageUrl,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(id)}
            activeOpacity={0.7}
        >
            <View style={styles.imageContainer}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderText}>{name.charAt(0)}</Text>
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name} numberOfLines={1}>
                        {name}
                    </Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.star}>⭐</Text>
                        <Text style={styles.rating}>{rating.toFixed(1)}</Text>
                        <Text style={styles.reviews}>({reviewCount})</Text>
                    </View>
                </View>

                <Text style={styles.specialty}>{specialty}</Text>

                <View style={styles.footer}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoIcon}>📍</Text>
                        <Text style={styles.infoText}>{distance}</Text>
                    </View>
                    <View style={styles.dot} />
                    <View style={styles.infoItem}>
                        <Text style={styles.infoIcon}>💰</Text>
                        <Text style={styles.infoText}>{priceRange}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        ...theme.shadows.sm,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        marginRight: theme.spacing.md,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary.light,
    },
    placeholderText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.primary.main,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        ...theme.typography.styles.h3,
        color: theme.colors.text.primary,
        flex: 1,
        marginRight: theme.spacing.sm,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.background.secondary,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: theme.radius.sm,
    },
    star: {
        fontSize: 10,
        marginRight: 2,
    },
    rating: {
        ...theme.typography.styles.caption,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        marginRight: 2,
    },
    reviews: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.tertiary,
        fontSize: 10,
    },
    specialty: {
        ...theme.typography.styles.bodySmall,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.sm,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoIcon: {
        fontSize: 12,
        marginRight: 4,
    },
    infoText: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.secondary,
    },
    dot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: theme.colors.gray[300],
        marginHorizontal: theme.spacing.sm,
    },
});
