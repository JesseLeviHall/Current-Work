const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const api = require('./routes/api');

const app = express();

app.use(helmet());

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use('/api', api);

module.exports = app;
