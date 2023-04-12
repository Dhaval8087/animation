const dot = document.getElementById("loc-dot");
const mapLocation = document.getElementById("map-loc-dot");
const dotLocations = ["-25px", "22%", "44%", "66%"];
const locationMap = [
  { top: "20%", right: "21%" },
  { top: "20%", right: "21%" },
  { top: "19%", right: "20%" },
  { top: "45%", right: "9.5%" },
];
var currentSelectedIndex = 0;

function onLocationClick(e, index) {
  currentSelectedIndex = index;

  dot.style = `top: ${dotLocations[currentSelectedIndex]}`;
  mapLocation.style = `top: ${locationMap[currentSelectedIndex].top}; right: ${locationMap[currentSelectedIndex].right}`;
}
