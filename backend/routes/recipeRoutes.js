import express from "express"
import
{
    getAllRecipes,
    postRecipe,
    getRecipe
} from "../controllers/recipeController.js"

const recipeRouter = express.Router()

recipeRouter.route("/").get(getAllRecipes).post(postRecipe)
recipeRouter.route("/:id").get(getRecipe)

export { recipeRouter }