const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3950b6ee8b1c2dd6052d7a875543cf7c&query=" +
    latitude +
    "," +
    longitude;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unabe to find location", undefined);
    } else {
      callback(
        undefined,
        "Temp = " +
          response.body.current.temperature +
          " degrees and weather is " +
          response.body.current.weather_descriptions
      );
    }
  });
};

module.exports = forecast;
