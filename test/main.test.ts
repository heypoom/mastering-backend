import request from 'supertest'

import {backend} from '../src/backend'

describe('name endpoint', () => {
  it('should list the correct names', done => {
    const app = backend()

    request(app)
      .get('/names')
      .end((_err, res) => {
        expect(res.body.data.includes('A')).toBe(true)

        done()
      })
  })
})
