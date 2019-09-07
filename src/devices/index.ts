import {BadRequest} from '@feathersjs/errors'

import {Devices} from './Model'
import {Device} from './type'

export class DeviceService {
  async find() {
    const devices: Device[] = await Devices.findAll()

    return {data: devices}
  }

  async get(id: string) {
    if (!id) throw new BadRequest('Device `id` is required.')

    const device: Device = await Devices.get(id)

    return {data: device}
  }

  async create(data: Partial<Device>) {
    const {displayName, color, type, state} = data

    if (!displayName || !color || !type || !state) {
      throw new BadRequest(
        'Field `id, displayName, color, type, state` are required.',
      )
    }

    const device = {displayName, color, type, state}
    const result = await Devices.create(device)

    return {success: true, result}
  }

  async update(id: string, data: Partial<Device>) {
    if (!id) throw new BadRequest('Device `id` is required.')

    const result = await Devices.update(id, data)

    return {success: true, data, result}
  }

  async remove(id: string) {
    if (!id) throw new BadRequest('Device `id` is required.')

    await Devices.delete(id)

    return {success: true}
  }
}
