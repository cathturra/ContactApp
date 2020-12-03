const { Pool } = require('pg')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

// === PRODUCTION === //
const isProduction = process.env.NODE_ENV === 'production'
const productionDB = process.env.DATABASE_URL

// === DEVELOPMENT === //
const developmentDB = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

// === DB CONNECTION === //
const pool = new Pool({
  connectionString: isProduction ? productionDB : developmentDB,
  ssl: isProduction,
})