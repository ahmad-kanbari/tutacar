import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatRoom'>;

const MOCK_MESSAGES = [
    { id: '1', text: 'Hi, is my car ready?', isUser: true, time: '10:00 AM' },
    { id: '2', text: 'Yes, it is ready for pickup.', isUser: false, time: '10:30 AM' },
];

export const ChatScreen = () => {
    const route = useRoute<ChatScreenRouteProp>();
    const navigation = useNavigation();
    const { userName } = route.params;
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (!inputText.trim()) return;
        const newMessage = {
            id: Date.now().toString(),
            text: inputText,
            isUser: true,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([...messages, newMessage]);
        setInputText('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{userName}</Text>
            </View>

            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messageList}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.messageBubble,
                            item.isUser ? styles.userBubble : styles.mechanicBubble,
                        ]}
                    >
                        <Text style={[styles.messageText, item.isUser ? styles.userText : styles.mechanicText]}>
                            {item.text}
                        </Text>
                        <Text style={[styles.messageTime, item.isUser ? styles.userTime : styles.mechanicTime]}>
                            {item.time}
                        </Text>
                    </View>
                )}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        placeholderTextColor={theme.colors.text.tertiary}
                        value={inputText}
                        onChangeText={setInputText}
                    />
                    <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
        padding: theme.spacing.md,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[200],
    },
    backButton: {
        padding: theme.spacing.sm,
        marginRight: theme.spacing.sm,
    },
    backButtonText: {
        fontSize: 24,
        color: theme.colors.text.primary,
    },
    title: {
        ...theme.typography.styles.h3,
        color: theme.colors.text.primary,
    },
    messageList: {
        padding: theme.spacing.md,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        marginBottom: theme.spacing.sm,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: theme.colors.primary.main,
        borderBottomRightRadius: 0,
    },
    mechanicBubble: {
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.white,
        borderBottomLeftRadius: 0,
        ...theme.shadows.sm,
    },
    messageText: {
        ...theme.typography.styles.body,
        marginBottom: 4,
    },
    userText: {
        color: theme.colors.white,
    },
    mechanicText: {
        color: theme.colors.text.primary,
    },
    messageTime: {
        ...theme.typography.styles.caption,
        fontSize: 10,
        alignSelf: 'flex-end',
    },
    userTime: {
        color: theme.colors.primary.light,
    },
    mechanicTime: {
        color: theme.colors.text.tertiary,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray[200],
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: theme.colors.gray[50],
        borderRadius: theme.radius.full,
        paddingHorizontal: theme.spacing.md,
        marginRight: theme.spacing.md,
        color: theme.colors.text.primary,
    },
    sendButton: {
        paddingHorizontal: theme.spacing.md,
    },
    sendButtonText: {
        color: theme.colors.primary.main,
        fontWeight: '600',
    },
});
