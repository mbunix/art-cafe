const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'mssql', // Set the dialect to 'mssql' for SQL Server
  host: 'localhost', // Replace with your database host
  port: 1433, // Replace with your database port
  username: 'your_username', // Replace with your database username
  password: 'your_password', // Replace with your database password
  database: 'your_database', // Replace with your database name
  dialectOptions: {
    options: {
      encrypt: true // Enable encryption if needed
    }
  }
})

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.')
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error)
  })

module.exports = sequelize
