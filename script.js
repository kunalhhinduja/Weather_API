// API Link
// API Key = d354d82d3d3c4099f1701e50080bdd68 
// https://api.openweathermap.org/data/2.5/weather?q=<<city name>>&units=metric&apikey=<<api key>>

const form = document.getElementById('form');
const cityName = document.getElementById('city-name');
const submitButton = document.getElementById('submit-btn');
const result = document.getElementById('result');
const visited = document.getElementById('visited');

let checkedCities = [];

async function findWeather(e) {

    e.preventDefault();

    let str = cityName.value;
    let city;

    if(str.length == 0) 
    {
        alert('Enter city name to get results!!');

    }
    else 
    {
        city = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    if(checkedCities.includes(city)) 
    {
        visited.innerHTML = `<h4> You've already checked the temperature of ${city}. 
                             Check some where else's temperature! </h4>`;
        cityName.value = '';
    }
    else 
    {
        visited.innerHTML = '';
        checkedCities.push(city);

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&apikey=d354d82d3d3c4099f1701e50080bdd68`);
        const data = await res.json();

        if(data.cod == 404 && data.message == 'city not found')
        {
            visited.innerHTML = `<h4>Enter proper name of the city!!</h4>`;
        }
        else 
        {  
        const countryInitials = data.sys.country;
        const temparture = data.main.temp;

        updateUI(city, countryInitials, temparture);

        cityName.value = '';
        }


    }
}

function updateUI(city, countryInitials, temparture) {

    const item = document.createElement('div');
    item.classList.add('information-div');
    item.innerHTML = `
    <p class="cityName">${city}</p>
    <p class="country">${countryInitials}</p>
    <p>${temparture} <span class="super">°C</span></p>
    `;
    
    result.appendChild(item);
}

form.addEventListener('submit', findWeather);