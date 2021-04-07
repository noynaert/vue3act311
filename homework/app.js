//State data from https://github.com/CivilServiceUSA/us-states/blob/master/data/states.json

const app = Vue.createApp({
  data: function () {
    return {
      states: [],
      
    };
  },
  methods: {
    makeAlt: function (st) {
      console.log("stName is ",st.state)
      return "Seal of " + st.state;
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
