import express from "express"
import
{
    getAllFeedbacks,
    getFeedback,
    postFeedback,
    updateFeedback,
    deleteFeedback
} from "../controllers/feedbackController.js"

const feedbackRouter = express.Router()

feedbackRouter.route("/").get(getAllFeedbacks)
feedbackRouter.route("/:id").get(getFeedback).post(postFeedback).patch(updateFeedback).delete(deleteFeedback)

export { feedbackRouter }