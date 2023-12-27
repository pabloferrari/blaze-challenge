require('dotenv').config();

const PORT = (process.env.PORT || '3001');
const DB_USERNAME = (process.env.DB_USERNAME || '')
const DB_PASSWORD = (process.env.DB_PASSWORD || '')
const DB_NAME = (process.env.DB_NAME || '')
const DB_PORT = (process.env.DB_PORT || '')
const DB_HOST = (process.env.DB_HOST || '')
const API_KEY = (process.env.API_KEY || '')

module.exports = {
    PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    DB_HOST,
    API_KEY
}