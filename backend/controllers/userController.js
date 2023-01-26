// @desc Get all users (for now!!)
// @route GET /api/users
// @access Public
const getUsers=(req,res)=>{
    res.status(200).json({message:"GET USERS"})
}

// @desc Set user 
// @route POST /api/users
// @access Public
const setUser=(req,res)=>{
    res.status(200).json({message:"SET USER"})
}

// @desc Update user 
// @route PUT /api/users/:id
// @access Public
const updateUser=(req,res)=>{
    res.status(200).json({message:`UPDATE USER ${req.params.id}`})
}

// @desc Delete user 
// @route DELETE /api/users/:id
// @access Public
const deleteUser=(req,res)=>{
    res.status(200).json({message:`DELETE USER ${req.params.id}`})
}

module.exports={
    getUsers,
    setUser,
    updateUser,
    deleteUser
}