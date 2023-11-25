# A3: Drawing Tools


## What do you want the user to feel when using these tools? What mood is this for? What is the user trying to do?

I want them to feel that they're given some creative liberty while drawing with the (hopefully) straightforward tools.
I would say the mood my tools give are unexpected yet relatively simple.


## Describe your eraser. What does it do? 
It is a brush that "erases" by drawing over the art with the background color of the canvas.
I also made a "clear screen" tool, which simply resets the entire canvas to the background color.

## Describe your 1st tool. What does it do? How is it used?
-- you don't need to say "you click the button" but if there are any tricky or surprising ways this tool works, let the reader know!--
-- you can also describe *how* it works, what techniques and P5 tools did you use?--

It's a simple discrete dotting tool that changes color as you continue to use it.
I used seconds, a for-loop, and Math.cos to randomly change the hue over time.
If you slowly drag your mouse along, it looks like you're adding dimension because the stroke of the dots is black.

## Describe your 2nd tool. What does it do? How is it used?
Similar to the 1st tool, this is a rainbow dotting tool that changes color over time as well as size depending on the speed at which you're drawing.
It can be used to form various circles with different colors and sizes, depending on how long/fast you drag your mouse.

## Describe your 3rd tool. What does it do? How is it used?
This is my continuous spline curve tool.
It changes colors over time, and if you drag your mouse over an area that has already been drawn on, it will add an ombre-like effect, which gives it some dimension.
It uses begin/endShape() as well as the p.curveVertex to create the spline curves.

## Describe your 4th tool. What does it do? How is it used?
This is a water brush that moves on it's own over time using the lifespan mechanism.
It uses the water droplet emoji, and as you drag your mouse, the water droplets seem to move on its own.

## Which of your tools is continuous? What makes that different?
My 3rd tool is continuous.
It makes it a lot different from my 1st tool because the line that you're drawing continuously goes on and on.
Also, if you click at a point that is not at the last point of the line that you just drew, it'll connect those two points to create a seamless image with continuity.

## Which of your tools uses begin/endshape? What are you doing with that feature?
My 3rd tool uses begin/endShape().
I'm using these two functions to draw spline curves and ensure that they are continuous, not discrete.
beginShape() marks the beginning of my curve, and endShape() effectively closes the shape using the points once you stop drawing.

### What is one new skill that you gained during this project?
I learned how to use begin/endShape() to create continuous spline curves.
I also didn't know that you could use lifespan to make the drawing move on its own for a limited time (depending on the lifespan).

### Glitch handles of people in class you got help from, and their help, (or help you gave!)
N/A

### Assets you got from online and why you have permission to include them
Used Apple emojis for the labels as well as water droplet tool
Generally allowed to include these - part of Unicode standard

### Online help, including ChatGPT 
- help with begin/endShape() syntax (Tool 3)
- help with making the water droplets move & using lifespan (Tool 4)