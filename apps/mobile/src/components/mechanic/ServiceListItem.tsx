import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface ServiceListItemProps {
    name: string;
    price: string;
    duration?: string;
}

export const ServiceListItem: React.FC<ServiceListItemProps> = ({
    name,
    price,
    duration,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                {duration && <Text style={styles.duration}>{duration}</Text>}
            </View>
            <Text style={styles.price}>{price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[100],
    },
    info: {
        flex: 1,
    },
    name: {
        ...theme.typography.styles.body,
        color: theme.colors.text.primary,
        fontWeight: '500',
    },
    duration: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.tertiary,
        marginTop: 2,
    },
    price: {
        ...theme.typography.styles.h4,
        color: theme.colors.primary.main,
    },
});
