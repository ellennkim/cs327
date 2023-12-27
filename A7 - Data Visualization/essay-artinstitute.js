/* globals Vue, p5 */

Vue.component("art", {
  template: `<div class="art">
    <img :src="imgURL" />
     <div class="artlabel">{{art.date_start}}</div>
    </div>`,
  computed: {
    imgURL() {
      let url = `https://www.artic.edu/iiif/2/${this.art.image_id}/full/843,/0/default.jpg`;
      return url;
    },
  },
  props: ["art", "timespan"],
});

Vue.component("essay-artinstitute", {
  template: `	
    <article>
      <!-- title section -->      
      <section v-if="true">
        <h1>Art Institute</h1>
      </section>
      
      <section v-if="true">
        <div class="viz">
            <!-- make a timeline -->
            <art v-for="a in allArt" :art="a" :style="getTimelinePosition(a)" />
        </div>
        
        <p>load some art</p>
      </section>
      
      
    </article>
    `,

  methods: {
    getTimelinePosition(art) {
      // given some art, get where it would be on a timeline
      
      let pct = (art.date_start - this.timespan.start)/(this.timespan.end - this.timespan.start)
      let x = pct*this.timespan.width
      let y = Math.random()*400
      console.log(art.title,art.date_start, pct,x)
      
      return {
        position: "absolute",
        left: x.toFixed(2)+ "px",
        top: y.toFixed(2)+ "px"
      }
    },

    getArtDataByTag(tag) {
       console.log("Get art data by tag",tag);
      //Returns a list
      let url = `https://api.artic.edu/api/v1/artworks/search?q=${tag}&limit=20&fields=id,title,latitude,longitude,image_id,date_start`;
      console.log("\tURL:",url);
      fetch(url)
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          // This may run....whenever!

          // Do data stuff here
         
          let found = data.data;
          this.allArt = found;
          console.log(this.allArt)
        });
    },

    getArtDataByID(id) {
      // const url = "https://api.artic.edu/api/v1/artworks/129884"
      const url = `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,latitude,longitude,image_id,date_start`;

      console.log("fetching art data", url);
      fetch(url)
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          // This may run....whenever!

          // Do data stuff here
          console.log("Got data!", data);
          this.currentArt = data.data;
          this.allArt.push(this.currentArt);
        });
    },
  },

  mounted() {
    // Got this from Stack Overflow https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    let idValue = params.id || 129884; // "some_value"
    let tagValue = params.tag || "kandinsky"; // "some_value"
    console.log("id = ", idValue);

    // this.getURLByID(238639);
    // this.getArtDataByID(idValue);
    this.getArtDataByTag(tagValue);
  },
  data() {
    return {
      timespan: {
        start:1900,
        end: 2020,
        width: 400,
      },
      allArt: [],
      currentArt: {},
    };
  },
});
