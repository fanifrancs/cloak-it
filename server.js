const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const flash = require('connect-flash');

dotenv.config();

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user || null;

  // flash the username to the register page on failed registration
  res.locals.username = req.flash('username')[0] || '';

  // flash the message to the send message page on failed message sending
  // res.locals.message = req.flash('message')[0] || '';

  next();
});

// set ejs as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// import routes
const indexRoutes = require('./routes/index');
const testRoutes = require('./routes/test');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const changePasswordRoutes = require('./routes/change-password');
const dashboardRoutes = require('./routes/dashboard');
const messageRoutes = require('./routes/message');

// use the routes
app.use(indexRoutes);
app.use(testRoutes);
app.use(registerRoutes);
app.use(loginRoutes);
app.use(logoutRoutes);
app.use(changePasswordRoutes);
app.use(dashboardRoutes);
app.use(messageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
