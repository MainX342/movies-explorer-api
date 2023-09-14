require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/rateLimiter');

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb';

const app = express();

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(port);
