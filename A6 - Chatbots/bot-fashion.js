/* globals Vue, systems, Vector2D, tracery */

(function () {
  let bot = {
    /*
     * A bot that can listen, think and speak
     */

    // Start with no messages
    messages: [],

    //=========================================================================================
    // TODO: custom data

    hide: false,
    name: "fashionbot", // Lowercase only no spaces! (we reuse this for some Vue stuff)
    description: "a bot that helps you pick out your clothes",
    chatControlsHeight: 100, // How big do your controls need to be?

    // custom display names if you want
    userDisplayName: "👤",
    botDisplayName: "🤖",

    // Make your own grammar for this bot, use GPT to help, or watch a tutorial!
    grammar: new tracery.Grammar({

      // Tracery grammar - help from ChatGPT
      colors: [
        "tan",
        "white",
        "black",
        "brown",
        "red",
        "blue",
        "green",
        "yellow",
        "purple",
        "orange",
        "pink",
        "turquoise",
        "magenta",
        "gold",
        "cyan",
        "lime",
        "fuchsia",
        "electric blue",
        "chartreuse",
        "hot pink",
        "aqua",
        "violet",
        "coral",
        "amber",
        "indigo",
        "teal",
        "azure",
        "crimson",
        "ruby",
        "jade",
        "sapphire",
        "emerald",
        "amethyst",
        "topaz",
        "lavender",
        "maroon",
        "periwinkle",
        "mustard",
        "seashell",
        "ochre",
        "vermilion",
        "chartreuse",
        "raspberry",
      ],
      patterns: [
        "plain",
        "striped",
        "polka dotted",
        "plaid",
        "floral",
        "geometric",
        "tie-dyed",
        "houndstooth",
        "checkered",
        "paisley",
        "animal print",
        "camouflage",
        "argyle",
        "tartan",
        "ikat",
        "toile",
        "herringbone",
        "chevron",
        "brocade",
        "gingham",
        "jacquard",
      ],
      tops: [
        "blouse",
        "t-shirt",
        "sweater",
        "tank top",
        "kimono",
        "vest",
        "shirt",
        "camisole",
        "crop top",
        "peplum top",
        "tunic",
        "tube top",
        "halter top",
        "bodysuit",
        "off-the-shoulder top",
      ],
      bottoms: [
        "pants",
        "jeans",
        "shorts",
        "leggings",
        "trousers",
        "culottes",
        "joggers",
        "a skort",
        "capris",
        "mini skirt",
        "sweatpants",
        "pleated pants",
        "palazzo pants",
        "cargo pants",
        "midi skirt",
        "maxi skirt",
        "bermuda shorts",
        "pencil skirt",
        "wide-leg pants",
        "harem pants",
        "bell-bottoms",
      ],
      "one-piece": [
        "dress",
        "jumpsuit",
        "romper",
        "bodysuit",
        "playsuit",
        "maxi dress",
        "midi dress",
        "overall dress",
        "smock dress",
        "off-the-shoulder dress",
        "skater dress",
        "jumper dress",
        "wrap dress",
        "shirt dress",
        "sundress",
        "skort dress",
        "peplum dress",
        "ball gown",
        "chemise",
        "overalls",
        "babydoll dress",
        "tiered dress",
      ],
      fabrics: [
        "knit",
        "cotton",
        "silk",
        "wool",
        "polyester",
        "linen",
        "velvet",
        "denim",
        "chiffon",
        "lace",
        "rayon",
        "spandex",
        "satin",
        "cashmere",
        "fleece",
        "nylon",
        "suede",
        "twill",
        "organza",
        "canvas",
        "jersey",
        "leather",
      ],
      coats: [
        "overcoat",
        "trench coat",
        "pea coat",
        "parka",
        "duffle coat",
        "raincoat",
        "down coat",
        "quilted coat",
        "puffer coat",
        "frock coat",
        "cardigan",
        "bolero",
        "blazer",
        "quarter-zip",
        "half-zip",
        "hoodie",
        "zip-up jacket",
      ],
      shoes: [
        "sneakers",
        "knee-high boots",
        "loafers",
        "heels",
        "flats",
        "sandals",
        "oxfords",
        "espadrilles",
        "mules",
        "slippers",
        "flip-flops",
        "wedges",
        "athletic shoes",
        "pumps",
        "derby shoes",
        "platforms",
        "clogs",
        "ankle boots",
      ],
      accessories: [
        "scarf",
        "hat",
        "pair of gloves",
        "belt",
        "sunglasses",
        "watch",
        "necklace",
        "bracelet",
        "earrings",
        "handbag",
        "shoulder bag",
        "backpack",
        "sling bag",
        "necktie",
        "bowtie",
        "headband",
        "hairpin",
        "brooch",
        "pair of cufflinks",
        "beanie",
        "tote bag",
      ],
      suggestion: ["try", "consider", "I suggest", "I recommend", "I propose"],

      potential_outfit: [
        "#suggestion.capitalize# an outfit that consists of #tops.a# paired with #bottoms# and #shoes#.",
      ],
      adj: ["#colors#, #patterns#, #fabrics#"],
      cold: ["#suggestion.capitalize# adding #coats.a# to help you stay warm."],
      single_outfit: [
        "#suggestion.capitalize# pairing #one-piece.a# with some #shoes# and #accessories.a#.",
      ],
      upgrade: [
        "#suggestion.capitalize# wearing #colors.a# and #patterns# #tops# for a fun pop of color with #patterns.a# #colors# #fabrics# #bottoms#. To complete the look, wear #shoes# and #accessories.a#.",
      ],
      thinking: [
        "Hmm...then what about this...",
        "Hmm...let me think...",
        "Give me a second...",
        "Let's see...",
        "I'm considering...",
        "Just a moment...",
        "Looking for some inspiration...",
        "Thinking, thinking...",
        "Let's try this...",
        "Contemplating...",
        "Pondering...",
        "I'm reflecting...",
        "Brainstorming...",
        "Ruminating...",
        "I'm working on it...",
        "Let me create an outfit for you...",
        "Let me imagine...",
        "One moment, please...",
        "Let me cook...",
        "I'm cooking up something...",
      ],

      options: ["#potential_outfit#", "#upgrade#", "#cold#", "#single_outfit#"],
    }),

    //=========================================================================================
    // events

    setup() {
      // TODO: does this bot need any setup?
      // Should it say something when it starts?

      // Setup this bot
      this.messages.push({
        text: "Having a fashion dilemma? Ask me for an outfit! 👚",
        from: "bot",
      });
    },

    // If you need more input data, add it here, and pass it in
    input({ text, from }) {
      this.messages.push({
        text,
        from,
      });
      
      let inlineStyle = `
					background-color: hsl(291, 97%, 97%);
					width: 20px;
					height: 20px;
					border-radius: 10px;
					display:inline-block;
				`;
    },
  };

  //============================================================
  /**
   * TODO: A panel to the right of the chat
   * Could be for p5, drawing, displaying images, a game board, etc,
   * or leave it blank
   **/

  const WIDTH = 600;
  const HEIGHT = 400;

  Vue.component(`panel-${bot.name}`, {
    template: `<div ref="p5"></div>`,

    props: { bot: { required: true, type: Object } }, // We need to have bot
  });

  //============================================================
  /**
   * Input controls for this bot.
   * Do we just need a chat input? Do we need anything else?
   * What about game controls, useful buttons, sliders?
   **/

  Vue.component(`input-${bot.name}`, {
    // Custom inputs for this bot
    template: `<div>
			<!-- Basic chat control, press enter or the button to input -->
			<input @keyup.enter="sendText" v-model="inputText" />
			<button @click="sendText">send</button>
      
      <!-- Buttons to trigger various outfit types --> 
      <button @click="generateOutfit('#upgrade#', 'Surprise me please!')" style="background-color: #fefee1; color: black;">Surprise Me</button>
      <button @click="generateOutfit('#cold#', 'A warm outfit please!')" style="background-color: #fedec8; color: black;">Warm Outfit</button>
      <button @click="generateOutfit('#potential_outfit#', 'Simple outfit will do!')" style="background-color: #b063bf; color: white;">Simple Outfit</button>
      <button @click="generateOutfit('#single_outfit#', 'A one-piece would be great!')" style="background-color: #6390bf; color: white;">One-Piece</button>
      <div>
    </div>`,

    methods: {
      sendText() {
        // Send the current text to the bot
        this.bot.input({ text: this.inputText, from: "user" });
        // Then clear it
        this.inputText = "";
        let timeForBotToThink = 1000;

        setTimeout(() => {
          this.bot.input({
            text: "Pick a situation that best fits your needs! ʚ♡ɞ",
            from: "bot",
          });
        }, timeForBotToThink);
      },

      generateOutfit(outfitType, buttonName) {
        console.log("GENERATE OUTFIT");
        let timeForBotToThink = 1000;
        let userMessage = this.bot.grammar.flatten(buttonName);
        this.bot.input({ text: userMessage, from: "user" });

        let thinkingMessage = this.bot.grammar.flatten("#thinking#");

        setTimeout(() => {
          this.bot.input({ text: thinkingMessage, from: "bot" });
        }, timeForBotToThink);

        let outfitMessage = this.bot.grammar.flatten(outfitType);

        setTimeout(() => {
          this.bot.input({ text: outfitMessage, from: "bot" });
        }, timeForBotToThink + 2000);

      },
    },

    // Custom data for these controls
    data() {
      return {
        inputText: "",
      };
    },

    props: { bot: { required: true, type: Object } }, // We need to have bot
  });

  bots.push(bot);
})();
