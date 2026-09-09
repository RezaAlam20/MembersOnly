const express = require("express");
const app = express();
const { router } = require("./routes/router");
const PORT = 3000;
const { pool } = require("./db/pool.js");

const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
const sessionStore = new pgSession({
  pool: pool,
  tableName: "session",
  createTableIfMissing: true,
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    store: sessionStore,
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(passport.initialize());
require("./controllers/auth")(passport);
app.use(passport.session());

app.use(router);
app.listen(PORT, () => {
  console.log(`the app is running on port ${PORT}`);
});
