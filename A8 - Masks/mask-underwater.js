/* globals Vue, p5, masks, CONTOURS, Vector2D */
(function () {
  let mask = {
    //=========================================================================================
    // TODO: custom data

    hide: false,
    name: "underwater", // Lowercase only no spaces! (we reuse this for some Vue stuff)
    description: "underwater mask with bubbles and goggles",

    backgroundTransparency: 1,
    gogglesTrans: 100,
    gogglesOuter: [231, 3, 52],
    gogglesInner: [231, 80, 52],
    skinColor: [43, 79, 86],

    bubbleRadius: 10,
    bubbleAccel: 0.02,
    bubbles: [],

    // What kind of data does your bot need?

    //=========================================================================================

    setup({ p }) {
      // Runs when you start this mask
      console.log("START MASK - ", this.name);
    },

    drawBackground({ p }) {
      p.background(197, 80, 84, this.backgroundTransparency);
    },

    setupHand({ p, hand }) {
      // Any data that you need on each hand
    },

    setupFace({ p, face }) {
      face.particles = [];
    },

    drawHand({ p, hand }) {
      let t = p.millis() * 0.001;
      p.fill(...this.skinColor);
      p.stroke(43, 79, 86);
      p.strokeWeight(1);

      function drawFingers({ p, width, fxn }) {
        p.strokeWeight(width * 2);
        fxn();

        p.strokeWeight(width);
        fxn();

        p.strokeWeight(width * 0.6);
        fxn();
        p.strokeWeight(1);
      }

      CONTOURS.fingers.forEach((finger, fingerIndex) => {
        drawFingers({
          p,
          width: 20,
          fxn: () => {
            hand.drawContour({
              p,
              contour: finger,
            });
          },
        });
      });
    },

    drawFace({ p, face }) {
      let t = p.millis() * 0.001;

      // Available contours
      // centerLine
      // mouth 0-4
      // sides[0-1].faceRings [0-2]
      // sides[0-1].eyeRings [0-4]

      // Do something for each side
      face.forEachSide((SIDE_CONTOURS, sideIndex) => {
        // each face countour
        for (var i = 0; i < 2; i++) {
          p.stroke(0, 0, 0, 0.06);
          p.fill(...this.skinColor);
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
      // let nosePoint = face.landmarks[CONTOURS.centerLine[9]]
      // let foreheadPoint = face.landmarks[CONTOURS.centerLine[0]]
      // let chinPoint = face.landmarks[CONTOURS.centerLine[25]]
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

      p.strokeWeight(2);

      //outer rim of goggles
      p.stroke(0, 0, 0);
      p.strokeWeight(1);
      p.fill(...this.gogglesOuter);
      face.drawContour({
        p,
        contour: CONTOURS.sides[0].eyeRings[1],
        contour1: CONTOURS.sides[1].eyeRings[1],
      });

      //inner rim of goggles
      p.fill(
        this.gogglesInner[0],
        this.gogglesInner[1],
        this.gogglesInner[2],
        this.gogglesTrans
      );
      // right eye
      face.drawContour({
        p,
        contour: CONTOURS.sides[0].eyeRings[2],
      });

      // left eye
      face.drawContour({
        p,
        contour: CONTOURS.sides[1].eyeRings[2],
      });

      // Draw basic eye contours for the innermost eye
      p.fill(255, 255, 255);
      p.stroke(0);
      face.drawContour({
        p,
        contour: CONTOURS.sides[0].eyeRings[4],
        useCurveVertices: true,
      });

      p.stroke(0);
      face.drawContour({
        p,
        contour: CONTOURS.sides[1].eyeRings[4],
        useCurveVertices: true,
      });

      // DRAW EACH EYE
      face.eyes.forEach((eyePt) => {
        p.fill(0);
        p.circle(...eyePt, 20);

        p.fill(100);
        p.circle(eyePt.x, eyePt.y - 5, 10);
      });

      // draw mouth
      CONTOURS.mouth.slice(2).forEach((mouthLine, mouthIndex) => {
        p.fill(341, 79, 79);
        face.drawContour({
          p,
          contour: mouthLine.slice(0),
          close: true,
        });
      });

      CONTOURS.mouth.slice(4).forEach((mouthLine, mouthIndex) => {
        p.fill(341, 79, 24);
        face.drawContour({
          p,
          contour: mouthLine.slice(0),
          close: true,
        });

        // create bubbles - help from ChatGPT
        if (p.random() > 0.9) {
          let bubble = {
            x: face.landmarks[CONTOURS.centerLine[0]].x, // bubbles show up in center of face
            y: face.landmarks[CONTOURS.centerLine[15]].y, // bubbles show up at mouth-level
            velocityY: p.random(-2, -1),
            accelerationY: -this.bubbleAccel,
            radius: this.bubbleRadius,
          };

          console.log("x:", bubble.x, "y", bubble.y);
          this.bubbles.unshift(bubble);
        }
      });

      // draw bubbles
      this.bubbles.forEach((bubble, index) => {
        p.fill(216, 79, 73);
        p.stroke(216, 79, 54);
        p.strokeWeight(1);
        p.circle(bubble.x, bubble.y, bubble.radius * 2);

        // add smaller bubble for highlights
        p.fill(216, 79, 89);
        p.stroke(255, 255, 255);
        p.circle(
          bubble.x + bubble.radius / 4,
          bubble.y - bubble.radius / 4,
          bubble.radius / 2
        );

        bubble.velocityY += bubble.accelerationY; // update velocity with acceleration
        bubble.y += bubble.velocityY; // update position

        if (bubble.y < -bubble.radius || bubble.y > p.height + bubble.radius) {
          this.bubbles.splice(index, 1);
        }
      });
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
				
          goggles outer color:<color-picker v-model="mask.gogglesOuter" />
          goggles inner color:<color-picker v-model="mask.gogglesInner" />
          skin color:<color-picker v-model="mask.skinColor" />

			     </div>
			  <div> bubble speed: <input type="range" v-model="mask.bubbleAccel" min="0.01" max="5" step="0.1" /></div>
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
