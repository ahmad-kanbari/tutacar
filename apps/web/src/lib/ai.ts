import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || 'mock_key',
});

// System prompt for the mechanic assistant
const MECHANIC_SYSTEM_PROMPT = `
You are an expert automotive mechanic assistant for the TUTALLER platform.
Your goal is to help diagnose car issues based on user descriptions and provide estimates.
Be concise, professional, and prioritize safety.
If a problem seems dangerous, advise the user to stop driving immediately.
`;

export async function diagnoseIssue(userDescription: string, vehicleInfo: string) {
    if (!process.env.ANTHROPIC_API_KEY) {
        console.log('[MOCK] AI Diagnosis for:', userDescription);
        return {
            diagnosis: "Based on the description, it sounds like a worn brake pad.",
            severity: "Medium",
            estimatedCost: "$150 - $250",
            recommendedService: "Brake Replacement"
        };
    }

    try {
        const message = await anthropic.messages.create({
            model: 'claude-3-opus-20240229',
            max_tokens: 1024,
            system: MECHANIC_SYSTEM_PROMPT,
            messages: [
                {
                    role: 'user',
                    content: `Vehicle: ${vehicleInfo}\nProblem Description: ${userDescription}\n\nPlease provide a preliminary diagnosis, severity level (Low, Medium, High), estimated cost range, and recommended service. Return the response in JSON format.`,
                },
            ],
        });

        // Parse content (assuming simple text block for now, ideally strictly structured)
        const textContent = message.content
            .filter(block => block.type === 'text')
            .map(block => block.text)
            .join('');
        return textContent;

    } catch (error) {
        console.error('Error calling Anthropic API:', error);
        throw new Error('Failed to generate diagnosis');
    }
}
