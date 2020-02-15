const { stripeSecretKey } = require("../config/keys");
const stripe = require("stripe")(stripeSecretKey);
const express = require("express");
const route = express.Router();
const requireLogin = require("../middlewares/requireLogin");

route.post("/api/stripe", requireLogin, async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "$5 for 5 credits",
    source: req.body.id
  });

  req.user.credits += 5;
  const user = await req.user.save();

  res.send(user);
});

module.exports = route;
