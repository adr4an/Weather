const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const myKey = '68543d19772e1180473ca9e16551f0db';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return "Please enter a city.";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`)
    .then( response => response.json())
    .then( json => {

        if (json.cod === '404') {
            cityHide.textContent = city;
            container.style.height = '450px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error.classList.add('active');
            return;
        }

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        console.log(json);

        if (cityHide === city) {
            return;
        } else {
            cityHide.textContent = city;

            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error.classList.remove('active');

            switch(json.weather[0].main){
                case 'Clear': 
                    image.src = 'images/clear.png';
                    break;
    
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
    
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
    
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
    
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
    
                case 'Haze': 
                    image.src = 'images/mist.png';
                    break;
    
                default: 
                    image.src = 'images/cloud.png';
                    break;
            }
    
            temperature.innerHTML = `${Math.floor(Math.floor(json.main.temp) / 10)}<span>°С</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.floor(json.wind.speed)}Km/h`;
    
        }

    });

});

