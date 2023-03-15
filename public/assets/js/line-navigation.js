// for another helper function that calculates the exact progress value along a motion path where it'll hit the center of the provided target on the given axis ("y" by default), see https://codepen.io/GreenSock/pen/BaPdrKM
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

gsap.set("#motionSVG", { scale: 0, autoAlpha: 1 });
gsap.set("#element", {transformOrigin: "50% 50%"});
let rotateTo = gsap.quickTo("#element", "rotation"),
    prevDirection = 0;

gsap.to("#element", {
  scrollTrigger: {
    trigger: "#motionPath",
    start: "top center",
    end: () => "+=" + document.querySelector("#motionPath").getBoundingClientRect().height,
    scrub: 0.5,
    markers: true,
    onUpdate: self => {
      if (prevDirection !== self.direction) { // only run this when we're changing direction
        rotateTo(self.direction === 1 ? 0 : -180);
        prevDirection = self.direction;
      }
    }
  },
  ease: pathEase("#motionPath"), // a custom ease that helps keep the tractor centered
  immediateRender: true,
  motionPath: {
    path: "#motionPath",
    align: "#motionPath",
    alignOrigin: [0.5, 0.5],
    autoRotate: 90,
  }
});




// helper function that returns and ease that bends time to ensure the tractor stays relatively centered. Requires MotionPathPlugin of course
function pathEase(path, axis="y", precision=1) {
		let rawPath = MotionPathPlugin.cacheRawPathMeasurements(MotionPathPlugin.getRawPath(gsap.utils.toArray(path)[0]), Math.round(precision * 12)),
			useX = axis === "x",
			start = rawPath[0][useX ? 0 : 1],
			end = rawPath[rawPath.length - 1][rawPath[rawPath.length-1].length - (useX ? 2 : 1)],
			range = end - start,
			l = Math.round(precision * 200),
			inc = 1 / l,
			positions = [0],
			a = [],
			minIndex = 0,
			getClosest = p => {
				while (positions[minIndex] <= p && minIndex++ < l) { }
				a.push((p - positions[minIndex-1]) / (positions[minIndex] - positions[minIndex - 1]) * inc + minIndex * inc);
			},
			i = 1,
			p, v;
		for (; i < l; i++) {
			p = i / l;
			v = MotionPathPlugin.getPositionOnPath(rawPath, p)[axis];
			positions[i] = (v - start) / range;
		}
		positions[l] = 1;
		for (i = 0; i < l; i++) {
			getClosest(i / l);
		}
		a.push(1);
		return p => {
			let i = p * l,
				s = a[i | 0];
			return s + (a[Math.ceil(i)] - s) * (i % 1);
		}
	}