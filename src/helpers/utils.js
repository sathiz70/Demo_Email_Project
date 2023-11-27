'use strict';

const mongoose = require('mongoose');

const otpGenerator = require('otp-generator');
const passwordGenerator = require('secure-random-password');

const { respondFailure } = require('./response');
const constValues = require('./constants');
const localesKeys = require('../locales/keys.json');


module.exports = {

  generateVerificationCode: () => otpGenerator.generate(5, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false }),

  generatePassword: (len) => {
    return passwordGenerator.randomPassword({ characters: [{ characters: passwordGenerator.upper, exactly: 2 }, { characters: passwordGenerator.symbols, exactly: 1 }, passwordGenerator.digits, passwordGenerator.lower], length: len });
  },

  getMessageFromValidationError: (error) => {
    const message = error.details[0].message.replace(/\"/g, '');
    const path = error.details[0].path.join().replace(/0,/g, '').replace(/,/g, '.');
    return message + ', PATH: ' + path;
  },
};
