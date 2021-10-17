const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');

// Loading Env Vars
dotenv.config({ path: './config/config.env' });

// Route Files
const auth = require('./routes/auth');

// Initialising Express Constructor
const app = express();

// Body Parser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello');
});

// Development logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ================Mount routes=====================
app.use('/api/v1/auth', auth);

// =================================================

// Error handler middleware (Should be after mounting routes as otherwise it will not be able to
// errors otherwise)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// Connect to Database & starting server
connectDB().then(() => {
  const server = app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
        .bold
    )
  );
});

// Handel unhandelled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error : ${err.message}`);
  // Close Server & Exit process
  server.close(() => process.exit(1));
});
