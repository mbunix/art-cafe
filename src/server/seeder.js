import dotenv from 'dotenv'
import colors from 'colors'
import sql from 'mssql'
import users from './data/users.js'
import artwork from './data/artwork.js'
import UserModel from '../server/database/models/userModels'
import Artwork from '../server/database/models/artworkModels'
import Order from './database/models/orderModels.js'
import connectDB from './database/connection'

dotenv.config()

connectDB()

async function seedDatabase () {
  try {
    // Connect to database
    await sql.connect({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_SERVER,
      database: process.env.DB_DATABASE
    })

    // Clear existing data
    await Promise.all([
      users.destroy({ truncate: true }),
      artwork.destroy({ truncate: true })
    ])

    // Insert seed data
    const createdUsers = await users.bulkCreate(users)

    const adminUser = createdUsers[0].id

    const sampleProducts = artwork.map(artwork   => {
      return { ...artwork, userId: adminUser }
    })

    await Artwork.bulkCreate(sampleProducts)

    console.log('Data Imported!'.green.inverse)
  } catch (error) {
    console.error(`${error}`.red.inverse)
  } finally {
    // Disconnect from database
    await sql.close()
  }
}

async function clearDatabase () {
  try {
    // Connect to database
    sql.connect({
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          server: process.env.DB_SERVER,
          database: process.env.DB_DATABASE
      })

    // Clear existing data
    await Promise.all([
      users.destroy({ truncate: true }),
      artwork.destroy({ truncate: true })
    ])

    console.log('Data Destroyed!'.red.inverse)
  } catch (error) {
    console.error(`${error}`.red.inverse)
  } finally {
    // Disconnect from database
    await sql.close()
  }
}

// Run script based on command line arguments
if (process.argv[2] === '-d') {
  clearDatabase()
} else {
  seedDatabase()
}
