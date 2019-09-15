import axios from 'axios'

interface BotContext {
  getIP: () => Promise<string>
}

async function Bot(text: string, context: BotContext = defaultContext) {
  if (text.includes('ไอพี')) {
    const ip = await context.getIP()

    return `IP คือ ${ip}`
  }

  return 'Hello'
}

const defaultContext: BotContext = {
  async getIP() {
    const {data: ip} = await axios.get('https://icanhazip.com')

    return ip
  }
}

const mockContext: BotContext = {
  async getIP() {
    return '112.112.112.112'
  }
}

async function main() {
  const response = await Bot('ดูไอพี', mockContext)
  console.log(response)
}

main()
