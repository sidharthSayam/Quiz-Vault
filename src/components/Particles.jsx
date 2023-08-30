import React, { useEffect, useRef } from "react";

const Particles = () => {
  const canvasRef = useRef(null);
  const allParticlesRef = useRef([]);
  let hue = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const allParticles = allParticlesRef.current;

    const resizeHandler = () => {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
    };

    const mouseMoveHandler = (event) => {
      const mouseTracker = {
        x: event.clientX,
        y: event.clientY,
      };

      for (let i = 0; i < 10; i++) {
        allParticles.push(new Particle(mouseTracker));
      }
    };

    class Particle {
      constructor(mouseTracker) {
        this.x = mouseTracker.x;
        this.y = mouseTracker.y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 2;
        this.speedY = Math.random() * 3 - 2;
        this.color = `hsl(${hue}, 100%, 50%)`;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0) {
          this.size -= 0.03;
        }
      }
      paint() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.abs(this.size), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const paintParticles = () => {
      for (let i = 0; i < allParticles.length; i++) {
        allParticles[i].update();
        allParticles[i].paint();
        for (let j = i; j < allParticles.length; j++) {
          let distanceX = allParticles[i].x - allParticles[j].x;
          let distanceY = allParticles[i].y - allParticles[j].y;
          let distance = Math.sqrt(
            distanceX * distanceX + distanceY * distanceY
          );
          if (distance > 70 && distance < 80) {
            ctx.beginPath();
            ctx.strokeStyle = allParticles[i].color;
            ctx.lineWidth = allParticles[i].size / 10;
            ctx.moveTo(allParticles[i].x, allParticles[i].y);
            ctx.lineTo(allParticles[j].x, allParticles[j].y);
            ctx.stroke();
          }
        }
        if (allParticles[i].size <= 0.3) {
          allParticles.splice(i, 1);
          i--;
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      paintParticles();
      hue += 2;
      requestAnimationFrame(animate);
    };

    resizeHandler();

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("mousemove", mouseMoveHandler);

    animate();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default Particles;
