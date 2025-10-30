const techBg = document.querySelector(".tech-background");
const cubes = document.querySelectorAll(".cube");
const robot = document.querySelector(".advanced-robot");
const trail = document.querySelector(".cursor-trail");

// CREATE PARTICLES (lightning sparks)
for (let i = 0; i < 200; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  particle.style.setProperty("--tx", (Math.random() - 0.5) * 1000 + "px");
  particle.style.setProperty("--ty", (Math.random() - 0.5) * 1000 + "px");
  particle.style.animationDelay = Math.random() * 10 + "s";
  particle.style.animationDuration = Math.random() * 3 + 2 + "s";
  techBg.appendChild(particle);
}

// MOUSE PARALLAX + CURSOR TRAIL
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 120;
  const y = (e.clientY / window.innerHeight - 0.5) * 120;
  techBg.style.transform = `translateX(${x}px) translateY(${y}px)`;
  if (robot)
    robot.style.transform = `translateY(-50%) translateX(${
      x / 2
    }px) translateY(${y / 2}px)`;
  cubes.forEach((cube, i) => {
    cube.style.transform = `translateY(${
      Math.sin(Date.now() / 500 + i) * 40
    }px) rotateX(${x * (i + 1)}deg) rotateY(${y * (i + 1)}deg)`;
  });
  trail.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// FLOATING CUBES + SPARK
function animateCubes() {
  const time = Date.now() / 100;
  cubes.forEach((cube, i) => {
    const floatY = Math.sin(time / 100 + i) * 50;
    const rotate = time / 10;
    cube.style.transform = `translateY(${floatY}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
  });
  requestAnimationFrame(animateCubes);
}
animateCubes();

// CUBES CLICK LIGHTNING SPARK
cubes.forEach((cube) => {
  cube.addEventListener("click", () => {
    cube.style.transition =
      "transform 0.2s ease-out, opacity 0.2s ease-out, box-shadow 0.2s";
    cube.style.transform += " scale(2)";
    cube.style.boxShadow = "0 0 80px #00ffff, 0 0 120px #ff4b6e";
    cube.style.opacity = 0;
    setTimeout(() => {
      cube.style.transform = "";
      cube.style.opacity = 0.9;
      cube.style.boxShadow = "0 0 35px rgba(0,255,255,0.6)";
    }, 300);
  });
});
