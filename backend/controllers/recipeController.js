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
        console.log(result.message.rows[0])
        res.send({ message: result.message.rows })
    }
})

const getRecipe = asyncHandler(async (req, res) =>
{
    const id = req.params.id
    const queryText = `SELECT * FROM recipes WHERE id=${id};`

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

    const recipeObj = {
        "name": req.body.name ? `{req.body.name}` : ``,
        "description": req.body.description ? `{req.body.description}` : ``,
        "nationality": req.body.nationality ? `{req.body.nationality}` : ``,
        "main_ingr": req.body.main_ingr ? `{req.body.main_ingr}` : ``,
        "food_time": req.body.food_time ? `{req.body.food_time}` : ``,
        "difficulty": req.body.difficulty ? `{req.body.difficulty}` : ``,
        "time_taken": req.body.time_taken ? `{req.body.time_taken}` : ``,
        "rating": req.body.rating ? `{req.body.rating}` : ``
    }

    let queryText = `INSERT INTO recipes (${Object.keys(recipeObj)}) VALUES ('${Object.values(recipeObj)}');`
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
    const id = req.params.id

    let queryText = `UPDATE recipes SET `
    queryText += req.body.name ? `name = '${req.body.name}', ` : ``
    queryText += req.body.description ? `description = '${req.body.description}', ` : ``
    queryText += req.body.nationality ? `nationality = '${req.body.nationality}', ` : ``
    queryText += req.body.mainIngredient ? `main_ingr = '${req.body.mainIngredient}', ` : ``
    queryText += req.body.ingredient ? `ingr = '${req.body.ingredient}', ` : ``
    queryText += req.body.foodTime ? `food_time = '${req.body.foodTime}', ` : ``
    queryText += req.body.difficulty ? `difficulty= '${req.body.difficulty}', ` : ``
    queryText += req.body.timeTaken ? `time_taken = '${req.body.timeTaken}', ` : ``
    queryText += ` Where id=${id};`

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
        res.send({ message: `Recipe with id ${id} updated` })
    }
})

const deleteRecipe = asyncHandler(async (req, res) =>
{
    const id = req.params.id
    const queryText = `DELETE FROM recipes WHERE id=${id};`
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
        res.send({ message: `Recipe with id ${id} deleted` })
    }
})

export
{
    getAllRecipes, postRecipe,
    getRecipe, updateRecipe, deleteRecipe
}