const displayLastSearch = () => {
    let divLastSearch= document.getElementById("currentData");
    let lastElement = weatherObjects[weatherObjects.length-1];
    let txt = "";
    //for in is a builtin syntax that continues until the keys end.
for (let x in lastElement) {
  txt += x + ": " + lastElement[x] + "<br>";
};
divLastSearch.innerHTML=txt;
}

const updatePageOnSearch ='';

const clearLastDiv='';