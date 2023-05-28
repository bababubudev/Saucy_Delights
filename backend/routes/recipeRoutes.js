import express from "express"
import
{
    getHomeRecipe,
    postRecipe,
    getRecipe,
    updateRecipe,
    deleteRecipe
} from "../controllers/recipeController.js"

const recipeRouter = express.Router()

recipeRouter.route("/").get(getHomeRecipe).post(postRecipe)
recipeRouter.route("/:id").get(getRecipe).patch(updateRecipe).delete(deleteRecipe)

export { recipeRouter }