# NPM

## Commands

$ npm init      //Guided
      install   //Install from package.json
      install --production   //Don't install dev dependencies
      view <packagename> [detail(ie 'version')]
      update --save //Update packages - all package.json dependencies will be updated
      rebuild <packagename> //This is useful when you install a new version of node, and must recompile all your C++ addons with the new binary

Sometimes you’re developing two or more modules at once, and at least one of them depends on the other. And often times, in order to be able to publish the module to NPM, you need to ensure the modules that depend on it work OK prior to publishing.
You can leverage npm link to generate a global reference to a module, and then run npm link <package>
to install it in other modules. Consider the following example, in which moduleB depends on the version of moduleA you’re currently developing, and moduleB specifies "moduleA" as a dependency in its package.json:

    $ cd moduleA/
    $ npm link
    $ cd ../moduleB

    # if moduleB package.json is pointing to a yet-unpublished
    # version of moduleA, npm install will fail:
    $ npm install

    # this will install your local version of moduleA
    $ npm link moduleA

    # since moduleA is now installed, npm install will ignore it:
    $ npm install

## Run Scripts

1. In package.json:
```json
{
  "scripts": {
    "start": "nodemon -w server/server.js",
    "compile": "babel src --out-dir public",
    "watch": "babel src --out-dir public --watch --verbose",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

2. Command
> $ npm run watch
