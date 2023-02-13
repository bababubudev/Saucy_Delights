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
        console.log(result.message.rows)
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
    const recipeObj = req.body;
    const recipeKeys = Object.keys(recipeObj);

    const requiredFields = ["name", "description", "ingr", "difficulty"]
    const isValidObj = requiredFields.every(key => recipeKeys.includes(key)) && recipeKeys.every(key => recipeObj[key] != "")

    if (!isValidObj)
    {
        res.status(400)
        throw new Error("Please fill in the required fields!")
    }

    const queryParam = Object.values(recipeObj).map(value => isString(value) ? `'${value}'` : value)
    const queryText = `INSERT INTO recipes (${recipeKeys}) VALUES (${queryParam}) RETURNING *;`

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
    // const id = req.params.id

    // let queryText = `UPDATE recipes SET `
    // queryText += req.body.name ? `name = '${req.body.name}', ` : ``
    // queryText += req.body.description ? `description = '${req.body.description}', ` : ``
    // queryText += req.body.nationality ? `nationality = '${req.body.nationality}', ` : ``
    // queryText += req.body.mainIngredient ? `main_ingr = '${req.body.mainIngredient}', ` : ``
    // queryText += req.body.ingredient ? `ingr = '${req.body.ingredient}', ` : ``
    // queryText += req.body.foodTime ? `food_time = '${req.body.foodTime}', ` : ``
    // queryText += req.body.difficulty ? `difficulty= '${req.body.difficulty}', ` : ``
    // queryText += req.body.timeTaken ? `time_taken = '${req.body.timeTaken}', ` : ``
    // queryText += ` WHERE id=${id};`

    // const result = await queryHandler(queryText)

    // if (result.flag === false)
    // {
    //     res.status(500).send({
    //         message: result.message.message,
    //         stack: process.env.NODE_ENV === "development" ? result.message.stack : 0
    //     })
    // }
    // else
    // {
    //     res.send({ message: `Recipe with id ${id} updated` })
    // }

    res.send({ message: `Feature to be implemented. TEHEE!` })
})

const deleteRecipe = asyncHandler(async (req, res) =>
{
    const id = req.params.id
    const queryText = `DELETE FROM recipes WHERE id=${id} RETURNING *;`
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
        res.send({ message: `Recipe named [ ${result.message.rows[0].name.toUpperCase()} ] deleted` })
    }
})

function isString(x)
{
    return Object.prototype.toString.call(x) === "[object String]"
}

export
{
    getAllRecipes, postRecipe,
    getRecipe, updateRecipe, deleteRecipe
}