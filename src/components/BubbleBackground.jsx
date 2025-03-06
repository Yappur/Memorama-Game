import { useEffect, useRef } from "react";

const BubbleBackground = () => {
  const canvasRef = useRef(null);
  let animationFrameId;

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");

    // Ajustamos la altura para dejar espacio para el footer
    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight * 0.9); // Reducimos al 90% de la altura

    const bubblesNumber = w * h > 750000 ? 200 : 150;
    const maxRadius = w * h > 500000 ? 50 : 35;
    const maxYVelocity = 2;
    const objects = [];

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    class Vector {
      constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
      }

      add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
      }

      multiply(value) {
        this.x *= value;
        this.y *= value;
        return this;
      }
    }

    class Bubble {
      constructor(x, y, speed, radius, hue) {
        this.x = x;
        this.y = y;
        this.startX = this.x;
        this.speed = speed;
        this.radius = radius;
        this.hue = hue;
      }

      update(world) {
        this.x = this.startX + Math.cos(this.y / 80) * 40;
        this.y += this.speed;
        if (this.y + this.radius < 0) {
          this.y = world.physicalProperties.height + this.radius;
        }
      }

      render($) {
        $.beginPath();
        $.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        $.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        $.fill();
      }

      pop(world) {
        world.objects = world.objects.filter((obj) => obj !== this);
      }
    }

    class World {
      constructor(physicalProperties, objects, ctx, background) {
        this.physicalProperties = physicalProperties;
        this.objects = objects;
        this.ctx = ctx;
        this.background = background;
      }

      update() {
        this.objects.forEach((obj) => obj.update(this));
      }

      render() {
        this.ctx.clearRect(0, 0, w, h);
        if (this.background) {
          this.ctx.fillStyle = this.background;
          this.ctx.fillRect(0, 0, w, h);
        }
        this.objects.forEach((obj) => obj.render(this.ctx));
      }

      animate = () => {
        this.update();
        this.render();
        animationFrameId = requestAnimationFrame(this.animate);
      };
    }

    for (let i = 0; i < bubblesNumber; i++) {
      objects.push(
        new Bubble(
          Math.random() * w,
          Math.random() * h,
          -randomInRange(0.5, maxYVelocity),
          randomInRange(5, maxRadius),
          randomInRange(0, 360)
        )
      );
    }

    const world = new World(
      { width: w, height: h },
      objects,
      ctx,
      "rgb(111, 140, 255)"
    );

    ctx.globalCompositeOperation = "lighter";
    world.animate();

    const handleResize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight * 0.9; // Mantenemos el 90% en el resize
      world.physicalProperties.width = w;
      world.physicalProperties.height = h;
      ctx.globalCompositeOperation = "lighter";
    };

    const handleMouseMove = (e) => {
      for (let i = 0; i < world.objects.length; i++) {
        const obj = world.objects[i];
        if (
          obj instanceof Bubble &&
          e.clientX > obj.x - obj.radius &&
          e.clientX < obj.x + obj.radius &&
          e.clientY > obj.y - obj.radius &&
          e.clientY < obj.y + obj.radius
        ) {
          obj.pop(world);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationFrameId]);

  return (
    <canvas
      ref={canvasRef}
      id="c"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "90vh",
        zIndex: -1,
      }}
    />
  );
};

export default BubbleBackground;
