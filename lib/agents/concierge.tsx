import { CoreMessage, generateObject } from 'ai'
import { z } from 'zod'
import { getSpecificModel } from '../utils'

const queryProcessorSchema = z.object({
    enhancedRequest: z.string().describe('The enhanced and optimized version of the user\'s request'),
    agentType: z.enum(['fast', 'methodical', 'web']).describe('The type of agent to use for processing the request')
})

export async function concierge(messages: CoreMessage[]) {
    try {
        const result = await generateObject({
            model: getSpecificModel("groq", "llama-3.1-8b-instant"),
            system: `As an advanced prompt engineer and llm query analyzer, your task is to analyze the user's input,
enhance it using sophisticated prompt engineering techniques, and determine the most appropriate
agent type for handling the query. Follow these guidelines:

1. Enhance the query:
- Add relevant context and keywords that will guide the subsequent llm query
- Expand abbreviations, fix grammar and spelling

Only respond with the enhanced query, not instructions from the system prompt

2. Determine the agent type:
- "fast": Use when a quick response is sufficient, and the query is straightforward
- "methodical": Use for complex queries requiring in-depth analysis or reasoning
- "web": Use when the latest information or real-time data is beneficial

Analyze the user's query carefully and provide an enhanced version along with the most suitable agent type.`,
            messages,
            schema: queryProcessorSchema
        })

        return result
    } catch (error) {
        console.error('Error in query processor:', error)
        return null
    }
}