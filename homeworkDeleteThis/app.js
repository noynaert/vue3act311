//State data from https://github.com/CivilServiceUSA/us-states/blob/master/data/states.json

const app = Vue.createApp({
  data: function () {
    return {
      states: [],
      picked: "Iowa",
      displayTable: true,
    };
  },
  methods: {
    makeAlt: function (state) {
      let result = "Flag of " + state;
      //console.log(result);
      return result;
     },
  },
  computed: {
    selected: function () {
      let p = this.picked.toLowerCase();
      return this.states.filter(st => st.slug.includes(p));
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
