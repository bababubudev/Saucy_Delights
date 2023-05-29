import express from "express"
import
{
    getRecipes,
    postRecipe,
    getRecipe,
    updateRecipe,
    deleteRecipe
} from "../controllers/recipeController.js"

const recipeRouter = express.Router()

recipeRouter.route("/").get(getRecipes).post(postRecipe)
recipeRouter.route("/:id").get(getRecipe).patch(updateRecipe).delete(deleteRecipe)

export { recipeRouter }