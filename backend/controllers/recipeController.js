import asyncHandler from "express-async-handler"
import { queryHandler } from "../db/queryhandler.js"

const getAllRecipes = asyncHandler(async (req, res) =>
{
    const queryText = `SELECT * FROM recipes`

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
        console.log(result.message.rows[0])
        res.send({ message: result.message.rows })
    }
})

const getRecipe = asyncHandler(async (req, res) =>
{
    const id = req.params.id
    const queryText = `SELECT * FROM recipes WHERE id=${id}`

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
        console.log(result.message.rows[0])
        res.send({ message: result.message.rows[0] })
    }

})

const postRecipe = asyncHandler(async (req, res) =>
{
    if (!(req.body.name || req.body.description))
    {
        res.status(400)
        throw new Error("Name for the recipe is required!")
    }

    const queryText = `INSERT INTO recipes (name,description) VALUES ('${req.body.name}', '${req.body.description}');`
    const result = await queryHandler(queryText)

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
    let queryText = `UPDATE recipes SET `

    const result = await queryHandler(queryText)

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

export { getAllRecipes, postRecipe, getRecipe }