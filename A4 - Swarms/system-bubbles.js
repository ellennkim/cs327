/* globals Vue, systems */

(function () {
  let system = {
    hide: false,
    name: "bubbles",
    description: "Bubble particles that pop when they collide into each other",
    
    radius: 5,
    speed: 5,

    setup(p, {}) {
      this.particles = [];
      for (var i = 0; i < 10; i++) {
        let pt = p.createVector(
          Math.random() * p.width,
          Math.random() * p.height
        );
        pt.radius = this.radius;
        pt.idNumber = this.particles.length;
        pt.velocity = p.createVector(
          (Math.random() - 0.5) * this.speed,
          (Math.random() - 0.5) * this.speed
        );
        this.particles.push(pt);
      }
    },

    update(p, { deltaTime, time }) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        let bubble1 = this.particles[i];
        let radius = this.radius;
        for (let j = i - 1; j >= 0; j--) {
          let bubble2 = this.particles[j];
          let distance = p.dist(bubble1.x, bubble1.y, bubble2.x, bubble2.y);
          if (distance < bubble1.radius + bubble2.radius) {
            // Bubbles collide; remove the smaller bubble
            if (bubble1.radius > bubble2.radius) {
              this.particles.splice(j, 1);
            } else {
              this.particles.splice(i, 1);
            }
            i--;
            break;
          }
        }
      }

      this.particles.forEach((pt) => {
        pt.force = p.createVector(0, 0);
        pt.velocity.add(pt.force);
        pt.add(pt.velocity);

        pt.x = p.constrain(pt.x, pt.radius, p.width - pt.radius);
        pt.y = p.constrain(pt.y, pt.radius, p.height - pt.radius);
      });
    },

    draw(p, { time, deltaTime, drawDebugInfo }) {
      this.particles.forEach((pt) => {
        p.fill(168, 56, 81);
        p.stroke(0);
        p.ellipse(pt.x, pt.y, this.radius * 2);
      });
      
      if (drawDebugInfo) {
        this.particles.forEach((pt) => {
          p.textSize(10);
          p.fill(255);
          p.text(`pos: ${pt.x.toFixed(2)}, ${pt.y.toFixed(2)}`, pt.x + 5, pt.y - 10);
        });
      }
    },
  };

  Vue.component(`controls-${system.name}`, {
    template: `<div>
    <div class="slider">
				<label>radius:</label>
				<input 
					type="range" min="5" max="15" step="1"  
					v-model.number="system.radius" />
			</div>
    </div>`,
		 
    data() {
      return {
        system,
      };
    },
  });

  systems.push(system);
})();
