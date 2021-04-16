# Routing

Routing is navigation of the application via the URL.  

* https://catfact.ninja/breeds
* https://catfact.ninja/fact
* https://catfact.ninja/facts

Extra parameters

* https://catfact.ninja/facts?limit=3
* Full routing would allow /facts/3

# Install Routes with the cli

https://vueschool.io/courses/vue-router-for-everyone?friend=vuerouter

You must have nodejs and npm installed

```bash
npm install -g @vue/cli
vue ui
```
change into the directory and type `npm run serve`

There tend to be a lot of warnings produced

## Why route?

Much faster and responsive loads for other pages in the app.

Only use &lt;a> tags for external links.  Use routing for internal links.

## Adding Departments

* In the views folder, create a "Departments.vue" file in the views folder.
* In the router.js file, create a path to departments

            {
               path: "/departments",
               name: "departments",
               component:departments,
             },

Then add the following line at the top of router.js:

```
            import departments from "./views/departments"
```

Now go to app.vue and add the route-link