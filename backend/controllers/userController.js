import asyncHandler from "express-async-handler"
import { queryHandler } from "../db/queryhandler.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// @desc Log in user with email and password
// @route GET /api/users
// @access Public
const loginUser = asyncHandler(async (req, res) =>
{
    const queryText = `SELECT email, name, created_recipes, fav_recipes, comments, password FROM users WHERE email='${req.body.email}'`
    if (queryText.includes(";")) return res.status(400).send({message:"Query got damaged"})
    let result = await queryHandler(queryText)
    if (result.flag === false) res.status(500).send({ message: result.message.message, stack: process.env.NODE_ENV == "development" ? result.message.stack : 0 })
    else 
    {   
        if (!result.message.rows[0]) res.send({message:"invalid credentials"})
        else
        {
            let passwordFromDB=result.message.rows[0].password
            delete result.message.rows[0].password;
            if ((passwordFromDB)&&(await bcrypt.compare(req.body.password,passwordFromDB)))
            {
                const accesstoken=await generateToken(req.body.email,req.body.remembered)
                res.send({ user:result.message.rows[0],token:accesstoken})
            }
            else    
                res.send({message:"invalid credentials"})
        }
    }
})

// @desc Set user 
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) =>
{
    if (!(req.body.name || req.body.email || req.body.password))
    {
        res.status(400)
        throw new Error("Not enough values")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const queryText = `INSERT INTO users (email,name,password) VALUES ('${req.body.email}', '${req.body.name}', '${hashedPassword}')`
    if (queryText.includes(";")) return res.status(400).send({message:"Query got damaged"})
    let result = await queryHandler(queryText)

    if (!result.flag) res.status(500).send({ message: result.message.message, stack: process.env.NODE_ENV == "development" ? result.message.stack : 0 })
    else 
    {   
        const user={"email":req.body.email,"name":req.body.name,"created_recipes":null,"fav_recipes":null,"comment":null}
        const accesstoken=await generateToken(req.body.email,false)
        res.send({ user:user,token:accesstoken})
    }
})

// @desc Update user 
// @route PUT /api/users
// @access Private
const updateUser = asyncHandler(async (req, res) =>
{
    let email=req.user.email
    let queryText = `UPDATE users SET `
    queryText += req.body.email ? `email = '${req.body.email}', ` : ``
    queryText += req.body.name ? `name = '${req.body.name}', ` : ``
    queryText += req.body.password ? `password = '${req.body.password}', ` : ``
    queryText += req.body.created_recipes ? `created_recipes = array_append(created_recipes,'${req.body.created_recipes}'), ` : ``
    queryText += req.body.fav_recipes ? `fav_recipes = array_append(fav_recipes,'${req.body.fav_recipes}'), ` : ``
    queryText += req.body.comments ? `comments = array_append(comments,'${req.body.comments}'), ` : ``
    queryText = queryText.substring(0, queryText.length - 2)
    queryText += ` WHERE email='${email}'`
    console.log(queryText)
    if (queryText.includes(";")) return res.status(400).send({message:"Query got damaged"})
    let result = await queryHandler(queryText)
    if (result.flag === false) res.status(500).send({ message: result.message.message, stack: process.env.NODE_ENV == "development" ? result.message.stack : 0 })
    else res.send({ message: `User with email ${email} updated` })
})

// @desc Delete user 
// @route DELETE /api/users
// @access Private
const deleteUser = asyncHandler(async (req, res) =>
{   
    let email=req.user.email
    const queryText = `DELETE FROM users WHERE email='${email}'`
    if (queryText.includes(";")) return res.status(400).send({message:"Query got damaged"})
    let result = await queryHandler(queryText)

    if (result.flag === false) res.status(500).send({ message: result.message.message, stack: process.env.NODE_ENV == "development" ? result.message.stack : 0 })
    else res.send({ message: `User with email ${email} deleted` })
})

// @desc Get user info by token
// @route GET /api/users/me
// @access Private
const getUser = asyncHandler(async (req, res) =>
{
    const queryText = `SELECT email, name, created_recipes, fav_recipes, comments FROM users WHERE email='${req.user.email}'`
    if (queryText.includes(";")) return res.status(400).send({message:"Query got damaged"})
    let result = await queryHandler(queryText)
    if (result.flag === false) res.status(500).send({ message: result.message.message, stack: process.env.NODE_ENV == "development" ? result.message.stack : 0 })
    else 
    {   
        res.send({message:result.message.rows[0]})
    }
})

const generateToken = async (email,remembered)=>{
    if (!remembered) return jwt.sign({email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"10m"})
    return jwt.sign({email},process.env.ACCESS_TOKEN_SECRET)
}

export
{
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    getUser
}
