const fruitList = ["Apple", "Straberry", "Banana", "Peach"]
const scifi = [
   { author: "H. G. Wells", title: "The Time Machine" } ,  
   { author: "Robert Jordan", title: "The Dragon Reborn" },
   {author:"Frank Hurbert", title:"Dune"},
   {author:"Brandon Sanderson", title:"Oathbreaker"},
];

const app = Vue.createApp({
    data: function () {
        return {
            fruits: fruitList,
            books: scifi,
        }
    },
    methods : {

    },
});
app.mount("#appArea");
