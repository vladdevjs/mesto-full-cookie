const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes/index');
const handleError = require('./middlewares/handleError');
const crashTest = require('./middlewares/crashTest');
const documentNotFound = require('./middlewares/documentNotFound');
const { port, mongoURI } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(
  cors({
    origin: ['http://vladdevs.nomoreparties.sbs/', 'https://vladdevs.nomoreparties.sbs/'],
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.get('/crash-test', crashTest);
app.use(routes);
app.use('*', documentNotFound);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Прослушиваю порт ${port}`);
});
