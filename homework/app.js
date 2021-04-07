//State data from https://github.com/CivilServiceUSA/us-states/blob/master/data/states.json

const app = Vue.createApp({
  data: function () {
    return {
      states: [],
      picked: "Mi",
    };
  },
  methods: {
    makeAlt: function (st) {
      //console.log("stName is ", st.state);
      return "Seal of " + st.state;
    },
    lower: function () {
      this.picked = this.picked.toLowerCase();
    },
  },
  computed: {
    byName: function () {
      return this.states.filter( name => name.slug.includes(this.picked));
    }
  },
  mounted() {
    fetch("./states.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        this.states = data;
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
app.mount("#appArea");
