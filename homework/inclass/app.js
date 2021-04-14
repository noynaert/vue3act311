const app = Vue.createApp({
  data: function () {
    return {
     sections:[]
    };
  },
  methods: {
  },
  mounted() {
    fetch("./csmp.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.sections = data;
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
app.mount("#appArea");
