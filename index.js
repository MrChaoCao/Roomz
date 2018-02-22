const express = require('express');
// const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

const User = require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
let numOfProcessedRequests = 0;

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// tells passport to make use of cookies to handle auth
app.use(passport.initialize());
app.use(passport.session());

// we export a function, with which we pass in app
require('./routes/authRoutes')(app);
//
// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


// Use the session middleware
app.use(express.static('frontend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use below to store the session in some server separate from the cookie
// app.use(session({
//   secret: 'YOURSECRET',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 30 * 60 * 1000
//   }
// }));

// ADRIAN COMMENT
// I don't know if we want this here. This might be what heroku is reading
// app.get('/', (req, res) => {
//   numOfProcessedRequests++;
//   console.log(`Server has processed ${numOfProcessedRequests} requests!`);
//   res.send(`Server has processed ${numOfProcessedRequests} requests!`);
//   // res.sendFile(path.join(__dirname, '/frontend/react_index.html'));
// });

// Run local server on port 5000.
const port = process.env.PORT || 5000;
const server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
