import express from "express"
import
{
    getUsers,
    setUser,
    updateUser,
    deleteUser
} from '../controllers/userController.js'

const router = express.Router()

router.route('/').get(getUsers).post(setUser)
router.route('/:id').put(updateUser).delete(deleteUser)

export { router }