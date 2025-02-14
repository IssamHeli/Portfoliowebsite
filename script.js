document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.menu');
  const sidebar = document.querySelector('.sidebar');
  const sidebarLinks = document.querySelectorAll('.sidebar-links a');  // Select all sidebar links

  // Toggle the 'active' class on hamburger click to show/hide the sidebar
  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Add event listener to hide the sidebar when a link is clicked
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('active'); // Remove the 'active' class to hide the sidebar

      hamburger.classList.remove('active');
    });
  });
  const images = document.querySelectorAll("img[data-src]");
  images.forEach(img => {
    img.src = img.dataset.src;
  });

});

const SidebarButton = document.getElementById('theme-toggle-sidebar');

const Hamburger = document.querySelector('.menu');
const Sidebar = document.querySelector('.sidebar');
SidebarButton.addEventListener('click',()=>{
 
  Sidebar.classList.remove('active');

  Hamburger.classList.remove('active');
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
    this.size = Math.random() * 10 + 1;
    this.speedX = Math.random() * 3 - 1;
    this.speedY = Math.random() * 3 - 1;
    this.color = Math.random() < 0.5 
    ? `rgba(255, 0, 0, ${Math.random()})`  // Red with random transparency
    : `rgba(255, 255, 255, ${Math.random()})`; 

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

const interactiveBackground = document.getElementById('interactiveBackground');
let animationInterval;
let isAnimating = false;

function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  
  const size = Math.random() * 60 + 20;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.bottom = '-80px';
  bubble.style.animationDuration = `${Math.random() * 5 + 5}s`;

  interactiveBackground.appendChild(bubble);

  bubble.addEventListener('animationend', () => {
    bubble.remove();
  });
}

function clearAllBubbles() {
  const bubbles = interactiveBackground.querySelectorAll('.bubble');
  bubbles.forEach(bubble => bubble.remove());
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!isAnimating) {
        isAnimating = true;
        animationInterval = setInterval(createBubble, 500);
        setTimeout(() => {
          clearInterval(animationInterval);
          isAnimating = false;
        }, 10000);
      }
    } else {
      // When leaving view
      clearInterval(animationInterval);
      isAnimating = false;
      clearAllBubbles();
    }
  });
}, { threshold: 0.5 });

observer.observe(interactiveBackground);
// Trigger animations on scroll for experience and education items
window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.about , .project-item, .resume-section,.container1,.blog-post');

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if the element is in view
    if (rect.top < windowHeight - 50 && rect.bottom > 0) {
      el.classList.add('in-view'); // Add animation class when in view
    } else {
      el.classList.remove('in-view'); // Remove animation class when out of view
    }
  });
});


// Smooth scroll for sections
document.querySelectorAll('.resume-heading').forEach((heading) => {
  heading.addEventListener('click', (event) => {
    const section = event.target.closest('.resume-block');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();

    const form = this;
    const Name = document.getElementById('name').value.trim();
    const Email = document.getElementById('email').value.trim();
    const Message = document.getElementById('message').value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    if (!Name) {
      errorMessage.textContent = 'Please enter your name.';
      errorMessage.style.display = 'block';
      return;
    }

    if (!Email) {
      errorMessage.textContent = 'Please enter your Email.';
      errorMessage.style.display = 'block';
      return;
    } 
    if (!emailPattern.test(Email)) {
      errorMessage.textContent = 'Please enter Valid Email Adresse.';
      errorMessage.style.display = 'block';
      return;
    }

    if (!Message) {
      errorMessage.textContent = 'Please enter Your Message';
      errorMessage.style.display = 'block';
      return;
    }

    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    const userApi = "suHNSJiEMegyzNB31";
    const templateParams = {
      from_name: "Contact from Portfolio",
      TYPE: "Contact",
      Name: Name,
      Email: Email,
      Message: Message
    };

    emailjs.send("service-contacter-portfo", "Portfolio-TemplateId", templateParams, userApi)
      .then(function(response) {
        form.reset();
        successMessage.style.display = 'block';
        
      }, function(error) {
        errorMessage.style.display = 'block';
      });
  });
});


window.addEventListener('load', () => {
  const loadingSpinner = document.getElementById('loading-spinner');
  loadingSpinner.classList.add('hide'); // Fade out
  setTimeout(() => {
    loadingSpinner.style.display = 'none'; // Remove from DOM
  }, 500); // Match the transition duration
});

// Function to set the theme
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateButtonIcons(theme); // Update the button icons based on the theme
}

// Function to toggle between dark and light themes
function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

// Function to update the button icons based on the current theme
function updateButtonIcons(theme) {
  const navButton = document.getElementById('theme-toggle-nav');
  const sidebarButton = document.getElementById('theme-toggle-sidebar');

  if (theme === 'dark') {
    navButton.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark theme
    sidebarButton.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    navButton.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for light theme
    sidebarButton.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Event listeners for the theme toggle buttons
document.getElementById('theme-toggle-nav').addEventListener('click', toggleTheme);
document.getElementById('theme-toggle-sidebar').addEventListener('click', toggleTheme);

// Initialize the theme based on user preference or saved theme
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(prefersDark ? 'dark' : 'light');
  }
}

// Initialize the theme when the page loads
initializeTheme();