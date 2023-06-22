const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const artworkRoutes = require('./routes/artworkRoutes');
const nftRoutes = require('./routes/nftRoutes');
const errorHandler = require('../server/utils/errorhandler');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/artwork', artworkRoutes);
app.use('/api/nft', nftRoutes);

// Error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
z