import {Request, Response} from 'express'

import {Devices} from './Model'

export async function toggleDeviceHandler(req: Request, res: Response) {
  const {id} = req.params
  if (!id) return res.status(400).send({error: 'Device `id` is required.'})

  const {state} = await Devices.get(id, 'state')
  const nextState = state === 'on' ? 'off' : 'on'

  await Devices.update(id, {state: nextState})

  res.send({success: true, state: nextState})
}
