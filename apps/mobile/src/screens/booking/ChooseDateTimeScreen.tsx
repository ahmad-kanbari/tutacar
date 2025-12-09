import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../theme';
import { Button } from '../../components/common/Button';
import { TimeSlotPicker } from '../../components/booking/TimeSlotPicker';
import { BookingFlowParamList } from '../../navigation/types';

// Mock Data
const DATES = [
    { day: 'Mon', date: '12' },
    { day: 'Tue', date: '13' },
    { day: 'Wed', date: '14' },
    { day: 'Thu', date: '15' },
    { day: 'Fri', date: '16' },
    { day: 'Sat', date: '17' },
];

const TIME_SLOTS = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
];

type ChooseDateTimeScreenNavigationProp = StackNavigationProp<
    BookingFlowParamList,
    'ChooseDateTime'
>;

export const ChooseDateTimeScreen = () => {
    const navigation = useNavigation<ChooseDateTimeScreenNavigationProp>();
    const [selectedDate, setSelectedDate] = useState('12');
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const handleNext = () => {
        if (selectedDate && selectedTime) {
            navigation.navigate('SelectLocation');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.stepText}>Step 4 of 6</Text>
                    <Text style={styles.title}>Choose Date & Time</Text>
                    <Text style={styles.subtitle}>
                        Select a convenient time for your service
                    </Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>December 2023</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.datesContainer}
                    >
                        {DATES.map((item) => (
                            <TouchableOpacity
                                key={item.date}
                                style={[
                                    styles.dateItem,
                                    selectedDate === item.date && styles.selectedDateItem,
                                ]}
                                onPress={() => setSelectedDate(item.date)}
                            >
                                <Text
                                    style={[
                                        styles.dayText,
                                        selectedDate === item.date && styles.selectedDateText,
                                    ]}
                                >
                                    {item.day}
                                </Text>
                                <Text
                                    style={[
                                        styles.dateText,
                                        selectedDate === item.date && styles.selectedDateText,
                                    ]}
                                >
                                    {item.date}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <Text style={styles.sectionTitle}>Available Slots</Text>
                    <TimeSlotPicker
                        slots={TIME_SLOTS}
                        selectedSlot={selectedTime}
                        onSelectSlot={setSelectedTime}
                    />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    variant="primary"
                    size="large"
                    onPress={handleNext}
                    disabled={!selectedDate || !selectedTime}
                >
                    Next Step
                </Button>
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
        flexGrow: 1,
    },
    header: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    stepText: {
        ...theme.typography.styles.caption,
        color: theme.colors.primary.main,
        fontWeight: '600',
        marginBottom: theme.spacing.xs,
    },
    title: {
        ...theme.typography.styles.h2,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    subtitle: {
        ...theme.typography.styles.body,
        color: theme.colors.text.secondary,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.lg,
    },
    sectionTitle: {
        ...theme.typography.styles.h4,
        color: theme.colors.text.primary,
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    datesContainer: {
        paddingBottom: theme.spacing.sm,
    },
    dateItem: {
        width: 60,
        height: 80,
        borderRadius: theme.radius.lg,
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        ...theme.shadows.sm,
    },
    selectedDateItem: {
        backgroundColor: theme.colors.primary.main,
        borderColor: theme.colors.primary.main,
    },
    dayText: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.secondary,
        marginBottom: 4,
    },
    dateText: {
        ...theme.typography.styles.h3,
        color: theme.colors.text.primary,
    },
    selectedDateText: {
        color: theme.colors.white,
    },
    footer: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray[100],
    },
});
