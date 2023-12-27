/* globals Vue, p5, masks, CONTOURS, Vector2D */
(function () {
  let mask = {
    //=========================================================================================
    // TODO: custom data

    hide: false,
    name: "danglemask", // Lowercase only no spaces! (we reuse this for some Vue stuff)
    description: "a mask with some particle systems",

    eyebrowRaise: 1,
    // What kind of data does your mask need?

    //=========================================================================================

    setup({ p }) {
      // Runs when you start this mask
      console.log("START MASK - ", this.name);
    },

    drawBackground({ p }) {
      // console.log(this.backgroundTransparency);
      p.background(100, 100, 100);
    },

    setupHand({ p, hand }) {
      // Any data that you need on each hand
    },

    setupFace({ p, face }) {
      // Any data that you need on each face

      face.particles = [];
      face.earrings = [];
      face.eyeballs = [];

      face.ears.forEach((ear) => {
        let dangleCount = 10;
        for (var i = 0; i < dangleCount; i++) {
          // Earring particle
          let pt = new Vector2D(0, 0);
          pt.velocity = new Vector2D(0, 0);
          pt.force = new Vector2D(0, 0);
          pt.offsetToParent = new Vector2D(0, 0);
          pt.parent = ear;
          pt.idNumber = i;

          face.particles.push(pt);
          face.earrings.push(pt);
        }
      });

      face.eyes.forEach((eye) => {
        // Earring particle
        let pt = new Vector2D(0, 0);
        pt.velocity = new Vector2D(0, 0);
        pt.force = new Vector2D(0, 0);
        pt.offsetToParent = new Vector2D(0, 0);
        pt.parent = eye;

        face.particles.push(pt);
        face.eyeballs.push(pt);
      });
    },

    drawHand({ p, hand }) {},

    drawFace({ p, face }) {
      let t = p.millis() * 0.001;
      let dt = p.deltaTime * 0.001;
      // Before drawing the face, do my particle simulation
      face.particles.forEach((pt) => {
        pt.force.mult(0);
      });

      // Set earring forces
      face.earrings.forEach((pt) => {
        // apply force toward ear
        pt.offsetToParent.setToOffset(pt.parent, pt);

        // Wander force
        pt.force.addPolar(60, pt.idNumber);
        pt.force.addMultiple(pt.offsetToParent, -2.9);

        // gravity
        pt.force.y += 200;
        if (pt.offsetToParent.magnitude > 100)
          pt.setToLerp(pt, pt.parent, 0.01);
      });

      // Set eyeball forces
      face.eyeballs.forEach((pt) => {
        // be attracted to parent
        pt.velocity.mult(0.9);
        pt.force.addMultiple(pt.offsetToParent, -60);

        // apply force toward ear
        pt.offsetToParent.setToOffset(pt.parent, pt);
        if (pt.offsetToParent.magnitude > 10) pt.setToLerp(pt, pt.parent, 0.1);
      });

      // Particle update v and pos
      face.particles.forEach((pt) => {
        pt.velocity.mult(0.99);
        pt.addMultiple(pt.velocity, dt);
        pt.velocity.addMultiple(pt.force, dt);
      });

      p.noFill();
      face.landmarks.forEach((pt) => {
        p.stroke(1);

        p.circle(...pt, 10);
      });

      face.earrings.forEach((pt, index) => {
        p.fill(0, 100, 50);
        p.circle(...pt, 20);
        p.stroke(1);
        p.strokeWeight(1);
        p.line(...pt, ...pt.parent);

        // console.log(pt.offsetToParent)
        // pt.drawArrow(p, {v:pt.offsetToParent})
        p.noStroke();

        let sparkleBrightness = p.noise(pt.x * 0.02, pt.y * 0.02 + pt.idNumber);
        sparkleBrightness = 4 * sparkleBrightness ** 4;
        p.fill(0, 100, sparkleBrightness * 50 + 50);
        p.circle(...pt, 10);
      });

      // draw eyes
      face.eyeballs.forEach((pt, index) => {
        p.fill(100);
        p.stroke(0);
        p.circle(...pt.parent, 50);

        p.fill(0);
        p.stroke(0);
        p.circle(...pt, 30);
      });

      //. draw eyebrows

      face.forEachSide((sideIndices, sideIndex) => {
        let eyeRing0 = sideIndices.eyeRings[0];
        let eyeRing1 = sideIndices.eyeRings[1];
        face.drawContour({
          p,
          contour: eyeRing0.slice(2, 7),
          contour1: eyeRing1.slice(2, 7),
          transformPoint(finalPoint, basePoint, index) {
            // Take this *original* eyebrow point, and push it somewhere
            
            let eye = face.eyes[sideIndex]
            console.log(this.eyebrowRaise)
            finalPoint.setToLerp(eye, basePoint, Math.sin(t*5) + 1.5)
            // console.log(finalPoint)
          },
        });
      });

      // HILAROUS BROWS
      //  face.forEachSide(sideIndices => {
      //     let eyeRing0 = sideIndices.eyeRings[0]
      //      let eyeRing1 = sideIndices.eyeRings[1]
      //      face.drawContour({p, contour: eyeRing0.slice(1, 7)})
      // })
    },
  };

  //============================================================
  /**
   * Input controls for this bot.
   * Do we just need a chat input? Do we need anything else?
   * What about game controls, useful buttons, sliders?
   **/

  Vue.component(`input-${mask.name}`, {
    // Custom inputs for this bot
    template: `<div>
		
			<div>
      
      <input type="range" v-model ="mask.eyebrowRaise"  min="1" max="2" step=".1"/>
			</div>
		</div>`,

    // Custom data for these controls
    data() {
      return {};
    },
    props: { mask: { required: true, type: Object } }, // We need to have bot
  });

  masks.push(mask);
})();
