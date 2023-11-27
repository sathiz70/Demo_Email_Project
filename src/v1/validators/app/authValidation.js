'use strict';

const Joi = require('joi');

module.exports = {

  validateSendUserAdd: (input) => {
    const schema = Joi.object().keys({
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      fullName: Joi.string().required(),
      age: Joi.number().required(),
      gender: Joi.string().required(),
      city: Joi.string().required(),
      zipCode: Joi.string().required(),
    });

    return Joi.validate(input, schema);
  },

  

};
