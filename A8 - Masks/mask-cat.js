/* globals Vue, p5, masks, CONTOURS, Vector2D */
(function () {
  let mask = {
    //=========================================================================================
    // TODO: custom data

    hide: false,
    name: "catmask", // Lowercase only no spaces! (we reuse this for some Vue stuff)
    description: "a mask with some examples of drawing",

    borderColor: [100, 100, 50],
    eyeColor: [300, 100, 50],
    backgroundTransparency: 1,

    catColor: [331, 45, 43],
    catDetails: [311, 31, 50],
    earHeight: 0.5,

    // What kind of data does your bot need?

    //=========================================================================================

    setup({ p }) {
      // Runs when you start this mask
      console.log("START MASK - ", this.name);
    },

    drawBackground({ p }) {
      p.background(181, 11, 50, this.backgroundTransparency);
    },

    setupHand({ p, hand }) {},

    setupFace({ p, face }) {
      face.particles = [];
      face.earrings = [];

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
    },
    drawHand({ p, hand }) {
      let t = p.millis() * 0.001;
      p.fill(
        this.catDetails[0],
        this.catDetails[1],
        (this.catDetails[2] * 15 * t) % 360
      );

      CONTOURS.fingers.forEach((finger, fingerIndex) => {
        hand.drawContour({
          p,
          contour: finger,
        });
      });
    },

    drawFace({ p, face }) {
      let t = p.millis() * 0.001;
      let dt = p.deltaTime * 0.001;
      // Before drawing the face, do my particle simulation
      face.particles.forEach((pt) => {
        pt.force.mult(0);
      });

      // Available contours
      // centerLine
      // mouth 0-4
      // sides[0-1].faceRings [0-2]
      // sides[0-1].eyeRings [0-4]

      // Do something for each side
      face.forEachSide((SIDE_CONTOURS, sideIndex) => {
        // each face countour
        for (var i = 0; i < 2; i++) {
          // Set color based on the side index, sides ahve different colors
          p.fill(...this.catColor);
          face.drawContour({
            p,
            contour: SIDE_CONTOURS.faceRings[i],
            contour1: SIDE_CONTOURS.faceRings[i + 1],
          });
        }

        face.drawContour({
          p,
          contour: SIDE_CONTOURS.faceRings[2],

          // If I want to use the center line
          contour1: CONTOURS.centerLine,
        });
      });

      // You can get points by looking up individual landmarks
      // I also added a few
      let nosePoint = face.landmarks[CONTOURS.centerLine[9]];
      let foreheadPoint = face.landmarks[CONTOURS.centerLine[0]];
      let chinPoint = face.landmarks[CONTOURS.centerLine[25]];
      // p.circle(...nosePoint, 20)
      // p.circle(...foreheadPoint, 20)
      // p.circle(...chinPoint, 20)

      // p.stroke(0);
      // p.fill(100);
      // p.circle(...face.nose, 20);
      // p.circle(...face.forehead, 20);
      // p.circle(...face.chin, 20);
      // p.circle(...face.ears[0], 20);
      // p.circle(...face.ears[1], 20);
      // p.circle(...face.eyes[0], 20);
      // p.circle(...face.eyes[1], 20);

      // p.strokeWeight(2);
      // face.nose.drawArrow(p, {
      //   v: face.offsetLength,
      //   multiplyLength: 0.3,
      //   color: [200, 100, 50],
      // });
      // face.nose.drawArrow(p, {
      //   v: face.offsetWidth,
      //   multiplyLength: 0.3,
      //   color: [0, 100, 50],
      // });
      // face.offsetEars.forEach((earOffset, index) => {
      //   face.ears[index].drawArrow(p, {
      //     v: earOffset,
      //     multiplyLength: 0.3,
      //     color: [40, 100, 50],
      //   });
      // });

      //add cat nose
      p.fill(...this.catDetails);
      p.circle(...face.nose, 25);

      // adding spline curve details ---------------------------------
      face.forEachSide((SIDE_CONTOURS, sideIndex) => {
        p.beginShape();
        let startingPoint = (nosePoint.x, nosePoint.y - 50);
        let endingPoint = (foreheadPoint.x, foreheadPoint.y + 10);
        p.curveVertex(startingPoint); //start the design a little above the nose
        p.curveVertex(startingPoint);
        let n = 5; //the value the increment the spacing by
        for (let i = 0; i < 6; i++) {
          // console.log(nosePoint.x + n, nosePoint.y - 50 - n);
          p.curveVertex(nosePoint.x + n, nosePoint.y - 50 - n);
          p.curveVertex(nosePoint.x - n, nosePoint.y - 50 - n);
          n += 10;
        }
        p.curveVertex(endingPoint);
        p.curveVertex(endingPoint);
        p.endShape();
      });

      p.fill(...this.catDetails);
      face.drawContour({
        p,
        contour: CONTOURS.centerLine.slice(0, 9), // draw contour on center line
        useCurveVertices: true,
      });

      // drawing cat ears - help from ChatGPT -------------------------
      face.forEachSide((SIDE_CONTOURS, sideIndex) => {
        let hornBase0 = face.landmarks[SIDE_CONTOURS.faceRings[1][1]];
        let hornBase1 = face.landmarks[SIDE_CONTOURS.faceRings[1][4]];

        let hornTip = Vector2D.edgePoint({
          pt0: hornBase0,
          pt1: hornBase1,
          pct: 1,
        });

        let sideVector = face.offsetEyes[sideIndex];

        hornTip.addMultiple(face.offsetLength, -this.earHeight / 2);

        p.fill(...this.catColor);
        p.stroke(...this.catDetails);
        p.strokeWeight(3);
        p.beginShape();
        p.vertex(...hornBase0);
        p.vertex(...hornBase1);
        p.vertex(...hornTip);
        p.endShape();
      });

      // eye details -----------------------------------------------
      p.fill(
        this.catDetails[0],
        this.catDetails[1],
        this.catDetails[2] * 4.5,
        90
      );

      //outer ring
      p.noStroke();
      p.fill(this.catColor[0], this.catColor[1], this.catColor[2] * 1.5);
      face.drawContour({
        p,
        contour: CONTOURS.sides[0].eyeRings[1],
      });

      face.drawContour({
        p,
        contour: CONTOURS.sides[1].eyeRings[1],
      });

      //inner ring
      p.fill(...this.catDetails);
      face.drawContour({
        p,
        contour: CONTOURS.sides[0].eyeRings[3],
      });

      face.drawContour({
        p,
        contour: CONTOURS.sides[1].eyeRings[3],
      });

      // Draw basic eye contours for the innermost eye
      p.fill(255, 255, 255);
      p.stroke(...this.catDetails);
      p.strokeWeight(3);
      face.drawContour({
        p,
        contour: CONTOURS.sides[0].eyeRings[4],
        useCurveVertices: true,
      });

      face.drawContour({
        p,
        contour: CONTOURS.sides[1].eyeRings[4],
        useCurveVertices: true,
      });

      // DRAW EACH EYE
      face.eyes.forEach((eyePt) => {
        p.fill(0);
        p.stroke(0);
        p.strokeWeight(1);
        p.circle(...eyePt, 10);

        p.fill(100);
        p.circle(eyePt.x, eyePt.y - 5, 3);
      });

      // draw mouth
      CONTOURS.mouth.slice(2).forEach((mouthLine, mouthIndex) => {
        p.fill(...this.catDetails);
        let b = (40 + 1000 * mouthIndex + 100 * t) % 360; // change colors
        p.fill(this.catDetails[0], this.catDetails[1], b);
        face.drawContour({
          p,
          contour: mouthLine.slice(0),
          close: true,
        });
      });

      // earrings --------------------------------------------------
      // earring forces
      face.earrings.forEach((pt) => {
        pt.offsetToParent.setToOffset(pt.parent, pt);

        // wander force
        pt.force.addPolar(80, pt.idNumber);
        pt.force.addMultiple(pt.offsetToParent, -2.9);

        // gravity force
        pt.force.y += 200;
        if (pt.offsetToParent.magnitude > 100)
          pt.setToLerp(pt, pt.parent, 0.01);
      });

      // apply the forces
      face.particles.forEach((pt) => {
        pt.velocity.mult(0.95); // higher number -> moves around more
        pt.addMultiple(pt.velocity, dt);
        pt.velocity.addMultiple(pt.force, dt);
      });

      // draw earrings
      face.earrings.forEach((pt, index) => {
        p.fill(52, 78, 52);
        p.circle(...pt, 20);
        p.stroke(...this.catDetails);
        p.strokeWeight(1);
        p.line(...pt, ...pt.parent);
        console.log(...pt);

        //tassel earring effect
        p.strokeWeight(5);
        p.line(...pt, pt.x, pt.y + 50);
        p.stroke(
          this.catDetails[0],
          this.catDetails[1],
          this.catDetails[2] * 0.65
        );
        p.line(pt.x, pt.y, pt.x - 10, pt.y + 60);
        p.line(pt.x, pt.y, pt.x + 10, pt.y + 60);

        p.stroke(
          this.catDetails[0],
          this.catDetails[1],
          this.catDetails[2] * 0.25
        );
        p.line(pt.x, pt.y, pt.x - 5, pt.y + 60);
        p.line(pt.x, pt.y, pt.x + 5, pt.y + 60);

        p.noStroke();

        let sparkleBrightness = p.noise(pt.x * 0.02, pt.y * 0.02 + pt.idNumber);
        sparkleBrightness = 4 * sparkleBrightness ** 4;
        p.fill(52, 78, sparkleBrightness * 50 + 52);
        p.circle(...pt, 10);
      });
    },
  };

  //============================================================
  /**
   * Input controls for this bot.
   * Do we just need a chat input? Do we need anything else?
   * What about game controls, useful buttons, sliders?
   **/

  // Vue component with input controls for cat ears
  Vue.component(`input-${mask.name}`, {
    template: `<div>
    <div> Cat Ear Height: <input type="range" v-model="mask.earHeight" min="0.5" max="3" step="0.1" /></div>
    <div> Cat Mask Color: <color-picker v-model="mask.catColor" /></div>
    <div> Cat Details Color: <color-picker v-model="mask.catDetails" /></div>
  </div>`,
    data() {
      return {};
    },
    props: { mask: { required: true, type: Object } },
  });

  masks.push(mask);
})();
