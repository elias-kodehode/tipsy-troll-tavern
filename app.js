const canvas = document.getElementById("magic-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let lastSpawn = 0;

document.addEventListener("mousemove", (e) => {
  const now = Date.now();

  if (now - lastSpawn > 60) { // higher number = fewer particles
    lastSpawn = now;

    particles.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 5 + 2,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      life: 100
    });
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    p.x += p.speedX;
    p.y += p.speedY;
    p.life--;

    // magical glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = "purple";
    
    // random sparkle colors
    const colors = ["#c084fc","#a78bfa","#e9d5ff","#d8b4fe"];
    ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    if (p.life <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

animate();