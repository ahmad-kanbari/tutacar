import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../theme';

interface MechanicCardProps {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviewCount: number;
    distance: string;
    imageUrl?: string;
    onPress: (id: string) => void;
}

export const MechanicCard: React.FC<MechanicCardProps> = ({
    id,
    name,
    specialty,
    rating,
    reviewCount,
    distance,
    imageUrl,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(id)}
            activeOpacity={0.9}
        >
            <View style={styles.imageContainer}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderText}>{name.charAt(0)}</Text>
                    </View>
                )}
                <View style={styles.ratingBadge}>
                    <Text style={styles.star}>⭐</Text>
                    <Text style={styles.rating}>{rating.toFixed(1)}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={1}>
                    {name}
                </Text>
                <Text style={styles.specialty} numberOfLines={1}>
                    {specialty}
                </Text>

                <View style={styles.footer}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoIcon}>📍</Text>
                        <Text style={styles.infoText}>{distance}</Text>
                    </View>
                    <Text style={styles.reviews}>({reviewCount} reviews)</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
        marginRight: theme.spacing.md,
        ...theme.shadows.sm,
        overflow: 'hidden',
    },
    imageContainer: {
        height: 120,
        backgroundColor: theme.colors.gray[100],
        position: 'relative',
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
        fontSize: 40,
        fontWeight: 'bold',
        color: theme.colors.primary.main,
    },
    ratingBadge: {
        position: 'absolute',
        top: theme.spacing.sm,
        right: theme.spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.spacing.xs,
        paddingVertical: 2,
        borderRadius: theme.radius.sm,
        ...theme.shadows.sm,
    },
    star: {
        fontSize: 10,
        marginRight: 2,
    },
    rating: {
        ...theme.typography.styles.caption,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
    },
    content: {
        padding: theme.spacing.md,
    },
    name: {
        ...theme.typography.styles.h3,
        color: theme.colors.text.primary,
        marginBottom: 2,
    },
    specialty: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.sm,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoIcon: {
        fontSize: 12,
        marginRight: 2,
    },
    infoText: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.secondary,
    },
    reviews: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.tertiary,
        fontSize: 10,
    },
});
