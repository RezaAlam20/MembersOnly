const { pool } = require("./pool");

const getUserById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE user.id = $1 `, [
    id,
  ]);
  return rows;
};

module.exports = {
  getUserById,
};
