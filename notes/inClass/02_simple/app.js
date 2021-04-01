const app = Vue.createApp({
    data: function () {
        return {
            thing: 63,
            animal: "fish",
        }
    },
    methods: {
        pickAnimal() {
            const r = Math.random();
            console.log("r is " + r);
            if (r < .25) {
                this.animal = "horse";
            } else if (r < .50) {
                this.animal = "cow";
            } else if (r < .75) {
                this.animal = "chicken";
            } else {
                this.animal = "bee";
            }
            return this.animal;
        }
    }

});
app.mount("#appArea");
