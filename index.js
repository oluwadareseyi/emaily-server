const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require("./config/keys");
require("./models/user");
require("./models/Survey");
require("./services/passport");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const surveyRoutes = require("./routes/surveyRoutes");

app.use(authRoutes);
app.use(billingRoutes);
app.use(surveyRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

mongoose
  .connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("DB connection successfull!");
  })
  .catch(err => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const cors = require('cors')

// const corsOptions = {
//   origin: 'https://yourdomain.com'
// }

// app.get('/products/:id', cors(corsOptions), (req, res, next) => {
//   //...
// })

// const whitelist = ['http://example1.com', 'http://example2.com']
// const corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
