const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.set('trust proxy', 1);
}

app.disable('x-powered-by');

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  // Save only sessions that actually store data such as auth or flash state.
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction,
    maxAge: 60 * 60 * 1000
  }
};

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));

app.use(flash());

app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user || null;

  // flash the username to the register page on failed registration
  res.locals.username = req.flash('username')[0] || '';

  next();
});

// set ejs as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
