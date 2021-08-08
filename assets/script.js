//function to call weather API
var parkDisplay = document.querySelector("#meet-display");
var weatherDisplay = document.querySelector("#weather-display");


function myFunction() {
  var searchTerm = document.querySelector("#searchTerm").value.split(", ");
  event.preventDefault();
  // console.log(searchTerm);

  // Make a `fetch` request concatenating that search term to the query URL for weather forecast
  fetch(
    'https://api.openweathermap.org/data/2.5/forecast?q=' + searchTerm[0] + '&units=imperial&appid=8e2a4447de15a5d804cf8a7d25a93eca'
  )

    // Converts the response to JSON
    .then(function (response) {
      // console.log(response);
      return response.json();
    })

    .then(function (response) {
      console.log(response.city);
      var weatherLat = response.city.coord.lat;
      var weatherLong = response.city.coord.lon;
      var datesArray = []
      weatherDisplay.innerHTML = "<h2>" + "5 Day forecast:" + "</h2>" + "<br>";

      /* use jQuery to bring weather data from the API to the 5-day forecast cards */
      for (let day = 1; day <= 5; day++) {
        var date = moment().add(day, "days").format("M/D/YYYY").toString()
        datesArray.push(date);
      }

      for (let index = 4; index <= 36; index += 8) {
        var dateEl = document.createElement("p");
        var tempEl = document.createElement("p");
        var windEl = document.createElement("p");
        var HumidityEl = document.createElement("p");
        var iconEl = document.createElement("img");
        var lineBreak = document.createElement("br");
        console.log(response.list[index].weather[0].icon);
        

        dateEl.textContent = datesArray[index/8];
        tempEl.textContent = "Temp: " + response.list[index].main.temp + " °F";
        windEl.textContent = "Wind: " + response.list[index].wind.speed + " mph";
        HumidityEl.textContent = "Humidity: " + response.list[index].main.humidity + "%";
        iconEl.setAttribute("src", "http://openweathermap.org/img/w/" + response.list[index].weather[0].icon + ".png");

        weatherDisplay.appendChild(dateEl);
        weatherDisplay.appendChild(tempEl);
        weatherDisplay.appendChild(windEl);
        weatherDisplay.appendChild(HumidityEl);
        weatherDisplay.appendChild(iconEl);
        weatherDisplay.appendChild(lineBreak);
      }

      // function to call trail API

      // Make a `fetch` request concatenating that search term to the query URL for nearby parks
      fetch(
        'https://developer.nps.gov/api/v1/parks?stateCode=' + searchTerm[1] + '&limit=100&api_key=eIBcWOJxSuc0Pbly72GNBY8PLO1RTfczXbAeb5hL'
      )

        // Converts the response to JSON
        .then(function (response) {
          //  console.log(response);
          return response.json();
        })

        .then(function (response) {

          parkDisplay.innerHTML = "<h2>" + "Park List:" + "</h2>" + "<br>";
          for (let i = 0; i < response.data.length; i++) {
            var parkLat = response.data[i].latitude
            var parkLong = response.data[i].longitude
            

            var latDiff = weatherLat - parkLat
            var longDiff = weatherLong - parkLong

            if ((latDiff < 1) && (longDiff < 1) && (latDiff > -1) && (longDiff > -1)) {
              var parkName = document.createElement("p");
              var url = document.createElement("p");
              var description = document.createElement("p");
              var image = document.createElement("img");
              var lineBreak = document.createElement("br");

              parkName.textContent = "Name: " + response.data[i].fullName;
              url.textContent = "Link: " + response.data[i].url;
              description.textContent = "Description: " + response.data[i].description;
              image.setAttribute('src', response.data[i].images[0].url);

              parkDisplay.appendChild(parkName);
              parkDisplay.appendChild(url);
              parkDisplay.appendChild(description);
              parkDisplay.appendChild(image);
              parkDisplay.appendChild(lineBreak);

              console.log("Located at index " + i);
              console.log(weatherLat - parkLat);
              console.log(weatherLong - parkLong);
              console.log(response.data[i].fullName);
              console.log(response.data[i].url);
              console.log(response.data[i].description);
              console.log(response.data[i].image);
            }
          };
        });
    });

};