#  ![The Vue Logo](/images/120x120VueLogo.png) 0010 Getting Started with Vue ![The Vue Logo](/images/120x120VueLogo.png)

## Frameworks

## What is Vue?

View is a JavaScript Framework.  

* Client-side framework.  Relies on API for back-end
* Third-party libraries
* Approach to structuring the application
* Gives modern look and feel.  (Behaves more like a mobile app)  Moves quickly.  Data is loaded behind the scene as much as possible.
* Allows focus on buisiness models, rather than mechanics of rendering

You can use Vue to control just part of a page.  Or it can be all of the screen.  For example, could just do a chat app or a sidebar.


## MVC Model View Controller

* Model  -- The data source.  It is usually a database, but can be a flat file or even just an in-memory array
* View -- How things look.
    * ***Views should be stupid***
      * No business logic at all
      * Logic is only the logic needed to used to get the display working.  And minimize that if you can
* Controller
    * Controller varies a lot.  People keep coming up with different words for controller.
    * Very generally, it connects the Model with the View.
    * Controllers have gotten smaller over time. 
      * I feel like later frameworks are minimizing Controllers by incorporating more of the functionality into the framework itself.

### Routing

Routing isn't really part of the MVC model.  It is a way of accessing web pages (The java placeholder site illustrates)

### Frameworks in general

The framework lets you describe what should be listed and then does all the JS behind the scene to decide what steps are needed

## What we have been doing up until now

* Use of packages
* Oddball functionality of JavaScript

We need the insights in Vue.

* We won't write all that much JavaScript
* We will be creating and manipulating objects in JavaScript
* Even if we are not using a lot of JS, what we will do pushes the syntaxjhyojny 2

## Vue vs React vs Angular

React lacks things like routing.  There are third-party additions, but it isn't integral.

Angular is a lot more complicated

Vue is weaker than React on mobile devices.  There are some ways to get around this.

* Use Weex   [https://weex.apache.org/guide/use-vue-in-weex.html#the-web-renderer](https://weex.apache.org/guide/use-vue-in-weex.html#the-web-renderer)
* Avoid using DOM-centric actions because phones don't have a DOM.  

Vue is a good starting point.  It has the fundamentals across all frameworks.

## Installing Vue

Generally, there are at least four ways to install [https://vuejs.org/v2/guide/installation.html](https://vuejs.org/v2/guide/installation.html)

* Bring it in from the CDN
   * Avoid for anything except simple/demo projects
* Direct script insertion
   * Development Version
     * Includes warnings and development help
   * Minified for production version
     * Loads quickly and doesn't show warnings to the user
* Install locally with NPM
* Initialize the project with the NPM CLI.