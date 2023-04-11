var router = require("express").Router();
const middleware = require("../middleware/middleware.js")
const upload = require("../middleware/image.middleware.js");
const recipeController = require("../controllers/recipe/recipeUser.controller.js");
const recipeIngredientController = require("../controllers/recipe/recipeIngredient.controller.js");
const recipeStepController = require("../controllers/recipe/recipeStep.controller.js");

const { check, validationResult } = require('express-validator')

// Recipe Home Page
router.get("/", middleware.isLoggedIn, recipeController.getRecipeHomeForUser)

// View Recipe
router.get("/:id", middleware.isLoggedIn, recipeController.getRecipeForUser)


module.exports = router