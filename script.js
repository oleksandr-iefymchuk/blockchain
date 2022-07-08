(function () {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  let w = (canvas.width = innerWidth);
  let h = (canvas.height = innerHeight);
  let particles = [];
  let properties = {
    particleColor: "rgba(255, 255, 255, 1)",
    particleRadius: 3,
    particleCount: 60,
    particleMaxSpeed: 0.5,
    lineLength: 150,
    particleLife: 6,
  };

  window.onresize = function () {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  };

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.speedX = Math.random() * (properties.particleMaxSpeed * 2) - properties.particleMaxSpeed;
      this.speedY = Math.random() * (properties.particleMaxSpeed * 2) - properties.particleMaxSpeed;
      this.life = Math.random() * properties.particleLife * 60;
    }
    position() {
      (this.x + this.speedX > w && this.speedX > 0) || (this.x + this.speedX < 0 && this.speedX < 0) ? (this.speedX *= -1) : this.speedX;
      (this.y + this.speedY > h && this.speedY > 0) || (this.y + this.speedY < 0 && this.speedY < 0) ? (this.speedY *= -1) : this.speedY;
      this.x += this.speedX;
      this.y += this.speedY;
    }
    reDraw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = properties.particleColor;
      ctx.fill();
    }
    reCalculateLife() {
      if (this.life < 1) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.speedX = Math.random() * (properties.particleMaxSpeed * 2) - properties.particleMaxSpeed;
        this.speedY = Math.random() * (properties.particleMaxSpeed * 2) - properties.particleMaxSpeed;
        this.life = Math.random() * properties.particleLife * 60;
      }
      this.life--;
    }
  }

  function drawLines() {
    let x1, y1, x2, y2, length, opacity;
    for (let i in particles) {
      for (let j in particles) {
        x1 = particles[i].x;
        y1 = particles[i].y;
        x2 = particles[j].x;
        y2 = particles[j].y;
        length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        if (length < properties.lineLength) {
          opacity = 1 - length / properties.lineLength;
          ctx.lineWidth = "0.5";
          ctx.strokeStyle = "rgba(255, 255, 255, " + opacity + ")";
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  }

  function reDrawParticles() {
    for (let i in particles) {
      particles[i].reCalculateLife();
      particles[i].position();
      particles[i].reDraw();
    }
  }

  function loop() {
    ctx.clearRect(0, 0, w, h);
    reDrawParticles();
    drawLines();
    requestAnimationFrame(loop);
  }

  function init() {
    for (let i = 0; i < properties.particleCount; i++) {
      particles.push(new Particle());
    }
    loop();
  }

  init();
})();
