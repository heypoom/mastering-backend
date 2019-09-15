import {Bot} from '../src/Bot'
import {buildMockContext} from '../src/MockContext'

describe('chatbot', () => {
  it('should say hello to me back', async () => {
    const response = await Bot('hello', buildMockContext())

    expect(response).toBe('สวัสดีชาวโลก 🌏')
  })

  it('should get IP from the API', async () => {
    const response = await Bot('ขอ IP หน่อย', buildMockContext())

    expect(response).toBe('IP คือ 112.44.112.44')
  })

  it('should record 9000 THB of book transaction', async () => {
    const response = await Bot('b9000', buildMockContext())

    expect(response).toBe('ซื้อหนังสือ 9000 บาท')
  })

  it('should get the maid cafe best seller', async () => {
    const response = await Bot('maid cafe best seller', buildMockContext())

    expect(response).toBe('kuma dreamin')
  })

  it('should get the total amount purchased', async () => {
    const ctx = buildMockContext()

    await Bot('b9000', ctx)

    await Bot('b1000', ctx)

    const response = await Bot('ซื้อหนังสือไปแล้วกี่บาท', ctx)

    expect(response).toBe('ซื้อหนังสือไป 10000 บาท')
  })
})
