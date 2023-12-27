Assignment 5: Latent spaces
==========================

Create three parametric generators that create a latent space of some art.  See how we can use music, controls, or evolutionary algorithms to explore that space.  **This stuff is confusing, and we are still figuring out how to talk about it, so do the reading!**

There are lots of metaphors for how we can understand this space (hopefully my TED talk helped). You can think of it as a mathematical function to turn any of the points in the latent space (a vector of numbers) into a single artifact.  Or you can think of it as a space of possible artifacts that are positioned in an n-dimensional space.  

In this code, we have a "population" which is a list of Individuals, each of which has their own "dna", their n-dimensional position in the space.  E.g. `[0.23, 0.12, 0.9, 0.86, 0.87....]`.  We can then use the "space" you create to turn those into some kind of generative art.  **Think of each dimension of the DNA as one of your sliders from a previous assignment**.  Past projects have included:

* A boba tea generator where different dimensions controlled the size, color, number of bubble, straw length
* An animated solar system where different dimensions controlled the speed of orbits and colors of different planets
* Landscapes with different houses, trees, skies
* Generative dresses 
* Animating spaceships with particle physics (which one is fast? agile? big?)
* Funky little faces (ie, make-your-own-avatar creator!)

Your system will have functions for drawing the *whole* population (if you want a background) and the individual, as well as update functions for both.

When done, submit three images/gifs to Canvas, showing at least 5 interesting landmarks in your system, as well as a tgz/zip containing your filled out **readme.md and source code**

**Inspiration and education:**

You can use any of your techniques from the gifs, drawing tools, particle systems or otherwise to create these spaces.


Speedrun
========

*   Remix [https://glitch.com/edit/#!/galaxykate-a5](https://glitch.com/edit/#!/galaxykate-a5)
*   Make 3 spaces by cloning "space-rectangle.js" and including it in your HTML
* For each new system, 
  * This will automatically appear in the selector window
  * Have some tuning values ("dimensions") that you want to control for this system
    * e.g, colors, speeds, or any number you want to experiment with
    * these will appear automatically as sliders on the left when you have an individual selected
    * make at least 6 dimensions per space (but can make many more!)
  * Each individual will have a "genotype", ie array of "dna" (values 0-1) that we will interpret as its "phenotype", ie, what it looks and behaves like
    * Implement "drawIndividual" (and optionally "drawIndividual" and "setupIndividual") to use these values to draw it as ..whatever you want!
     * Optionally implement "draw" and "update" to do the same for the whole population if you want backgrounds etc.
  * Once you have tuned your space to your satisfaction:
    * create at least 5 interesting **landmarks** by using the sliders (or other evolution UI) to explore your space.
    * Use the "copy DNA" button to copy the current selected individual's DNA to your clipboard and paste it into your landmark section
    * Give each one an expressive name. 
    * The goal is to make "map" of the best parts of your space.
  
As the week goes on, I'll add things to `app.js` that will use your latent space in new ways (evolution, music visualizers).  You can update this when you want without affecting your code, to get new features.  **The benefit of "latent spaces" is that once you have a way to turn an array of vectors into an art, you can reuse it with many kinds of interaction!**

Rubric
======

*   2pts: have readme.md
*   3pts x 3: systems
*   2pts: GIF (or screenshots) submitted to Canvas

