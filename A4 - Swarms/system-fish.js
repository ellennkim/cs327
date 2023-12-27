/* globals Vue, systems, Vector2D */

(function () {
  let system = {
    hide: false,
    name: "fish", // Lowercase only no spaces! (we reuse this for some Vue stuff)
    description: "fish that keep track of trail",

    //=====================
    // tuning values
    
    color1: [324, 64, 62],
    color2: [26, 74, 63],

    //=====================
    // events

    setup(p, {}) {   
      this.particles = [];
      for (var i = 0; i < 10; i++) {
        let pt = new Vector2D(
          Math.random() * p.width,
          Math.random() * p.height
        );

        pt.idNumber = this.particles.length;

        pt.velocity = new Vector2D();
        pt.force = Vector2D.polar(100, Math.random() * 100);

        pt.wanderForce = new Vector2D();
        pt.trail = [];
        pt.size = 10 + Math.random() * 10;

        this.particles.push(pt);
      }
    },

    update(p, { deltaTime, time }) {
      let center = new Vector2D(p.width / 2, p.height / 2);

      this.particles.forEach((pt) => {

        let rateOfWanderChange = 0.2;
        let angle = Math.sin(time) * 50 * p.noise(pt.idNumber);
        pt.wanderForce.setToPolar(50, angle);

        // Add up all the forces
        pt.force.setToAdd(pt.wanderForce);
      });

      // Move the particles
      this.particles.forEach((pt) => {
        // This stays the same for most particle systems
        // They all follow the same
        // - add-acceleration-to-velocity
        // - add-velocity-to-position
        // routine

        // Apply the force to the velocity
        pt.velocity.addMultiple(pt.force, deltaTime);

        // Apply the velocity to the position
        pt.addMultiple(pt.velocity, deltaTime);
      });

      
      // Post movement
      this.particles.forEach((pt) => {
        // TODO  (optional) Do something with the particles after moving
        let border = 10;
        pt.wrap(-border, -border, p.width + border, p.height + border);
        pt.velocity.constrain(10, 50);
        pt.trail.unshift(pt.clone());
        pt.trail = pt.trail.slice(0, 10);
      });
    },

    draw(p, { time, deltaTime, drawDebugInfo }) {
      this.particles.forEach((pt) => {
          p.stroke(...this.color1);
          // TODO - Draw debug info for each particle
          p.fill(...this.color2);
          pt.trail.forEach((pt2, index) => {
            let size = p.map(index, 0, pt.trail.length, pt.size, 0);
            p.circle(...pt2, size);
          });

          p.push();
          p.translate(...pt);
          p.stroke(255);
          p.strokeWeight(1);
          p.fill(0);
          // p.circle(6, -2, 3);
          p.fill(...this.color1);
          p.stroke(302, 76, 39);
          p.triangle(3, 0, 6, -8, 6, 8);
          p.triangle(-3, 0, -6, -8, -6, 8);

          p.pop();
      
      });

      if (drawDebugInfo) {
        this.particles.forEach((pt) => {
          p.fill(255);
          p.stroke(0);
          p.text(pt.trail.length, pt.x + 5, pt.y - 10)
        });
      }
    },
  };

  /*
   * Controls for this system
   */

  Vue.component(`controls-${system.name}`, {
    template: `<div>
      <color-picker 
      v-model="system.color1"></color-picker>  
      <color-picker 
      v-model="system.color2"></color-picker>
		</div>`,
    data() {
      return {
        system,
      };
    },
  });

  systems.push(system);
})();
