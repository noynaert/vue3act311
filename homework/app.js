//State data from https://github.com/CivilServiceUSA/us-states/blob/master/data/states.json

const app = Vue.createApp({
  data: function () {
    return {
      states: [],
    };
  },
  methods: {},
  mounted() {
    fetch("./states.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.states = data;
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
app.mount("#appArea");
