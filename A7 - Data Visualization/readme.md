# A7: Data Essay

### Your Glitch link

https://ellenkim-a7.glitch.me/

---

## Essay reading #1

### Title, author and link

Each country's subreddit and its number of members
@Ceu_64 on Reddit (r/dataisbeautiful)
https://www.reddit.com/r/dataisbeautiful/comments/17rhnpx/each_countrys_subreddit_and_its_number_of_members/

### Main argument this essay is making

The U.S. and other areas of North America as well as some regions in Europe, Australia, Brasil, and India have more than 1 million members on each country's subreddit.
The U.S., however, has the biggest number of members, which is greater than 2.4 million.
African countries as well as some Eastern European countries do not have nearly as many and only have less than 30K members.

### Outline

There aren't really any paragraphs in this essay because it is more of an infographic, but it is an image with a world map. Each country or territory is color coded using a key at the top right of the image, indicating which color corresponds with which range of number of subreddit members.
Also, it says which subreddit for each country was used to create this data visualization. For example, the American subreddit is r/politics, while the Norwegian subreddit is r/norge.

### What worked well in this?

The color coding worked well in this, specifically the use of colors that get darker and darker in hue as the number of members increases.
It works well because it's much easier to visualize the trends among certain continents. In particular, North America has a lot of members on the subreddit, which makes sense given that Reddit was founded by Americans and is currently based in the U.S. However, African countries are not on Reddit as much as North Americans, which could be attributed to the country's smaller population or inability/unwillingness to access the platform as access.

---

## Essay reading #2

### Title, author and link

An Interactive Visualization of Every Line in Hamilton
Shirley Wu from The Pudding
https://pudding.cool/2017/03/hamilton/

### Main argument this essay is making

This essay mostly evaluates the relationships between Alexander Hamilton and the two Schuyler sisters, Eliza and Angelica, and how these relationships contributed to the underlying themes and character phases that take place in Hamilton.

### Outline

Wu from The Pudding notes that the favorite relationship that she examined was the one between Angelica and Alexander. Interestingly, Angelica and Alexander's relationship start quite flirtatiously, but Angelica realizes her sister is hopelessly in love with Alexander. Therefore, both of them choose to put Eliza first, though it is implied that they had a short-lived affair. As you scroll, you can filter the conversations between characters; there are nine songs that depict their secret relationship and their love for Eliza.

Each character has a specific color for their parts, so you can easily tell which character is speaking. For example, Wu describes the turning point in their relationship, which is when Alexander releases the details of his affair with Maria Reynolds. Though Alexander is quite relieved to see that Angelica - "someone who understands" - returns from London to visit the Hamilton family, these emotions are not reciprocated; instead, Angelica states that Alexander will never be satisfied with anyone and that she will always choose Eliza's happiness over anything else.

However, after the sudden loss of Eliza and Alexander's son, Wu vividly represents the change within Alexander's personality, for he finally decides to put Eliza first in "The Reynolds Pamphlet". Angelica notices this change, and this song signifies the end of their story.

Similarly, Wu utilizes this same technique to demonstrate the variety of themes that occur in this play, using a key (c for content, l for legacy, d for death, etc.).

Each visualization steps primarily relies on HTML/CSS/JS techniques, such as different stylistic choices and colors, audio files to hear the songs as well as particle systems and dots/rectangles to represent each line.

### What worked well in this?

The use of different colors for each character as well as the character maps (to filter certain characters or conversations between characters) worked very well. You can easily visualize which songs mainly represent which characters based on the themes and the interactions that take place.

---

## Essay reading #3

### Title, author and link

Inside a Genius Mind: Spirals
From Google's Exploring da Vinci's Notebook
https://artsandculture.google.com/experiment/TAEPZtXK2s139g

### Main argument this essay is making

Leonardo enjoyed documenting spirals, whether it would be in people's hair, the swirls of river currents, or the growth pattern of plants.

### Outline

For each one, write down an outline of the essay: a sentence summary of each paragraph, 
each visualization step (and what its trying to show)
and use the Chrome dev tools to see what the visualization is displayed as. 
Is it an image, a canvas, or HTML elements?

Leonardo documented the force of flowing water and how the swirling patterns differ based on the force or flow. He obsessed over these visuals, especially the motion of water when it flows, becomes trapped, moves around different obstacles, or becomes a vortex during a storm. These points are further accentuated with the use of Leonardo's own drawings and notes in the form of images, as he carefully examines each swirl.

He also compared the swirling water in the river currents to the leafy spirals that appear in the Star of Bethlehem flower as they flow from the stem.

Additionally, he noticed this similar pattern in human hair; the essay includes drawings of a woman's head, particularly focusing on the curls that beautifully stem from the braids lining her scalp.

Due to this long-lasting fascination of his, he was able to design spiral staircases, relying on his previous work to create this architectural diagram.

His notable interest in human body and anatomy also touches on the use of spirals; he compares the circulation system to the way water swirls and flows around by examining the blood transfer system to and from an ox's heart.

### What worked well in this?

Including Leonardo's actual notes and documents worked well because the reader is able to easily visualize his obsession with spirals just by looking at the image, which depicts his drawings but also his extensive notes on the swirling mechanism that is present.

---

## Your essay

### What is your essay about?

Common flowers and their planting timeline/classification

### Where did you get your data? (link or source)

Corpora: https://github.com/dariusk/corpora/blob/master/data/plants/flowers.json

### Where did this data come from originally? Who collected it?

@amarriner on GitHub, ChatGPT gave me the planting months and classifications for each flower. The images for each flower are from the flower's Wikipedia page.

### What information is in your data? (relevant fields, metadata, etc)

The name of the flowers, the recommended starting and ending planting months, an image of the flower, and the planting type (perennial, annual, biennal, etc.)

### How many sections do you have?

3 sections:
1) List of all 41 flowers and an image for each
2) Planting timeline for each flower
3) Flower planting classifications in the form of a bar chart

### What technologies and approaches (Vue, P5/canvas, d3, bar graphs, force directed diagrams, emoji, text-coloring, etc) did you use for your visualizations?

Vue for the sections, bar graphs, images (hover to show), different shades of green for the graphs

### Main argument your essay is making

There is so much diversity within these flower genuses/species, even if they can commonly be found anywhere outside.

### Outline your essay like you did for the essays you read

The first section has the list of the flowers with the images, demonstrating the visual variety among these plants (different colors, shapes, sizes, etc.).

The second section uses two "layered" bar graphs to form a timeline for each flower, indicating the recommended range of months to plant each flower. This highlights the plant diversity within these flowers - orchids, depending on the type, can be planted all-year long whereas birds of paradise is recommended to be planted in the winter season (months January to March).

The third section further explores each flower's planting type, classifying them as either perennial, annual, tuberous perennial, biennal, evergreen perennial, or shrub via a bar chart. Each bar has the number of the flowers that are in each category as well as all the names of the flowers, which can be found by hovering over the bar you wish to research.

### Which two sections have controls, and what can the user explore with them?

The first and third sections both use a hover mechanism, so both are controllable. The first one uses it to show an image of the flower that you hover the mouse over to save space within the container. The third section also uses this technique to show the names of the flowers that fall within each planting classifications, also to save space.

### What is one interesting thing you discovered in your data?

Although there is a good amount of visual diversity, most of the flowers are similar when it comes to planting times of classifications. Most are planted in the spring (March to May/June), and a majority (34/41 = 82.9%) of the flowers are perennial plants.

---

### What is one new skill that you gained during this project?

Making a bar graph and adding hover mechanics (@mouseout and @mouseover) with Vue

### Glitch handles of people in class you got help from, and their help, (or help you gave!)

N/A

### Assets you got from online and why you have permission to include them

Plants dataset from https://github.com/dariusk/corpora/blob/master/data/plants/flowers.json
Images from Wikipedia articles - Creative Commons License (check the article of the flower to see photography credits)

### Online help, including ChatGPT

Help from ChatGPT:
- Making bar chart and timeline
- Organizing bars/stylistic choices in CSS
- Adding hover mechanics
- Creating methods in JS file