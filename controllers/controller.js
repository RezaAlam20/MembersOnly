const bcrypt = require("bcryptjs");

const { pool } = require("../db/pool");
const db = require("../db/db");

const signUp = async (req, res, next) => {
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

module.exports = {
  signUp,
  getMyPosts,
  post,
};
