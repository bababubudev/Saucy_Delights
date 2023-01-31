import express from "express"
import
{
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    getUser
} from '../controllers/userController.js'
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/').get(loginUser).post(registerUser).put(protect,updateUser).delete(protect,deleteUser)
router.route('/me').get(protect,getUser)

export { router }