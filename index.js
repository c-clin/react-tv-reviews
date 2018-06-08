const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose
  .connect(keys.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error));

// app is the underline running express server
const app = express();

// tell express to use cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // cookies expire in 30 days
    keys: [keys.cookieKey]
  })
);

// tell passport to use the cookies
app.use(passport.initialize());
app.use(passport.session());

// call the authRoutes file with app
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
