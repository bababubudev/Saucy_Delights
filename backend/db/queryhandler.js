import { pool } from "./dbconfig.js"

pool.connect()

export async function queryHandler(queryText,res)
{   
    try{
    const result = await pool.query(queryText)
    return {flag:true,message:result};
    }
    catch(err){
        return {flag:false,message:err};
    }
    
}