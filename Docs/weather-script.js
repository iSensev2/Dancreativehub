//This Select DOM Elements
const container = document.querySelector('.container');
const search = document.querySelector('.search-box');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
//search "Enter" click event button
search.addEventListener('keypress', (event) => {
    if(event.key === "Enter"){
    const APIKey = '1655b920002b3bf7ae2d9bdf54863ebc';
    const city = document.querySelector('.search-box input').value;

    if(city === '')
       return;

       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metrics&appid=${APIKey}`).then(response => response.json()).then(json => {
        
       if(json.cod === '404'){
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
       }
       error404.style.display = 'none';
       error404.classList.remove('fadeIn');

       const image = document.querySelector(' .weather-box img');
       const temperature = document.querySelector(' .weather-box .temperature');
       const description = document.querySelector(' .weather-box .description');
       const humidity = document.querySelector('.weather-details .humidity span');
       const wind = document.querySelector(' .weather-details .wind span');

       switch (json.weather[0].main){
        case 'Clear':
            image.src = 'Assets/clear.png';
            break;

            case 'Rain':
                image.src = 'Assets/rain.png';
                break;

                case 'Snow':
                    image.src = 'Assets/snow.png';
                    break;

                    case 'Clouds':
                        image.src = 'Assets/cloud.png';
                        break;

                        case 'Haze':
                        image.src = 'Assets/Haze.png';
                        break;

                        case 'Overcast Clouds':
                        image.src = 'Assets/Overcast.png';
                        break;
            default:
                image.src = '';
       }

       temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
       description.innerHTML = `${json.weather[0].description}`;
       humidity.innerHTML = `${json.main.humidity}%`;
       wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

       weatherBox.style.display = '';
       weatherDetails.style.display = '';
       weatherBox.classList.add('fadeIn');
       weatherDetails.classList.add('fadeIn');
       container.style.height = '590px';
    
       });
}});