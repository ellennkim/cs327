// Voronoi mask
/* globals Vue, p5, masks, CONTOURS, Delaunator, Vector2D */

// ALL ABOUT DELAUNAY
// https://mapbox.github.io/delaunator/


(function () {
  let mask = {
    //=========================================================================================
    // TODO: custom data

    hide: false,
    name: "voronoi", // Lowercase only no spaces! (we reuse this for some Vue stuff)
    description: "mask using voronoi method",

    //=========================================================================================
    setup({ p }) {
      // Runs when you start this mask
      console.log("START MASK - ", this.name);
      
      this.points = []
      for(var i = 0; i < 50; i++) {
        let pt = new Vector2D(Math.random()*p.width, Math.random()*p.height)
        this.points.push(pt)
      }
    },

    drawBackground({ p }) {
      p.background(100);
    },

    setupHand({ p, hand }) {
      // Any data that you need on each hand
    },

    setupFace({ p, face }) {
      // Any data that you need on each face
    },

    drawHand({ p, hand }) {
      let t = p.millis() * 0.001;
    },

    drawFace({ p, face }) {},

    // New! Also use **EVERYHTING**
    drawAll({ p, faces, hands }) {
      let t = p.millis() * 0.001;
      
      this.points.forEach((pt) => {
        // if (faces.length >= 1)
        //   pt.setToLerp(pt, faces[0].nose, .1)
          // pt.y += 10
        
      })
  
      
      // Voronoi diagrams are all in **what points you include**
      // You can use particle systems, particular contours, etc
      
      // Make a ring of points
      let ringPoints = [];
      let count = 80;
      for (var i = 0; i < count; i++) {
        let theta = (i * Math.PI * 2) / count;
        let theta2 = ((i+.5) * Math.PI * 2) / count + t;
        ringPoints.push(
          Vector2D.polar(200 + (i % 2) * 20, theta).offset(
            p.width / 2,
            p.height / 2
          )
        );
        
        let r2 = 250 + (i % 2) * 20 + 40 *Math.sin(i + t)
        ringPoints.push(
          
          Vector2D.polar(r2, theta2).offset(
            p.width / 2,
            p.height / 2
          )
        );
        ringPoints.push(
          Vector2D.polar(600 + (i % 2) * 20, theta).offset(
            p.width / 2,
            p.height / 2
          )
        );
      }

      let voronoiPts = [];

      // voronoiPts = voronoiPts.concat(ringPoints);
      // voronoiPts = voronoiPts.concat(this.points);

      faces.forEach((face) => {
        let facePts = face.landmarks
        voronoiPts = voronoiPts.concat(facePts);
      });
      
       hands.forEach((hand) => {
        let handPts = hand.landmarks
        voronoiPts = voronoiPts.concat(handPts);
      });
      voronoiPts.forEach((pt) => p.circle(...pt, 5));

      // Convert our list of points into a list of regular [x,y]
      let simplifiedPoints = voronoiPts.map((v) => [v.x, v.y])
      const delaunay = Delaunator.from(simplifiedPoints);
      // console.log(delaunay);
      
     

      // Do something for each cell in the voronoi diagram
      forEachVoronoiCell(simplifiedPoints, delaunay, (centerIndex, verts) => {
        let vpct = 0.9;
        // Just draw the basic cell
//         p.beginShape()
//         verts.forEach((v) => {
//            p.vertex(...v)
//         })
       
//         p.endShape()
        if (centerIndex % 1 == 0) {
          let pt = voronoiPts[centerIndex];
          // console.log(verts)
          p.noStroke();
          p.fill(centerIndex % 360, 100, 50, 0.4);
          // pt.draw(p, 1)
          p.beginShape();
          // verts.forEach(vert => p.vertex(...vert))
          verts.forEach((vert) => Vector2D.lerpVertex({p, v0:pt, v1:vert, pct:vpct}));
          p.endShape(p.CLOSE);

          p.fill((centerIndex + 50) % 360, 100, 50, 0.4);
          p.beginShape();
          // verts.forEach(vert => p.vertex(...vert))
          verts.forEach((vert) => Vector2D.lerpVertex({p, v0:pt, v1:vert, pct:vpct - 0.2}));
          p.endShape(p.CLOSE);
        }
      });
      
       this.points.forEach(pt => {
         p.fill(0)
         p.circle(...pt, 10)
       })
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
      CONTROLS GO HERE
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

// class VoronoiMask {
// 	constructor() {
// 		this.particles = []
// 		this.edges = []

// 		for (var j = 0; j < 2; j++) {
// 			for (var i = 0; i < 5; i++) {
// 				let pt = new Vector()
// 				pt.id = `hand-${j}-${i}`
// 				pt.radius = 10 + Math.random()*10
// 				pt.idNumber = j*5 + i
// 				pt.velocity =  new Vector()
// 				pt.force =  new Vector()
// 				pt.color = [Math.random()*360, 100, 50]
// 				pt.attachPoint = hand[j].fingers[i][3]
// 				this.particles.push(pt)
// 			}
// 		}

// 	}

// 	draw(p) {
// 		p.background(100, 100, 100)
// 		p.stroke(0)
// 		p.noFill(0)
// 		p.circle(0, 0, 300)

// 		p.fill(0)
// 		p.noStroke()
// 		// drawTestFacePoints(p)
// 		// drawTestHandPoints(p)

// 		this.particles.forEach(pt => {
// 			p.fill(pt.color)
// 			pt.draw(p, pt.radius)
// 		})

// 		p.fill(0)
// 		this.voronoiPoints.forEach(pt => pt.draw(p, 2))

// 		// Convert to a simpler array of vectors
// 		let pts = this.voronoiPoints.map(p => p.coords)

// 		// Create the diagram
// 		const delaunay = Delaunator.from(pts);
// 		// if (Math.random() > .98)
// 		// 	console.log(delaunay)

// 		p.stroke(0)
// 		p.strokeWeight(.1)

// 		let vpct = SLIDER.voronoiLerp

//

// 	}

// 	update(t, dt, frameCount) {
// 		console.log("update")
// 		this.particles.forEach(pt => {
// 			pt.addMultiples(pt.velocity, dt)
// 			pt.setToLerp(pt, pt.attachPoint, .1)
// 		})
// 	}
// }

// masks.voronoiMask = VoronoiMask
