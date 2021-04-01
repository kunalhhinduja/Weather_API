// API Link
// API Key = d354d82d3d3c4099f1701e50080bdd68 
// https://api.openweathermap.org/data/2.5/weather?q=<<city name>>&units=metric&apikey=<<api key>>

const form = document.getElementById('form');
const cityName = document.getElementById('city-name');
const submitButton = document.getElementById('submit-btn');
const result = document.getElementById('result');

async function findWeather(e) {

    e.preventDefault();

    let str = cityName.value;
    let city = str.charAt(0).toUpperCase() + str.slice(1);
    console.log(city);

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&apikey=d354d82d3d3c4099f1701e50080bdd68`);
    const data = await res.json();
    // console.log(data);

    const countryInitials = data.sys.country;
    const temparture = data.main.temp;

    console.log(countryInitials);
    console.log(temparture);

    updateUI(city, countryInitials, temparture);

    cityName.value ='';

}

function updateUI(city, countryInitials, temparture) {

    const item = document.createElement('div');
    item.classList.add('information-div');
    item.innerHTML = `
    <p>City :${city}</p>
    <p>Country :${countryInitials}</p>
    <p>Temperature :${temparture}</p>
    `;
    
    result.appendChild(item);
}

form.addEventListener('submit', findWeather);