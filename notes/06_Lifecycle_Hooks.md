# 0060 Lifecycle Hooks

Lifecycle hooks allow you to to trigger events at certain critical points.  The major points are:

* created
* mounted
* update
* unmount

## Reference  

* [Documentation at https://v3.vuejs.org/api/options-lifecycle-hooks.html](https://v3.vuejs.org/api/options-lifecycle-hooks.html)
  
![Lifecycle Diagram](https://v3.vuejs.org/images/lifecycle.svg)

## functions

You can create functions that will happen at each hook.  They are at the same level as data: and methods:

```javascript
const stateData = [];

const app = Vue.createApp({
  data: function () {
    ...
  },
  methods: {
      ...
  },
  created() {
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
  mounted() {
      ...
  },
  unmounted(){
       ...
  }
});
app.mount("#appArea");
```