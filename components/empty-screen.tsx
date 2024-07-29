import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const exampleMessages = [
  {
    heading: 'Find me fun things to do in Lisbon tonight',
    message: 'Find me fun things to do in Lisbon tonight',
  },
  {
    heading: 'Tell me a joke',
    message: 'Tell me a joke',
  },
  {
    heading: 'What is the latest on Trump vs Kamala?',
    message: 'What is the latest on Trump vs Kamala?',
  },
  {
    heading: 'Give me advice on open relationships',
    message: 'Give me advice on open relationships',
  }
]
export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
