/* globals Vue, systems, Vector2D */

(function () {
  let system = {
    hide: false,
    name: "seaweed", // Lowercase only, no spaces! (we reuse this for some Vue stuff)
    description: "Seaweed particles that spawn when the mouse is clicked",

    //=====================
    // tuning values

    swayAmplitude: 0.5,
    swayFrequency: 0.1,

    //=====================
    // events

    setup(p, {}) {
      // Create the initial particles
      // How many? Where?
      this.particles = [];
      for (var i = 0; i < 10; i++) {
        this.makeSeaweed(p);
      }
    },

    mousePressed(p) {
      console.log("CLICK");
      this.makeSeaweed(p);
    },

    makeSeaweed(p) {
      console.log("MAKE SEAWEED");
      // You can use a helper function, or setup here
      let pt = new Vector2D(Math.random() * p.width, p.height);

      // Helpful: a unique ID number
      pt.idNumber = this.particles.length;

      // Basic particle info
      pt.velocity = new Vector2D(0, 0);
      pt.force = new Vector2D();
      pt.isSeaweed = true;
      pt.seaweedHeight = -50 - Math.random() * 20;

      //oscillating - help from ChatGPT
      this.swayAmplitude = 2 + Math.random() * 20;
      this.swayFrequency = Math.random() * 2;
      pt.phase = Math.random() * Math.PI * 2;
      this.particles.push(pt);
    },

    update(p, { deltaTime, time }) {
      this.particles.forEach((pt) => {
        if (pt.isSeaweed) {
          pt.y =
            p.height +
            70 -
            pt.seaweedHeight * Math.sin(time * this.swayFrequency + pt.phase);
        }

        // Apply the force to the velocity
        pt.velocity.addMultiple(pt.force, deltaTime);

        // Apply the velocity to the position
        pt.addMultiple(pt.velocity, deltaTime);
      });
    },

    draw(p, { time, deltaTime, drawDebugInfo }) {
      p.background(228, 65, 44);
      this.particles.forEach((pt) => {
        // Draw the seaweed particles
        if (pt.isSeaweed) {
          p.fill(100);
          p.push();
          p.translate(...pt);
          p.stroke(116, 15, 40);
          p.strokeWeight(7);
          p.line(0, 0, 0, pt.seaweedHeight);
          p.pop();
        }
      });

      if (drawDebugInfo) {
        this.particles.forEach((pt) => {
          p.stroke(0);
          p.textSize(10);
          p.fill(255);
          p.text(`Sway Amplitude: ${this.swayAmplitude}`, 10, 20);
          p.text(`Sway Frequency: ${this.swayFrequency}`, 10, 40);
        });
      }
    },
  };

  /*
   * Controls for this system
   */

  Vue.component(`controls-${system.name}`, {
    template: `<div>
    <div class="slider">
				<label>wave frequency:</label>
				<input 
					type="range" min="0.1" max="3" step="0.1"  
					v-model.number="system.swayFrequency" />
			</div><
         </div>`,

    data() {
      return {
        system,
      };
    },
  });

  systems.push(system);
})();
