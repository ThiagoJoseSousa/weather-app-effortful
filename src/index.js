const initializeForm= () => {let form = document.querySelector("#form");

form.addEventListener("click", function () {
let formdata = new FormData(this);
let input = formdata.get("inputbox");
let temperatureUnit= formdata.get("temperatureUnit");

});} 



const getWeather = () => {
    let cityname="Carapicuiba";
    let temperatureUnit="metric"; 

fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=8b4e96d7d03aca7a84c60917ff96fa26&units=${temperatureUnit}`, 
{ mode:'cors'})
.then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response.main);
  });

}
getWeather();