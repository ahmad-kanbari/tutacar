import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { theme } from '../../theme';

interface ReviewCardProps {
    reviewerName: string;
    rating: number;
    date: string;
    comment: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
    reviewerName,
    rating,
    date,
    comment,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarText}>{reviewerName.charAt(0)}</Text>
                    </View>
                    <View>
                        <Text style={styles.name}>{reviewerName}</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.stars}>{'⭐'.repeat(Math.floor(rating))}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Text style={styles.comment}>{comment}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.gray[100],
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.sm,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.primary.light,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.sm,
    },
    avatarText: {
        ...theme.typography.styles.h4,
        color: theme.colors.primary.main,
    },
    name: {
        ...theme.typography.styles.body,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    ratingContainer: {
        flexDirection: 'row',
    },
    stars: {
        fontSize: 12,
    },
    date: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.tertiary,
    },
    comment: {
        ...theme.typography.styles.bodySmall,
        color: theme.colors.text.secondary,
        lineHeight: 20,
    },
});
