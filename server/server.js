require('./config/config');
const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

const router = require('./routers');
const { errorLogger, requestLogger } = require('./system/httpLog');

const app = express();
const port = process.env.PORT;

app.use(requestLogger);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(expressValidator());

app.use('/', router);

app.use(errorLogger);

// Start app
app.listen(port, () => {
  console.log(`Started at the port ${port}`);
});

module.exports = { app };
