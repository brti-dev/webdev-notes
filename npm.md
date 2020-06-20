# NPM

## Installation

Guided (Creates package.json)
    $ npm init
Istall from package.json
    $ npm install
Install packages
    $ npm install --save express // --save to package.json

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