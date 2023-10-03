
const express = require("express");
const nocache = require("nocache");
const router = express.Router();

const credentials = {
  email: "adhil@gmail.com",
  password: "12345678",
};

router.post("/login", (req, res) => {
  try {
    if (
      req.body.email == credentials.email &&
      req.body.password == credentials.password
    ) {
      req.session.user = req.body.email;
       res.redirect("/route/dashboard");
    } else {
      res.render("base", { message: "Invalid Email or Password" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server Error");
  }
});

//route for dashboard

router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    // res.setHeader('Cache-Control', 'no-store');
     res.render("dashboard", { user: req.session.user });
  } else {
     res.redirect("/");
  }
});

//route for dashboard

router.post("/logout", nocache(), (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.render("base", {
        title: "logout",
        logout: "Logout successfully...",
      });
    }
  });
});

module.exports = router;
