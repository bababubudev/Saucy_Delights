import asyncHandler from "express-async-handler"
import { queryHandler } from "../db/queryhandler.js"

// @desc Get all users (for now!!)
// @route GET /api/users
// @access Public
const getUsers = asyncHandler(async (req, res) =>
{   
    const queryText='SELECT * FROM users'
    queryHandler(queryText,req,res,'')
})

// @desc Set user 
// @route POST /api/users
// @access Public
//DOESNT WORK FOR NOW LMAO
const setUser = asyncHandler(async (req, res) =>
{   
    if (!(req.body.name||req.body.email)){
        res.status(400)
        throw new Error("Please add a text field")
    }
    const queryText=`INSERT INTO users (email,name,password) VALUES ('${req.body.email}', '${req.body.name}', '${req.body.password}')`
    queryHandler(queryText,req,res,`user ${req.body.email} set`)
})

// @desc Update user 
// @route PUT /api/users/:id
// @access Public
const updateUser = asyncHandler(async (req, res) =>
{
    let queryText=`UPDATE users SET ` 
    queryText+=req.body.email ? `email = '${req.body.email}', ` : ``  
    queryText+=req.body.name ? `name = '${req.body.name}', ` : ``  
    queryText+=req.body.password ? `password = '${req.body.password}', ` : ``
    queryText+=req.body.created_recipes ? `created_recipes = '${req.body.created_recipes}', ` : ``  
    queryText+=req.body.fav_recipes ? `fav_recipes = '${req.body.fav_recipes}', ` : ``  
    queryText+=req.body.comments ? `comments = '${req.body.comments}', ` : ``    
    queryText=queryText.substring(0,queryText.length-2)
    queryText+=` WHERE id=${req.params.id}`

    queryHandler(queryText,req,res,`User with id ${req.params.id} updated`)
})

// @desc Delete user 
// @route DELETE /api/users/:id
// @access Public
const deleteUser = asyncHandler(async (req, res) =>
{
    const queryText=`DELETE FROM users WHERE id=${req.params.id}`
    queryHandler(queryText,req,res,`id ${req.params.id} deleted`)
})

export
{
    getUsers,
    setUser,
    updateUser,
    deleteUser
}