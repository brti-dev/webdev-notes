# Compiling JSX with Babel

## Method #1: <script>

```html
<script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
<script type="text/babel">
const element = (
    <div className="container">
        <h1>Hell O'world!</h1>
    </div>
)
ReactDOM.render(element, document.getElementById('container'))
```

## Method #2: Command line

Install core Babel library and CLI in the local project directory
> $ npm install --save-dev @babel/core @babel/cli

Check for installation
> $ node_modules/.bin/babel --version
> $ npx babel --version

Install preset that provides transform operations
> $ npm install --save-dev @babel/preset-react

Compile jsx from `src` dir to js in `public` dir
> $ npx babel src --presets @babel/react --out-dir public

# Set up preset-env with .babelrc

Allows use of latest Js while polyfilling for environments that may not support

1. Install preset to project modules
> $ npm install --save-dev @babel/preset-env

2. Compose .babelrc and put into binary files dir
The following will also use preset-react to compile JSX!
```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "ie": "11",
                    "edge": "15",
                    "safari": "10",
                    "firefox": "50",
                    "chrome": "49"
                }
            }
        ],
        "@babel/preset-react"
    ]
}
```

3. Compile
> $ npx babel src --out-dir public
