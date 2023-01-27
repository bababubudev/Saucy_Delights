import pg from "pg";
import dotenv from "dotenv"
const { Pool } = pg;
dotenv.config()

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "recipes",
  password: process.env.DB_PASSWORD
})

export function query(text,params)
{
    pool.query(text,params)
}

