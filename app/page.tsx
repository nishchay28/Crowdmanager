'use client'

import { useState, useEffect } from 'react'
import { QueueCards } from '@/components/queue-cards'
import { RecommendationPanel } from '@/components/recommendation-panel'
import { PredictionChart } from '@/components/prediction-chart'
import { Controls } from '@/components/controls'
import { Card } from '@/components/ui/card'

// ---------------- TYPES ----------------
type Queue = {
  id: string
  name: string
  waitTime: number
  length: number
}

type Prediction = {
  time: number
  waitTime: number
}

export default function Dashboard() {
  const BASE_URL = "http://127.0.0.1:5000"

  const [queues, setQueues] = useState<Queue[]>([])
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)

  // ---------------- FETCH STATUS ----------------
  async function fetchStatus() {
    const res = await fetch(`${BASE_URL}/status`)
    const data = await res.json()

    const formatted: Queue[] = Object.entries(data).map(([key, value]) => ({
      id: key,
      name: key.replace("_", " ").toUpperCase(),
      waitTime: Math.ceil((value as number) / 60),
      length: Math.ceil((value as number) / 30)
    }))

    setQueues(formatted)
  }

  // ---------------- FETCH PREDICTION ----------------
  async function fetchPrediction() {
    const res = await fetch(`${BASE_URL}/predict`)
    const data = await res.json()

    const formatted: Prediction[] = data.map((point: any) => {
    const waits = Object.values(point.wait_times) as number[]
const minWait = Math.min(...waits)

return {
  time: point.time / 60,
  waitTime: Math.ceil(minWait / 60)
}
    })

    setPredictions(formatted)
  }

  // ---------------- JOIN QUEUE ----------------
  async function handleJoinQueue(counterId?: string) {
    await fetch(`${BASE_URL}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(counterId ? { counter: counterId } : {})
    })

    await refreshAll()
  }

  // ---------------- REFRESH ----------------
  async function refreshAll() {
    await fetchStatus()
    await fetchPrediction()
  }

  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    async function load() {
      await refreshAll()
      setLoading(false)
    }
    load()
  }, [])

  // ---------------- AUTO REFRESH ----------------
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStatus()
      fetchPrediction()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // ---------------- FASTEST COUNTER ----------------
  const fastestCounter: Queue =
    queues.length > 0
      ? queues.reduce((prev, current) =>
          prev.waitTime < current.waitTime ? prev : current
        )
      : {
          id: '',
          name: '',
          waitTime: 0,
          length: 0
        }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Mess Queue Optimizer</h1>
          <p className="text-muted-foreground">
            Live wait time & recommendations
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        <RecommendationPanel fastestCounter={fastestCounter} />

        <QueueCards
          queues={queues}
          fastestCounter={fastestCounter}
        />

        <Card className="p-4">
          <PredictionChart data={predictions} />
        </Card>

        <Controls
          queues={queues}
          onJoin={handleJoinQueue}
          onRefresh={refreshAll}
        />

      </div>
    </main>
  )
}