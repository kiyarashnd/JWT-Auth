require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvent');
const credentials = require('./middleware/credentials');

const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const errorHandler = require('./middleware/errorHandler');
const verifyJwt = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500;

//Connect to MongoDB
connectDB();

app.use(logger);

//Handle options credentials check - before CORS!
//and fetch cookies credentials requirement
app.use(credentials);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built-in middleware to handle URLencoded form data
//for when data is submited
app.use(express.urlencoded({ extended: false })); //this line applies for all below http method

//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static file
app.use('/', express.static(path.join(__dirname, '/public'))); //for apply css and image file in public folder
//for apply statics file to subdir directory
// app.use('/subdir', express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));

app.use('/register', require('./routes/api/register'));
app.use('/auth', require('./routes/api/auth'));
app.use('/refresh', require('./routes/api/refresh'));
app.use('/logout', require('./routes/api/logout'));

// app.use('/subdir', require('./routes/subdir'));
app.use(verifyJwt);
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on prot ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
