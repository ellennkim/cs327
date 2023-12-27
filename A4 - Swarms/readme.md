# A4: Swarms

### Your Glitch link

https://glitch.com/@ellennkim

### Which systems behaved like you expected? Which ones surprised you? In which ones did your initial idea evolve into something different?

The fish system behaved like I expected because I used the ghost starter particle system as a guide.
I changed the movement of the fish so that they slightly oscillate (using sin) as well as their design.
My initial idea for the bubble one evolved into something different because I originally wanted to make the bubbles spawn into smaller ones when colliding.
However, that didn't work very well, so I just made it so that they popped when they touched each other.
I am still surprised at how it worked out - I had a lot of trouble with the collision detection system.

### Describe your 1st system. What forces does it use? What is its emergent behavior? What debug draw info and controls did you add?
The bubble system simply uses the normal velocity as its main force.
However, I implemented a collision detection system that relies on the radii and the positions of the bubbles, which keeps track of its interactions with other particles.
I added a slider to change the radii of the bubbles and debug info that lists the position of each bubble to check if it's properly colliding.

### Describe your 2nd system. What forces does it use? What is its emergent behavior? What debug draw info and controls did you add?
The fish system uses wander forces and velocity to control the movement of each fish.
It leaves a trail of circles (which is really just part of the fish).
I added color pickers for the two colors of the fish and debug info listing info on the trail (how long it is).

### Describe your 3rd system. What forces does it use? What is its emergent behavior? What debug draw info and controls did you add?
The sand system uses repulsion forces to move the sand particles away from the mouse.
I added a slider to control the avoidance force (how fast it will move away) and debug info showing the direction arrows of where the sand particles are moving. 

### Describe your 4th system. What forces does it use? What is its emergent behavior? What debug draw info and controls did you add?
The seaweed system uses velocity and sway forces to control the movement (amplitude and frequency)
I added a slider to change the wave frequency as well as debug info on the sway amplitude and frequency of the seaweed.

### Which system has one particle uses particle-to-particle interaction? Explain how.

The bubble system, it uses collision detection to "pop" when they collide.

### Which system has particles that leave a trail or creates new particles

The fish system, it has particles that leave a trail, which really makes the body

### Which system interacts with user behavior, and how?

The sand particle system reacts with user behavior by moving away from the mouse.
I used the YouTube video linked in the instructions.md file to get inspiration for the repulsion or avoidance forces by creating certain variables, such as distance to particle from mouse.
These forces (avoidance and mouse forces) were then added into one total force.

### What is one new skill that you gained during this project?

I learned how to create particle systems that can leave a trail or react to the user's mouse.

### Glitch handles of people in class you got help from, and their help, (or help you gave!)

N/A

### Assets you got from online and why you have permission to include them

N/A

### Online help, including ChatGPT 

Web Bae's YouTube video on interactive particle systems for the sand particle system - help with repulsion forces

Help from ChatGPT:
Bubble collision detection
Seaweed oscillation
Debug info for systems (adding text)