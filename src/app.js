const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const port = process.env.PORT || 3000;

const app = express();

app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Samyak Jain",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Samyak Jain",
  });
});

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Samyak Jain",
  });
});

app.get("/weather", (req, res) => {
  const location = req.query.address;
  if (!location) {
    return res.send({
      error: "Please provide the address",
    });
  }

  geocode(location, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location: data.location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "samyak",
    errorMessage: "This Page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "samyak",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("server is up on port " + port);
});
