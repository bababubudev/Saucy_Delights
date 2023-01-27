import { query } from "../db/dbconfig.js"

// @desc Get all users (for now!!)
// @route GET /api/users
// @access Public
const getUsers = async (req, res) =>
{
    query('SELECT * FROM users', (err, result) => 
    {
        if (err)
        {
            res.status(400)
            throw new Error(err.message)
        }
        
        res.json(result.rows)
    })
}

// @desc Set user 
// @route POST /api/users
// @access Public
const setUser = async (req, res) =>
{
    res.status(200).json({ message: "SET USER" })
}

// @desc Update user 
// @route PUT /api/users/:id
// @access Public
const updateUser = async (req, res) =>
{
    res.status(200).json({ message: `UPDATE USER ${req.params.id}` })
}

// @desc Delete user 
// @route DELETE /api/users/:id
// @access Public
const deleteUser = async (req, res) =>
{
    res.status(200).json({ message: `DELETE USER ${req.params.id}` })
}

export
{
    getUsers,
    setUser,
    updateUser,
    deleteUser
}