import asyncHandler from "express-async-handler"
import { queryHandler } from "../db/queryhandler.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// @desc Log in user with name and password
// @route GET /api/users
// @access Public
const loginUser = asyncHandler(async (req, res) =>
{
    const queryText = `SELECT email, name, fav_recipes, password FROM users WHERE name='${req.body.name}'`
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
                const accesstoken = await generateToken(req.body.name, req.body.remembered)
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
        let updated =await queryHandler(`UPDATE users SET fav_recipes='{}' WHERE name='${req.body.name}'`)
        if (!updated.flag) {
            await queryHandler(`DELETE FROM users WHERE name='${req.body.name}'`)
            res.status(500).send({ message: updated.message.message, stack: process.env.NODE_ENV == "development" ? updated.message.stack : 0 })
        }
        else 
        {
            const user = { "email": req.body.email, "name": req.body.name, "fav_recipes": null}
            const accesstoken = await generateToken(req.body.name, false)
            res.send({ user: user, token: accesstoken })
        }
        
    }
})

// @desc Update user 
// @route PUT /api/users
// @access Private
const updateUser = asyncHandler(async (req, res) =>
{
    let name = req.user.name
    let queryText = `UPDATE users SET `
    if (req.body.email)
    queryText += req.body.email ? `email = '${req.body.email}', ` : ``
    if (req.body.password)
    {   
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        queryText += req.body.password ? `password = '${hashedPassword}', ` : ``
    }
    

    if (!(req.user.fav_recipes.includes(req.body.fav_recipes)))
            queryText += req.body.fav_recipes? `fav_recipes = array_append(fav_recipes,'${req.body.fav_recipes}'), ` : ``
    else
        queryText += req.body.fav_recipes ? `fav_recipes = array_remove(fav_recipes,'${req.body.fav_recipes}'), ` : ``

    queryText = queryText.substring(0, queryText.length - 2)
    queryText += ` WHERE name='${name}'`
    if (queryText.includes(";")) return res.status(400).send({message:"Query got damaged"})
    let result = await queryHandler(queryText)
    if (result.flag === false) res.status(500).send({ message: result.message.message, stack: process.env.NODE_ENV == "development" ? result.message.stack : 0 })
    else res.send({ message: `User with name ${name} updated` })
})

// @desc Delete user 
// @route DELETE /api/users
// @access Private
const deleteUser = asyncHandler(async (req, res) =>
{
    let name = req.user.name
    const queryText = `DELETE FROM users WHERE name='${name}'`
    if (queryText.includes(";")) return res.status(400).send({ message: "Query got damaged" })
    let result = await queryHandler(queryText)

    if (result.flag === false) res.status(500).send({ message: result.message.message, stack: process.env.NODE_ENV == "development" ? result.message.stack : 0 })
    else res.send({ message: `User with name ${name} deleted` })
})

// @desc Get user info by token
// @route GET /api/users/me
// @access Private
const getUser = asyncHandler(async (req, res) =>
{
    const queryText = `SELECT email, name, fav_recipes FROM users WHERE name='${req.user.name}'`
    if (queryText.includes(";")) return res.status(400).send({ message: "Query got damaged" })
    let result = await queryHandler(queryText)
    if (result.flag === false) res.status(500).send({ message: result.message.message, stack: process.env.NODE_ENV == "development" ? result.message.stack : 0 })
    else 
    {
        res.send({ message: result.message.rows[0] })
    }
})

const generateToken = async (name, remembered) =>
{
    if (!remembered) return jwt.sign({ name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" })
    return jwt.sign({ name }, process.env.ACCESS_TOKEN_SECRET)
}

export
{
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    getUser
}
