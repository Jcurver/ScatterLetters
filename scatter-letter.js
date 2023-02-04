import ScatterLetters from "./index.js";

window.onload = () => {
  new ScatterLetters("AIC DB GFJ", {
    sparkLevel: 11,
    comebackSpeed: 1,
    mouseThickness: 15,
    color: "#30e080",
    flyingDotColor: "#e81831",
    blankWidth: 17,
    letterSpacing: 4,
    fontSize: 16,
    top: 310,
    left: 160,
  });
};
