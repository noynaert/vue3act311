#0025 NPM install

## vue-cli

First, install the vue command line interface (cli).  Make sure it is installed globally.  This is a one-time thing.  It is also fairly slow.

```bash
npm install -g @vue/cli
```

Now go to the directory you will use and enter the following, with "my-project" replaced with your project name.

```bash
vue create my-project
```

Pick Version 3  ***or*** Go Manual.  You can take the defaults.  You could do this to add something like SASS

## Run the server

```bash
npm run serve
```

Open the browser to localhost:8080

## Cleanup

After the project is created, do some cleanup tasks:

* Add "node_modules" to your ```.gitignore``` file.  Create a .gitignore in your root if you don't already have one.
* Go into the ```public``` folder.  Change the ```favicon.ico``` file.  If that isn't what you call your file, then you will also have to change it in the src folder.

