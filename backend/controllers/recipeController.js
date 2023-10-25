import asyncHandler from "express-async-handler"
import { queryHandler } from "../db/queryhandler.js"

const getBetweenFilter = (betweens, params) =>
{
    let prevElem = ""

    const queryKeys = Object.keys(params)
    const betweenFilters = betweens.map(elem =>
    {
        if (prevElem === elem) return null

        if (Array.isArray(params[elem]))
        {
            params[elem] = params[elem].at(-1)
        }

        const minKey = `${elem}_min`
        const maxKey = `${elem}_max`

        const minValue = `$${queryKeys.findIndex(qk => qk === minKey) + 1}`
        const maxValue = `$${queryKeys.findIndex(qk => qk === maxKey) + 1}`

        prevElem = elem

        if (queryKeys.includes(minKey) && queryKeys.includes(maxKey))
        {
            return `${elem} BETWEEN ${minValue} AND ${maxValue}`
        }
        else if (queryKeys.includes(minKey))
        {
            return `${elem}>=${minValue}`
        }
        else if (queryKeys.includes(maxKey))
        {
            return `${elem}<=${maxValue}`
        }
        else
        {
            return null
        }
    }).filter(filter => filter !== null)

    return betweenFilters.join(" AND ")
}

const getNormalFilter = (normals, params) =>
{
    const queryKeys = Object.keys(params)
    const numericals = ["time_taken", "food_time", "difficulty"]

    const normalFilter = normals.map(elem =>
    {
        if (Array.isArray(params[elem]))
        {
            params[elem] = params[elem].at(-1)
        }

        const isNumerical = numericals.includes(elem)
        const index = `$${queryKeys.findIndex(qk => qk === elem) + 1}`
        return isNumerical ? `${elem}=${index}` : `${elem} ILIKE ${index}`
    })

    return normalFilter.join(" AND ")
}

const getArrayFilter = (arrays, params) =>
{
    const queryKeys = Object.keys(params)
    const arrayFilter = arrays.map(elem =>
    {
        if (Array.isArray(params[elem]))
        {
            params[elem] = params[elem].at(-1).split(",")
        }
        else
        {
            params[elem] = params[elem].split(",")
        }

        const keyIndex = queryKeys.findIndex(qk => qk === elem)
        const value = params[elem].map((val, index) =>
        {
            return `$${index + keyIndex + 1} ILIKE ANY(${elem})`
        })

        return value.join(" OR ")
    })

    return arrayFilter.join(" AND ")
}

const getOffLimitFilter = (offset, limit, length) =>
{
    const values = []
    const clauses = []

    if (offset)
    {
        clauses.push(` OFFSET $${1 + length + values.length}`)
        values.push(offset)
    }

    if (limit)
    {
        clauses.push(` LIMIT $${1 + length + values.length}`)
        values.push(limit)
    }

    let text = `${clauses.join("")}`
    return { text, values }
}


const getFilteredRecipes = asyncHandler(async (req, res) =>
{
    const queryParams = req.query
    const { offset, limit } = queryParams

    delete queryParams.offset
    delete queryParams.limit

    let queryText = `SELECT * FROM recipes`
    let queryValues = []

    for (const [key, value] of Object.entries(queryParams))
    {
        if (value === "")
        {
            delete queryParams[key]
        }
    }

    const queryKeys = Object.keys(queryParams)

    if (queryKeys.length > 0)
    {
        const allowedRequests = [
            "recipe_name", "nationality",
            "main_ingr", "food_time",
            "difficulty", "time_taken"
        ]

        const arrayRequest = ["ingr"]

        const unfilteredBetween = queryKeys.filter(key => key.includes("_min") || key.includes("_max"))

        const betweens = unfilteredBetween.map(key => key.slice(0, -4))
        const normals = allowedRequests.filter(elem => queryParams.hasOwnProperty(elem))
        const arrays = arrayRequest.filter(elem => queryParams.hasOwnProperty(elem))

        const invalid = normals.length == 0 && betweens.length == 0 && arrays.length == 0
        const allowedBetweens = betweens.every(elem => allowedRequests.includes(elem))

        if (invalid || !allowedBetweens)
        {
            res.status(406)
            throw new Error("Request error...")
        }

        const filteredParams = normals
            .concat(unfilteredBetween, arrays)
            .reduce((acc, key) =>
            {
                acc[key] = queryParams[key]
                return acc
            }, {})

        queryText += ` WHERE `

        if (normals.length > 0)
        {
            queryText += getNormalFilter(normals, filteredParams)
        }

        if (arrays.length > 0)
        {
            if (normals.length > 0)
            {
                queryText += " AND "
            }

            queryText += getArrayFilter(arrays, filteredParams)
        }

        if (betweens.length > 0)
        {
            if (normals.length > 0 || normals.length > 0)
            {
                queryText += " AND "
            }

            queryText += getBetweenFilter(betweens, filteredParams)
        }

        const filteredValues = Object.values(filteredParams).flat().map(val => val.trim())
        const { text, values } = getOffLimitFilter(offset, limit, filteredValues.length)

        queryText += ` ORDER BY id ASC${text}`
        queryValues = filteredValues.concat(values)
    }
    else if (offset || limit)
    {
        const { text, values } = getOffLimitFilter(offset, limit, 0)
        queryText += ` ORDER BY id ASC${text}`
        queryValues = values
    }

    queryText += ";"
    let result = await queryHandler(queryText, queryValues)

    console.log(queryText)

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

    const requiredFields = ["recipe_name", "description", "ingr", "difficulty"]
    const isValidObj = requiredFields.every(key => recipeKeys.includes(key)) && recipeKeys.every(key => recipeObj[key] != "")

    if (!isValidObj)
    {
        res.status(400)
        throw new Error(`Please fill in the required fields: [${requiredFields}]`)
    }

    const queryColumns = recipeKeys.join(", ")
    const placeHolders = recipeKeys.map((_, index) => `$${index + 1}`).join(',')
    const queryText = `INSERT INTO recipes (${queryColumns}) VALUES (${placeHolders}) RETURNING *;`
    const result = await queryHandler(queryText, Object.values(recipeObj))

    console.log(queryText)
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

    if (!isValidObj || requestedKeys.length === 0)
    {
        res.status(400)
        throw new Error("Sent request is not valid!")
    }

    let keyValue = `UPDATE recipes SET `
    const params = []

    requestedKeys.forEach((key, index) =>
    {
        keyValue += `${key}=$${index + 1}, `
        params.push(req.body[key])
    })

    keyValue = keyValue.slice(0, -2)
    keyValue += ` WHERE id=$${requestedKeys.length + 1}`
    params.push(req.params.id)

    console.log(keyValue)
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
    console.log(queryText)
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
    getFilteredRecipes, postRecipe,
    getRecipe, updateRecipe, deleteRecipe
}