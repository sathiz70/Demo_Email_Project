'use strict';
const express = require('express');
const app = express();
const path = require('path');
const { I18n } = require('i18n');

// passport
require('../../helpers/passport');

// locales
const i18n = new I18n({
  locales: ['en', 'de'],
  directory: path.join(__dirname, '../../locales'),
});

app.use(i18n.init);

// routes
const appAuthRoute = require('./app/authRoute');

// app routes
app.use('/app/auth', appAuthRoute); // app auth


// default route
app.use('/', (_req, res, _next) => { res.send({ success: true, message: 'URL not found.' }); }); // default Route

module.exports = app;
