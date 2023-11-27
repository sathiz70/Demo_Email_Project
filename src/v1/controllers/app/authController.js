
'use strict';

const _ = require('lodash');
const User = require('../../../models/User');

// helpers
const { respondSuccess, respondFailure, respondError } = require('../../../helpers/response');
const constValues = require('../../../helpers/constants');
const localesKeys = require('../../../locales/keys.json');
const { validateSendUserAdd } = require('../../validators/app/authValidation');
const { getMessageFromValidationError } = require('../../../helpers/utils');
const EmailHistory = require('../../../models/EmailHistory');
const EmailEmitter = require('../../../helpers/emailEmitter');

module.exports = {

  userRegistration: async (req, res, next) => {
    try {
      const { body, language } = req;
      const { email } = body;

      const { error } = validateSendUserAdd(body);
      if (error) {
        return next(respondError(getMessageFromValidationError(error)));
      }

      const userExist = await User.findOne({ email: email.toLowerCase() });
      if (userExist) {
        return respondFailure(res, req.__(localesKeys.auth.EMAIL_ALREADY_EXISTS, language), constValues.StatusCode.CONFLICT);
      }

      await User(body).save();

      return respondSuccess(res, req.__(localesKeys.global.ADDED_SUCCESSFULLY, language), constValues.StatusCode.CREATED);
    } catch (err) {
      console.log("err",err);
      return arr;
    }
  },

  sendEmail: async (req, res, next) => {
    try {
      const { body,language } = req;
      const { email } = body;

      const emailOptions = { email: email.toLowerCase() };

      const emitter = new EmailEmitter();
      emitter.emit('sendEmail', emailOptions);

      await EmailHistory(body).save();

      return respondSuccess(res, req.__(localesKeys.global.REQUEST_WAS_SUCCESSFULL, language), constValues.StatusCode.CREATED);
    } catch (err) {
      console.log("err",err);
      return arr;
    }
  },

  emailList: async (req, res, next) => {
    try {
      const { body,language } = req;
      const { email } = body;

      const result = await EmailHistory.find();

      return respondSuccess(res, req.__(localesKeys.global.REQUEST_WAS_SUCCESSFULL, language), constValues.StatusCode.OK,result);
    } catch (err) {
      console.log("err",err);
      return arr;
    }
  },

};
