const defaultOptions = {
  width: 400,
  height: 400,
  maxWidth: 400,
  maxWidth: 400,
  particleGap: 5,
  particleSize: "4",
  disableInteraction: true,
  renderer: "webgl",
};
var nextParticle = [];

function onMouseEnter(index) {
  nextParticle[index].renderer = "webgl";
  nextParticle[index].particleSize = 4;
  nextParticle[index].particleGap = 3;
  nextParticle[index].start();
}

function onMouseLeave(index) {
  nextParticle[index].renderer = "webgl";
  nextParticle[index].particleGap = defaultOptions.particleGap;
  nextParticle[index].particleSize = 1;
  nextParticle[index].start();
}

for (let index = 0; index < 4; index++) {
  nextParticle[index] = new NextParticle({
    image: index === 0 ? document.all.logo : document.all[`logo${index}`],
    ...defaultOptions,
  });

  window.onresize = function () {
    if (window.innerWidth > 600) {
      nextParticle[index].start();
    }
  };
}
