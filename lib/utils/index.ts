import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createOllama } from 'ollama-ai-provider'
import { createOpenAI } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import { anthropic } from '@ai-sdk/anthropic'
import { CoreMessage } from 'ai'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const LLMProviders = {
  ollama: {
    defaultModel: process.env.OLLAMA_MODEL || 'llama2',
    apiKeyName: ""
  },
  openai: {
    defaultModel: 'gpt-4o',
    apiKeyName: 'OPENAI_API_KEY'
  },
  google: {
    defaultModel: 'models/gemini-1.5-pro-latest',
    apiKeyName: 'GOOGLE_API_KEY'
  },
  anthropic: {
    defaultModel: 'claude-3-sonnet-20240229',
    apiKeyName: 'ANTHROPIC_API_KEY'
  },
  groq: {
    defaultModel: 'llama-3.1-70b-versatile',
    apiKeyName: 'GROQ_API_KEY'
  },
}

export function getSpecificModel(provider: 'ollama' | 'openai' | 'google' | 'anthropic' | 'groq', model?: string) {
  const providerConfig = LLMProviders[provider]
  if (providerConfig.apiKeyName && !process.env[providerConfig.apiKeyName]) {
    throw new Error(`Missing ${providerConfig.apiKeyName} environment variable for ${provider} provider`)
  }
  const selectedModel = model || providerConfig.defaultModel

  switch (provider) {
    case 'ollama':
      if (!process.env.OLLAMA_BASE_URL) {
        throw new Error('Missing OLLAMA_BASE_URL environment variable')
      }
      const ollama = createOllama({ baseURL: process.env.OLLAMA_BASE_URL + '/api' })
      return ollama(selectedModel)

    case 'openai':
      const openai = createOpenAI({
        baseURL: process.env.OPENAI_API_BASE,
        apiKey: process.env.OPENAI_API_KEY,
        organization: ''
      })
      return openai.chat(selectedModel)

    case 'google':
      return google(selectedModel)

    case 'anthropic':
      return anthropic(selectedModel)

    case 'groq':
      const groq = createOpenAI({
        baseURL: 'https://api.groq.com/openai/v1',
        apiKey: process.env.GROQ_API_KEY,
      })
      return groq.chat(selectedModel)

    default:
      throw new Error(`Unsupported provider: ${provider}`)
  }
}

export function getModel(useSubModel = false) {
  const ollamaBaseUrl = process.env.OLLAMA_BASE_URL + '/api'
  const ollamaModel = process.env.OLLAMA_MODEL
  const ollamaSubModel = process.env.OLLAMA_SUB_MODEL
  const openaiApiBase = process.env.OPENAI_API_BASE
  const openaiApiKey = process.env.OPENAI_API_KEY
  let openaiApiModel = process.env.OPENAI_API_MODEL || 'gpt-4o'
  const googleApiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY

  if (
    !(ollamaBaseUrl && ollamaModel) &&
    !openaiApiKey &&
    !googleApiKey &&
    !anthropicApiKey
  ) {
    throw new Error(
      'Missing environment variables for Ollama, OpenAI, Google or Anthropic'
    )
  }
  // Ollama
  if (ollamaBaseUrl && ollamaModel) {
    const ollama = createOllama({ baseURL: ollamaBaseUrl })

    if (useSubModel && ollamaSubModel) {
      return ollama(ollamaSubModel)
    }

    return ollama(ollamaModel)
  }

  if (googleApiKey) {
    return google('models/gemini-1.5-pro-latest')
  }

  if (anthropicApiKey) {
    return anthropic('claude-3-5-sonnet-20240620')
  }

  // Fallback to OpenAI instead

  const openai = createOpenAI({
    baseURL: openaiApiBase, // optional base URL for proxies etc.
    apiKey: openaiApiKey, // optional API key, default to env property OPENAI_API_KEY
    organization: '' // optional organization
  })

  return openai.chat(openaiApiModel)
}

/**
 * Takes an array of AIMessage and modifies each message where the role is 'tool'.
 * Changes the role to 'assistant' and converts the content to a JSON string.
 * Returns the modified messages as an array of CoreMessage.
 *
 * @param aiMessages - Array of AIMessage
 * @returns modifiedMessages - Array of modified messages
 */
export function transformToolMessages(messages: CoreMessage[]): CoreMessage[] {
  return messages.map(message =>
    message.role === 'tool'
      ? {
          ...message,
          role: 'assistant',
          content: JSON.stringify(message.content),
          type: 'tool'
        }
      : message
  ) as CoreMessage[]
}