const { pool } = require("./pool");

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    is_member BOOLEAN NOT NULL DEFAULT FALSE,
    hash VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
        title VARCHAR(100) NOT NULL,
        user_id INTEGER NOT NULL,
        text VARCHAR(500) NOT NULL, 
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, 
        FOREIGN KEY (user_id) REFERENCES users(id) 
    ); 
`;

async function makeTables() {
  try {
    await pool.query(SQL);
    await pool.end();
  } catch (err) {
    console.log(err);
  }
}

makeTables();
