const { body } = require("express-validator");

const signUpValidator = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];
const loginValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 30 })
    .withMessage("Username must be at most 30 characters"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ max: 128 })
    .withMessage("Password must be at most 128 characters"),
];

module.exports = { signUpValidator , loginValidator };