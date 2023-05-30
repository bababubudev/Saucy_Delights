import asyncHandler from "express-async-handler"
import { queryHandler } from "../db/queryhandler.js"

const getRecipes = asyncHandler(async (req, res) =>
{
    let queryText = `SELECT * FROM recipes ORDER BY RANDOM() LIMIT 5;`
    let result = await queryHandler(queryText)

    const queryParam = req.query
    const queryKeys = Object.keys(queryParam)

    if (queryKeys.length > 0)
    {
        const allowedRequests = [
            "offset", "limit", "recipe_name",
            "nationality", "main_ingr", "food_time",
            "difficulty", "time_taken"
        ]

        const betweens = queryKeys
            .filter(key => key.includes("_min") || key.includes("_max"))
            .map(key => key.slice(0, -4))

        const allowedBetweens = betweens.every(elem => allowedRequests.includes(elem))

        if (!allowedBetweens)
        {
            res.status(406)
            throw new Error("Request error...")
        }

        queryText = `SELECT * FROM recipes WHERE `

        let prevElem = "";
        const betweenFilters = betweens
            .map(elem =>
            {
                if (prevElem === elem) return null;

                const minKey = `${elem}_min`;
                const maxKey = `${elem}_max`;

                prevElem = elem

                if (queryKeys.includes(minKey) && queryKeys.includes(maxKey))
                    return `${elem} BETWEEN ${req.query[minKey]} AND ${req.query[maxKey]}`;
                else if (queryKeys.includes(minKey))
                    return `${elem} >= ${req.query[minKey]}`;
                else if (queryKeys.includes(maxKey))
                    return `${elem} <= ${req.query[maxKey]}`;

                return null;
            })
            .filter(filter => filter !== null);

        const queryFilterText = betweenFilters.join(" AND ");
        queryText += queryFilterText + `;`;
        console.log(queryText)

        // const filteredRequest = allowedRequests.filter(elem => normalAndBetweeners.includes(elem))


        // const emptyQuery = queryKeys.every(key => queryKeys[key] == "");
        // const fieldChecked = offLimitFields.every(key => queryKeys.includes(key)) && !emptyQuery;

        // const { offset, limit } = req.query

        // queryText = `SELECT * FROM recipes WHERE id BETWEEN $1 AND $2;`
        result = await queryHandler(queryText)
    }

    if (result.flag === false)
    {
        res.status(500).send({
            message: result.message.message,
            stack: process.env.NODE_ENV == "development" ? result.message.stack : 0
        })
    }
    else
    {
        // result.message.rows.forEach(elem => console.log(elem["recipe_name"]))
        res.send(result.message.rows)
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
    const isValidObj = requiredFields.every(key => recipeKeys.includes(key)) && recipeKeys.every(key => recipeObj[key] != "")

    if (!isValidObj)
    {
        res.status(400)
        throw new Error(`Please fill in the required fields: [${requiredFields}]`)
    }

    const queryIndices = recipeValues.map((value, index) => `$${index + 1}`).join(',')
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
    const unchangeables = ["id", "created_at", "creator_id"]
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

    const isValidRequest = (key) => { return !unchangeables.includes(key) && Object.keys(queryData).includes(key) }
    const isValidObj = requestedKeys.every(isValidRequest) && requestedKeys.every(key => req.body[key] != "")

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
        res.send({ message: `Recipe named [${result.message.rows[0].recipe_name.toUpperCase()}] deleted!` })
    }
})

export
{
    getRecipes, postRecipe,
    getRecipe, updateRecipe, deleteRecipe
}