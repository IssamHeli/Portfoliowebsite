document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
  
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('active');  // Toggle the 'active' class to show/hide the sidebar
    });
  });
 

  const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");

// Resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = `rgba(0, 0, 0, ${Math.random()})`; // Black particles
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}


function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
  }
}

function handleMouseMove(event) {
  particles.push(new Particle(event.clientX, event.clientY));
  if (particles.length > particleCount) particles.shift();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animate);
}

// Initialize and run animation
initParticles();
animate();

// Mouse interaction
window.addEventListener("mousemove", handleMouseMove);

// Adjust canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
