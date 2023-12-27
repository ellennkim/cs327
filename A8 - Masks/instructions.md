# Assignment 8: Digital Masks

**NOTE: WE HAVE A PROBLEM WITH A FEW STUDENTS TURNING IN LIGHTLY MODIFIED EXAMPLE CODE**
Even if you have to do a very fast assignment, you still need to significantly modify the example code to get to a new piece of art. Make sure to create a new file, change the name, change the controls, and make sure that yours is visually distinct from what came before!

## Speedrun

- Make two masks. For each mask
  - Like the other assignments, make a copy and import your mask-yourmaskname.js to the HTML
  - Make at least three controls for each mask (if you use the ones provided, you need to add three more)
  - Each mask needs to have _secondary motion_, motion that is not just limited to the points on the face but is _off the face_ and _responds to the faces motion_
  - Make sure to use the hand points and have an appropriate background!
- Use at least two of the techniques from A3 onward (one in each mask, or both in one, etc), for example:
  - Drawing tools
  - Tracking persistent curves
  - Oscilloscope sound generation
  - Speech-to-text/text-to-speech
  - FFTs
  - Beat detection
  - Tracery grammars
  - API calls
  - JSON data
  - Particle systems (these go great with body tracking!)
    - Springs
    - Flowfields
    - Spawning new particles with lifespans
    - Agents (boids or braitenberg vehicles)
  - Voronoi/Delaunay algorithm

## Rubric

- 8pts: has two masks
  - have 3 controls
  - have secondary motion
  - use a technique from A3-A7
  - use hand positions and some form of background
- 1pts: have readme.md filled out
- 1pts: GIFs/recordings of each mask submitted to Canvas (you can use a tool like Licecap to easily record gifs - there are many Gif recorders for every OS)

# Tools

**Contours:**

- fingers: array of five arrays (one for each finger), each with 4 indices for each joint landmark
- centerLine: the indices of points down the middle of the face, from forehead to chin
- mouth: five arrays, representing indices of points around the mouth, from outermost to innermost. The last two are the lines outside and inside the lips
- sides: each side of the face
  - faceRings: three arrays of indices from the outside of the face to the inside
  - eyeRings: five arrays of indices from the outside of the eye to the inside
    - the innermost one is the ring around the eye, the outermost one contains the eyebrow

**Assorted face metadata:**

- eyes: two Vector2D pts at the center of the eyes
- ears: two Vector2D pts at the center of the ears
- chin, nose, center, forehead: useful single Vector2D points
- offsetLength: Vector2D pointing down from forehead to chin
- offsetWidth: Vector2D pointing down from right to left
- offsetEars: two Vector2Ds pointing from center to ears
- offsetEyes: two Vector2Ds pointing from center to eyes

**Face/hand methods:**

- drawDebugData(p)
- drawContour({ p, contour, contour1, useCurveVertices, onlyVertices, close, transformPoint}
  - Given a set of points, use beginShape/endShape and vertext to draw that shape
  - p: processing instance
  - contour: a list of Vector2D points or indices
  - contour1: a list of Vector2D points or indices, that we reverse and add to the first contour
  - useCurveVertices: use p5's curveVertex instead
  - onlyVertices: don't do begin/endShape, so you can have more points later
  - close: close the shape
  - transformPoint(finalPoint, basePoint, index)
    - pass in a function to transform the final point into some form of the base point
- forEachSide( (side, index) => {}) Do something for each side of the face
