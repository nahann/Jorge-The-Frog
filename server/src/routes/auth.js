const passport = require("passport");

const router = require("express").Router();

router.get("/discord", passport.authenticate("discord"));

router.get(
  "/discord/redirect",
  passport.authenticate("discord"),
  (req, res) => {
    res.redirect(`http://localhost:3000`);
  }
);

router.get("/", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).json({ msg: "unauthorized" });
  }
});

module.exports = router;
