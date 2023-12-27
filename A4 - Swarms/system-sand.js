/* globals Vue, systems, Vector2D */

(function () {
  let system = {
    hide: false,
    name: "sand",
    description: "sand particles that avoid the mouse",
    avoidanceStrength: 100,
    mouseStrength: 100,
    color0: [43, 68, 72],

    setup(p, {}) {
      console.log("SETUP BASICS");
      this.particles = [];
      for (var i = 0; i < 100; i++) {
        this.createParticle(p);
      }
    },

    createParticle(p) {
      let pt = new Vector2D(Math.random() * p.width, p.height);
      pt.particles = this.particles;
      pt.idNumber = this.particles.length;
      pt.velocity = new Vector2D();
      pt.force = new Vector2D();
      pt.avoidanceToMouseForce = new Vector2D();
      pt.mouseForce = new Vector2D();
      this.particles.push(pt);
    },

    update(p, { deltaTime, time }) {
      console.log("UPDATE");
      let center = new Vector2D(p.width / 2, p.height / 2);

      this.particles.forEach((pt) => {
        pt.avoidanceToMouseForce.setTo(0, 0);
        let distanceToMouse = Vector2D.distance(
          pt,
          new Vector2D(p.mouseX, p.mouseY)
        );

        // If the distance is too close, apply avoidance force to move away from the mouse
        if (distanceToMouse < this.avoidanceStrength) {
          let avoidanceToMouseDirection = Vector2D.sub(
            pt,
            new Vector2D(p.mouseX, p.mouseY)
          ).normalize();
          let avoidanceToMouseForce =
            this.avoidanceStrength / (distanceToMouse + 1);
          pt.avoidanceToMouseForce.addMultiple(
            avoidanceToMouseDirection,
            avoidanceToMouseForce
          );
        }

        pt.mouseForce.setTo(0, 0);

        if (pt.y < p.height - 10) {
          pt.mouseForce.y = this.mouseStrength;
        }

        pt.force.setToAdd(pt.avoidanceToMouseForce, pt.mouseForce);
      });

      this.particles.forEach((pt) => {
        pt.velocity.addMultiple(pt.force, deltaTime);
        pt.addMultiple(pt.velocity, deltaTime);
        pt.y = p.constrain(pt.y, p.height - 10, p.height);
        pt.x = p.constrain(pt.x, 0, p.width);
      });
    },

    draw(p, { time, deltaTime, drawDebugInfo }) {
      this.particles.forEach((pt) => {
        p.fill(...this.color0);
        p.noStroke();
        p.circle(pt.x, pt.y, 10);
      });

      if (drawDebugInfo) {
        this.particles.forEach((pt) => {
          p.stroke(0);
          p.strokeWeight(1);
          p.fill(255);
          p.text(`Avoidance Strength: ${this.avoidanceStrength}`, 10, 60);
          pt.drawArrow(p, {
            multiplyLength: 0.3,
            v: pt.force,
            color: [277, 65, 44],
            startOffset: 10,
          });
        });
      }
    },
  };

  Vue.component(`controls-${system.name}`, {
    template: `<div>
    <div class="slider">
				<label>avoidance:</label>
				<input 
					type="range" min="50" max="500" step="1"  
					v-model.number="system.avoidanceStrength" />
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
