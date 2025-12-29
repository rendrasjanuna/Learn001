const savedUsername = "admin";
const savedPassword = "12345";

document.getElementById("loginform").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  if (username === savedUsername && password === savedPassword) {
    
    setTimeout (() => {
      window.location.href = "satu.html"; }, 10);
    
  } else {
    
    document.getElementById("message").textContent = "Username/Password salah";
  }
});

const canvas = 
document.getElementById("particlecanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles  = [];
const particleCount = 60;

const interaction = {
  x: null,
  y: null,
  radius: 120
};

window.addEventListener("touchmove", (e) => {
  interaction.x = e.touches[0].clientX;
  interaction.y = e.touches[0].clientY;
});

window.addEventListener("touchend", () => {
  interaction.x = null;
  interaction.y = null;
});

class particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.6 - 0.3;
    this.speedY = Math.random() * 0.6 - 0.3;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    
    if (interaction.x && interaction.y) {
      const dx = this.x - interaction.x;
      const dy = this.y - interaction.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < interaction.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (interaction.radius - distance) / interaction.radius;
        
        this.x += Math.cos(angle) * force * 5;
        this.y += Math.sin(angle) * force * 5;
      }
    }
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});