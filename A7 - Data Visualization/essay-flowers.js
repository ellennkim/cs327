Vue.component("essay-flowers", {
  template: `
    <article>
      <section>
      <div class="main-title">
        <p>Common Flowers 🌿🌸</p>
        </div>
      </section>

      <!-- SECTION 1: List all the flowers -->
      <section>
        <div class="titles">
        <h4>List of Common Flowers</h4>
        </div>
        <div class="viz">
        <div v-for="flower in flowers" :key="flower.name" class="flower-item">
            <!-- Help from ChatGPT -->
            <span 
            @mouseover="showImage(flower)"
            @mouseout="hideImage"
            :style="{ 'font-weight': 'bold', 'color': 'hsla(120, 50%, 20%, 1)', 'font-size': '16px', 'background-color': 'hsla(120, 30%, 90%, 1)' }">{{ flower.name }}
            </span>
            <div class="img"
            <img
            v-show="flower.showImage"
            :src="flower.imageURL"
            :alt="flower.name"
            style="max-width: 200px; max-height: 200px; position: sticky; padding: 50px; right: 20px;"
          />
          </div>
          </div>
        </div>
        <div class="exp">
        <p>Here is a list of common flowers that you may find in your garden or outside next to the sidewalk. There are 41 flowers in this dataset, spanning different colors, sizes, shapes, genuses, planting months, and classifications, and each flower is accompanied by a visually appealing image.<br>
        Hover over the name to see the image! <br>
        <strong>Image Sources: </strong> Wikipedia
        <br>
        </p>
        </div>
      </section>

      <!-- SECTION 2: Display a timeline of flowers -->
      <section>
      <div class="titles">
        <h4>Planting Timeline</h4>
      </div>
      <div class="viz">
        <div class="bar-chart">
          <div class="months">
            <div v-for="month in months" :key="month" class="month-label" style="font-weight: bold;">
              {{ month }}
            </div>
          </div>
          <!-- Help from ChatGPT -->
          <div v-for="flower in flowers" :key="flower.name" class="bar">
            <div class="bar-label">{{ flower.name }}</div>
            <div class="bar-content">
              <div
                v-for="month in months"
                :key="month"
                class="bar-segment"
                :class="{ active: isMonthInRange(flower, month) }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="exp">
      <p>Here you can explore the recommended planting timeline for each flower. In this timeline layout, the lighter green bars represent the planting months. Though most of them are planted during the spring season, or from the month March to April, few flowers can be planted all year-long, such as some types of orchids. Additionally, the flower birds of paradise can thrive and flourish in colder seasons, including the months from January to March.</p>
      </div>
    </section>
      
    <!-- SECTION 3: A bar chart of each type -->
    <!-- Help from ChatGPT -->
    <section v-if="flowersGroupedByType">
      <div class="titles">
        <h4>Flower Planting Classifications</h4>
      </div>
      <div class="viz">
        <div class="class-bar-chart">
          <div v-for="(flowersInType, type) in flowersGroupedByType" :key="type">
            <h4
              @mouseover="setHoveredClassification(type)"
              @mouseout="clearHoveredClassification"
            >
              {{ type }}
            </h4>
            <div
              class="class-bar"
              :style="{ width: flowersInType.length * 10 + 'px' }"
              @mouseover="setHoveredClassification(type)"
              @mouseout="clearHoveredClassification"
            >
              {{ flowersInType.length }}
            </div>
            <div v-if="hoveredClassification === type" class="tooltip">
              {{ flowersInType.map(flower => flower.name).join(', ') }}
            </div>
          </div>
        </div>
      </div>
      <div class="exp">
    <p>Explore the distribution of flowers by type. Hover over the bars to see which flowers are in each category. <br>
    Most of the flowers are perennials (about 83% of the dataset), but it is interesting to note which flowers fall within the subcategories of the perennial plants (tuberous and evergreen perennials, in this case).
    You can examine the annual, biennal, and shrub flowers as well.</p>
    </div>
  </section>
  </article>
  `,
  data() {
    return {
      flowers: [],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      hoveredFlower: null,
      hoveredClassification: null,
    };
  },
  computed: {
    flowersGroupedByType() {
      if (!this.flowers || this.flowers.length === 0) {
        return null;
      }

      const types = {};

      this.flowers.forEach((flower) => {
        const classification = flower.classification;
        if (!types[classification]) {
          types[classification] = [];
        }
        types[classification].push(flower);
      });

      return types;
    },
  },

  // Help from ChatGPT
  methods: {
    showImage(flower) {
      this.flowers.forEach((f) => (f.showImage = false));
      this.$set(flower, "showImage", true);
    },
    hideImage(flower) {
      this.$set(flower, "showImage", false);
    },

    isMonthInRange(flower, month) {
      const startingMonthIndex = this.months.indexOf(flower.starting_month);
      const endingMonthIndex = this.months.indexOf(flower.ending_month);
      const currentMonthIndex = this.months.indexOf(month);

      return (
        currentMonthIndex >= startingMonthIndex &&
        currentMonthIndex <= endingMonthIndex
      );
    },

    flowersInMonth(month) {
      return this.flowers.filter((flower) =>
        flower.planting_months.includes(month)
      );
    },
    calculateTimelineWidth(flower) {
      const totalMonths = 12;
      const startingMonthIndex = this.months.indexOf(flower.starting_month);
      const endingMonthIndex = this.months.indexOf(flower.ending_month);
      const timelineWidth =
        ((endingMonthIndex - startingMonthIndex + 1) / totalMonths) * 100;
      return timelineWidth;
    },
    
    setHoveredClassification(classification) {
    this.hoveredClassification = classification;
  },

  clearHoveredClassification() {
    this.hoveredClassification = null;
  },
  },

  mounted() {
    // Fetch flower data
    fetch("data/flowers.json")
      .then((response) => response.json())
      .then((data) => {
        this.flowers = data.flowers.map((flower) => ({
          ...flower,
          showImage: false,
        }));
      })
      .catch((error) => {
        console.error("Error loading flower data:", error);
      });
  },
});
