const { EventEmitter } = require('events');
const { sendMail } = require('./notification');

class EmailEmitter extends EventEmitter {
  constructor() {
    super();
    this.listen();
  }

  listen = () => {
    this.on('sendEmail', (emailOptions) => {
      process.nextTick(async () => sendMail(emailOptions));
    });
  };
}

module.exports = EmailEmitter;
