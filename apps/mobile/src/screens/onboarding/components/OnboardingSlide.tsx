import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';

const { width } = Dimensions.get('window');

interface OnboardingSlideProps {
    title: string;
    description: string;
    image?: ImageSourcePropType; // We'll use this later when we have assets
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ title, description, image }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {/* Placeholder for Image/Lottie */}
                <View style={styles.placeholderImage} />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
    },
    imageContainer: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    placeholderImage: {
        width: width * 0.8,
        height: width * 0.8,
        backgroundColor: colors.gray[200],
        borderRadius: 20,
    },
    contentContainer: {
        flex: 0.4,
        alignItems: 'center',
        paddingTop: spacing.xl,
    },
    title: {
        ...typography.styles.h1,
        color: colors.primary.main,
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    description: {
        ...typography.styles.body,
        color: colors.gray[600],
        textAlign: 'center',
        paddingHorizontal: spacing.md,
    },
});
