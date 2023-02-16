import { pool } from "./dbconfig.js"

pool.connect()

export async function queryHandler(queryText, params)
{
    try
    {
        const result = await pool.query(queryText, params)
        return { flag: true, message: result }
    }
    catch (err)
    {
        return { flag: false, message: err }
    }

}