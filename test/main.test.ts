import request from 'supertest'

import {backend} from '../src/app'

function add(a: number, b: number) {
  return a + b
}

describe('add function', () => {
  it('should add two numbers', () => {
    expect(add(5, 10)).toBe(15)
  })
})

describe('landing API', () => {
  it('should return OK', done => {
    const app = backend()

    request(app)
      .get('/')
      .end((_err, data) => {
        expect(data.status).toBe(200)
        expect(data.body.status).toBe('OK')

        done()
      })
  })
})
