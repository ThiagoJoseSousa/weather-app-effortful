const initializeForm= () => {let form = document.querySelector("#form");

form.addEventListener("submit", function (e) {
e.preventDefault();
let formdata = new FormData(this);
let input = formdata.get("inputbox");
let temperatureUnit= formdata.get("temperatureUnit");

getWeather(input,temperatureUnit);
});} 
initializeForm();
//factory function, clear div, add to div, displaying It. 
// I will make an array to store the objects created by weather factory, using the scope of a function It'll be easy to create without repeating name


let weatherObjects = [];


const weatherFactory = (weather,temp, temp_max, temp_min, pressure,humidity) => {
return {weather, temp, temp_max, temp_min, pressure, humidity}
}
const pushObjects = (weather,temp, temp_max, temp_min, pressure,humidity) => { 
    let lastObject = weatherFactory(weather,temp, temp_max, temp_min, pressure,humidity);
weatherObjects.push(lastObject);

}


const getWeather = (input, temperature) => {
let cityname=input;
let temperatureUnit=temperature;

fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=8b4e96d7d03aca7a84c60917ff96fa26&units=${temperatureUnit}`, 
{ mode:'cors'})
.then(function(response) {
    return response.json();
  })
  .then(function(response) {
    let weather=response.weather[0].main;
    let temp=response.main.temp;
    let temp_max=response.main.temp_max;
    let temp_min=response.main.temp_min;
    let pressure=response.main.pressure;
    let humidity=response.main.humidity;
  
pushObjects(weather,temp,temp_max,temp_min,pressure,humidity);
 displayLastSearch();

  });

} // when getWeather ends pushObjects must happen.



