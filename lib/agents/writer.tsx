import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { CoreMessage, streamText } from 'ai'
import { AnswerSection } from '@/components/answer-section'
import { getSpecificModel } from '../utils'
import { AGENT_SYSTEM_TEMPLATE } from './prompts'


export async function writer(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  model?: any
) {
  let fullResponse = ''
  let hasError = false
  const streamableAnswer = createStreamableValue<string>('')
  const answerSection = <AnswerSection result={streamableAnswer.value} />
  uiStream.append(answerSection)

  await streamText({
    model: getSpecificModel("anthropic"),
    system: AGENT_SYSTEM_TEMPLATE,
    messages,
    onFinish: event => {
      fullResponse = event.text
      streamableAnswer.done(event.text)
    }
  })
    .then(async result => {
      for await (const text of result.textStream) {
        if (text) {
          fullResponse += text
          streamableAnswer.update(fullResponse)
        }
      }
    })
    .catch(err => {
      hasError = true
      fullResponse = 'Error: ' + err.message
      streamableAnswer.update(fullResponse)
    })

  return { response: fullResponse, hasError }
}
