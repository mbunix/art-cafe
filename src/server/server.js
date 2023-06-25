import app from './app.js'
import PORT from '../database/connection.js'

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
