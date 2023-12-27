/* globals Vue, systems, Vector2D */

(function () {

  let space = {
    /*
     * A latent space is a way of turning n-dimensional points into art
     */
  
    // TODO: Make your own dimensions
    dimensions:["hue", "size", "aspectRatio", "bounceSize", "bounceSpeed", "angle", "windowHue", "windowBrightness"],
    hide: true,
    name: "rectangles", // Lowercase only no spaces! (we reuse this for some Vue stuff)
    description: "some rectangles",

    //have 5 landmarks
    landmarks: [{
      name:"bob",
      dna: [0.36,0.60,0.62,0.82,0.82,0.42],
    }, {
      name:"jazz",
      dna: [0.65,1.00,1.00,0.23,0.53,0.50],
    }, {
      name: "happy yellow",
      dna: [0.12,0.70,0.07,0.70,0.68,0.47,0.39]
    }],

    //==================================================================
    // POPULATION AS A WHOLE

    setup({p, individuals, deltaTime, time}) {
      // Create initial population
      
    },

    draw({p, individuals, deltaTime, time}) {
      p.background(190, 90, 50)
    },

   
    //==================================================================
    // INDIVIDUAL

    
    setupIndividual(individual, {p}) {
      // Setup an individual, 
      // if you need to initialize any variables for an individual
      // Note that their DNA may change after this, so only use it for non-DNA stuff

      // e.g, give each rectangle a position we can move around later (good for particles)
      // individual.position = new Vector2D()
    },


    updateIndividual(individual, {p, time, deltaTime}) {

    },  

    drawIndividual(individual, {p, time, deltaTime}) {

      // HELPER
      // Make a dictionary of all the DNA dimensions,
      // -  this makes them easier to look up hen drawing
      // even though we need to keep the dna itself as an array of floats for other reasons
      let dim = {}
      this.dimensions.forEach((dimName, index) => {
        dim[dimName] = individual.dna[index]
      })
     
      // We also have a basePosition and baseScale if you want your 
      // individuals to be at a particular place
      p.push()
      p.translate(...individual.basePosition)
      p.scale(individual.baseScale)
      
      let jumpSpeed = p.map(dim.bounceSpeed, 0, 1, 5, 12)
      let yJump = -20 * Math.abs(Math.sin(time*jumpSpeed))
    
      // Remap DNA values from (0-1) to more useful sizes
      let size = p.map(dim.size, 0, 1, 50, 80)
      let ratio = p.map(dim.aspectRatio, 0, 1, .8, 1.2)
      
      let angle = p.map(dim.angle, 0, 1, -.5, .5)
  
      let hue = p.map(dim.hue, 0, 1, 0, 360)
      let windowHue = p.map(dim.windowHue, 0, 1, -30, 30)
      
      p.fill(hue, 100, 50)
      
      
      let width = size*ratio
      let height = size/ratio
      
      // Before rotation, jump up
      p.translate(0, yJump)
      
      p.rotate(angle)
      
      p.rect(-width/2, 0, width, -height)
      
      // Draw DOOR
      p.fill((hue + windowHue + 360)%360, 100, 50)
      p.stroke(0)
      p.rect(-width/4, 0, width/2, -50)

      p.pop()
    },  

  };

  latentSpaces.push(space);
})();
