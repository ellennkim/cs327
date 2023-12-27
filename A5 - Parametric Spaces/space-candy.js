(function () {
  let space = {
    dimensions: [
      "puffSize",
      "puffColor",
      "candySize",
      "candyColor",
      "puffLightness",
      "rainbow",
      "colorChange",
    ],
    hide: false,
    name: "lollipops",
    description: "some lollipops",

    landmarks: [
      {
        name: "cherry tootsie",
        dna: [0.15, 0.0, 0.18, 0.0, 0.1, 0.14, 0.94],
      },
      {
        name: "mega blueberry",
        dna: [1.0, 0.63, 1.0, 0.0, 0.15, 0.14, 0.94],
      },
      {
        name: "rainbow",
        dna: [0.40,0.06,0.50,0.83,0.50,1.00,0.00],
      },
      {
        name: "purple dreams",
        dna: [0.32, 0.8, 1.0, 0.7, 0.57, 0.0, 1.0],
      },
      {
        name: "watermelon sorbet",
        dna: [0.50,0.00,0.75,0.29,0.51,0.00,1.00],
      },
    ],

    setup({ p, individuals, deltaTime, time }) {
      // Create initial population
    },

    draw({ p, individuals, deltaTime, time }) {
      p.background(54, 72, 92);
    },

    setupIndividual(individual, { p }) {
      // Setup individual properties
    },

    updateIndividual(individual, { p, time, deltaTime }) {
      // Update individual properties over time if needed
    },

    drawIndividual(individual, { p, time, deltaTime }) {
      let dim = {};

      this.dimensions.forEach((dimName, index) => {
        dim[dimName] = individual.dna[index];
      });

      let puffSize = p.map(dim.puffSize, 0, 1, 20, 150);
      let puffColor = p.map(dim.puffColor, 0, 1, 0, 360);
      let candyColor = p.map(dim.candyColor, 0, 1, 0, 360);
      let candySize = p.map(dim.candySize, 0, 1, 10, 50);
      let puffLightness = p.map(dim.puffLightness, 0, 1, 0, 100);
      let colorChange = p.map(dim.colorChange, 0, 1, 0, 1);
      let rainbow = p.map(dim.rainbow, 0, 1, 0, 1);

      p.push();
      p.translate(...individual.basePosition);
      p.scale(individual.baseScale);

      p.strokeWeight(2);
      p.stroke(50, 150, 50); 
      p.line(0, 0, 0, -150);

      // draw center of the cotton candy puff
      p.fill(candyColor, 80, 60); 
      p.ellipse(0, -150, candySize, candySize);

      // draw candy fractals around the center
      drawFractals(p, 0, -150, candySize, puffColor);

      p.pop();

      // create fractal design using simplified L-system - help from ChatGPT
      function drawFractals(p, x, y, size, color) {
        p.push();
        p.translate(x, y);

        let numFractals = 10; 
        for (let i = 0; i < numFractals; i++) {
          let angle = (p.TWO_PI / numFractals) * i;
          let radius = size * 0.8;
          let xPos = p.cos(angle) * radius;
          let yPos = p.sin(angle) * radius;
          let ellipseSize = p.map(puffSize, 20, 150, 10, 40);

          p.stroke(255);
          //change color of center?
          if (colorChange >= 0.5) {
            p.fill(color, 80, puffLightness);
            puffLightness = puffLightness + 3;
            
          //make candy rainbow?
          } else if (rainbow >= 0.5) {
            const hueStep = 360 / numFractals;
            p.fill((hueStep * i) % 360, 80, 60);
            
          //change puff (fractal) color?
          } else {
            p.fill(puffColor, 80, 60);
          }
          p.ellipse(xPos, yPos, ellipseSize, ellipseSize);
        }

        p.pop();
      }
    },
  };

  latentSpaces.push(space);
})();
