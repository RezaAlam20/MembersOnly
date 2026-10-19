const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/controller");
const { pool } = require("../db/pool");
const passport = require("passport");
const { getUserById } = require("../db/db");

router.get("/", async (req, res) => {
  if (!req.isAuthenticated()) {
    console.log("You aren't Authenticated");
    res.redirect("/login");
  } else if (req.isAuthenticated()) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.user.id,
    ]);
    console.log(rows);
    res.render("main", { user: rows[0] });
  }
});
router.get("/sign-up", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("sign-up-form");
  }
});

router.post("/sign-up", signUp);

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("login-form");
  }
});
router.get("/post" , (req, res) => { 
  res.render("createPost")

})
router.post("/post" , (req, res) => { 
  if(req.isAuthenticated()){ 
    const title = req.body.title
    const description = req.body.description
    res.redirect("main")
  }
})
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  }),
);

module.exports = { router };
