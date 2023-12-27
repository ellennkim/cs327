/* globals Vue, systems, Vector2D */

(function () {
  let space = {
    /*
     * A latent space is a way of turning n-dimensional points into art
     */

    // TODO: Make your own dimensions
    dimensions: [
      "bodySize",
      "earSize",
      "noseSize",
      "furColor",
      "earColor",
      "noseColor",
      "eyeColor",
    ],
    hide: false,
    name: "bears", // Lowercase only no spaces! (we reuse this for some Vue stuff)
    description: "some bears",

    //have 5 landmarks
    landmarks: [
      {
        name: "stitch",
        dna: [0.19, 1.0, 0.79, 0.61, 0.85, 0.67, 0.53],
      },
      {
        name: "lorax",
        dna: [0.09, 0.51, 0.41, 0.06, 0.13, 0.1, 0.14],
      },
      {
        name: "napoleon",
        dna: [0.43, 0.0, 0.0, 0.86, 0.23, 0.21, 0.52],
      },
      {
        name: "despereaux",
        dna: [0.18,1.00,0.00,0.42,0.68,0.20,1.00],
      },
      {
        name: "cheshire bear",
        dna: [0.0, 0.35, 0.0, 0.74, 0.9, 0.97, 0.17],
      },
    ],

    //==================================================================
    // POPULATION AS A WHOLE

    setup({ p, individuals, deltaTime, time }) {
      // Create initial population
    },

    draw({ p, individuals, deltaTime, time }) {
      p.background(316, 38, 92);
    },

    //==================================================================
    // INDIVIDUAL

    setupIndividual(individual, { p }) {
      // Setup an individual,
      // if you need to initialize any variables for an individual
      // Note that their DNA may change after this, so only use it for non-DNA stuff
      // e.g, give each rectangle a position we can move around later (good for particles)
      // individual.position = new Vector2D()
      
      //no need to set up an individual - most of the physical properties are not "non-DNA" stuff
    },

    updateIndividual(individual, { p, time, deltaTime }) {},

    drawIndividual(individual, { p, time, deltaTime }) {
      // HELPER
      // Make a dictionary of all the DNA dimensions,
      // -  this makes them easier to look up hen drawing
      // even though we need to keep the dna itself as an array of floats for other reasons
      let dim = {};
      this.dimensions.forEach((dimName, index) => {
        dim[dimName] = individual.dna[index];
      });

      p.push();
      p.translate(...individual.basePosition);
      p.scale(individual.baseScale);

      let maxSize = 200;
      let minSize = 60;

      //adding body size constraints - help from ChatGPT
      let bodySize = p.map(dim.bodySize, 0, 1, minSize, maxSize);
      bodySize = Math.min(maxSize, Math.max(minSize, bodySize));

      let maxEarSize = bodySize * 0.35;
      let minEarSize = bodySize * 0.1;
      let maxNoseSize = bodySize * 0.2;
      let minNoseSize = bodySize * 0.05;

      //adding ear and nose size constraints - help from ChatGPT
      let noseSize = p.map(dim.noseSize, 0, 1, minNoseSize, maxNoseSize);
      noseSize = Math.min(maxNoseSize, Math.max(minNoseSize, noseSize));

      let earSize = p.map(dim.earSize, 0, 1, minEarSize, maxEarSize);
      earSize = Math.min(maxEarSize, Math.max(minEarSize, earSize));

      let furColor = p.map(dim.furColor, 0, 1, 0, 360);
      let earColor = p.map(dim.earColor, 0, 1, 0, 360);
      let noseColor = p.map(dim.noseColor, 0, 1, 0, 360);
      let eyeColor = p.map(dim.eyeColor, 0, 1, 0, 360);

      // body
      p.fill(furColor, 80, 60);
      p.stroke(0);
      p.strokeWeight(2);
      p.ellipse(0, 0, bodySize, bodySize * 0.6);

      // ears
      p.fill(earColor, 80, 60);

      // left ear
      p.arc(
        -bodySize * 0.35 - 30,
        -bodySize * 0.5 - 3,
        earSize * 1.5,
        earSize * 1.5,
        p.PI / 1.5,
        p.TWO_PI,
        p.CHORD
      );

      // right ear
      p.arc(
        bodySize * 0.35 + 30,
        -bodySize * 0.5 - 3,
        earSize * 1.5,
        earSize * 1.5,
        p.PI,
        p.PI / 3,
        p.CHORD
      );

      p.stroke(0);
      p.strokeWeight(2);

      // nose
      p.fill(noseColor, 80, 60);
      p.ellipse(0, bodySize * 0.1, noseSize * 1.5, noseSize);
      p.stroke(0);
      p.strokeWeight(2);

      // eyes
      p.fill(eyeColor, 80, 60);

      // left eye
      p.ellipse(
        -bodySize * 0.15 - 3,
        -bodySize * 0.1 - 10,
        bodySize * 0.1,
        bodySize * 0.1
      );

      // right eye
      p.ellipse(
        bodySize * 0.15 + 3,
        -bodySize * 0.1 - 10,
        bodySize * 0.1,
        bodySize * 0.1
      );

      p.stroke(0);
      p.strokeWeight(2);

      p.pop();
    },
  };

  latentSpaces.push(space);
})();
