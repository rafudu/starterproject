document.getElementById("message").innerHTML = "Looks like we're all set!";
require('foundation')
const changeColors = function(){
  const elements = document.getElementsByClassName("color");
    elements.forEach((elm) => {
      elm.style.backgroundColor = 'hsl(' + Math.round(Math.random()*360) + ',' + 100 + '%,' + 50 + '%)';
    })
}
changeColors();
setInterval(changeColors, 1500);
