const express = require("express");
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
require("dotenv").config();
require("./strategies/discord");
const port = process.env.PORT || 3002;
const routes = require("./routes");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const connectDB = async () => {
  await mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("[INFO] - connected to mongoDB");
};
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "supersecretshibapassword",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGOURI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.listen(port, () => console.log(`[INFO] - listening on port ${port}`));
