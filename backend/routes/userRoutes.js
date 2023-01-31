import express from "express"
import
{
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    getUser
} from '../controllers/userController.js'

const router = express.Router()

router.route('/').get(loginUser).post(registerUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

export { router }