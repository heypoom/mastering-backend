import Joi from '@hapi/joi'

export const DeviceSchema = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required(),
  state: Joi.string().required(),
  type: Joi.string().required(),
  location: Joi.string().required(),
  color: Joi.string().required(),
})

const device = {
  id: 3,
  name: 'Backyard Light',
  state: 'on',
  type: 'lamp',
  location: 'Backyard',
  color: 'red',
}

async function main() {
  await DeviceSchema.validate(device)
}

main()
