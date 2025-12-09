import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';

type ChatListScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const MOCK_CONVERSATIONS = [
    {
        id: '1',
        mechanicName: 'John Smith',
        lastMessage: 'Your car is ready for pickup.',
        time: '10:30 AM',
        unreadCount: 2,
        avatar: 'https://via.placeholder.com/150',
    },
    {
        id: '2',
        mechanicName: 'Mike Johnson',
        lastMessage: 'Can you bring it in tomorrow?',
        time: 'Yesterday',
        unreadCount: 0,
        avatar: 'https://via.placeholder.com/150',
    },
];

export const ChatListScreen = () => {
    const navigation = useNavigation<ChatListScreenNavigationProp>();

    const handlePress = (id: string, name: string) => {
        navigation.navigate('ChatRoom', { conversationId: id, userName: name });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <View style={styles.header}>
                <Text style={styles.title}>Messages</Text>
            </View>

            <FlatList
                data={MOCK_CONVERSATIONS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.conversationItem}
                        onPress={() => handlePress(item.id, item.mechanicName)}
                    >
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>{item.mechanicName.charAt(0)}</Text>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.topRow}>
                                <Text style={styles.name}>{item.mechanicName}</Text>
                                <Text style={styles.time}>{item.time}</Text>
                            </View>
                            <View style={styles.bottomRow}>
                                <Text style={styles.message} numberOfLines={1}>
                                    {item.lastMessage}
                                </Text>
                                {item.unreadCount > 0 && (
                                    <View style={styles.unreadBadge}>
                                        <Text style={styles.unreadText}>{item.unreadCount}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
    },
    header: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[200],
    },
    title: {
        ...theme.typography.styles.h1,
        color: theme.colors.text.primary,
    },
    listContent: {
        padding: theme.spacing.md,
    },
    conversationItem: {
        flexDirection: 'row',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
        marginBottom: theme.spacing.sm,
        ...theme.shadows.sm,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.colors.primary.light + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    avatarText: {
        ...theme.typography.styles.h3,
        color: theme.colors.primary.main,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    name: {
        ...theme.typography.styles.body,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    time: {
        ...theme.typography.styles.caption,
        color: theme.colors.text.tertiary,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    message: {
        ...theme.typography.styles.bodySmall,
        color: theme.colors.text.secondary,
        flex: 1,
        marginRight: theme.spacing.sm,
    },
    unreadBadge: {
        backgroundColor: theme.colors.primary.main,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    unreadText: {
        color: theme.colors.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
});
