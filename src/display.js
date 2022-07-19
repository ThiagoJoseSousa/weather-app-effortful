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

