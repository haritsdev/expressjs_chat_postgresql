const express = require('express');
const app = express();
const http = require('http');
const ip = require('ip');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
/**
 *
 * Routes
 */

const users = require('./routes/usersRoutes');

const PORT = process.env.PORT || 3003;

app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disabled('x-powered-by');
app.set(`port`, PORT);

/**
 * USES OF ROUTES
 */
users(app);

server.listen(PORT, () => {
  console.log(`Server is running on  http:// 192.168.43.12
:${PORT} `);
});

app.get('/', (req, res) => {
  res.send(`Route of backend`);
});

app.get('/test', (req, res) => {
  res.send('this is route of test');
});

//ERROR handle
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.status);
});

module.exports = {
  app: app,
  server: server,
};
