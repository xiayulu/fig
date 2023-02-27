import pino from 'pino'
import dayjs from 'dayjs'

const logger = pino({
  transport: { // pino 7.x的写法有所不同
    target: 'pino-pretty',
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
})

export default logger;