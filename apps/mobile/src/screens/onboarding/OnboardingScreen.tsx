import React, { useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { OnboardingSlide } from './components/OnboardingSlide';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Find Trusted Mechanics',
        description: 'Connect with verified mechanics in your area within minutes.',
    },
    {
        id: '2',
        title: 'Never Miss Maintenance',
        description: 'Get reminders for oil changes, tire rotations, and more.',
    },
    {
        id: '3',
        title: 'Get Expert Advice',
        description: 'Chat with mechanics and share photos of car issues instantly.',
    },
];

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

export const OnboardingScreen = () => {
    const navigation = useNavigation<OnboardingScreenNavigationProp>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef<FlatList>(null);

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems && viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.replace('Auth');
        }
    };

    const handleSkip = () => {
        navigation.replace('Auth');
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={SLIDES}
                    renderItem={({ item }) => <OnboardingSlide title={item.title} description={item.description} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>

            <View style={styles.footer}>
                {/* Paginator */}
                <View style={styles.paginator}>
                    {SLIDES.map((_, i) => {
                        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [10, 20, 10],
                            extrapolate: 'clamp',
                        });
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });

                        return (
                            <Animated.View
                                style={[styles.dot, { width: dotWidth, opacity }]}
                                key={i.toString()}
                            />
                        );
                    })}
                </View>

                <View style={styles.buttonContainer}>
                    {currentIndex === SLIDES.length - 1 ? (
                        <Button onPress={handleNext} size="large">Get Started</Button>
                    ) : (
                        <View style={styles.navigationButtons}>
                            <Button onPress={handleSkip} variant="ghost">Skip</Button>
                            <Button onPress={handleNext}>Next</Button>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xl,
        width: '100%',
    },
    paginator: {
        flexDirection: 'row',
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.primary.main,
        marginHorizontal: 8,
    },
    buttonContainer: {
        marginBottom: spacing.lg,
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
});
