//  -- KATE TODO - get old mask working with new code

// Cyberpunk DJ mask.  Could make the ears vibrate with music
/* globals Vue, p5, masks, CONTOURS, Vector2D */
(function () {
  // STEAL THIS FUNCTION
  function drawInNeonColors({ p, color, width, fxn }) {
    // Handy function to draw neon!
    p.noFill();
    p.strokeWeight(width * 2);
    p.stroke(color[0], color[1], color[2], 0.3);
    fxn();
    
    p.strokeWeight(width);
    p.stroke(color[0], color[1], color[2] + 10, 0.3);
    fxn();

    p.strokeWeight(width * 0.6);
    p.stroke(color[0], color[1], color[2] + 30, 1);
    fxn();
    p.strokeWeight(1)
  }

  let mask = {
    //=========================================================================================
    // TODO: custom data

    hide: false,
    name: "rainbar", // Lowercase only no spaces! (we reuse this for some Vue stuff)
    description: "cool cyberpunk mask",

    //=========================================================================================
    setup({ p }) {
      // Runs when you start this mask
      console.log("START MASK - ", this.name);
    },

    drawBackground({ p }) {
      p.background(0, 0, 0, .3);
    },

    setupHand({ p, hand }) {
      // Any data that you need on each hand
    },

    setupFace({ p, face }) {
      // Any data that you need on each face
    },

    drawHand({ p, hand }) {
      let t = p.millis() * 0.001;
      
      CONTOURS.fingers.forEach((finger, fingerIndex) =>{
        let h = (t*100 + 70*fingerIndex)%360
        drawInNeonColors({
            p,
            color: [h, 100, 50],
            width: 35,
            fxn: () => {
              hand.drawContour({
                p,
                // contour: [0].concat(finger),
                contour: finger
                
              });
            },
          });
      })
      
      // Look at all landmarks
      
//       hand.landmarks.forEach((pt, index) =>{
//         p.fill(100)
//         p.text(index, ...pt)
//       })
      
    },

    drawFace({ p, face }) {
      let t = p.millis() * 0.001;
      // Do something for each side
      
      // Make an outline but also make it weird
      let outlineCount = 4;
      for (var i = 0; i < outlineCount; i++) {
        let pct = (i / outlineCount + t * 0.5) % 1;
        let opacity = 0.2 + 0.2 * Math.sin(pct * Math.PI);

        let faceContour = CONTOURS.sides[0].faceRings[0].concat(
          CONTOURS.sides[1].faceRings[0].slice().reverse()
        );

        p.noFill();
        p.stroke(0, 0, 100, opacity);
        face.drawContour({
          p,
          // the finalPoint gets moved into position
          transformPoint: (finalPoint, basePoint, index) => {
            finalPoint.setToLerp(
              face.center,
              basePoint,
              0.8 + pct + pct * p.noise(t + index * 0.4 + pct)
            );
          },
          useCurveVertices: true,
          contour: faceContour,
          close: true,
        });
      }

      // Draw some cool ears
      face.ears.forEach((earPos, earIndex) => {
        p.fill(earIndex * 30 + 130, 100, 50);
        earPos.draw(
          p,
          (10 + -earIndex * 2 + 20 * p.noise(earIndex, t * 4)) * face.scale
        );

        p.fill(0, 0, 0, 0.5);
        earPos.draw(p, 50 * face.scale);
        earPos.draw(p, 30 * face.scale);
      });

      face.forEachSide((sideContours, sideIndex) => {
        // Draw the three ear points
        p.noStroke();

        // Draw the face background by filling in between the face side and the centerline
        // side.index is either 1 or -1, so we can use that to change color between sides
        p.fill(200, 100, 20 + sideIndex * 10);
        face.drawContour({
          p,
          contour: sideContours.faceRings[0],
          contour1: CONTOURS.centerLine,
        });

        p.noStroke();

        // // Draw multiple strips around the face
        for (var i = 0; i < 2; i++) {
          p.fill((i * 30 + 50 + 40 * t) % 360, 100, 50);
          face.drawContour({
            p,
            contour: sideContours.faceRings[i],
            contour1: sideContours.faceRings[i + 1],
          });
        }
      });

      // Draw lines between each of the face points on either side
      for (var i = 0; i < 18; i++) {
        p.strokeWeight(3);
        p.stroke(i * 20, 100, 50);
        let p0 = face.landmarks[CONTOURS.sides[0].faceRings[2][i]];
        let p1 = face.landmarks[CONTOURS.sides[1].faceRings[2][i]];
        p.line(...p0, ...p1);
      }

      // Draw the eye on either side
      face.forEachSide((sideContours, sideIndex) => {
        // Draw the eye lines
        sideContours.eyeRings.forEach((eyeRing, eyeIndex) => {
          let h = (40 + 70 * eyeIndex + t * 80) % 360;
          drawInNeonColors({
            p,
            color: [h, 100, 50],
            width: 5,
            fxn: () => {
              face.drawContour({
                p,
                contour: eyeRing,
                close: true,
              });
            },
          });
        });
      });

      // Draw the center line to the nose
      drawInNeonColors({
        p,
        color: [150, 100, 50],
        width: 5,
        fxn: () => {
          face.drawContour({
            p,
            contour: CONTOURS.centerLine.slice(0, 14),
          });
        },
      });

      // Draw the center line to below the mouthe
      drawInNeonColors({
        p,
        color: [150, 100, 50],
        width: 5,
        fxn: () => {
          face.drawContour({
            p,
            contour: CONTOURS.centerLine.slice(20),
          });
        },
      });

      p.noFill();
      // Draw the mouth lines
      CONTOURS.mouth.slice(2).forEach((mouthLine, mouthIndex) => {
        let h = (40 + 70 * mouthIndex + 100 * t) % 360;

        // Neon style
        drawInNeonColors({
          p,
          color: [150, 100, 50],
          width: 5,
          fxn: () => {
            face.drawContour({
              p,
              contour: mouthLine.slice(0),
              close: true,
            });
          },
        });
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
