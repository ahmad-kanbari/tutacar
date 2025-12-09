import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { theme } from '../../theme';

interface TimeSlotPickerProps {
    slots: string[];
    selectedSlot: string | null;
    onSelectSlot: (slot: string) => void;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
    slots,
    selectedSlot,
    onSelectSlot,
}) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={slots}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.slot,
                            selectedSlot === item && styles.selectedSlot,
                        ]}
                        onPress={() => onSelectSlot(item)}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                styles.slotText,
                                selectedSlot === item && styles.selectedSlotText,
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
                numColumns={3}
                columnWrapperStyle={styles.columnWrapper}
                scrollEnabled={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: theme.spacing.md,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: theme.spacing.md,
    },
    slot: {
        width: '30%',
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        backgroundColor: theme.colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedSlot: {
        backgroundColor: theme.colors.primary.main,
        borderColor: theme.colors.primary.main,
    },
    slotText: {
        ...theme.typography.styles.bodySmall,
        color: theme.colors.text.primary,
        fontWeight: '500',
    },
    selectedSlotText: {
        color: theme.colors.white,
    },
});
