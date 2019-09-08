import Joi from '@hapi/joi'

export const DeviceSchema = Joi.object().keys({
  id: Joi.number(),
  // name: Joi.string().required(),
  state: Joi.string().required(),
  type: Joi.string().required(),
  location: Joi.string().required(),
  color: Joi.string().required(),
})
