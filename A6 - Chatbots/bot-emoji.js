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
    name: "emojibot", // Lowercase only no spaces! (we reuse this for some Vue stuff)
    description: "a bot that responds with emojis",
    chatControlsHeight: 100, // How big do your controls need to be?

    userDisplayName: "👤",
    botDisplayName: "🤖",

    // What kind of data does your bot need?
    emojiStates: {
      happy: {
        emoji: "😊",
        message: "Today is a good day!~~",
        draw: "☀️",
      },
      disappointed: {
        emoji: "😐",
        message: "I'm disappointed in you.",
        draw: "😔",
      },
      upset: {
        emoji: "☹️",
        message: "I'm upset.",
        draw: "😥",
      },
      sad: {
        emoji: "😭",
        message: "I'm so upset right now, don't talk to me.",
        draw: "💔",
      },
      laughing: {
        emoji: "🤣",
        message: "Haha!",
        draw: "💀",
      },
      angry: {
        emoji: "🤬",
        message: "*******************",
        draw: "💢",
      },
      cool: {
        emoji: "😎",
        message: "So chillllll",
        draw: "🥶",
      },
      shocked: {
        emoji: "😳",
        message: "Wattttt ???",
        draw: "⁉️",
      },
      confused: {
        emoji: "😕",
        message: "I'm lost...",
        draw: "🤔",
      },
      love: {
        emoji: "❤️",
        message: "Feeling so much love today.",
        draw: "💖",
      },
      hungry: {
        emoji: "🍔",
        message: "I'm starving!",
        draw: "🍟",
      },
      celebratory: {
        emoji: "🥳",
        message: "CELEBRATION TIME !!!",
        draw: "🎉",
      },
      magical: {
        emoji: "✨",
        message: "Hope you have a magical day today!",
        draw: "🤩",
      },
      sleepy: {
        emoji: "😴",
        message: "I wanna sleep...zzz",
        draw: "🛏️",
      },
      relieved: {
        emoji: "😌",
        message: "Feeling goodddd",
        draw: "👍",
      },
      heartEyes: {
        emoji: "😍",
        message: "I'm so in love!",
        draw: "💌",
      },
    },

    drawEmoji(emoji, x, y, size) {
      const p = this.p;
      p.text(emoji, x, y);
      p.textSize(size);
      p.stroke(0);
    },

    updateState(state) {
      console.log("STATE HAS BEEN UPDATED");
      const p = this.p;
      this.currentState = state;

      let userEmoji = this.emojiStates[this.currentState].emoji;
      this.messages.push({
        text: userEmoji,
        from: "user",
      });

      let responseMessage = this.emojiStates[this.currentState].message;
      setTimeout(() => {
        this.messages.push({
          text: responseMessage,
          from: "bot",
        });
      }, 1500);

      this.x = p.random(p.width);
      this.y = p.random(p.height);
      this.textSize = p.random(12, 36);

      let botEmoji = this.emojiStates[this.currentState].draw;
      let intervalTime = 2500;

      setInterval(() => {
        this.x = p.random(p.width);
        this.y = p.random(p.height);
        this.textSize = p.random(12, 36);
        this.drawEmoji(userEmoji, this.x, this.y, this.textSize);
      }, intervalTime);

      setTimeout(() => {
        setInterval(() => {
          this.x = p.random(p.width);
          this.y = p.random(p.height);
          this.textSize = p.random(12, 36);
          this.drawEmoji(botEmoji, this.x, this.y, this.textSize);
        }, intervalTime);
      }, 3500);

      console.log("EMOJI HAS BEEN DRAWN");
    },

    //=========================================================================================
    // events

    setup() {
      console.log("Setup", this.name);
      // TODO: does this bot need any setup?
      // Should it say something when it starts?
      // Setup this bot
      this.messages.push({
        text: "👋",
        from: "bot",
      });
    },

    // If you need more input data, add it here, and pass it in
    input({ text, from, otherDataHere }) {
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

    mounted() {
      new p5((p) => {
        this.bot.p = p;

        p.setup = () => {
          p.createCanvas(WIDTH, HEIGHT);
          p.colorMode(p.HSL);
          p.background(269, 100, 95);
        };

        p.draw = () => {};
      }, this.$refs.p5);
    },

    props: { bot: { required: true, type: Object } }, // We need to have bot
  });
  //============================================================
  /**
   * Input controls for this bot.
   * Do we just need a chat input? Do we need anything else?
   * What about game controls, useful buttons, sliders?
   **/

  Vue.component(`input-${bot.name}`, {
    template: `<div>
      <!-- buttons to update bot's state -->
      <button v-for="(emoji, state, draw) in bot.emojiStates" :key="state" @click="updateState(state)">
        {{ emoji.emoji }}
      </button>
    </div>`,

    methods: {
      updateState(state) {
        this.bot.updateState(state);
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
