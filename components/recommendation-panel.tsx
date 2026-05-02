import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, TrendingUp } from 'lucide-react'

interface Queue {
  id: string
  name: string
  length: number
  waitTime: number
}

interface RecommendationPanelProps {
  fastestCounter: Queue
}

export function RecommendationPanel({ fastestCounter }: RecommendationPanelProps) {
  const suggestedDelay = Math.max(Math.floor(fastestCounter.waitTime / 2), 0)

  return (
    <Card className='border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30 p-4 sm:p-6'>
      <div className='space-y-4'>
        <div className='flex items-start gap-3'>
          <TrendingUp className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0' />
          <div>
            <h3 className='text-base sm:text-lg font-semibold text-foreground'>
              Recommended Counter
            </h3>
            <p className='text-xs sm:text-sm text-muted-foreground mt-1'>
              Go to this counter for the shortest wait
            </p>
          </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2'>
          <div className='sm:col-span-1'>
            <p className='text-xs text-muted-foreground uppercase tracking-wide'>Counter</p>
            <Badge className='mt-1 bg-blue-600 hover:bg-blue-700 text-white'>
              {fastestCounter.name}
            </Badge>
          </div>

          <div>
            <p className='text-xs text-muted-foreground uppercase tracking-wide'>Wait Time</p>
            <p className='mt-1 text-lg sm:text-xl font-bold text-foreground'>
              {fastestCounter.waitTime}
              <span className='text-xs ml-1'>min</span>
            </p>
          </div>

          <div>
            <p className='text-xs text-muted-foreground uppercase tracking-wide'>Go In</p>
            <p className='mt-1 text-lg sm:text-xl font-bold text-foreground'>
              {suggestedDelay}
              <span className='text-xs ml-1'>min</span>
            </p>
          </div>
        </div>

        {suggestedDelay > 0 && (
          <div className='flex items-start gap-2 text-xs sm:text-sm text-blue-700 dark:text-blue-300 pt-2 border-t border-blue-200 dark:border-blue-900'>
            <AlertCircle className='w-4 h-4 mt-0.5 flex-shrink-0' />
            <span>
              Wait {suggestedDelay} minutes to reduce the current wait time from{' '}
              <strong>{fastestCounter.waitTime}</strong> to approximately{' '}
              <strong>{Math.max(fastestCounter.waitTime - suggestedDelay, 0)}</strong> minutes.
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}
