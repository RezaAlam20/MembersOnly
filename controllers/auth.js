const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("../db/pool");
const bcrypt = require("bcryptjs");

const verifyUser = async (password, user, done) => {
  const match = await bcrypt.compare(password, user.hash);
  if (!match) {
    // passwords do not match!
    return done(null, false, { message: "Incorrect password" });
  } else {
    return done(null, user);
  }
};
module.exports = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE username = $1",
          [username],
        );
        const user = rows[0];

        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        } else {
          verifyUser(password, user, done);
        }
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      const user = rows[0];

      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
