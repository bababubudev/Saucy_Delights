import asyncHandler from "express-async-handler"
import { queryHandler } from "../db/queryhandler.js"

const getAllRecipes = asyncHandler(async (req, res) =>
{
    const queryText = `SELECT * FROM recipes;`

    const result = await queryHandler(queryText)
    if (result.flag === false)
    {
        res.status(500).send({
            message: result.message.message,
            stack: process.env.NODE_ENV == "development" ? result.message.stack : 0
        })
    }
    else
    {
        res.send({ message: result.message.rows })
    }
})

const getRecipe = asyncHandler(async (req, res) =>
{
    const id = req.params.id
    const queryText = `SELECT * FROM recipes WHERE id=$1;`

    const result = await queryHandler(queryText, [id])
    if (result.flag === false)
    {
        res.status(500).send({
            message: result.message.message,
            stack: process.env.NODE_ENV == "development" ? result.message.stack : 0
        })
    }
    else
    {
        res.send({ message: result.message.rows[0] })
    }

})

const postRecipe = asyncHandler(async (req, res) =>
{
    const recipeObj = req.body
    const recipeKeys = Object.keys(recipeObj)
    const recipeValues = Object.values(recipeObj)

    const requiredFields = ["recipe_name", "description", "ingr", "difficulty"]

    // NOTE: This validation can be worked on more!
    const isValidObj = requiredFields.every(key => recipeKeys.includes(key)) && recipeKeys.every(key => recipeObj[key] != "")

    if (!isValidObj)
    {
        res.status(400)
        throw new Error("Please fill in the required fields!")
    }

    const queryIndices = recipeValues.map(value => `$${recipeValues.findIndex(elem => elem == value) + 1}`).join(',')
    const queryText = `INSERT INTO recipes (${recipeKeys}) VALUES (${queryIndices}) RETURNING *;`

    const result = await queryHandler(queryText, recipeValues)

    if (result.flag === false)
    {
        res.status(500).send({
            message: result.message.message,
            stack: process.env.NODE_ENV === "development" ? result.message.stack : 0
        })
    }
    else
    {
        res.send({ message: result.message.rows[0] })
    }
})

const updateRecipe = asyncHandler(async (req, res) =>
{
    const unchangeables = ["id", "created_at"]
    const result = await queryHandler(`SELECT * FROM recipes WHERE id=$1;`, [req.params.id])

    if (result.flag === false)
    {
        return res.status(500).send({
            message: result.message.message,
            stack: process.env.NODE_ENV == "development" ? result.message.stack : 0
        })
    }

    const queryData = result.message.rows[0]
    const requestedKeys = Object.keys(req.body)

    const isValidObj = requestedKeys.every(key => !unchangeables.includes(key) && Object.keys(queryData).includes(key)) && requestedKeys.every(key => req.body[key] != "")

    if (!isValidObj)
    {
        res.status(400)
        throw new Error("Sent request is not valid!")
    }

    let keyValue = `UPDATE recipes SET `

    requestedKeys.forEach((key, index) => keyValue += index == requestedKeys.length - 1 ? `${key}=$${index + 1} ` : `${key}=$${index + 1}, `)
    keyValue += `WHERE id=$${requestedKeys.length + 1}`

    const params = Object.values(req.body)
    params.push(req.params.id)

    const newResult = await queryHandler(keyValue, params)
    if (newResult.flag === false)
    {
        res.status(500).send({
            message: newResult.message.message,
            stack: process.env.NODE_ENV === "development" ? newResult.message.stack : 0
        })
    }
    else
    {
        res.send({ message: `Recipe named [${result.message.rows[0].recipe_name.toUpperCase()}] updated!` })
    }
})

const deleteRecipe = asyncHandler(async (req, res) =>
{
    const id = req.params.id
    const queryText = `DELETE FROM recipes WHERE id = $1 RETURNING *; `
    const result = await queryHandler(queryText, [id])

    if (result.flag === false)
    {
        res.status(500).send({
            message: result.message.message,
            stack: process.env.NODE_ENV === "development" ? result.message.stack : 0
        })
    }
    else
    {
        res.send({ message: `Recipe named [${result.message.rows[0].recipe_name.toUpperCase()}]deleted!` })
    }
})

export
{
    getAllRecipes, postRecipe,
    getRecipe, updateRecipe, deleteRecipe
}