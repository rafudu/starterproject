/* @flow */
document.getElementById("message").innerHTML = "Looks like we're all set!";

const changeColors = function(){
  const elements: Array<HTMLElement> = Array.prototype.slice.call(document.getElementsByClassName("color")); // Little exagerated but just to test the flow plugins.
    elements.forEach((elm) => {
      elm.style.backgroundColor = 'hsl(' + Math.round(Math.random()*360) + ',' + 100 + '%,' + 50 + '%)';
    })
}
changeColors();
setInterval(changeColors, 1500);
