//button to change images - help from ChatGPT
const images = [
  "https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/northwestern.png?v=1702793087057",
  "https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/river.png?v=1702793110347",
  "https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/boat.png?v=1702793120543",
];
let currentImageIndex = 0;
const imgElement = document.getElementById("img1");

function changeImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  imgElement.src = images[currentImageIndex];
}


/* SHOWCASING PROJECTS */
const projects = [
    { name: 'A1 - Personal Website', image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/Screenshot%202023-12-17%20at%201.12.13%20AM.png?v=1702793537888', link: 'https://ellennkim.glitch.me/index.html' },
    { name: 'A2 - Animated GIFs', image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/WebsiteA2.png?v=1700542906549', link: 'https://ellenkim-a2-new.glitch.me/' },
    { name: 'A3 - KidPix', image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/KidPix.gif?v=1700543347957', link: 'https://ellenkim-a3.glitch.me/' },
    { name: 'A4 - Swarms', image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/Screen.png?v=1700543421028', link: 'https://ellenkim-a4.glitch.me/' },
    { name: 'A5 - Parametric Spaces', image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/lollipops.png?v=1700543451509', link: 'https://ellenkim-a5.glitch.me/' },
    { name: 'A6 - Chatbots', image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/Fashion%20Bot.png?v=1700543482773', link: 'https://ellenkim-a6.glitch.me/' },
    { name: 'A7 - Data Visualization', image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/Section%201.png?v=1700543508152', link: 'https://ellenkim-a7.glitch.me/' },
    { name: 'A8 - Masks', image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/underwatermask.gif?v=1702791286447', link: 'https://ellenkim-a8.glitch.me/' },
];

function createProjectElement(project) {
    const projectItem = document.createElement('div');
    projectItem.classList.add('project-item');

    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.name;
    image.classList.add('project-image');

    const title = document.createElement('h3');
    title.textContent = project.name;

    const description = document.createElement('p');
    description.textContent = project.description; 

    const link = document.createElement('a');
    link.href = project.link;
    link.textContent = "View Project";
    link.classList.add('project-link');

    projectItem.appendChild(image);
    projectItem.appendChild(title);
    projectItem.appendChild(description); 
    projectItem.appendChild(link);

    return projectItem;
}

// Function to initialize the project grid
function initializeProjects() {
    const projectContainer = document.getElementById('projectContainer');

    // Check if the projectContainer is found before proceeding
    if (projectContainer) {
        // Add projects to the container
        projects.forEach((project) => {
            const projectElement = createProjectElement(project);
            projectContainer.appendChild(projectElement);
        });
    } else {
        console.error("Error: 'projectContainer' not found in the document.");
    }
}

/* SHOWCASING OTHER PEOPLE'S PROJECTS - TOUR */
const tourProjects = [
    { name: "Jing Gu's A3", image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/jing-gu.gif?v=1700710833428', link: 'https://juvenile-difficult-earth.glitch.me/', description: "I really liked the use of 'spikes' or triangles and symmetry with Jing's drawing tool. The symmetry within the canvas definitely makes it easy to draw faces or animals. " },
    { name: "Tina Chen's A2", image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/ocean.gif?v=1700712106279', link: 'https://tinachen2025-a2.glitch.me/', description: "I liked the oscillating waves and the use of the ombre effect within both the lightning and the water." },
    { name: "Ryan Newkirk's A5", image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/amogus.gif?v=1700712601256', link: 'https://ryannewkirk-a5.glitch.me/', description: "The variety of options for the astronaut customization is unique. I also liked the color palettes - there are lots of pastel blues, pinks, yellows, and purples." },
    { name: "Sauhee Han's A6", image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/winterbots.png?v=1700717087195', link: 'https://sauhee-a6-bot.glitch.me/', description: "I thought the use of Tracery grammar, including words such as 'twinkling joy' and 'sparking charm', was a perfect addition to the comfy/cozy winter vibes." },
    { name: "Defne Deda's A1", image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/defne.png?v=1700717122695', description: "The rainbow theme is a nice touch, especially in the buttons, and I like the design of the navigation bar. Also, when you click 'Party!', the rainbow color in the background changes." },
    { name: "YueXi Mo's A7", image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/nba.png?v=1700716980518', link: 'https://stone-brook-sea.glitch.me/', description: "Given that there is a big NBA fanbase at Northwestern, I think this data essay provides a lot of beneficial information in an organized way. I also liked the implementation of all the extensive information on offensive and defensive player stats." },
    { name: "Rui Wen's A4", image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/sky.gif?v=1700717185123', link: 'https://booming-golden-zoo.glitch.me/', description: "The use of arrow keys to control the particles is impressive and unique, and I loved the sky theme - hot air balloons, sun and cloud emojis, etc." },
    { name: "Vidhi Vazirani's A3", image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/paint.gif?v=1700717422691', link: 'https://stitch-fuzzy-lace.glitch.me/', description: "I loved the continuous lights paintbrush because it uses the simple black lines and elevates it by adding the colorful circles or the lights. The colors also go in order of the rainbow, which really makes it 'Christmas Tree-esque'." },
    { name: "Nicole's A4", image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/galaxy.gif?v=1700717037733', link: 'https://a4-nicole.glitch.me/', description: "The galaxy theme and the color palette is very appealing, especially with the different planets and the star trails. The space emojis also move in a zig-zag motion, which is a cool way to represent different types of motions within the particle system." },
    { name: "Joseph Shim's A6", image: 'https://cdn.glitch.global/555d132d-4e20-45ea-8590-74e506b8f321/captain.png?v=1700716983479', link: 'https://emerald-guiltless-echinacea.glitch.me/', description: "The simple emojis to change the narrative is very effective and entertaining. The different possible scenarios must be endless, for they range from Captain Fabel's birthday party to a laser show with the alien delegates."},
];

// Function to create project elements for the tour
function createTourProjectElement(project) {
    const tourItem = document.createElement('div');
    tourItem.classList.add('project-item');

    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.name;
    image.classList.add('project-image');

    const title = document.createElement('h3');
    title.textContent = project.name;

    const description = document.createElement('p');
    description.textContent = project.description;

    const link = document.createElement('a');
    link.href = project.link;
    link.textContent = "View Project";
    link.classList.add('project-link');

    tourItem.appendChild(image);
    tourItem.appendChild(title);
    tourItem.appendChild(description);
    tourItem.appendChild(link);

    return tourItem;
}

// Updated initializeTourProjects function
function initializeTourProjects() {
    const tourContainer = document.getElementById('tourContainer');

    // Check if the tourContainer is found before proceeding
    if (tourContainer) {
        // Add tour projects to the container
        tourProjects.forEach((project) => {
            const projectElement = createTourProjectElement(project);
            tourContainer.appendChild(projectElement);
        });
    } else {
        console.error("Error: 'tourContainer' not found in the document.");
    }
}

// Updated window.onload event to call both initializeProjects and initializeTourProjects
window.onload = function () {
    initializeProjects();
    initializeTourProjects();
};
