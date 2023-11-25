const WIDTH = 300;
const HEIGHT = 300;
const DEFAULT_FRAME_RATE = 30;
const DEFAULT_LOOP_LENGTH_IN_FRAMES = 100;

// Three useful functions for animations
function pingpong(t) {
  // Return a number from 0 to 1
  // t=0 => 0
  // t=.5 => 1
  // t=1 => 0
  return 1 - Math.abs(((t * 2) % 2) - 1);
}

function pingpongEased(t) {
  // Same as pingpong, but it eases in and out
  return 0.5 - 0.5 * Math.cos(2 * t * Math.PI);
}

function ease(t) {
  // Ease just from 0 to 1 (the first half of pingpong)
  return 0.5 - 0.5 * Math.cos(t * Math.PI);
}

// =================================================
const sketches = [
  {
    name: "this hurts to look at",
    show: true,

    draw(p) {
      let t = p.frameCount * 0.5;
      let hue = (t * 100000000000000) % 360;

      p.background(hue + 50, 91, 90); //set background to be lilac

      p.strokeWeight(3);
      p.stroke(hue, 100, 20);
      p.circle(150, 150, 50);

      //add text to screen - help from ChatGPT
      p.textSize(20);
      p.text("my brain", 30, 150);
      p.text("hurts", 200, 150);
      p.fill(hue, 100, 90);

      // Give me a radius between 20 and 60
      let circleRadius = Math.random() * 40 + 60;
      let x = Math.random() * p.width;
      let y = Math.random() * p.height;

      p.circle(x, y, circleRadius);
      p.rect(x + 100, y + 100, circleRadius, circleRadius);

      //add "Hello!" and "Hi!" to screen - help from ChatGPT
      p.text("Hello!", x + 150, y + 150);
      p.textSize(30);

      p.text("Hi!", x - 150, y - 150);
      p.textSize(30);

      p.text("Sorry!", x + 200, y - 200);
      p.textSize(30);
    },
  },
  {
    name: "this is kinda better",
    show: true,

    setup(p) {
      p.background(0, 0, 80);
    },

    draw(p) {
      p.background(236, 253, 206, 0.05);

      let t = p.frameCount * 0.05;
      let x, y; //curve's position

      // using polar coordinates to change pathway - help from ChatGPT
      let theta = t * 100; //angle that varies with time
      let r = t * 10; //radius of polar curve

      let curve = pingpongEased(t);

      //convert polar coordinates to Cartesian
      x = r * p.cos(theta) + p.width / 2;
      y = r * p.sin(theta) + p.height / 2;

      t *= 5;

      //create another curve
      let r2 = 50;
      let angle = t * 5;

      //convert polar coordinates to Cartesian
      let a = angle * p.cos(angle) + p.width / 2;
      let b = angle * p.sin(angle) + p.height / 2;

      let hue = (t * 50 + 180) % 360;
      let circleRadius = 60 * p.noise(t);
      p.strokeWeight(5);
      p.stroke(hue, 100, 20);
      p.fill(hue, 100, 50);
      p.circle(x, y, circleRadius);
      p.circle(a, b, circleRadius);
    },
  },

  {
    name: "kissing caterpillars",
    show: true,
    setup(p) {},
    loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,
    draw(p) {
      let t = (p.frameCount / this.loopLength) % 1;
      let hue = (t * 100) % 360;
      p.background(87, 52, 83);

      for (var i = 0; i < 10; i++) {
        //top left
        p.fill(hue, hue + 60, hue + 15);
        p.ellipse(50 + t * 10 * i, 50 + t * 10 * i, t * 30, t * 30);

        //bottom right
        p.fill(hue + 60, hue, hue + 15);
        p.ellipse(250 - t * 10 * i, 250 - t * 10 * i, t * 30, t * 30);

        //bottom left
        p.fill(hue + 15, hue, hue + 30);
        p.ellipse(50 + t * 10 * i, 250 - t * 10 * i, t * 30, t * 30);

        //top right
        p.fill(hue + 25, hue + 60, hue);
        p.ellipse(250 - t * 10 * i, 50 + t * 10 * i, t * 30, t * 30);
      }

    },
  },

  {
    name: "pretty mosaic",
    description: "rain into waves",
    show: true,
    setup(p) {
      p.background(50);
    },

    draw(p) {
      p.background(195, 68, 43, 0.01);

      let t = p.frameCount;

      for (var i = 0; i < 10; i++) {
        let hue = 230;

        let x = t * 15 + i * 15;
        let y = 10 + 35 * i;
        let z = x * 0.05;
        y += 40 * Math.cos(z);
        z += 400;

        let rad = 1.01 + t / 100;
        x = (x - 100) % (p.width + 200);
        p.noStroke();
        p.fill(0, 0, 100, 0.00001 * t);
        p.circle(x, y + 10, rad * 1.1);
        p.fill(195, t + 20, 35, 0.0000001 * t);
        p.circle(x, y + 10, rad * 2.1);

        p.noStroke();
        p.fill(hue, 100, 100 - 5 * i);
        p.circle(x, y, rad);

        x = (x - 200) % (p.width + 400);

        p.noStroke();
        p.fill(0, 0, 100, 0.00001 * t);
        p.circle(x, y + 10, rad * 1.1);
        p.fill(195, t + 20, 35, 0.0000001 * t);
        p.circle(x, y + 10, rad * 2.1);

   
        p.noStroke();
        p.fill(hue, 100, 100 - 5 * i);
        p.circle(x, y, rad);
      }

      p.fill(0, 0, 0, 0.4);
      p.text("water", 10 + t, 35); 

      p.fill(100);
      p.textSize(30);
      p.stroke(195, 57, 60);
      p.strokeWeight(5);
      p.text("water", 10 + t, 30); 
    },
  },

  // One sketch
  {
    name: "pacman ready to eat",
    show: true,
    setup(p) {},
    loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,
    draw(p) {
      let t = (p.frameCount / this.loopLength) % 1;
      let angle = 2 * Math.PI * t * 6000;
      p.background(0, 0, 0);
      p.fill(56, 93, 78);
      p.noStroke();
      p.arc(150, 150, 250, 250, 0, t, p.PIE);
      p.arc(150, 150, 250, 250, 0, Math.PI, p.OPEN);
      p.arc(150, 150, 250, 250, 0 - Math.PI, 0 - t, p.PIE);
      p.fill(0, 0, 0);
      p.circle(150, 120, 15);
    },
  },
  // One sketch
  {
    name: "me at northwestern",
    show: true,
    setup(p) {},
    loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,
    draw(p) {
      p.background(279, 57, 89);
      let t = p.frameCount;
      let posChanger = 0;

      //create hair using arc in p5
      p.noStroke();
      p.fill(0, 0, 0);
      p.arc(150, 190, 90, 160, Math.PI, 0, p.OPEN);

      p.noStroke();
      p.fill(32, 53, 88);
      p.ellipse(150, 150, 50, 60);

      //line - from p5
      p.stroke(32, 53, 88);
      p.strokeWeight(10);
      p.line(150, 200, 105, posChanger + 150);
      p.line(150, 200, 195, posChanger + 150);
      p.line(140, 270, 140, 300);
      p.line(170, 270, 170, 300);

      p.fill(265, 54, 42);
      p.noStroke();
      p.rect(125, 170, 55, 100, 5);
      p.triangle(150, 210, 110, 270, 200, 270);

      p.fill(0, 0, 0);
      p.circle(160, 140, 5);
      p.circle(140, 140, 5);

      //create smile using arc in p5
      p.fill(0, 0, 100);
      p.stroke(340, 54, 42);
      p.strokeWeight(2);
      p.arc(150, 150, 20, 10, 0, Math.PI, p.CHORD);

      p.stroke(265, 54, 42);
      p.strokeWeight(3);
      p.textSize(20);
      p.text("GO U NORTHWESTERN!", 1 + t, 30);
    },
  },
];
