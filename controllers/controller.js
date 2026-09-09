const bcrypt = require("bcryptjs");

const { pool } = require("../db/pool");

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

module.exports = {
  signUp,
};
