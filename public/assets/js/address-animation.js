const dot = document.getElementById("loc-dot");
const mapLocation = document.getElementById("map-loc-dot");
const dotLocations = ["-25px", "22%", "44%", "66%"];
const locationMap = [
  { top: "22%", left: "17%" },
  { top: "22%", left: "17%" },
  { top: "19%", left: "20%" },
  { top: "45%", left: "51%" },
];
var currentSelectedIndex = 0;

function onLocationClick(e, index) {
  currentSelectedIndex = index;

  dot.style = `top: ${dotLocations[currentSelectedIndex]}`;
  mapLocation.style = `top: ${locationMap[currentSelectedIndex].top}; left: ${locationMap[currentSelectedIndex].left}`;
}
