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
//DOESNT WORK FOR NOW LMAO
const setUser = async (req, res) =>
{   
    await query(`INSERT INTO users (email,name,password) VALUES (${req.body.email},${req.body.name},${req.body.password})`,(err,result)=>
    {
        console.log(req.body.email,req.body.name,req.body.password)
        if (err)
        {
            res.status(400)
            throw new Error(err.message)
        }
        res.status(200).json({ message: `SET USER ${req.body.email}, ${req.body.name}, ${req.body.password}` })
    })
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