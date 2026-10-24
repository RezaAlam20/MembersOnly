  const bcrypt = require("bcryptjs");
  const passport = require("passport");
  const { pool } = require("../db/pool");
  const db = require("../db/db");
  const { validationResult } = require("express-validator");

  const signUp = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("sign-up-form", {
        errors: errors.array(),
      });
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await pool.query("INSERT INTO users (username, hash) VALUES ($1, $2)", [
        req.body.username,
        hashedPassword,
      ]);
      res.redirect("/");
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  const post = async (req, res, next) => {
    const title = req.body.title;
    const user = req.user;
    const description = req.body.description;
    db.submitPost(title, description, user);
  };

  const getMyPosts = async (req, res, next) => {
    const user = req.user;
    const result = await db.getMyPosts(user);
    return result;
  };

  const login = async (req , res , next ) => { 
      const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("login-form", {
        errors: errors.array(),
      });
    }
    return passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureMessage: true,
    })(req, res, next);
  }

  const validatePass  = async(req , res , next ) =>  { 
    const input = req.body.pass 
    const user = req.user
    if(input == "password"){ 
      await pool.query("UPDATE users SET ismember = TRUE WHERE id = $1" , [user.id])
      res.redirect("/")
    }
    else { 
      res.redirect("/membership")
    }
  }
  module.exports = {
    signUp,
    getMyPosts,
    post,
    login,
    validatePass
  };
