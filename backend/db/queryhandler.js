import { pool } from "./dbconfig.js"

pool.connect()

export function queryHandler(queryText,req,res,message)
{
    pool.query(queryText)
    .then((result)=>{
        message=message ? message : result.rows
        res.json({message:message})
    })
    .catch(err=>{
        res.status(400)
        res.json({message:err.message})
    })
        

}