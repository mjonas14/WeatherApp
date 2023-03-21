$(document).ready(function () {
  var $submitBtn = $("#submit-btn");
  var $locationField = $("#inputLocation");
  var locationList = [];
  var $cityEl = $("#cards");

  var $mainDiv = $("#weather-detail");
  var $cityName = $("#city-name");
  var $temp = $("#temperature");
  var $wind = $("#wind");
  var $humidity = $("#humidity");

  $submitBtn.on("click", function (event) {
    event.preventDefault();

    var location = $locationField.val();
    if (location === "") {
      alert("Need to input a valid location");
      return;
    }
    locationList.push(location);

    let string = JSON.stringify(locationList);
    localStorage.setItem("List", string);

    var $div1 = document.createElement("div");
    var $div2 = document.createElement("div");
    $div1.classList = "card mt-2 bg-secondary text-black";
    $div2.classList = "card-body";

    $div2.textContent = location;

    $cityEl.append($div1);
    $div1.append($div2);

    getCityCoordinates(location).then(function (coordinates) {
      getWeather(coordinates);
    });
  });

  function getCityCoordinates(location) {
    var apiURL2 =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      location +
      "&appid=a92b76b452eecd6e4d74f46c9da3aac8";
    var apiURLTest =
      "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=a92b76b452eecd6e4d74f46c9da3aac8";
    console.log(apiURL2);

    return fetch(apiURL2)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        if (data.length === 0) {
          alert("Need to input a valid city");
        }

        var coor = [];
        coor.push(data[0].lon);
        coor.push(data[0].lat);
        console.log(coor);

        return coor;
      });
  }

  var forecast = $(".forecast");

  function getWeather(coordinates) {
    var lon = coordinates[0];
    var lat = coordinates[1];

    var apiURL =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=a92b76b452eecd6e4d74f46c9da3aac8";

    console.log(apiURL);

    fetch(apiURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        $cityName.text(data.city.name);

        var temp = Math.round(data.list[0].main.temp - 273);
        $temp.text(`Temperature: ${temp}\u00B0C`);
        $wind.text(`Wind: ${data.list[0].wind.speed} mph`);
        $humidity.text(`Humidity: ${data.list[0].main.humidity}%`);

        forecast.show();
      });
  };
});
