import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { Button } from '../../components/common/Button';

const MOCK_TRANSACTIONS = [
    { id: '1', description: 'Oil Change Service', points: '+50', date: 'Dec 12, 2023' },
    { id: '2', description: 'Referral Bonus', points: '+100', date: 'Nov 28, 2023' },
    { id: '3', description: 'Redeemed Coupon', points: '-200', date: 'Oct 15, 2023' },
];

export const LoyaltyScreen = () => {
    const navigation = useNavigation();
    const [points, setPoints] = useState(350);
    const [tier, setTier] = useState('Silver');
    const [progress, setProgress] = useState(0.7); // 70% to Gold

    const handleShare = () => {
        Alert.alert('Share Referral Code', 'Referral code copied to clipboard: CARCONNECT2023');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Loyalty & Rewards</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Points Card */}
                <View style={styles.pointsCard}>
                    <Text style={styles.pointsLabel}>Your Balance</Text>
                    <Text style={styles.pointsValue}>{points} pts</Text>
                    <View style={styles.tierContainer}>
                        <Text style={styles.tierLabel}>Current Tier: {tier}</Text>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                        </View>
                        <Text style={styles.progressText}>{Math.round(progress * 100)}% to Gold</Text>
                    </View>
                </View>

                {/* Referral Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Refer a Friend</Text>
                    <View style={styles.referralCard}>
                        <Text style={styles.referralText}>
                            Invite friends to CarConnect and earn 100 points for each referral!
                        </Text>
                        <View style={styles.codeContainer}>
                            <Text style={styles.code}>CARCONNECT2023</Text>
                            <Button variant="primary" size="small" onPress={handleShare}>
                                Share
                            </Button>
                        </View>
                    </View>
                </View>

                {/* History Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>History</Text>
                    {MOCK_TRANSACTIONS.map((item) => (
                        <View key={item.id} style={styles.transactionItem}>
                            <View>
                                <Text style={styles.transactionDesc}>{item.description}</Text>
                                <Text style={styles.transactionDate}>{item.date}</Text>
                            </View>
                            <Text
                                style={[
                                    styles.transactionPoints,
                                    item.points.startsWith('+') ? styles.pointsPlus : styles.pointsMinus,
                                ]}
                            >
                                {item.points}
                            </Text>
                        </View>
                    ))}
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
    content: {
        padding: theme.spacing.lg,
    },
    pointsCard: {
        backgroundColor: theme.colors.primary.main,
        borderRadius: theme.radius.xl,
        padding: theme.spacing.xl,
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        ...theme.shadows.md,
    },
    pointsLabel: {
        ...theme.typography.styles.h3,
        color: theme.colors.white,
        opacity: 0.9,
        marginBottom: theme.spacing.xs,
    },
    pointsValue: {
        fontSize: 48,
        fontWeight: 'bold',
        color: theme.colors.white,
        marginBottom: theme.spacing.lg,
    },
    tierContainer: {
        width: '100%',
    },
    tierLabel: {
        ...theme.typography.styles.body,
        color: theme.colors.white,
        marginBottom: theme.spacing.xs,
        fontWeight: '600',
    },
    progressBar: {
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 4,
        marginBottom: theme.spacing.xs,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: theme.colors.secondary.main, // Green for progress
        borderRadius: 4,
    },
    progressText: {
        ...theme.typography.styles.caption,
        color: theme.colors.white,
        textAlign: 'right',
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        ...theme.typography.styles.h3,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
    },
    referralCard: {
        backgroundColor: theme.colors.white,
        padding: theme.spacing.lg,
        borderRadius: theme.radius.lg,
        ...theme.shadows.sm,
    },
    referralText: {
        ...theme.typography.styles.body,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.md,
    },
    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.gray[50],
        padding: theme.spacing.sm,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
    },
    code: {
        ...theme.typography.styles.h3,
        color: theme.colors.text.primary,
        letterSpacing: 1,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        marginBottom: theme.spacing.sm,
        ...theme.shadows.sm,
    },
    transactionDesc: {
        ...theme.typography.styles.body,
        fontWeight: '500',
        color: theme.colors.text.primary,
        marginBottom: 2,
    },
    transactionDate: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.tertiary,
    },
    transactionPoints: {
        ...theme.typography.styles.h3,
    },
    pointsPlus: {
        color: theme.colors.success,
    },
    pointsMinus: {
        color: theme.colors.error,
    },
});
