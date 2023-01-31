import pg from "pg";
import dotenv from "dotenv"
const { Pool } = pg;
dotenv.config()

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "sausy_data",
  password: process.env.DB_PASSWORD
})

