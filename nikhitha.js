document.addEventListener("DOMContentLoaded",() =>  {

    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const windmsg = document.getElementById("windspeed");

    const API_KEY="3af337972843adfe7e42696e66ea027c";

    getWeatherBtn.addEventListener('click', async() => {
        const city = cityInput.value.trim();
        if(!city) return;
        try{
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }catch(error)
            {
                showError();
             }
        });

        async function fetchWeatherData(city) {
            //gets the data
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            const response = await fetch(url);
            console.log(typeof response);
            console.log("RESPONSE", response);
            if (!response.ok) {
                throw new Error(" City Not found");
            }
            const data = await response.json()
            return data
            }

            function displayWeatherData(data) {
                console.log(data);
                const {name, main,wind,weather} = data;
                cityNameDisplay.textContent = name;
                temperatureDisplay.textContent =`Temperature : ${main.temp}`;
                windmsg.textContent = `Wind-Speed: ${wind.speed}`;
                descriptionDisplay.textContent = `Description: ${weather[0].description}`;
                //unlock the display
                weatherInfo.classList.remove("hidden");
                errorMessage.classList.add("hidden");
            }

            function showError()
            {
                weatherInfo.classList.add("hidden");
                errorMessage.classList.remove("hidden");
            }

});
