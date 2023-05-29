import asyncHandler from "express-async-handler"
import { queryHandler } from "../db/queryhandler.js"

const getAllFeedbacks = asyncHandler(async (req, res) =>
{
    const queryText =
        `
        SELECT feedbacks.id, rating, comment, users.name, recipes.recipe_name, created_at 
        FROM feedbacks INNER JOIN recipes 
        ON feedbacks.recipe_id = recipes.id INNER JOIN users 
        ON feedbacks.user_id = users.id;
        `

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
        res.send(result.message.rows)
    }
})

const getFeedback = asyncHandler(async (req, res) =>
{
    const queryText =
        `
        SELECT feedbacks.id, rating, comment, users.name, created_at 
        FROM feedbacks INNER JOIN recipes 
        ON feedbacks.recipe_id = recipes.id INNER JOIN users 
        ON feedbacks.user_id = users.id WHERE feedbacks.id=$1;
        `

    const result = await queryHandler(queryText, [req.params.id])
    if (result.flag === false)
    {
        res.status(500).send({
            message: result.message.message,
            stack: process.env.NODE_ENV == "development" ? result.message.stack : 0
        })
    }
    else
    {
        res.send(result.message.rows)
    }
})

const postFeedback = asyncHandler(async (req, res) =>
{

})

const updateFeedback = asyncHandler(async (req, res) =>
{

})

const deleteFeedback = asyncHandler(async (req, res) =>
{

})

export
{
    getAllFeedbacks, getFeedback, postFeedback,
    updateFeedback, deleteFeedback
}