import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import { queryHandler } from "../db/queryhandler.js"

export const protect = asyncHandler( async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        try{
            token=req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const queryText = `SELECT email, name, created_recipes, fav_recipes, comments FROM users WHERE email='${decoded.email}'`
            let result = await queryHandler(queryText)
            if (result.flag) 
            {
                req.user=result.message.rows[0]
                if(req.user) next()
                else res.send({message:"Not authorized"})  
                
            }
            else res.send({message:"Not authorized"})  
            
        } catch (err)
        {   
            console.log(err)
            res.status(401)
            res.send({message:"Not authorized"})
        }
    }
    if (!token)
        res.status(401).send({message:"Not authorized no token"})
})