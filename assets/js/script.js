$(document).ready(function () {
  var $submitBtn = $("#submit-btn");
  var $locationField = $("#inputLocation");
  var locationList = [];
  var $cityEl = $("#cards");

  var $cityName = $("#city-name");
  var $temp = $("#temperature");
  var $wind = $("#wind");
  var $icon = $('#weatherImg0');
  var $humidity = $("#humidity");

  var forecast = $(".forecast");

  var $day1title = $('.title1')
  var $day2title = $('.title2');
  var $day3title = $('.title3');
  var $day4title = $('.title4');
  var $day5title = $('.title5');

  // Pre-populate search history cards
  if (localStorage.getItem("List") != null) {
    var temp1 = JSON.parse(localStorage.getItem('List'));
    for (let i = 0; i < temp1.length; i++) {
      var $div1 = document.createElement("button");
      var $div2 = document.createElement("div");
      $div1.classList = "card mt-2 bg-secondary text-black btn btn-secondary";
      $div1.style.width = '200px';
      $div2.classList = "card-body";
  
      $div2.textContent = temp1[i];
  
      $cityEl.append($div1);
      $div1.append($div2);
    }
  };

  $cityEl.on("click", function(event) {
    event.preventDefault();
    let cityName = event.target.textContent;
    getCityCoordinates(cityName).then(function (coordinates) {
      getWeather(coordinates);
    });
  });




  // When submit button is clicked
  $submitBtn.on("click", function (event) {
    event.preventDefault();

    
    var location = $locationField.val();
    if (location === "") {
      alert("Need to input a valid location");
      return;
    }

    console.log('Is it?', localStorage.getItem("List") === null);


    if (localStorage.getItem("List") === null) {

      let temp = [];
      temp.push(location);
      let string = JSON.stringify(temp);
      localStorage.setItem("List", string);

    } else {

      let temp = JSON.parse(localStorage.getItem('List'));
      temp.push(location);
      let string = JSON.stringify(temp);
      localStorage.setItem("List", string);

    }

    // Create new HTML element and add to page
    var $div1 = document.createElement("button");
    var $div2 = document.createElement("div");
    $div1.classList = "card mt-2 bg-secondary text-black btn btn-secondary";
    $div1.style.width = '200px';
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
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      location +
      "&appid=a92b76b452eecd6e4d74f46c9da3aac8";
    var apiURLTest =
      "https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=a92b76b452eecd6e4d74f46c9da3aac8";
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

        $cityName.text(data.city.name + ' (' + data.list[0].dt_txt.substring(0,11) + ')');

        // Sourced from: https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
        var imgID = data.list[0].weather[0].icon;
        var imgURL = "https://openweathermap.org/img/w/" + imgID + ".png";
        $('#weatherImg0').attr('src',imgURL);
        console.log($icon);

        var temp = Math.round(data.list[0].main.temp - 273);
        $temp.text(`Temp: ${temp}\u00B0C`);
        $wind.text(`Wind: ${data.list[0].wind.speed} mph`);
        $humidity.text(`Humidity: ${data.list[0].main.humidity}%`);

        $day1title.text(data.list[2].dt_txt.substring(0,11));

        var imgID = data.list[2].weather[0].icon;
        var imgURL = "https://openweathermap.org/img/w/" + imgID + ".png";
        $('#weatherImg1').attr('src',imgURL);
        $('.text11').text(`Temp: ${Math.round(data.list[2].main.temp - 273)}\u00B0C`)
        $('.text12').text(`Wind: ${data.list[2].wind.speed} mph`)
        $('.text13').text(`Humidty: ${data.list[2].main.humidity}%`)


        $day2title.text(data.list[10].dt_txt.substring(0,11));
        imgID = data.list[10].weather[0].icon;
        imgURL = "https://openweathermap.org/img/w/" + imgID + ".png";
        $('#weatherImg2').attr('src',imgURL);
        $('.text21').text(`Temp: ${Math.round(data.list[10].main.temp - 273)}\u00B0C`)
        $('.text22').text(`Wind: ${data.list[10].wind.speed} mph`)
        $('.text23').text(`Humidty: ${data.list[10].main.humidity}%`)

        $day3title.text(data.list[18].dt_txt.substring(0,11));
        imgID = data.list[18].weather[0].icon;
        imgURL = "https://openweathermap.org/img/w/" + imgID + ".png";
        $('#weatherImg3').attr('src',imgURL);
        $('.text31').text(`Temp: ${Math.round(data.list[18].main.temp - 273)}\u00B0C`)
        $('.text32').text(`Wind: ${data.list[18].wind.speed} mph`)
        $('.text33').text(`Humidty: ${data.list[18].main.humidity}%`)


        $day4title.text(data.list[26].dt_txt.substring(0,11));
        imgID = data.list[26].weather[0].icon;
        imgURL = "https://openweathermap.org/img/w/" + imgID + ".png";
        $('#weatherImg4').attr('src',imgURL);
        $('.text41').text(`Temp: ${Math.round(data.list[26].main.temp - 273)}\u00B0C`)
        $('.text42').text(`Wind: ${data.list[26].wind.speed} mph`)
        $('.text43').text(`Humidty: ${data.list[26].main.humidity}%`)

        $day5title.text(data.list[34].dt_txt.substring(0,11));
        imgID = data.list[34].weather[0].icon;
        imgURL = "https://openweathermap.org/img/w/" + imgID + ".png";
        $('#weatherImg5').attr('src',imgURL);
        $('.text51').text(`Temp: ${Math.round(data.list[34].main.temp - 273)}\u00B0C`)
        $('.text52').text(`Wind: ${data.list[34].wind.speed} mph`)
        $('.text53').text(`Humidty: ${data.list[34].main.humidity}%`)

        forecast.show();

      });
  };




});
