Assignment 3: Drawing tool
==========================

Make your own KidPix! Remix [https://glitch.com/edit/#!/galaxykate-a3](https://glitch.com/edit/#!/galaxykate-a3)

Make at least 4 tools and an eraser (and turn off the example tools) At least one tool should use P5's [splines or Bezier curves](https://p5js.org/learn/curves.html).

For a challenge, take advantage of the color controls, the slider, or consider making your tools part of a thematically and aesthetically coherent whole.  Past students have made nature or galactic scenes, creature-drawing kits, or all-symmetrical drawings, or removed the color picker to enforce a monochrome aesthetic.

When done, submit a <15 second **`yourname_a3.gif`** to Canvas, showing your drawing tools, as well as a tgz/zip containing your filled out **readme.md and source code**

**Inspiration tools (- not all doable with this setup, but good for inspiration!)**

*   [BECOME A GREAT ARTIST](https://www.youtube.com/watch?v=kLHWAqbQvDM)
*   [Silk](http://weavesilk.com/)
*   [Autodraw](https://www.autodraw.com/) and [Quickdraw](https://quickdraw.withgoogle.com/) (which it was trained on)
*   [Action painting pro](https://ianmaclarty.itch.io/action-painting-pro)
*   [Dust](https://dan-ball.jp/en/javagame/dust/)
*   [Orb.farm](https://orb.farm/)
*   A few of mine
    *   [Joyful Hedge](https://www.galaxykate.com/apps/joyfulhedge/)
    *   [Jazz Composition](https://www.galaxykate.com/apps/jazzcomposition/)
    *   [Scribbles](https://www.galaxykate.com/apps/Prototypes/Scribbles/)

Speedrun
========

*   Remix [https://glitch.com/edit/#!/galaxykate-a3](https://glitch.com/edit/#!/galaxykate-a3)
*   Make an eraser tool (using the template)
    *   Does it erase the whole screen? Is it for erasing parts of the screen? Does it reset the screen to ...something cool?
*   Make 4 new tools
    *   At least one discrete one (easy, anything that doesn't connect is discrete)
    *   At least one continuous one (where the stroke connects, will have to use \*past\* points, probably using beginshape, line or curve)
    *   At least one that uses startShape/endShape and curve or bezier vertices in P5 [splines or Bezier curves](https://p5js.org/learn/curves.html) (watch the Freya Holmer video!)
        *   Your continuous and curve tools can be the same tool if you want
    * **Each brush should be interesting and surprising and magical :-) No basic one-circle-per-drag brushes**
      * how can this brush come alive? or surprise and delight the user?
* When done, submit a <15 second **`yourname_a3.gif`** to Canvas, showing your drawing tools, as well as a tgz/zip containing your filled out **readme.md and source code**

Rubric
======

*   2pts: have readme.md
*   1pts x 4: tools
*   1pts: eraser
*   1pts: one continuous tool
*   1pts: one tool uses begin/endShape
*   1pts: GIF (or screenshots) submitted to Canvas

Tools to use
============

You can use any of P5s features that you want to make your tool, and add any P5 or HTML controls, or **(recommended) use the built-in ones in the example**. 

Each brush event comes with parameters "p" (p5 instance) and settings ({color0, color1, brushSize}).  You can use any or all of these events:

* setup (when tool is selected),
* draw (every frame, even if the mouse isn't down),
* mouseDragged (every frame that the mouse moves), 
* mouseReleased (fires one time when mouse is released)


Beziers and Splines
-------------------

Splines and Bezier curves are two different kinds of programmatically-drawing curved lines in Processing. While Bezier curves give you more control, look smoother, and can have sharp turns, you have to define them with _control points_.

Blend modes
-----------

P5 allows you to draw using several different _blend modes_.

    p.blendMode(p.LIGHTEST);
    p.blendMode(p.MULTIPLY);
    // Etc

These affect the way that pixels (whether from shapes, text, or images) draw into the existing buffer.

Pixel Buffers
-------------

You can read and write into the pixel buffer, like [BECOME A GREAT ARTIST DOES](https://www.youtube.com/watch?v=kLHWAqbQvDM), in order to manipulate pixels directly or detect the current color of a pixel.

    p.loadPixels();
    
    // Do lots of pixel manipulation here...
    
    // Get the color at a pixel. It's a vector of RGB!
    let c = p.get(x, y)
    
    // Mess with the color
    let cButMoreRed = c.slice(0) // make a copy
    cButMoreRed[0] = Math.min(255, cButMoreRed[0] + 30)
    
    // Set the pixel to the new color
    p.set(x, y, c)
    
    p.updatePixels()s