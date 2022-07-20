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


const weatherFactory = (name, weather,temp, temp_max, temp_min, pressure,humidity) => {
return {name, weather, temp, temp_max, temp_min, pressure, humidity}
}
const pushObjects = (name, weather,temp, temp_max, temp_min, pressure,humidity) => { 
    let lastObject = weatherFactory(name, weather,temp, temp_max, temp_min, pressure,humidity);
weatherObjects.push(lastObject);

}


const getWeather = (input, temperature) => {
let cityname=input;
let temperatureUnit=temperature;
let loader = `<div class="loader"></div>`;
let currentData=document.getElementById('currentData');
currentData.innerHTML = loader;
fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=8b4e96d7d03aca7a84c60917ff96fa26&units=${temperatureUnit}`, 
{ mode:'cors'})
.then(function(response) {
    return response.json();
  })
  .then(function(response) {
    currentData. textContent="city not found";
    let weather=response.weather[0].main;
    let temp=response.main.temp;
    let temp_max=response.main.temp_max;
    let temp_min=response.main.temp_min;
    let pressure=response.main.pressure;
    let humidity=response.main.humidity;
    let name = response.name;

  
pushObjects(name, weather,temp,temp_max,temp_min,pressure,humidity);
 displayLastSearch();

  });

} // when getWeather ends pushObjects must happen.



const displayLastSearch = () => {
  let divLastSearch= document.getElementById("currentData");
  let lastElement = weatherObjects[weatherObjects.length-1];

  //for in is a builtin loop syntax that continues until the keys end. innerHTML is trustable 
  //and will overwrite previous text
  let txt="";
for (let x in lastElement) {
txt += x + ": " + lastElement[x] + "<br>";
};
divLastSearch.innerHTML=txt;
displayChanges(divLastSearch)
}

const displayChanges = (divLastSearch) => {
  displayOldSearches();
  changeBackground(divLastSearch)
}
const changeBackground = (divLastSearch) => {
let weatherState= weatherObjects[weatherObjects.length-1].weather;

switch (weatherState) {
case 'Clouds':
  divLastSearch.style.backgroundColor='grey';
  break;
case 'Clear':
  divLastSearch.style.backgroundColor='yellow';
break;

case 'Atmosphere':
  divLastSearch.style.backgroundColor='blue';
break;
case 'Snow':
  divLastSearch.style.backgroundColor='white';
break;
case 'Rain':
  divLastSearch.style.backgroundColor='darkBlue';
break;

case 'Drizzle':
  divLastSearch.style.backgroundColor='lightBlue';
break;

case 'Thunderstorm':
  divLastSearch.style.backgroundColor='red';
break;
}
} 
//next div will be an array reader, and there will be a function that add txt to those objects.(show more)

const displayOldSearches = () => {

let previousDataContainer = document.getElementById("previousDataContainer");
previousDataContainer.textContent=''; // clears the DATA
weatherObjects.forEach((item, index) => { // reads array(put index on foreach to generate dynamic id)
  let newCard = document.createElement('div');
  newCard.textContent=item.name;
  newCard.setAttribute('data-index', index); //added now with index
  newCard.setAttribute('data-click', '0');
  previousDataContainer.appendChild(newCard);

})
}

//add show/hide card. code below is test, cant be acessing dom like this
const displayDecide= (event)=>{

  const element = event.target;
  const index = element.dataset.index;
// decides between showname or fullitem
if ( element.dataset.click%2==0) {
  element.dataset.click++;
fullItem(element,index)
}
else {
  element.dataset.click++
  showName(element,index)};

}

const fullItem = (element, index) => {
  // from the index I receive, I want to show all of its information(your own div will grow)
  let fullInfo=weatherObjects[index]
  let txt="";
  for (let x in fullInfo) {
  txt += x + ": " + fullInfo[x] + "<br>";
  };

element.innerHTML=txt;
}


const showName= (element,index) => {
// I want to activate this if the user clicks on the div again, and then switch to the other.Likely by using remainder %
let fullInfo=weatherObjects[index]
let txt=fullInfo.name;
element.innerHTML=txt;


}

document.getElementById('previousDataContainer').addEventListener('click', displayDecide);

// I discovered I can do the above with <details> and summary on html5, but decided to proceed this way. 

