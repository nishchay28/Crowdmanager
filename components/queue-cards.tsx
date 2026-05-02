import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock } from 'lucide-react'

interface Queue {
  id: string
  name: string
  length: number
  waitTime: number
}

interface QueueCardsProps {
  queues: Queue[]
  fastestCounter: Queue
}

export function QueueCards({ queues, fastestCounter }: QueueCardsProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      {queues.map((queue) => {
        const isFastest = queue.id === fastestCounter.id

        return (
          <Card
            key={queue.id}
            className={`p-4 sm:p-6 transition-all ${
              isFastest ? 'border-green-500 border-2 bg-green-50/50 dark:bg-green-950/20' : ''
            }`}
          >
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-sm sm:text-base font-semibold text-foreground'>
                  {queue.name}
                </h3>
                {isFastest && (
                  <Badge className='bg-green-500 hover:bg-green-600'>Fastest</Badge>
                )}
              </div>

              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <span className='text-xs sm:text-sm text-muted-foreground'>People in queue:</span>
                  <span className='text-lg sm:text-xl font-bold text-foreground'>
                    {queue.length}
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <Clock className='w-4 h-4 text-muted-foreground' />
                  <span className='text-xs sm:text-sm text-muted-foreground'>Wait time:</span>
                  <span className='text-base sm:text-lg font-semibold text-foreground'>
                    {queue.waitTime}
                    <span className='text-xs ml-1'>min</span>
                  </span>
                </div>
              </div>

              {isFastest && (
                <div className='flex items-center gap-2 text-green-600 dark:text-green-400 text-xs'>
                  <CheckCircle2 className='w-4 h-4' />
                  <span>Recommended</span>
                </div>
              )}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
