const express = require("express");
const router = express.Router();
const { signUp, getMyPosts, post , login , validatePass} = require("../controllers/controller");
const { pool } = require("../db/pool");
const passport = require("passport");
const { signUpValidator, loginValidator } = require("../validators/validator");
const { getUserById } = require("../db/db");

router.get("/", async (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log("You aren't Authenticated");
    res.redirect("/login");
  } else if (req.isAuthenticated()) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.user.id,
    ]);
    const posts = await getMyPosts(req, res, next);
    console.log(posts)

    res.render("main", { user: rows[0] , posts : posts });
  }
});
router.get("/sign-up" ,  (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("sign-up-form");
  }
});

router.post("/sign-up", signUpValidator ,  signUp);

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("login-form");
  }
});
router.get("/post", (req, res) => {
  res.render("createPost");
});
router.post("/post", async (req, res, next) => {
  if (req.isAuthenticated()) {
    await post(req, res, next);
  }
  res.redirect("/");
});
router.post(
  "/login",loginValidator , login
  
);



router.get("/membership" , (req , res , next ) => { 
   res.render("membership")
})

router.post("/membership" , validatePass )

module.exports = { router };
