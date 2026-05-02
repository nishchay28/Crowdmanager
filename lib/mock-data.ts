// Mock data structure - easy to replace with API calls
export const mockQueueData = [
  {
    id: 'counter-a',
    name: 'Counter A',
    length: 5,
    waitTime: 8,
    serviceTime: 1.6, // minutes per person
  },
  {
    id: 'counter-b',
    name: 'Counter B',
    length: 3,
    waitTime: 5,
    serviceTime: 1.67,
  },
  {
    id: 'counter-c',
    name: 'Counter C',
    length: 7,
    waitTime: 12,
    serviceTime: 1.71,
  },
  {
    id: 'counter-d',
    name: 'Counter D',
    length: 4,
    waitTime: 7,
    serviceTime: 1.75,
  },
]

export const mockPredictions = [
  { time: '0 min', waitTime: 8 },
  { time: '1 min', waitTime: 9 },
  { time: '2 min', waitTime: 10 },
  { time: '3 min', waitTime: 9 },
  { time: '4 min', waitTime: 11 },
  { time: '5 min', waitTime: 12 },
  { time: '6 min', waitTime: 10 },
  { time: '7 min', waitTime: 9 },
  { time: '8 min', waitTime: 8 },
  { time: '9 min', waitTime: 7 },
  { time: '10 min', waitTime: 6 },
  { time: '11 min', waitTime: 5 },
  { time: '12 min', waitTime: 4 },
  { time: '13 min', waitTime: 3 },
  { time: '14 min', waitTime: 2 },
]
