import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { Button } from '../../components/common/Button';

export const AIDiagnosisScreen = () => {
    const navigation = useNavigation();
    const [description, setDescription] = useState('');
    const [messages, setMessages] = useState<{ id: string; text: string; isUser: boolean }[]>([
        { id: '1', text: 'Hello! I am your AI Mechanic Assistant. Describe the issue you are facing with your car.', isUser: false },
    ]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [diagnosis, setDiagnosis] = useState<{ cause: string; recommendation: string } | null>(null);

    const handleAnalyze = () => {
        if (!description.trim()) return;

        // Add user message
        const userMsg = { id: Date.now().toString(), text: description, isUser: true };
        setMessages((prev) => [...prev, userMsg]);
        setDescription('');
        setIsAnalyzing(true);
        setDiagnosis(null);

        // Simulate AI analysis
        setTimeout(() => {
            setIsAnalyzing(false);
            const result = {
                cause: 'Based on your description, it sounds like a potential issue with the alternator or battery.',
                recommendation: 'I recommend booking a diagnostic service to confirm the issue.',
            };
            setDiagnosis(result);
            setMessages((prev) => [
                ...prev,
                { id: Date.now().toString(), text: result.cause, isUser: false },
                { id: (Date.now() + 1).toString(), text: result.recommendation, isUser: false },
            ]);
        }, 2000);
    };

    const handleFindMechanic = () => {
        // Navigate to Find Mechanic with pre-filled search (mock)
        // @ts-ignore - Nested navigation type issue
        navigation.navigate('MainTabs', { screen: 'Find' });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <View style={styles.header}>
                <Text style={styles.title}>AI Car Diagnosis 🤖</Text>
            </View>

            <ScrollView
                style={styles.chatContainer}
                contentContainerStyle={styles.chatContent}
                keyboardShouldPersistTaps="handled"
            >
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        style={[
                            styles.messageBubble,
                            msg.isUser ? styles.userBubble : styles.aiBubble,
                        ]}
                    >
                        <Text style={[styles.messageText, msg.isUser ? styles.userText : styles.aiText]}>
                            {msg.text}
                        </Text>
                    </View>
                ))}
                {isAnalyzing && (
                    <View style={styles.aiBubble}>
                        <Text style={styles.aiText}>Analyzing your issue...</Text>
                    </View>
                )}
            </ScrollView>

            {diagnosis && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Recommendation</Text>
                    <Text style={styles.resultText}>Diagnostic Service</Text>
                    <Button variant="primary" onPress={handleFindMechanic}>
                        Find a Mechanic
                    </Button>
                </View>
            )}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Describe the noise, feeling, or issue..."
                        placeholderTextColor={theme.colors.text.tertiary}
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                    <Button
                        variant="primary"
                        size="small"
                        onPress={handleAnalyze}
                        disabled={isAnalyzing || !description.trim()}
                    >
                        Analyze
                    </Button>
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
        padding: theme.spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[200],
        backgroundColor: theme.colors.white,
    },
    title: {
        ...theme.typography.styles.h2,
        color: theme.colors.text.primary,
        textAlign: 'center',
    },
    chatContainer: {
        flex: 1,
    },
    chatContent: {
        padding: theme.spacing.lg,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        marginBottom: theme.spacing.md,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: theme.colors.primary.main,
        borderBottomRightRadius: 0,
    },
    aiBubble: {
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.gray[100],
        borderBottomLeftRadius: 0,
    },
    messageText: {
        ...theme.typography.styles.body,
        lineHeight: 20,
    },
    userText: {
        color: theme.colors.white,
    },
    aiText: {
        color: theme.colors.text.primary,
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
        minHeight: 40,
        maxHeight: 100,
        backgroundColor: theme.colors.gray[50],
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: 8,
        marginRight: theme.spacing.md,
        color: theme.colors.text.primary,
        ...theme.typography.styles.body,
    },
    resultContainer: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.secondary.light + '20',
        borderTopWidth: 1,
        borderTopColor: theme.colors.secondary.light,
    },
    resultTitle: {
        ...theme.typography.styles.h4,
        color: theme.colors.secondary.dark,
        marginBottom: 4,
    },
    resultText: {
        ...theme.typography.styles.body,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
    },
});
