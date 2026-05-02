import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type PredictionData = {
  time: number   // ✅ FIX
  waitTime: number
}

interface PredictionChartProps {
  data: PredictionData[]
}

export function PredictionChart({ data }: PredictionChartProps) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' stroke='var(--border)' />
        <XAxis
          dataKey='time'
          tick={{ fontSize: 12 }}
          stroke='var(--muted-foreground)'
        />
        <YAxis
          label={{ value: 'Wait Time (min)', angle: -90, position: 'insideLeft' }}
          tick={{ fontSize: 12 }}
          stroke='var(--muted-foreground)'
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '0.5rem',
          }}
          labelStyle={{ color: 'var(--foreground)' }}
          formatter={(value: number) => [`${value} min`, 'Wait Time']}
        />
        <Line
          type='monotone'
          dataKey='waitTime'
          stroke='#3b82f6'
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
