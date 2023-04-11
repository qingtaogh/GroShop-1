var router = require("express").Router();
const middleware = require("../middleware/middleware.js")
const upload = require("../middleware/image.middleware.js");
const recipeController = require("../controllers/recipe/recipe.controller.js");
const recipeIngredientController = require("../controllers/recipe/recipeIngredient.controller.js");
const recipeStepController = require("../controllers/recipe/recipeStep.controller.js");

const { check, validationResult } = require('express-validator')

// Recipe Home Page
router.get("/", middleware.isLoggedIn, 
(req, res) => res.render('admin/recipe/recipe', {
    employee: req.user
}));

// Create Recipe -> Enter Recipe Details
router.get("/create", middleware.isLoggedIn, (req, res) => {
    res.render('admin/recipe/recipeForm', {
    employee: req.user,
    mode: "CREATE"
  })
});
router.post("/create", middleware.isLoggedIn, recipeController.createRecipe)

router.get("/:id/view", middleware.isLoggedIn, recipeController.getRecipe)

// Create Recipe -> Upload Photo of Dish
router.get("/:id/uploadPhoto", middleware.isLoggedIn, (req, res) => {
  res.render('./admin/recipe/recipeImageForm', {
    employee: req.user,
    recipeId: req.params.id
  })
})
router.post("/:id/uploadPhoto", middleware.isLoggedIn, upload.single('image'), recipeController.uploadPhoto)
router.post("/:id/savePhoto", middleware.isLoggedIn, recipeController.addPhotoToRecipe)

// Create Recipe -> Enter Recipe Ingredients
router.get("/:id/ingredients", middleware.isLoggedIn, recipeIngredientController.getAllIngredients)

router.post("/:id/ingredients/add", middleware.isLoggedIn, recipeIngredientController.addIngredient)
router.post("/:id/ingredients/:ingredientId/update", middleware.isLoggedIn, recipeIngredientController.updateIngredient)
router.post("/:id/ingredients/:ingredientId/delete", middleware.isLoggedIn, recipeIngredientController.deleteIngredient)

// Create Recipe -> Enter Recipe Steps
router.get("/:id/steps", middleware.isLoggedIn, recipeStepController.getAllSteps)
router.post("/:id/steps/add", middleware.isLoggedIn, recipeStepController.addStep)
router.post("/:id/steps/:stepId/update", middleware.isLoggedIn, recipeStepController.updateStep)
router.post("/:id/steps/:stepId/delete", middleware.isLoggedIn, recipeStepController.deleteStep)

module.exports = router