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
  }

//next div will be an array reader, and there will be a function that add txt to those objects.(show more)

const displayOldSearches = () => {
let previousDataContainer = document.getElementById("previousDataContainer");
weatherObjects.forEach((item) => {
    let newCard = document.createElement('div');
    newCard.innerHTML=item; // (put index on foreach to generate dynamic id)
    previousDataContainer.appendChild(newCard);

})
}
