const { pool } = require("./pool");

const getUserById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE user.id = $1 `, [
    id,
  ]);
  return rows;
};

const submitPost = async (title, description, user) => {
  const time = new Date();

  await pool.query(
    `INSERT INTO posts (title, user_id, text, created_at)
     VALUES ($1, $2, $3, $4)`,
    [title, user.id, description, time],
  );
};

const getMyPosts = async (user) => {
  const { rows } = await pool.query(`SELECT * FROM posts WHERE user_id = $1`, [
    user.id,
  ]);
  return rows;
};

module.exports = {
  getUserById,
  submitPost,
  getMyPosts,
};
