const express = require("express");
const passport = require("passport");
const route = express.Router();

route.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

route.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/surveys");
  }
);

route.get("/api/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

route.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = route;
