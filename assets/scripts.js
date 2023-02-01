
//fetching weather data
function getWeather (city) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a232ab34814e96db820788110acc9f1b&units=metric";
    
    fetch(weatherURL)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    //if city exist, then store it to storage and add into list
                    searchedCity.push(city);
                    var cityHistoryList = $('<li class="city-search-list" style="list-style:none; text-align:center; background-color: pink; padding:2px; border-radius:5px; box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px; margin: 1px;" type="button" id="' + city + '">' + city + '</li>');
                    $("#city-list").append(cityHistoryList);
                    localStorage.setItem("UserSearched", JSON.stringify(searchedCity));
                    //display weather information
                    
                    $("#today-weather").empty();
                    $(".forecast-cards").empty();

                    var displayWeather = $(
                        '<h2 class="card-title">' + data.city.name + '</h2>' +
                        '<p class="card-text">' + dayjs(data.dt).format('dddd MMMM DD, YYYY [at] hh:mmA [current location]') + '</p>' +
                        '<p class="card-text">' + '<img src="https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png"></img>' + data.list[0].weather[0].description + '</p>' +
                        '<p class="card-text"> Temperature: ' + data.list[0].main.temp + '°C </p>' +
                        '<p class="card-text"> Humidity: ' + data.list[0].main.humidity + '%</p>' +
                        '<p class="card-text"> Wind: ' + data.list[0].wind.speed + 'm/s</p>'
                    );
                    $("#today-weather").append(displayWeather);
                    
                    for (i = 7; i <= data.list.length; i +=8) {
                       var displayForecast = $(
                            '<div class="card">' + 
                                '<div class="card-body">' +
                                    '<h5 class="card-title">' + dayjs(data.list[i].dt).format("MM/DD/YYYY") + '</h5>' +
                                    '<img src="https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '.png"></img>' +
                                    '<p class="card-text">Temp: ' + data.list[i].main.temp + '°C</p>' +
                                    '<p class="card-text">Humidity: ' + data.list[i].main.humidity + '%</p>' +
                                    '<p class="card-text"> Wind: ' + data.list[i].wind.speed + 'm/s</p>' +
                                '</div>' +
                            '</div>'
                        ); 
                        $(".forecast-cards").append(displayForecast);
                    };
                });
            } else {
                alert("Unable to find weather information");
            };
        });        
};


//city input and saving
var searchedCity = [];

$('.search-city-btn').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();

    var city = $('.city-input').val().trim();

    if (city) {
        if (!searchedCity.includes(city)) {
            $('.city-input').val("");
            getWeather(city);
        } else {
            alert("Please enter a city name")
        };
    };
});

//loads previous city searches
function loadHistory () {
    var history = JSON.parse(localStorage.getItem("UserSearched"));
    if (history !== null) {
       $('#city-list').empty();
        for (var i = 0; i < history.length; i++) {
            $('#city-list').append('<li class="city-search-list" style="list-style:none; text-align:center; background-color: pink; padding:2px; border-radius:5px; box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px; margin: 1px;" type="button" id="' + history[i] + '">' + history[i] + '</li>');
        }; 
    }
};
loadHistory();

//city in history list
$("#city-list").on('click', function(event) {
    event.stopPropagation();
    var previousCity = $(event.target).closest('li').attr('id');
    getWeather2(previousCity);
});
function getWeather2 (city) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a232ab34814e96db820788110acc9f1b&units=metric";
    
    fetch(weatherURL)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    //display weather information
                    
                    $("#today-weather").empty();
                    $(".forecast-cards").empty();

                    var displayWeather = $(
                        '<h2 class="card-title">' + data.city.name + '</h2>' +
                        '<p class="card-text">' + dayjs(data.dt).format('dddd MMMM DD, YYYY [at] hh:mmA [current location]') + '</p>' +
                        '<p class="card-text">' + '<img src="https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png"></img>' + data.list[0].weather[0].description + '</p>' +
                        '<p class="card-text"> Temperature: ' + data.list[0].main.temp + '°C </p>' +
                        '<p class="card-text"> Humidity: ' + data.list[0].main.humidity + '%</p>' +
                        '<p class="card-text"> Wind: ' + data.list[0].wind.speed + 'm/s</p>'
                    );
                    $("#today-weather").append(displayWeather);
                    
                    for (i = 7; i <= data.list.length; i +=8) {
                       var displayForecast = $(
                            '<div class="card">' + 
                                '<div class="card-body">' +
                                    '<h5 class="card-title">' + dayjs(data.list[i].dt).format("MM/DD/YYYY") + '</h5>' +
                                    '<img src="https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '.png"></img>' +
                                    '<p class="card-text">Temp: ' + data.list[i].main.temp + '°C</p>' +
                                    '<p class="card-text">Humidity: ' + data.list[i].main.humidity + '%</p>' +
                                    '<p class="card-text"> Wind: ' + data.list[i].wind.speed + 'm/s</p>' +
                                '</div>' +
                            '</div>'
                        ); 
                        $(".forecast-cards").append(displayForecast);
                    };
                });
            } 
        });        
};




