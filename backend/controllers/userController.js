import asyncHandler from "express-async-handler"
import { queryHandler } from "../db/queryhandler.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// @desc Log in user with email and password
// @route GET /api/users
// @access Public
const loginUser = asyncHandler(async (req, res) =>
{
    const queryText = `SELECT email, name, password FROM users WHERE email='${req.body.email}'`
    if (queryText.includes(";")) return res.status(400).send({ message: "Query got damaged" })
    let result = await queryHandler(queryText)
    if (result.flag === false) res.status(500).send({ message: result.message.message, stack: process.env.NODE_ENV == "development" ? result.message.stack : 0 })
    else 
    {
        if (!result.message.rows[0]) res.send({ message: "invalid credentials" })
        else
        {
            let passwordFromDB = result.message.rows[0].password
            delete result.message.rows[0].password;
            if ((passwordFromDB) && (await bcrypt.compare(req.body.password, passwordFromDB)))
            {
                const accesstoken = await generateToken(req.body.email, req.body.remembered)
                res.send({ user: result.message.rows[0], token: accesstoken })
            }
            else
                res.send({ message: "invalid credentials" })
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
    if (queryText.includes(";")) return res.status(400).send({ message: "Query got damaged" })
    let result = await queryHandler(queryText)

    if (!result.flag) res.status(500).send({ message: result.message.message, stack: process.env.NODE_ENV == "development" ? result.message.stack : 0 })
    else 
    {
        const user = { "email": req.body.email, "name": req.body.name }
        const accesstoken = await generateToken(req.body.email, false)
        res.send({ user: user, token: accesstoken })
    }
})

// @desc Update user 
// @route PUT /api/users
// @access Private
const updateUser = asyncHandler(async (req, res) =>
{   
    let flag=false
    const salt = await bcrypt.genSalt(10)
    let email = req.user.email
    let password
    if (req.body.password) 
        password = await bcrypt.hash(req.body.password, salt)

    let queryText = `UPDATE users SET `
    queryText += req.body.email ? `email = '${req.body.email}', ` : ``
    queryText += req.body.name ? `name = '${req.body.name}', ` : ``
    queryText += password ? `password = '${password}', ` : ``
    queryText = queryText.substring(0, queryText.length - 2)
    queryText += ` WHERE email='${email}'`
    if (queryText.includes(";")) return res.status(400).send({message:"Query got damaged"})
    else if (!(queryText.substring(0,21)=="UPDATE users SE WHERE"))
    {
        flag=true
        let result = await queryHandler(queryText)
        if (result.flag === false) res.status(500).send({ message: result.message.message, stack: process.env.NODE_ENV == "development" ? result.message.stack : 0 })
        else res.send({ message: `User with email ${email} updated` })
    }

    if (req.body.recipe){
        let result = await userRelationshipCheck("recipe",req.body.recipe,req.user.id)
        if (result.flag===true) flag=true
        else return res.status(500).send({ message: result.message.message, stack: process.env.NODE_ENV == "development" ? result.message.stack : 0 })
        
    }
    if (req.body.feedback){
        let result = await userRelationshipCheck("feedback",req.body.feedback,req.user.id)
        if (result.flag===true) flag=true
        else return res.status(500).send({ message: result.message.message, stack: process.env.NODE_ENV == "development" ? result.message.stack : 0 })
        
    }
    if (!flag)
        res.status(500).send({ message: "Nothing to change", stack: 0 })
    else
        res.send({ message: `User with email ${email} updated` })
})

// @desc Delete user 
// @route DELETE /api/users
// @access Private
const deleteUser = asyncHandler(async (req, res) =>
{
    let email = req.user.email
    let queryText = `DELETE FROM users WHERE email='${email}'`
    if (queryText.includes(";")) return res.status(400).send({ message: "Query got damaged" })
    queryText=`DELETE FROM user_feedback WHERE user_id=${req.user.id} AND table_relation=false;DELETE FROM user_recipe WHERE user_id=${req.user.id} AND table_relation=false;`+queryText
    let result = await queryHandler(queryText)
    console.log(queryText)
    console.log(result)
    if (result.flag === false) res.status(500).send({ message: result.message.message, stack: process.env.NODE_ENV == "development" ? result.message.stack : 0 })
    else res.send({ message: `User with email ${email} deleted` })
})

// @desc Get user info by token
// @route GET /api/users/me
// @access Private
const getUser = asyncHandler(async (req, res) =>
{
    const queryText = `SELECT email, name FROM users WHERE email='${req.user.email}'`
    if (queryText.includes(";")) return res.status(400).send({ message: "Query got damaged" })
    let result = await queryHandler(queryText)
    if (result.flag === false) res.status(500).send({ message: result.message.message, stack: process.env.NODE_ENV == "development" ? result.message.stack : 0 })
    else 
    {
        res.send({ message: result.message.rows[0] })
    }
})

const generateToken = async (email, remembered) =>
{
    if (!remembered) return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" })
    return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET)
}

const userRelationshipCheck= async (table, index,user_id) =>    
{   
    let queryText=`SELECT FROM user_${table} WHERE user_id=${user_id} AND ${table}_id=${index}`
    if (queryText.includes(";")) return res.status(400).send({ message: "Query got damaged" })
    let result = await queryHandler(queryText)
    if (result.message.rowCount==0)
        queryText=`INSERT INTO user_${table} (user_id,${table}_id,table_relation) VALUES (${user_id},${index},FALSE)`
    else 
        queryText=`DELETE FROM user_${table} WHERE user_id=${user_id} AND ${table}_id=${index}`
    result = await queryHandler(queryText)
    return result
}

export
{
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    getUser
}
