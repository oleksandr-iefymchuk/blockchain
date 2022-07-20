"use strict";

// open top form
const headerButton = document.querySelector(".header-button");
const topForm = document.querySelector(".top-form-wrapper");
const closeIcon = document.querySelector(".close-icon");

function openTopForm() {
  setTimeout(() => {
    topForm.classList.toggle("_activ");
    document.body.classList.toggle("_lock");
  }, 300);
}

function closeTopForm() {
  if (topForm.classList.contains("_activ")) {
    setTimeout(() => {
      topForm.classList.remove("_activ");
      document.body.classList.remove("_lock");
    }, 500);
  }
}

headerButton.addEventListener("click", openTopForm);
closeIcon.addEventListener("click", closeTopForm);

//slider

const sliderLine = document.querySelector(".slider-line");
const sliderBlock = document.querySelectorAll(".border");

let count = 0;
let width;
let w = document.body.clientWidth;

function init() {
  if (w < 800) {
    width = document.querySelector(".slider").offsetWidth;
  } else {
    width = document.querySelector(".slider").offsetWidth / 3;
  }
  sliderLine.style.width = width * sliderBlock.length + "px";
  sliderBlock.forEach((item) => {
    item.style.width = width + "px";
    item.style.height = "auto";
  });
  rollSlide();
}
init();
window.addEventListener("resize", init);

document.querySelector(".button-slider-prev").addEventListener("click", function () {
  count--;
  if (count < 0) {
    count = sliderBlock.length - 3;
  }
  rollSlide();
});
document.querySelector(".button-slider-next").addEventListener("click", function () {
  count++;
  if (count >= sliderBlock.length - 2) {
    count = 0;
  }
  rollSlide();
});

function rollSlide() {
  sliderLine.style.transform = "translate(-" + count * width + "px)";
}

//arrow back to top
const arrowBot = document.querySelector(".arrow");
function appearArrow() {
  if (window.scrollY > 1300) {
    arrowBot.classList.add("arrow-show");
  } else {
    arrowBot.classList.remove("arrow-show");
  }
}

function backToTop() {
  if (window.scrollY > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 10);
  }
}

window.addEventListener("scroll", appearArrow);
arrowBot.addEventListener("click", backToTop);

// archor
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute("href").substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// animation on scroll
const animItems = document.querySelectorAll(".anim-items");
if (animItems.length > 0) {
  window.addEventListener("scroll", animScroll);
  function animScroll() {
    for (let i = 0; i < animItems.length; i++) {
      const animItem = animItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 5;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
        animItem.classList.add("activ");
      } else {
        if (!animItem.classList.contains("anim-no-hide")) {
          animItem.classList.remove("activ");
        }
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  // setTimeout(() => { animScroll(); }, 300);
}

// burger menu
const headerNavbar = document.querySelector(".header-navbar");
const burgerMenu = document.querySelector(".menu-icon");
const navLink = document.querySelectorAll(".nav-link");

function openBurgerMenu() {
  setTimeout(() => {
    headerNavbar.classList.toggle("_activ");
    burgerMenu.classList.toggle("_activ");
    document.body.classList.toggle("_lock");
  }, 300);
}

function closeBurgerMenu() {
  if (burgerMenu.classList.contains("_activ")) {
    setTimeout(() => {
      headerNavbar.classList.remove("_activ");
      burgerMenu.classList.remove("_activ");
      document.body.classList.remove("_lock");
    }, 1000);
  }
}

burgerMenu.addEventListener("click", openBurgerMenu);

navLink.forEach((navHeaderItem) => {
  navHeaderItem.addEventListener("click", closeBurgerMenu);
});

// canvas lines
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
