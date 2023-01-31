import express from "express"
import
{
    getAllRecipes,
    postRecipe,
    getRecipe,
    updateRecipe,
    deleteRecipe
} from "../controllers/recipeController.js"

const recipeRouter = express.Router()

recipeRouter.route("/").get(getAllRecipes).post(postRecipe)
recipeRouter.route("/:id").get(getRecipe).put(updateRecipe).delete(deleteRecipe)

export { recipeRouter }