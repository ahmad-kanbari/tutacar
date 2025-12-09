import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    StatusBar,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../theme';
import { Button } from '../../components/common/Button';
import { BookingFlowParamList } from '../../navigation/types';

type DescribeIssueScreenNavigationProp = StackNavigationProp<
    BookingFlowParamList,
    'DescribeIssue'
>;

export const DescribeIssueScreen = () => {
    const navigation = useNavigation<DescribeIssueScreenNavigationProp>();
    const [description, setDescription] = useState('');

    const handleNext = () => {
        navigation.navigate('ChooseDateTime');
    };

    const handleAddPhoto = () => {
        // Placeholder for photo upload
        console.log('Add Photo');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.stepText}>Step 3 of 6</Text>
                        <Text style={styles.title}>Describe Issue</Text>
                        <Text style={styles.subtitle}>
                            Please describe the problem or service needed in detail.
                        </Text>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Describe the issue here..."
                                placeholderTextColor={theme.colors.text.tertiary}
                                multiline
                                textAlignVertical="top"
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>

                        <TouchableOpacity style={styles.photoButton} onPress={handleAddPhoto}>
                            <Text style={styles.photoIcon}>📷</Text>
                            <Text style={styles.photoText}>Add Photos</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <Button
                        variant="primary"
                        size="large"
                        onPress={handleNext}
                        disabled={description.length < 10} // Require at least 10 chars
                    >
                        Next Step
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
    keyboardAvoid: {
        flex: 1,
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
    inputContainer: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        height: 200,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        marginBottom: theme.spacing.lg,
    },
    input: {
        flex: 1,
        ...theme.typography.styles.body,
        color: theme.colors.text.primary,
    },
    photoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        borderStyle: 'dashed',
    },
    photoIcon: {
        fontSize: 20,
        marginRight: theme.spacing.sm,
    },
    photoText: {
        ...theme.typography.styles.buttonSmall,
        color: theme.colors.text.secondary,
    },
    footer: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray[100],
    },
});
