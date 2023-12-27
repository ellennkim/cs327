
# A2: Animated GIFS

Make animations and looping animated GIFs, using P5.js.

**Speedrun:**

* Remix [https://glitch.com/edit/#!/galaxykate-a2](https://glitch.com/edit/#!/galaxykate-a2)
* Read the code in `app.js`
* Add new sketches in `sketches.js`
    * You can turn off ones you currently don't want to see with `show: false`
* Make at least 6 animated sketches
    * Each one should have a different look and motion
    * Use text, emoji, lines, shapes, and color.
    * Not recommended: P5 3D mode or imported image (it gets complicated)
* Save one seamlessly looping one as a GIF. 
    * ie, the start and end frames are the same
    * You can use the button below the sketch to export GIFs
* One sketch is a self-portrait
* You can use the examples as a starting point, but need to create something that is wholy recognizable as your own (ie, not just palette swaps)

**All help from the internet, GPT, classmates, etc must be in your readme.**

**Do not add images or resources you do not have a license to use**


## Inspirational images

Check out my pinterest board of generative imagery from [nature, craft, and code](https://www.pinterest.com/galaxykate/generative-art/), or this board of [movement](https://www.pinterest.com/galaxykate/generative-movement/) in generative art, [this video about making art](https://www.youtube.com/watch?v=4Se0_w0ISYk&ab_channel=CSSConfAustralia) or [this one](https://www.youtube.com/watch?v=_8DMEHxOLQE&t=229s&ab_channel=Creators) by the creator of Processing, or just this [tumblr](https://hexeosis.tumblr.com/) of animated GIFs. You can also find this kind of work on social media with tags [#creativecoding](https://twitter.com/hashtag/creativecoding) or [#generativeart](https://twitter.com/hashtag/generativeart)

Here are also several artists working in animated GIFs [Benjamin Zimmerman](https://www.thisiscolossal.com/2018/11/hand-drawn-gifs-by-benjamin-zimmerman/), [Etienne Jacob](https://www.thisiscolossal.com/2018/04/animation-of-sinusoidal-waves-in-gifs-by-etienne-jacob/), [David Whyte](https://www.thisiscolossal.com/2014/06/dizzying-geometric-gifs-by-david-whyte/), [Marcus Martinez](https://www.thisiscolossal.com/2018/08/gifs-by-marcus-martinez/), [Frédéric Vayssouze-Faure](https://www.thisiscolossal.com/2017/07/minimalism-multitude-gifs/), [Anna Taberko](https://www.thisiscolossal.com/2017/04/dizzying-new-kaleidoscopic-gifs-by-anna-taberko/) as well as some ancient animations from [before film](https://www.thisiscolossal.com/2015/10/newly-digitized-phenakistoscopes/)!

I've put a lot of code examples in https://glitch.com/edit/#!/galaxykate-a2 (live view https://galaxykate-a2.glitch.me). Browse around to see a few of the techniques. I recommend "remixing" this example code directly from Glitch.


Upload one looping gif to Canvas, one screenshot of all of your sketches (with the samples turned off), along with your zipped markdown and code.

Rubric:
* 20 pts: has a readme.md filled out
* 10 pts per sketch (up to 6)
* 10 pts: Animated gif turned in at Canvas
* 10 pts: The animated gif is seamlessly looping

# The code

Look through the code in `app.js` and `index.html`

Read through the HTML code and notice how we are loading libraries. We need to import P5 and Vue for this assignment. We can import P5 either locally or via CDN.


    <!-- P5 Loaded from a CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.2.0/p5.min.js"></script>

    <!-- Or P5 loaded locally -->
    <script src="../../../shared/p5.min.js"></script>
    
    <!-- 
        I also want to use this SVG library 
        I wrote it to let P5 draw and manipulate SVG code.  
        It doesn't have a CDN so I'm linking it locally -->
    <script src="../../../shared/svg-p5-shapes.js"></script>

    <!-- Some SVG data to as JS to deal with CORS restrictions -->
    <script src="mysvgs.js"></script>

    <!-- My app's code goes last, 
        because it needs to refer to things in the previous two JS files -->
    <script src="app.js"></script>

Vue allows us to easily make HTML DOM elements from a template.  Browse over the code (or ask GPT to explain!) to see it being used in `app.js`.  We will get more into Vue later, for right now, just observe it.

**TODO: Change the HTML and CSS to suit yourself**



### About Processing/P5

Processing is a long-running project made for programming graphics-and-sound intensive artworks, while still being approachable for new programmers. You may have used the Java version. P5 is version of Processing that runs in HTML/Js to draw in canvas elements, which are grids of pixels. We are using P5 in "instance mode" so that our programs still work like normal JS/HTML. P5 has an easier mode to use, but we want to be able to add lots of interface elements later, and have as many P5 instances on the page as we want.

Creating new P5 canvases is done for you in the sample code, in app.js, for each animation that has isActive set to true. But read through the code and this description to understand how P5 breaks drawing into "draw" and "setup" phases.

To add P5 to an element, you need to give it an element to attach its canvas element to, and also a draw and setup function to call. When it calls the functions, it will past the P5 object as a parameter. This P5 object has a lot of useful methods attached to it, as you'll see later.

```
let element = document.getElementById("myElementID")
let myP5 = new p5(function(p) {
        p.setup = function(p) {
            //... do some setup
        }
        p.draw = function(p) {
            //... do some drawing
            p.circle(0, 0, 50)
        }
    }, element);
```

When using P5 for drawing, there are two distinct stages. 

* `setup` gets called only once, at the beginning. 
* `draw` gets called every time P5 needs to draw a new frame (If you are used to using requestAnimFrame, you don't have to call that here, P5 takes care of it for you).

I've included examples that will walk you through lots of different techniques in P5 drawing. It's okay to not understand most of them! In this assignment, get use to playfully poking at numbers, and saving code that creates interesting effects. While you can carefully plan and do math to achieve a certain shape, its more common to make mistakes and discover something new by accident. The more you explore, the faster you will get a sense of how to build things and what all these P5 methods do. You may not mathematically know how to use Math.sin in an equation, but you will know that it's good for making things rhythmically oscillate.

This is also a good assignment to practice using local Git branches to save experiments that are working well, before you change a number, dislike the effect, and can't remember how to get back to the good version.

By the end, you should have at least six P5 instances running things that you are proud of. Comment out any that you don't want your peers to look at. You won't be graded on 'quality', but as a very low bar, your work should look more interesting than a single rotating square, and look different than the examples.

### Create a seamless animated gif

So you've got your assignment looking great, but you want to show everyone on Twitter/Insta/Discord your work! You can created a hosted version of the site to send them to, but its even easier to record an animated GIF. I use LiceCap (Windows/MacOS) and GiFox (Windows). P5 now includes a handy mode 

Finally finally: submit the animated gif, code, and markdown to Canvas.




# P5 cheatsheet
We are using P5 in [HSL mode](https://www.youtube.com/watch?v=Ceur-ARJ4Wc). Colors are specified as "hue" (0-360), saturation (0-100) and lightness (0-100).

* Pure blue is `180, 100, 50`
* Light blue is `180, 100, 80`
* Light blue is `180, 100, 30`
* Dusty grey blue is `180, 50, 50`
* More purple is `200, 100, 50`
* More greenish blue is `160, 100, 50`

```
colorMode(HSL)      - Switches to HSL color mode.
background(h, s, l) - Sets the background color.
fill(h, s, l)       - Sets the fill color for shapes.
noFill()            - Disables filling geometry.
stroke(h, s, l)     - Sets the color of the strokes.
noStroke()          - Disables drawing the stroke.
strokeWeight(weight)- Sets the width of the stroke.
point(x, y)         - Draws a point at (x, y).
line(x1, y1, x2, y2)- Draws a line from (x1, y1) to (x2, y2).
rect(x, y, w, h)    - Draws a rectangle. The meaning of (x, y) is determined by `rectMode()`.
ellipse(x, y, w, h) - Draws an ellipse. If w=h, it's a circle. The meaning of (x, y) is determined by `ellipseMode()`.
triangle(x1, y1, x2, y2, x3, y3) - Draws a triangle using the three provided points.
quad(x1, y1, x2, y2, x3, y3, x4, y4) - Draws a quadrilateral using the four provided points.
arc(x, y, w, h, start, stop, [mode]) - Draws an arc/sector. Modes (optional): CHORD, PIE, OPEN (default).

beginShape()         - Begins recording vertices for a custom shape.
vertex(x, y)         - Adds a vertex point to the current shape at coordinates (x, y).
curveVertex(x, y)    - Defines a vertex point for a curved shape.
bezierVertex(cx1, cy1, cx2, cy2, x, y) - Defines a Bezier vertex point.
endShape([mode])     - Finishes recording vertices and displays the shape. Modes (optional): CLOSE.

TRIGONOMETRY:
sin(angle)     - Returns the sine of an angle (in radians).
cos(angle)     - Returns the cosine of an angle (in radians).
tan(angle)     - Returns the tangent of an angle (in radians).
asin(value)    - Returns the arcsine of a value in radians.
acos(value)    - Returns the arccosine of a value in radians.
atan(value)    - Returns the arctangent of a value in radians.
atan2(y, x)    - Computes the arctangent of y/x in radians.

CALCULATION:
abs(value)     - Returns the absolute value.
ceil(value)    - Rounds up to the nearest whole number.
floor(value)   - Rounds down to the nearest whole number.
round(value)   - Rounds to the nearest whole number.
sq(value)      - Returns square of a number.
sqrt(value)    - Returns the square root of a number.
pow(base, exp) - Raises base to the power of exp.
log(value)     - Returns the natural logarithm (base e) of a value.

RANDOM:
random([min], [max])   - Returns a random float between min and max (or 0 and 1 if no args).
randomGaussian([mean], [sd]) - Returns a normally-distributed random number.

CONSTANTS:
PI            - The number π.
HALF_PI       - Half of π.
QUARTER_PI    - A quarter of π.
TWO_PI        - Twice π.

CONVERSION:
degrees(rad)  - Converts radians to degrees.
radians(deg)  - Converts degrees to radians.

MAPPING:
map(value, start1, stop1, start2, stop2) - Re-maps a number from one range to another.

DISTANCE & INTERPOLATION:
dist(x1, y1, x2, y2)     - Computes the distance between two points.
lerp(start, stop, amt)  - Interpolates between two numbers by a given factor.
    
CLAMPING:
constrain(value, min, max) - Clamp a value between two other values

PERLIN NOISE:

noise(x, [y], [z]) - Computes the Perlin noise value at specific coordinates. Returns a value in the range [0, 1]. 
                     x is required; y and z are optional.

noiseDetail(lod, falloff) - Adjusts the details of the Perlin noise computation.
   • lod: Determines the number of octaves in the noise.
   • falloff: Determines how each octave contributes to the final output (typically between 0 and 1).

noiseSeed(seed) - Sets the seed value for `noise()`. Using the same seed will return the same noise pattern.

```