import {Bot} from '../src/Bot'
import {mockContext} from '../src/MockContext'

describe('chatbot', () => {
  it('should say hello to me back', async () => {
    const response = await Bot('hello', mockContext)

    expect(response).toBe('สวัสดีชาวโลก 🌏')
  })

  it('should get IP from the API', async () => {
    const response = await Bot('ขอ IP หน่อย', mockContext)

    expect(response).toBe('IP คือ 112.44.112.44')
  })

  it('should record 9000 THB of book transaction', async () => {
    const response = await Bot('b9000', mockContext)

    expect(response).toBe('ซื้อหนังสือ 9000 บาท')
  })

  it('should get the maid cafe best seller', async () => {
    const response = await Bot('maid cafe best seller', mockContext)

    expect(response).toBe('kuma dreamin')
  })
})
