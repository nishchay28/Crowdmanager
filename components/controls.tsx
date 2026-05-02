import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { LogIn, Zap, RotateCw } from 'lucide-react'

type Queue = {
  id: string
  name: string
  waitTime: number
  length: number
}

type ControlsProps = {
  queues: Queue[]
  onJoin: (counterId?: string) => void
  onRefresh: () => void
}

export function Controls({ queues, onJoin, onRefresh }: ControlsProps) {
  const [selectedCounter, setSelectedCounter] = useState(queues[0]?.id || '')

  const handleJoinQueue = () => {
    onJoin(selectedCounter)
  }

  return (
    <Card className='p-4 sm:p-6'>
      <div className='space-y-4'>
        <h2 className='text-lg sm:text-xl font-semibold text-foreground'>Queue Management</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
          {/* Select Counter */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-foreground'>Select Counter</label>
            <Select value={selectedCounter} onValueChange={setSelectedCounter}>
              <SelectTrigger>
                <SelectValue placeholder='Choose counter' />
              </SelectTrigger>
              <SelectContent>
                {queues.map((queue) => (
                  <SelectItem key={queue.id} value={queue.id}>
                    {queue.name} ({queue.waitTime} min)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Join Queue Button */}
          <div className='flex items-end'>
            <Button
              onClick={handleJoinQueue}
              className='w-full bg-green-600 hover:bg-green-700 text-white'
            >
              <LogIn className='w-4 h-4 mr-2' />
              Join Queue
            </Button>
          </div>

          {/* Refresh Prediction */}
          <div className='flex items-end'>
            <Button onClick={onRefresh} variant='secondary' className='w-full'>
              <RotateCw className='w-4 h-4 mr-2' />
              Refresh Prediction
            </Button>
          </div>


        </div>

        <p className='text-xs text-muted-foreground pt-2'>
          💡 Tip: Use the buttons to simulate queue changes and update predictions. These will
          connect to real data via API integration.
        </p>
      </div>
    </Card>
  )
}
