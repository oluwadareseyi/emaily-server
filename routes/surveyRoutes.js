const mongoose = require("mongoose");
const express = require("express");
const route = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const { sendGridKey } = require("../config/keys");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(sendGridKey);
// const Mailer = require("../services/Mailer").default;
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("survey");

route.get("/api/surveys/thanks", (req, res) => {
  res.send("Thanks for voting!");
});

route.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;
  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(",").map(email => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now()
  });

  const recipientsArr = [];
  survey.recipients.forEach(rec => {
    recipientsArr.push(rec.email);
  });

  const msg = {
    to: recipientsArr,
    from: "noreply@emaily.com",
    subject: survey.subject,
    text: "Hello plain world!",
    html: surveyTemplate(survey)
  };
  try {
    await sgMail.sendMultiple(msg);
    await survey.save();

    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
});

module.exports = route;
