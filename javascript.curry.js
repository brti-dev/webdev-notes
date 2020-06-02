Curry: cooking up tastier functions

Currying allows you to easily create custom functions by partially invoking an existing function. Here’s a simple example:

var add = function(a,b) {
    return a + b;
}
 
var addTen = add.curry(10); //create function that returns 10 + argument
addTen(20); //30

Generally, curry returns a copy of the invoking function, with its first n arguments pre-assigned with the arguments passed by the curry invocation.

The curry function does not exist in native JavaScript, but it’s easy to write your own. Here I’m augmenting function’s prototype with an implementation based on the Prototype framework. (Notice I’m also throwing in a toArray function for convenience. This is because function’s arguments property is not a true array, and we need it to work with array’s concat function)

function toArray(enum) {
    return Array.prototype.slice.call(enum);
}
 
Function.prototype.curry = function() {
    if (arguments.length<1) {
        return this; //nothing to curry with - return function
    }
    var __method = this;
    var args = toArray(arguments);
    return function() {
        return __method.apply(this, args.concat(toArray(arguments)));
    }
}

The returned function expects to be invoked with additional argument(s) which it will concatenate with the argument(s) it got from the curry function.

In case you were wondering: we could provide the curry function with all the arguments required by the calling function:

//not very useful example
var make5 = add.curry(2,3);
make5(); //5
 
//better example
var sayHello = alert.curry("Hello!");
friendlyDiv.onmouseover = sayHello;

The add function is very basic, but as the logic of a function gets more complex, the value of re-applying that logic to distinct parameters becomes more apparent.

Consider a function that returns the RGB index (in hex) for the color that falls at a given point in the transition between two given colors (specified either by name named or RGB hex)

var getColorBetween = function(transitionFactor, color1, color2) {
    //..
}
 
getColorBetween(0.5, "red", "green"); //<span style="color:#7f4000;">"#7f4000"</span>

If we want to create a series of fall colors, we could experiment by creating a function that returns colors that fall (no pun) 25% of the way between orange and the given color:

var getFallColor = getColorBetween.curry(0.25, "#ff8000");
 
reddishFallColor = getFallColor("red"); //<span style="color:#ff6000;">"#ff6000"</span>
yellowishFallColor = getFallColor("yellow"); //<span style="color:#ff9b00;">"#ff9b00"</span>
brownishFallColor = getFallColor("#800000"); //<span style="color:#df7000;">"#df7000"</span>

Here’s another example that generates various conversion functions

var converter = function(ratio, symbol, input) {
    return [(input*ratio).toFixed(1),symbol].join(" ");
}
 
var kilosToPounds = converter.curry(2.2,"lbs");
var litersToUKPints = converter.curry(1.75, "imperial pints");
var litersToUSPints = converter.curry(1.98, "US pints");
var milesToKilometers = converter.curry(1.62, "km");
 
kilosToPounds(4); //8.8 lbs
litersToUKPints(2.4); //4.2 imperial pints
litersToUSPints(2.4); //4.8 US pints
milesToKilometers(34); //55.1 km

Now, go forth and curry.