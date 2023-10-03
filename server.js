
const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const nocache = require("nocache");
const router = require("./router"); 
const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(nocache());
// set view engine and dirname
app.set("view engine", "ejs");

app.use("/static", express.static(path.join(__dirname, "public")));

//Session middleware
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,
  })
);

//route middleware
app.use("/route", router);

// Home route

app.get("/", nocache(), (req, res) => {
  if (req.session.user) {
     res.redirect("/route/dashboard");
  }
   res.render("base", { title: "Login page" });
});


//Start the server
app.listen(port, () => {
  console.log(`server on http://localhost:${port}`);
});
