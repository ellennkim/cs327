(function () {
  let space = {
    dimensions: [
      "treeSize",
      "treeColor",
      "flowerNumber",
      "branchNumber",
      "flowerColorChange",
      "flowerLightness",
    ],
    hide: false,
    name: "trees",
    description: "some trees",
    landmarks: [
      {
        name: "grapevines",
        dna: [0.76, 0.26, 1.0, 0.65, 1.0, 0.33],
      },
      {
        name: "cotton candy",
        dna: [0.62, 0.36, 0.9, 0.57, 0.19, 0.82],
      },
      {
        name: "watermelon plant",
        dna: [0.18, 0.26, 0.0, 0.81, 1.0, 0.56],
      },
      {
        name: "fall",
        dna: [0.68, 0.08, 0.0, 0.79, 0.0, 0.42],
      },
      {
        name: "cherry blossoms",
        dna: [0.68, 0.85, 0.05, 0.81, 0.46, 0.91],
      },
    ],

    setup({ p, individuals, deltaTime, time }) {
      // Create initial population
    },

    draw({ p, individuals, deltaTime, time }) {
      p.background(46, 28, 82);
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

      let treeSize = p.map(dim.treeSize, 0, 1, 20, 150);
      let treeColor = p.map(dim.treeColor, 0, 1, 0, 360);
      let flowerNumber = Math.floor(p.map(dim.flowerNumber, 0, 1, 1, 5));
      let branchNumber = Math.floor(p.map(dim.branchNumber, 0, 1, 1, 8));
      let flowerColorChange = p.map(dim.flowerColorChange, 0, 1, 0, 1);
      let flowerLightness = p.map(dim.flowerLightness, 0, 1, 0, 100);

      p.push();
      p.translate(...individual.basePosition);
      p.scale(individual.baseScale);

      drawTree(
        p,
        treeSize,
        flowerNumber,
        branchNumber,
        treeColor,
        flowerColorChange,
        flowerLightness
      );

      p.pop();

      function drawTree(
        p,
        treeSize,
        flowerNumber,
        branchNumber,
        treeColor,
        flowerColorChange,
        flowerLightness
      ) {
        p.stroke(treeColor, 80, 60);
        p.strokeWeight(2);

        branch(treeSize, p, branchNumber, flowerColorChange);

        // create fractal design using simplified L-system - help from ChatGPT
        function branch(len, p, branchesLeft, flowerColorChange) {
          p.line(0, 0, 0, -len);
          p.translate(0, -len);

          len *= 0.67;

          if (branchesLeft > 0 && len > 4) {
            p.push();
            p.rotate(p.PI / 4);
            branch(len, p, branchesLeft - 1, flowerColorChange);
            p.pop();

            p.push();
            p.rotate(-p.PI / 6);
            branch(len, p, branchesLeft - 1, flowerColorChange);
            p.pop();

            if (flowerNumber > 0) {
              for (let i = 0; i < flowerNumber; i++) {
                p.fill(0, 0, 0);
                p.ellipse(0, 0, 5, 5);
                p.rotate(p.PI / flowerNumber);

                const hueStep = 360 / flowerNumber;
                p.push();
                p.translate(0, -10);
                for (let j = 0; j < flowerNumber; j++) {
                  p.push();
                  p.rotate((p.TWO_PI / flowerNumber) * j);
                  p.stroke(255);
                  p.strokeWeight(2);

                  //change color of flowers?
                  if (flowerColorChange >= 0.5) {
                    p.fill((hueStep * j) % 360, 80, 60);
                  }

                  //change lightness of flowers?
                  if (flowerLightness >= 0.5) {
                    p.fill((hueStep * j) % 360, 80, flowerLightness);

                    //uniform color for flowers?
                  } else {
                    p.fill(treeColor, 80, 60);
                  }
                  p.ellipse(0, -5, 8, 15);
                  p.pop();
                }
                p.pop();
              }
            }
          }
        }
      }
    },
  };

  latentSpaces.push(space);
})();
