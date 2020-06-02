
// Reserved words
/* abstract boolean break byte case catch char class const continue
debugger default delete do double else enum export extends false
final finally float for function goto if implements import in
instanceof int interface long native new null package private
protected public return short static super switch synchronized
this throw throws transient true try typeof var void volatile
while with */

// Expression = fragment of code that produces a value
// Statement = performs an action
// Object = any unordered collection of key-value pairs. If it’s not a primitive (undefined, null, boolean, number or string) it’s an object.
// Prototype = an object from which other objects inherit properties

// Keywords
var // variables exist and are only acessible within the block its defined (within {})
let // 
const //

// Promises
get('story.json').then(function(response) {
  console.log("Success!", response);
}, function(error) {
  console.error("Failed!", error);
});
function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };
    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };
    // Make the request
    req.send();
  });
}

/////////////
// STRINGS //
/////////////

//Using indexOf to find a substring
if (name.indexOf('Guest') == 0) { ... }

//Use indexof() to count the number of characters in a string
count = 0;
pos = str.indexOf("x");
while ( pos != -1 ) {
   count++;
   pos = str.indexOf( "x",pos + 1 );
}

// charAt gets the character at a certain index
"Gilgamesh".charAt(3); //-> g

// NUMBERS //

parseFloat("3.14"); //3.14
parseInt("3.14", 10); //3
2.34.toFixed(1); //"2.3" <- String representation of the number
function toDollars(number){
  return '$'+ parseFloat(number).toFixed(2);
}
toDollars(10); //"$10.00"

////////////
// ARRAYS //
////////////

// Array literal
var foo = [];

// Array constructor/declaration
var foo = new Array(n); // n int indicate the size of the array

//modifying arrays
var mack = [];
mack.push("Mack");
mack.push("the", "Knife");
console.log(mack); // -> ["Mack", "the", "Knife"]
console.log(mack.join(" ")); // -> Mack the Knife
console.log(mack.pop()); // -> Knife
console.log(mack); // -> ["Mack", "the"]
console.log(mack.indexOf("the") >= 0); // true

// Using variables to name properties
var propertyName = "length";
var text = "mainline";
text[propertyName]; //-> 8

//immutability of objects
var object1 = {value: 10};
var object2 = object1;
var object3 = {value: 10};
console.log(object1 == object2); // -> true
console.log(object1 == object3); // -> false
//
object1.value = 15;
console.log(object2.value); // -> 15
console.log(object3.value); // -> 10

// using for-of to iterate over the VALUES (not indexes) of iterable objects like arrays [ES6]
// also works with break, return, and continue
for (var value of ["a", "b", "c"]) {
  console.log(value);
}

// iterating over an object using for-in
// this works on objects and NOT arrays because for-in iterates over INDEXES not values, and index of an array will be a string, not a number)
var ages = {};
function storeAge(name, age) {
  ages[name] = age;
}
storeAge("Larry", 58);
storeAge("Simon", 55);
for (var name_ in ages)
  console.log(name_ + " is " + ages[name_] + " years old");
// -> Larry is 58 years old
// -> Simon is 55 years old

// using indexOf to find an variable within an object/array
var JOURNAL = [
  {"events":["carrot","exercise","weekend"],"squirrel":false},
  {"events":["bread","pudding","brushed teeth","weekend","touched tree"],"squirrel":false}
}
function hasEvent(event, entry) {
  return entry.events.indexOf(event) != -1;
}
var index=0;
if (hasEvent("carrot", JOURNAL[0])) index += 1;

// filter
// Find all the items in array that have the name "orange"
var arr = [
    {"name":"apple", "count": 2},
    {"name":"orange", "count": 5}
    {"name":"pear", "count": 3},
    {"name":"orange", "count": 16},
];
var newArr = arr.filter(function(item){
    return item.name === "orange";
});
console.log("Filter results:", newArr);

// iterating with forEach
var arr = [1,2,3,4,5,6,7,8];
// Uses the usual "for" loop to iterate
for(var i = 0, l = arr.length; i < l; i++){
  console.log(arr[i]);
}
//Uses forEach to iterate [ES5]
arr.forEach(function(item,index){
  console.log(item);
});

//Iterate over an associative object
var list = {value: 1, rest: {value: 2, rest: null}};
for (var node = list; node; node = node.rest){
	//...
}

//exercise with ancestry
//find the average age by century
//some useful instructions for iterating over objects using IN and FOR
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}
var getCentury = function(p){ return Math.ceil(p.died / 100); },
    age = function(p){ return p.died - p.born; },
    centuryData = {},
    centuryDataAverages = {};
var century;
ancestry.forEach(function(p) {
  century = getCentury(p);
  if(century in centuryData) centuryData[century].push(age(p));
  else centuryData[century] = [age(p)];
});
for(var i in centuryData){
  centuryDataAverages[i] = Math.ceil(average(centuryData[i]), 4);
};

//Arrays, like objects, should be called using literal notation
//but using a constructor can be useful on occasion:
var whitespace = new Array(256).join(" "); // string with 255 whitespaces 
// another example:
Array.apply(null, Array(31)).map(function (_, i) { return i + 1; }).forEach(function(day){
  var node = document.createElement("div"),
      text = document.createTextNode(day);
  node.appendChild(text);
  document.getElementById("calendar").appendChild(node);
});

//////////////
// DATETIME //
//////////////

// Date object
var today = new Date();
print("Year: ", today.getFullYear(), ", month: ", today.getMonth(), ", day: ", today.getDate());

///////////////
// FUNCTIONS //
///////////////

// Function literal
var add = function (a, b) {
  return a + b;
}

// Function declaration
// Not part of the top-to-bottom flow control -- moved to the top of their scope
add(1, 2);
function add(a, b) {
  return a + b;
}

// Function constructor
var topEnv = Object.create(null);
["+", "-", "*", "/", "==", "<", ">"].forEach(function(op) {
  topEnv[op] = new Function("a, b", "return a " + op + " b;");
});

// The 'this' parameter is determined by the invocation parameter
// 
// 1. Method invocation
// this is bound to the method
var foo = {
  val: 0,
  increment: function (x){
    this.val += x;
  }
}
foo.increment(1);//1
foo.increment(2);//3
//
// 2. Function invocation
// this is bound to the global object!!!
var sum = add(2, 3);
// 
// 3. Constructor invocation
// this -> new object constructed
// 
// 4. Apply invocation
// this -> assigned

// Closures, functions within functions, maintain their scope and state in the
// environment they were created
var el = document.getElementById("button");
el.onclick = (function() {
  var count = 0; //private
  return function () {
    if (count++ === 3) {
      alert("Third time's the charm");
    }
  }
})();

// another example
for (var d = 0; d < 3; d++) (function(d){
 setTimeout(function(){
   console.log(d);
 }, d * 200);
})(d);

//Wrap a library (these two methods are the same)
var myLib = (function(){ 
  function myLib(){   }
  return myLib; 
})();
(function(){
  var myLib = window.myLib = function(){   };
})();

// Cascading/chaining
function a (foo){
  return {
    'b': function(bar){
      return foo + bar;
    }
  }
}
a(1).b(2); // --> 3

// Augment types
Function.prototype.method = function (name, func) {
  if(!this.prototype[name]) { //check for conflict
    this.prototype[name] = func;
    return this; //Return this instead of undefined so as to allow cascading (chaining)
  }
}
Number.method('increment', function () { // typeof Number === "function"
  return this + 1;
});
(2).increment(); //3
//???*
Number.prototype.increment = (function(incrementBy){
  return function(){
    return this + incrementBy ? incrementBy : 1;
  }
})();

// Using the ARGUMENTS object to catch optional arguments in a function
function addEntry(squirrel) {
  var entry = {events: [], squirrel: squirrel};
  for (var i = 1; i < arguments.length; i++)
    entry.events.push[arguments[i]];
  journal.push(entry);
}
addEntry(true, "work", "touched tree", "pizza", "running", "television");

//ABSTRACTION
sum(range(1, 10));

// 
function my_func( fn ) {
	fn();
}
function my_func2( fn ) {
	fn("message from my_func");
}
function my_func3(fn, str) {
	fn(str);
} 
my_func(function() { alert( "hi" ); }); // (function(){alert("hi")}());
my_func2(function( arg ) { alert( arg ); });
my_func3(function( arg ) { alert( arg ) }, "fuuuu"); // (function(arg){console.log(arg)})("fuuuu")

// Extend functions, including native functions
Array.prototype.join = (function(_super) {
    // return our new `join()` function
    return function() {
        console.log("Hey, you called join!");
        return _super.apply(this, arguments);
    };
            // Pass control back to the original join()
            // by using .apply on `_super`
})(Array.prototype.join);
// Pass the original function into our
// immediately invoked function as `_super`
// which remains available to our new
// function thanks to JavaScript closures.

// Recusion
// recursing with setTimeout
var fade = function (node) {
    var level = 1;
    var step = function (  ) {
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF' + hex + hex;
        if (level < 15) {
            level += 1;
            setTimeout(step, 100);
        }
    };
    setTimeout(step, 100);
};
fade(document.body);

// Closures have access to the actual variables of the outer functions and not copies
// Make a function that assigns event handler functions to an array of nodes the wrong way.
// When you click on a node, an alert box is supposed to display the ordina of the node.
// But it always displays the number of nodes instead.
var add_the_handlers = function (nodes) {
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function (e) {
            alert(i);
        };
    }
};
// BETTER EXAMPLE
var add_the_handlers = function (nodes) {
    var helper = function (i) {
       return function (e) {
          alert(i);
       };
    };
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        modes[i].onclick = helper(i);
    }
};
// The moral of the story: avoid making functions within a loop



/////////////////////////
// Function.prototype //
/////////////////////////

// Functions are objects, and as such have methods!!

/**
 * apply
 * Call the function with a given `this` value and specify arguments
 */

/**
 * bind
 * fun.bind(thisArg[, arg1[, arg2[, ...]]])
 * 
 * Create a partially applied version of the funtion
 * -- Solves the problem of how to keep the context of `this` within 
 * another function -- an alternate solution for referencing `this` 
 * with another variable like `self`, `_this`, or `context`
 * -- Solves `Uncaught TypeError: Object [object global] has no method 'specialFunction'`
 */
// Binding a function within an object
var myObj = {
  specialFunction: function () {},
  anotherSpecialFunction: function () {},
  getAsyncData: function (cb) {
    cb();
  },
  /* Good */
  render: function () {
    var that = this;
    this.getAsyncData(function () {
      that.specialFunction();
      that.anotherSpecialFunction();
    });
  },
  /* Better */
  render: function () {
    this.getAsyncData(function () {
      this.specialFunction();
      this.anotherSpecialFunction();
    }.bind(this));
  }
};
myObj.render();

// Event handler
var logger = {
    x: 0,
    updateCount: function(){
        this.x++;
        console.log(this.x);
    }
}
// Instead of this empty anonymous function...
document.querySelector('button').addEventListener('click', function(){
    logger.updateCount();
});
// ... just bind the `updateCount()` function to the `logger` object itself
document.querySelector('button').addEventListener('click', logger.updateCount.bind(logger));

// You can also add extra parameters after the 1st parameter and bind will
// pass in those values to the original function before passing in the extra
// parameters you pass to the bound function:
var sum = function(a, b) {
  return a + b;
};
var add5 = sum.bind(null, 5);
console.log(add5(10)); // --> 15
// another example:
function list() {
  var args = Array.prototype.slice.call(arguments); //create an array
  return args;
}
var list1 = list(1, 2, 3); // [1, 2, 3]
// Create a function with a preset leading argument
var leadingThirtysevenList = list.bind(undefined, 37);
var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]

// when `this` refers to the global object
x = 9;
var module = {
    x: 81,
    getX: function () {
        return this.x;
    }
};
module.getX(); // 81
var getX = module.getX;
getX(); // 9, because in this case, "this" refers to the global object
// create a new function with 'this' bound to module
var boundGetX = getX.bind(module);
boundGetX(); // 81

//////////////////////////
// Objects & Prototypes //
//////////////////////////

//Object: collection of properties
//Property: association between a name (key) and a value
//Method: A property which has a function as a value

console.log(Object.getPrototypeOf({}) == Object.prototype); //true
console.log(Object.getPrototypeOf([]) == Array.prototype); //true
console.log(Object.getPrototypeOf(isNaN) == Function.prototype); //true

//Constructors and prototypes
function Creature (type) {
  this.type = type;
}
var cicada = new Creature("insect");
var giraffe = new Creature("mammal");
//It's better to append the method to the prototype rather than inside the
//constructor because the method won't make use of closures (functions within
//functions) which affect performance
Creature.prototype.speak = function (sound) {
  console.log("The ", this.type, " is a ", this.type, " that says '", sound, "'.");
}
cicada.speak("yayayayaya");
giraffe.speak("nomnom");
Creature.prototype.edible = false;
console.log(cicada.edible); //false
cicada.edible = true;

// Encapsulation - Objects are like an interface that presents a simple
// control system, while those methods inside are complex.

// Creating a new object with Object.create()
// Object.create creates a new object from a prototype of the given argument
var person = {
  kind: 'person'
}
var zack = Object.create(person); //person is the prototype
console.log(zack.kind); // => ‘person’
//checking the object prototype
Object.getPrototypeOf(zack); //=> Object {kind: "person"} 
console.log(person.isPrototypeOf(zack)) //=> true
//Changing the prototype will also change all the objects that inherited from it
person.kind = "alien";
console.log(zack.kind); //alien
//Deleting a property will invert it back to the prototype of that property!
zack.kind = "person";
delete zack.kind;
console.log(zack.kind); //alien

// Constructors
function Foo(){}
var foo = new Foo();
console.log(foo instanceof Foo ) //=> true

// Inheritance
function Person(){}
Person.prototype.getName = function(){
  return this.name;
};
var Me = function () {
  this.name = "Matt";
}
Me.prototype = Person.prototype;
var me = new Me();
console.log( me.getName() ); //Matt

// Overwrite methods in the prototype
// antipattern?
var alex = { firstName: "Alex", lastName: "Russell" };
alex.toString(); // "[object Object]"
var brendan = {
  firstName: "Brendan",
  lastName: "Eich",
  toString: function() { return this.firstName + " " + this.lastName; }
};
brendan.toString() // "Brendan Eich"

// If .toJSON exists on an object, it will be used by 
// JSON.stringify calls to get the JSON format.
var User = function(obj){
  this.username = obj.username;
  this.password = obj.password;
}
User.prototype.toJSON(){
  return {
    username: this.username
  }
}
var tobi = new User({ username: "Tobi", password: "ferret" });
JSON.stringify(tobi); //-> "{"username":"Tobi"}"

// Enumerating, checking for instances
var foo = {"a": 1, "b": 2};
for (var x in foo) console.log(x); //-> a; b;
console.log("toString" in foo); // true because toSting() is not enumerable, so it won't show up in the for loop, but it will show up in the instance check because it inherited prototype
console.log(foo.hasOwnProperty("toString")); //->false because foo itself does not have the property toString (hasOwnProperty doesnt check prototypes)
console.log(foo.hasOwnProperty("a")); //->true
for (var x in foo) {
  if (foo.hasOwnProperty(x)) {
    // ... this is a real property
  }
}
// in the above example, foo has a prototype. we can create an object without
// a prototype like so
var ages = Object.create(null);
ages.Brendan = 52;
console.log("toString" in ages);// false
console.log("Brendan" in ages);// true
// another (super interesting) example from JS PATTERNS
// access Object.prototype.hasOwnProperty, and invoke (call()) it with an altered 'this' val
var i,
    hasOwn = Object.prototype.hasOwnProperty;
for (i in foo){
  if (hasOwn.call(foo, i)) {
    console.log(i, ":", foo[i]);
  }
}
//More on the above method:
var object = Object.create(null);
object.quack = function() {
  console.log('quack');
}
Object.getPrototypeOf(object) === Object.prototype // => false
Object.getPrototypeOf(object) === null             // => true
object.hasOwnProperty('quack')// => TypeError: Object object has no method 'hasOwnProperty'
//We can still use `hasOwnProperty` from the `Object.prototype` though, if we
//call it with the `this` value set to something that 'looks like an object'.
//Function#call allows us to invoke any function with an altered `this` value.
//The first argument to call becomes the value of `this`  the rest of the
//arguments are passed to the function as per
Object.prototype.hasOwnProperty.call(object, 'quack') // => true

// Self-invoking constructor
// ensures the object is called properly with NEW
var Fn = function(){
  if(!(this instanceof Fn)){ //instanceof operator returns bool
    return new Fn();
  }
}
// Strict mode can also catch improperly invoked constructors!
function Point(x, y) {
  'use strict';
  this.x = x;
  this.y = y;
}
var p = Point(7, 5); // TypeError: Cannot set property 'x' of undefined

// Using call() to construct a new sub-class
function Product(name, price) {
  this.name = name;
  this.price = price;

  if (price < 0)
    throw RangeError('Cannot create product "' + name + '" with a negative price');
  return this;
}
function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}
Food.prototype = new Product();
function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}
Toy.prototype = new Product();
var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
//another example
function logFive(seq){
  var len = seq.sequence.length < 5 ? seq.sequence.length : 5;
  for(var i = 0; i < len; i++)
    console.log(seq.sequence[i]);
}
var ArraySeq = function(arr){
  this.sequence = arr;
}
var RangeSeq = function(from, to){
  var arr = [];
  var i = from;
  while(i <= to) {
    arr.push(i);
    i++;
  }
  ArraySeq.call(this, arr);
}
logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104

// Getters and setters
//When specifying an interface, it is possible to include properties that are
//not methods. We could have defined minHeight and minWidth to simply hold
//numbers. But that’d have required us to compute them in the constructor,
//which adds code there that isn’t strictly relevant to constructing the
//object, and it would cause problems if, for example, the inner cell of an
//underlined cell was changed, at which point the size of the underlined cell
//should also change.
var pile = {
  elements: ["eggshell", "orange peel", "worm"],
  get height() {
    return this.elements.length;
  },
  set height(value) {
    console.log("Ignoring attempt to set height to", value);
  }
};
console.log(pile.height);// → 3
pile.height = 100;// → Ignoring attempt to set height to 100
console.log(pile.height);// → 3
//You can also add such a property to an existing object, for example a
//prototype, using the Object.defineProperty function (which we also used to
//create non-enumerable properties).
function Point (x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.plus = function (point) {
  return new Point(this.x + point.x, this.y + point.y);
}
Point.prototype.minus = function (point) {
  return new Point(this.x - point.x, this.y - point.y);
}
Object.defineProperty(Point.prototype, "distance", {//Distance from 0, 0
  get: function() { return Math.sqrt((this.x * this.x) + (this.y * this.y)); } //Using Pythagoras’ (a2+b2=c2) theorem to calculate
});
console.log(new Point(1, 2).plus(new Point(2, 3)));// → Point{x: 3, y: 5}
console.log(new Point(1, 2).minus(new Point(2, 3)));// → Point{x: -1, y: -1}
console.log(new Point(3, 4).distance);// → 5

// Extract a certain property from a collection of objects
function prop(propName) {
  return function(obj) {
    return obj[propName];
  }
}
[{ name: "larry", location: "MN" }, { name: "curly", wife: "marge" }].map( prop('name') ); // ["larry", "curly"]


//////////////
// Classes  //
//////////////

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);
        this.color = color;
    }
    toString() {
        return super.toString() + ' in ' + this.color;
    }
}
let cp = new ColorPoint(25, 8, 'green');
cp.toString(); // '(25, 8) in green'
console.log(cp instanceof ColorPoint); // true
console.log(cp instanceof Point); // true

// Class declarations aren't hoisted (they are scoped by order they appear)
new Foo(); //ReferenceError
class Foo {}


///////////
// Regex //
///////////

//1. Regular expression literals provide compilation of the regular expression
//when the script is loaded. When the regular expression will remain constant,
//use this for better performance.
var re = /ab+c/;

//2. Using the constructor function provides runtime compilation of the
//regular expression. Use the constructor function when you know the regular
//expression pattern will be changing, or you don't know the pattern and are
//getting it from another source, such as user input.
var re = new RegExp("ab+c");

//String.prototype.match() method retrieves the matches when matching a string against a regular expression.
//Returns an Array containing the matched results or null if there were no matches.
str.match(regexp);

// Using functions to replace
var stock = "1 lemon, 2 cabbages, and 101 eggs";
stock = stock.replace(/(\d+) (\w+)/g, eatOne);
function eatOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) {
    unit = unit.slice(0, unit.length - 1);
  }
  else if (amount == 0) {
    unit = unit + "s";
    amount = "no";
  }
  return amount + " " + unit;
}

// An object of several replacements
function escapeHTML(text) {
  var replacements = {"<": "&lt;", ">": "&gt;",
                      "&": "&amp;", "\"": "&quot;"};
  return text.replace(/[<>&"]/g, function(character) {
    return replacements[character];
  });
}
console.log(escapeHTML("The 'pre-formatted' tag is written \"<pre>\"."));

// Looping over matches
var input = "A string with 3 numbers in it... 42 and 88.";
var number = /\b(\d+)\b/g;
var match;
while (match = number.exec(input))
  console.log("Found", match[1], "at", match.index);
// → Found 3 at 14
//   Found 42 at 33
//   Found 88 at 40

// Regular Expressions Regex //
/**
Element            Matches this...
[xyz]              Any one character x or y or z, as listed in square brackets
[x-z]              Any one character within the range specified in brackets
[^xyz]             Any one character except x, y, z
[^x-z]             Any one character except the range in brackets
.                  Any character except newline
\d \D              Any digit (\d), any non-digit (\D) 
\s \S              Any whitespace (\s), any non-whitespace (\S) 
\w \W              Any word character (\w), any non-word character (\W) 
\b \B              Word boundary (\b), non-boundary (\B)
[\b]               Backspace (the square brackets help distinguish backspace from word boundary)
 ^                 Beginning of string; beginning of line if the m flag is set
 $                 End of string; end of line if the m flag is set
\n \r \f \t \v     Newline, carriage return, form feed, tab, vertical tab
\+ \- \. \* \? \|  Match + - . * ? | etc. verbatim (not as a special character)
\/ \\ \^ \$        Match / \ ^ $ verbatim (not as a special character)
\[ \] \( \) \{ \}  Match brackets/parentheses/braces verbatim
\xAB               Match the character with hexadecimal code AB
\uABCD             Match the Unicode character with hexadecimal code ABCD

x|y                Match x or y
+                  Match the preceding element one or more times
*                  Match the preceding element zero or more times
?                  Match the preceding element zero or one time
{n}                Match the preceding element exactly n times
{n,}               Match the preceding element n or more times
{m,n}              Match the preceding element at least m, at most n times

(...)              Match ... as a capturing group: store the matching substring
                   (used with string.match(re) to return an array of matching strings)
\1 \2 \3 etc.    Match the same substring as in capturing group number 1, 2, 3 etc. 
$1 $2 $3 etc.    Replace with the characters that matched group number 1, 2, 3 etc.
                   (used in the second argument of replace() method)
(?:...)            Match ... as a non-capturing group: grouping only, no storing

RegExp flags can be any combination of the following:
    i       Ignore case (both lowercase and uppercase letters will match)
    g       Global (allow multiple matches)
    m       Multiline (^ and $ will match the beginning/end of lines)

The effect of not setting these flags is as follows:
i not set   The regular expression is case-sensitive
g not set   Use only the first match (no global search)
m not set   ^ and $ match the beginning/end of the entire string

Notes
(1) A whitespace (\s) in a regular expression matches any one of the characters: space, formfeed (\f), newline (\n), return (\r), tab (\t), vertical tab (\v), non-breaking space (\xA0), as well as the Unicode characters \u00A0 \u2028 \u2029.
(2) When using the RegExp constructor: for each backslash in your regular expression, you have to type \\ in the RegExp constructor. (In JavaScript strings, \\ represents a single backslash!) For example, the following regular expressions match all leading and trailing whitespaces (\s); note that \\s is passed as part of the first argument of the RegExp constructor:
re = /^\s+|\s+$/g
re = new RegExp('^\\s+|\\s+$','g') 
**/

////////////////////
// EVENT HANDLERS //
////////////////////

// Most event objects have a target property that refers to the node where
// they originated. You can use this property to ensure that you’re not
// accidentally handling something that propagated up from a node you do not
// want to handle.
// It is also possible to use the target property to cast a wide net for a
// specific type of event. For example, if you have a node containing a long
// list of buttons, it may be more convenient to register a single click
// handler on the outer node and have it use the target property to figure out
// whether a button was clicked, rather than register individual handlers on
// all of the buttons.
<button>A</button>
<button>B</button>
<button>C</button>
<script>
  document.body.addEventListener("click", function(event) {
    if (event.target.nodeName == "BUTTON")
      console.log("Clicked", event.target.textContent);
  });
</script>

////////////////////
// Best Practices //
////////////////////

// Use the || operator to specify a default value.
var ev = e || event;

// Watch out for type coercion when using ==.
var zero = 0;
if(zero == false){} //antipattern
if(zero === false) {} // this is probably the intended result

//convert string to number
+"08";
Number(string);
parseInt(string); //slower than the above two, but necessary when the string is something like "08 foo"

//named function expressions
//neednt use arguments.callee
[1,2,3,4,5].map(function factorial (n) {
    return !(n > 1) ? 1 : factorial(n-1)*n;
});

getElementById("identifier") /* is faster than */ $("#identifier")

typeof str === "undefined" // typeof returns the "undefined" string literal

//Error handling
try {
    //some error occurs
    throw {
        name: "foo",
        message: "bar",
        remedy: errorHandler
    } 
} catch (e) { 
    e.remedy() 
}
function errorHandler(){
    console.log(this); //this = throw object data [name, message, remedy] 
}

// catching an error within a loop
// calling reliableMultiply will loop through primitiveMultiply until it succeeds
function MultiplicatorUnitFailure() {}
MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);
function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}
function reliableMultiply(a, b) {
  for (;;) {
    try {
      var res = primitiveMultiply(a, b);
      return res;
      break;
    } catch (e) {
      if(e instanceof MultiplicatorUnitFailure) console.log("Multiply fail");
      else throw(e);
    }
  }
}
console.log(reliableMultiply(8, 8));

//function expression aka anonymous function
var foo = function (a, b){};
//named function expression
//useful when debugging or recursing
var foo = function bar (a, b){};
foo.name; //-> bar
// function declarations
// moved to the top of the scope!
function foo (a, b) {}

//returning functions
var setupIncrement = function(){
    var i = 0;
    return function(){
        return (++i);
    }
}
var increment = setupIncrement();
increment(); //-> 1
increment(); //-> 2

// MODULARITY // Build modules using anonymous functions
// http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
var MODULE = (function (my) {
  var my = {},
      privateStuff;
  // add capabilities...
  return my;
}(MODULE || {}));//Build upon a previously created module called MODULE, or if it doesnt exit create an empty object and use it to build the module
// Build modules using anonymous functions along with the helper function
// provide():
function provide(values) {
  forEachIn(values, function(name, value) {
    window[name] = value;
  });
}
(function() {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  provide({
    getDayName: function(number) {
      return names[number];
    },
    getDayNumber: function(name) {
      for (var number = 0; number < names.length; number++) {
        if (names[number] == name)
          return number;
      }
    }
  });
})();
console.log(getDayNumber("Wednesday"));
// Sometimes a module will export too many variables; encapsulate it into a
// single object with properties to export (like Math)
var HTML = {
  tag: function(name, content, properties) {
    return {name: name, properties: properties, content: content};
  },
  link: function(target, text) {
    return HTML.tag("a", [text], {href: target});
  }
  /* ... many more HTML-producing functions ... */
};
// And if the module-object becomes a bit cumbersone to handle, provide() it
// so its properties become top-level functions:
provide(HTML);
link("http://theonion.com", "America's finest news source");

// Modules don't need anonymous functions to create secure objects!
var serial_maker = function () {
  // Produce an object that produces unique strings. A
  // unique string is made up of two parts: a prefix
  // and a sequence number. The object comes with
  // methods for setting the prefix and sequence
  // number, and a gensym method that produces unique
  // strings.
    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function (p) {
            prefix = String(p);
        },
        set_seq: function (s) {
            seq = s;
        },
        gensym: function ( ) {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    };
};
var seqer = serial_maker( );
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym( ); // unique is "Q1000"
// Because the module doesn't make use of 'this', there is no way to modify
// seqr except by the given methods. If we passed seqer.gensym to a third-
// party function, that function would still be able to generate unique
// strings, but it would be unable to change 'prefix' or 'seq'

// IMMEDIATE FUNCTIONS // Self-executing functions that can keep public/private scope 
// See Module Pattern below
(function (){
    // execute!
}());
(function(who, when){
    console.log("I met " + who + " on " + when);
})("Bob Doe", new Date()); //alternate syntax
(function (global) {
    //access global object
})(this);
//returning values
var result = function(){
    return 2 + 2;
}(); // result == 4 //wrapped parens can be omitted when assigning a return value to a variable.
var getResult = function(){
    var result = 3 + 3;
    return function(){
        return result;
    }
}(); // typeof getResult == "function"; getResult() == 6
//immediate object initialization
({
    max_width: 400,
    max_height: 500,
    getMax: function(){
        return this.max_width + "x" + this.max_height;
    },
    init: function(){
        //initialization tasks
        console.log(this.getMax());
    }
}).init();

// Comparing is in general best done by looking for truthyness or falsyness
// When only evaluating that an array has length,
// instead of this:
if ( array.length > 0 ) ...

// ...evaluate truthiness, like this:
if ( array.length ) ...

// 4.1.2
// When only evaluating that an array is empty,
// instead of this:
if ( array.length === 0 ) ...

// ...evaluate truthiness, like this:
if ( !array.length ) ...

// 4.1.3
// When only evaluating that a string is not empty,
// instead of this:
if ( string !== "" ) ...

// ...evaluate truthiness, like this:
if ( string ) ...

// 4.1.4
// When only evaluating that a string _is_ empty,
// instead of this:
if ( string === "" ) ...

// ...evaluate falsy-ness, like this:
if ( !string ) ...

// 4.1.5
// When only evaluating that a reference is true,
// instead of this:
if ( foo === true ) ...

// ...evaluate like you mean it, take advantage of built in capabilities:
if ( foo ) ...

// 4.1.6
// When evaluating that a reference is false,
// instead of this:
if ( foo === false ) ...

// ...use negation to coerce a true evaluation
if ( !foo ) ...

// ...Be careful, this will also match: 0, "", null, undefined, NaN
// If you _MUST_ test for a boolean false, then use
if ( foo === false ) ...

// 4.1.7
// When only evaluating a ref that might be null or undefined, but NOT false, "" or 0,
// instead of this:
if ( foo === null || foo === undefined ) ...

// ...take advantage of == type coercion, like this:
if ( foo == null ) ...

// Remember, using == will match a `null` to BOTH `null` and `undefined`
// but not `false`, "" or 0
null == undefined

// 
NaN === NaN; //false
isNaN(NaN); //true

//Falsy:
false;
null;
undefined;
'';
0;
NaN;

// 3.B.2.1
var number = 1,
  string = "1",
  bool = false;
number;// 1
number + "";// "1"
string;// "1"
+string;// 1
+string++;// 1
string;// 2
bool;// false
+bool;// 0
bool + "";// "false"
// 3.B.2.2
var number = 1,
  string = "1",
  bool = true;
string === number;// false
string === number + "";// true
+string === number;// true
bool === number;// false
+bool === number;// true
bool === string;// false
bool === !!string;// true (! converts the string to boolean[false] and !! false->true)
// 3.B.2.3
var array = [ "a", "b", "c" ];
!!~array.indexOf("a");// true
!!~array.indexOf("b");
!!~array.indexOf("c");// true
!!~array.indexOf("d");// false
// Note that the above should be considered "unnecessarily clever"
// Prefer the obvious approach of comparing the returned value of
// indexOf, like:
if ( array.indexOf( "a" ) >= 0 ) {
  // ...
}
// 3.B.2.4
var num = 2.5;
parseInt( num, 10 );
// is the same as...
~~num;
num >> 0;
num >>> 0;
// All result in 2
// Keep in mind however, that negative numbers will be treated differently...
var neg = -2.5;
parseInt( neg, 10 );
// is the same as...
~~neg;
neg >> 0;// All result in -2
// However...
neg >>> 0;// Will result in 4294967294

// Converting data into a program
// eval() is a bad idea.
// A better way of converting data into program is to use the Function constructor. 
// This takes as arguments first a string containing a comma-separated list of argument 
// names, and then a string containing the function’s body.
var plusOne = new Function("n", "return n + 1;");
console.log(plusOne(4));// → 5

//a new scope is added to the scope chain when a try-catch block or a with
//block is encountered. In either of these cases, a new object is created and
//placed at top of the scope chain:
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
};
function persist(person) {
  with (person) {
    // The 'person' object was pushed onto the scope chain when we
    // entered this "with" block, so we can simply reference
    // 'firstName' and 'lastName', rather than person.firstName and
    // person.lastName
    if (!firstName) {
      throw new Error('FirstName is mandatory');
    }
    if (!lastName) {
      throw new Error('LastName is mandatory');
    }
  }
  try {
    person.save();
  } catch(error) {
    // A new scope containing the 'error' object is accessible here
    console.log('Impossible to store ' + person + ', Reason: ' + error);
  }
}
var p1 = new Person('John', 'Doe');
persist(p1);

// Method overloading
function makeNinja(name){} 
function makeSamurai(name, rank){} 
makeNinja.length == 1; //true
makeSamurai.length == 2; //true
// Making use of the length property to overload methods
function addMethod(object, name, fn){ 
  // Save a reference to the old method 
  var old = object[ name ]; 
  // Overwrite the method with our new one 
  object[ name ] = function(){ 
    // Check the number of incoming arguments, 
    // compared to our overloaded function 
    if ( fn.length == arguments.length ) 
      // If there was a match, run the function 
      return fn.apply( this, arguments ); 
 
    // Otherwise, fallback to the old method 
    else if ( typeof old === "function" ) 
      return old.apply( this, arguments ); 
  }; 
} 
function Ninjas(){ 
  var ninjas = [ "Dean Edwards", "Sam Stephenson", "Alex Russell" ]; 
  addMethod(this, "find", function(){ 
    return ninjas; 
  }); 
  addMethod(this, "find", function(name){ 
    var ret = []; 
    for ( var i = 0; i < ninjas.length; i++ ) 
      if ( ninjas[i].indexOf(name) == 0 ) 
        ret.push( ninjas[i] ); 
    return ret; 
  }); 
  addMethod(this, "find", function(first, last){ 
    var ret = []; 
    for ( var i = 0; i < ninjas.length; i++ ) 
      if ( ninjas[i] == (first + " " + last) ) 
        ret.push( ninjas[i] ); 
    return ret; 
  }); 
} 
var ninjas = new Ninjas(); 
assert( ninjas.find().length == 3, "Finds all ninjas" ); 
assert( ninjas.find("Sam").length == 1, "Finds ninjas by first name" ); 
assert( ninjas.find("Dean", "Edwards").length == 1, "Finds ninjas by first and last name" ); 
assert( ninjas.find("Alex", "X", "Russell") == null, "Does nothing" );


//////////////
// PATTERNS //
//////////////

// Module pattern //
// Emulate private/public classes
var mod = (function(){
  var _public = {},
      privateVar = 0;
      privateMethod = function(foo){
        console.log(foo, privateVar);
      };
  _public.publicVar = "foo";
  _public.publicFunction = function(bar){
    privateVar++;
    privateMethod(bar);
  }
  return _public;
})();

var myNamespace = (function () {

  var myPrivateVar = 0, // A private counter variable
      myPrivateMethod = function( foo ) { // A private function which logs any arguments
        console.log( foo );
      };

  return {
    myPublicVar: "foo",
    myPublicFunction: function( bar ) {
      myPrivateVar++;
      myPrivateMethod( bar );
    }
  };

})();

// Example of above pattern
var basketModule = (function () {
  // privates
  var basket = []; 
  function doSomethingPrivate() {
    //...
  }
  function doSomethingElsePrivate() {
    //...
  }
  // Return an object exposed to the public
  return { 
    // Add items to our basket
    addItem: function( values ) {
      basket.push(values);
    },
    // Get the count of items in the basket
    getItemCount: function () {
      return basket.length;
    },
    // Public alias to a  private function
    doSomething: doSomethingPrivate,
    // Get the total value of items in the basket
    getTotal: function () {
      var q = this.getItemCount(),
          p = 0;
      while (q--) {
        p += basket[q].price;
      }
      return p;
    }
  };
}());

// basketModule returns an object with a public API we can use
basketModule.addItem({
  item: "bread",
  price: 0.5
});
basketModule.addItem({
  item: "butter",
  price: 0.3
});
console.log( basketModule.getItemCount() );// Outputs: 2
console.log( basketModule.getTotal() );// Outputs: 0.8

// However, the following will not work:
console.log( basketModule.basket );// Outputs: undefined 
// This is because the basket itself is not exposed as a part of our
// the public API

// This also won't work as it only exists within the scope of our
// basketModule closure, but not the returned public object
console.log( basket ); 

// PUBLISH/SUBSCRIBE PATTERN // Similar to Observer pattern, it observs for
// actions executes an anonymous method upon acting
var pubsub = {};
(function(q) {
      var topics = {},
          subUid = -1;
    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    q.publish = function( topic, args ) {
        if ( !topics[topic] ) {
            return false;
        }
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;
        while (len--) {
            subscribers[len].func( topic, args );
        }
        return this;
    };
    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    q.subscribe = function( topic, func ) {
      if (!topics[topic]) {
        topics[topic] = [];
      }
      var token = ( ++subUid ).toString();
      topics[topic].push({
        token: token,
        func: func /** the observer!!!! */
      });
      return token;
    };
    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    q.unsubscribe = function( token ) {
        for ( var m in topics ) {
            if ( topics[m] ) {
                for ( var i = 0, j = topics[m].length; i < j; i++ ) {
                    if ( topics[m][i].token === token) {
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return this;
    };
}( pubsub ));

var messageLogger = function ( topics, data ) {
    console.log( "Logging: " + topics + ": " + data );
};
var subscription = pubsub.subscribe( "inbox/newMessage", messageLogger );
pubsub.publish( "inbox/newMessage", "hello world!" );
pubsub.publish( "inbox/newMessage", ["test", "a", "b", "c"] );
pubsub.publish( "inbox/newMessage", {
  sender: "hello@google.com", 
  body: "Hey again!"
});
// pubsub.unsubscribe( subscription );
// Once unsubscribed, this for example won't result in our
// messageLogger being executed as the subscriber is
// no longer listening
pubsub.publish( "inbox/newMessage", "Hello! are you still there?" );

// FACAD PATTERN //
var module = (function() {
    var _private = {
        i:5,
        get : function() {
            console.log( "current value:" + this.i);
        },
        set : function( val ) {
            this.i = val;
        },
        run : function() {
            console.log( "running" );
        },
        jump: function(){
            console.log( "jumping" );
        }
    };
    return {
        facade : function( args ) {
            _private.set(args.val);
            _private.get();
            if ( args.run ) {
                _private.run();
            }
        }
    };
}());
// Outputs: "current value: 10" and "running"
module.facade( {run: true, val:10} );

// MIXIN PATTERN //
// with super- and sub-classes

var Person =  function( firstName , lastName ){
  this.firstName = firstName;
  this.lastName =  lastName;
  this.gender = "male";
};
    
// a new instance of Person can then easily be created as follows:
var clark = new Person( "Clark" , "Kent" );
       
// Define a subclass constructor for for "Superhero":
var Superhero = function( firstName, lastName , powers ){
    
    // Invoke the superclass constructor on the new object
    // then use .call() to invoke the constructor as a method of
    // the object to be initialized.
    
    Person.call( this, firstName, lastName ); // Use Person() as a constructor with the arguments given to Superhero method
    //now this.firstname, this.lastname, and this.gender are defined

    // Finally, store their powers, a new array of traits not found in a normal "Person"
    this.powers = powers;
};

SuperHero.prototype = Object.create( Person.prototype );
var superman = new Superhero( "Clark" ,"Kent" , ["flight","heat-vision"] );
console.log( superman ); 

// Another example of Mixin:

// Define a simple Car constructor
var Car = function ( settings ) {
  this.model = settings.model || "no model provided";
  this.color = settings.color || "no colour provided";
};

// Mixin
var Mixin = function () {};
Mixin.prototype = {
    driveForward: function () {
        console.log( "drive forward" );
    },
    driveBackward: function () {
        console.log( "drive backward" );
    },
    driveSideways: function () {
        console.log( "drive sideways" );
    }
};

// Extend an existing object with a method from another
function augment( receivingClass, givingClass ) {
    // only provide certain methods
    if ( arguments[2] ) {
        for ( var i = 2, len = arguments.length; i < len; i++ ) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    }
    // provide all methods
    else {
        for ( var methodName in givingClass.prototype ) {

            // check to make sure the receiving class doesn't 
            // have a method of the same name as the one currently 
            // being processed 
            if ( !Object.hasOwnProperty(receivingClass.prototype, methodName) ) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }

            // Alternatively:
            // if ( !receivingClass.prototype[methodName] ) {
            //  receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            // }
        }
    }
}

// Augment the Car constructor to include "driveForward" and "driveBackward"
augment( Car, Mixin, "driveForward", "driveBackward" );

// Create a new Car
var myCar = new Car({
    model: "Ford Escort",
    color: "blue"
});

// Test to make sure we now have access to the methods
myCar.driveForward();// drive forward
myCar.driveBackward();// drive backward

// We can also augment Car to include all functions from our mixin
// by not explicitly listing a selection of them
augment( Car, Mixin );

var mySportsCar = new Car({
    model: "Porsche",
    color: "red"
});

mySportsCar.driveSideways();// drive sideways

// Merge defaults and options, without modifying the defaults
var defaults = { validate: false, limit: 5, name: "foo" };
var options = { validate: true, name: "bar" };
// Merge defaults and options, without modifying defaults
var settings = _.defaults(defaults, options); //underscore
var settings = $.extend( {}, defaults, options ); //Jquery

/*
* memoize.js
* by @philogb and @addyosmani
* with further optimizations by @mathias
* and @DmitryBaranovsk
* perf tests: http://bit.ly/q3zpG3
* Released under an MIT license.
*/
function memoize( fn ) {
    return function () {
        var args = Array.prototype.slice.call(arguments),
            hash = "",
            i = args.length;
        currentArg = null;
        while (i--) {
            currentArg = args[i];
            hash += (currentArg === Object(currentArg)) ?
            JSON.stringify(currentArg) : currentArg;
            fn.memoize || (fn.memoize = {});
        }
        return (hash in fn.memoize) ? fn.memoize[hash] :
        fn.memoize[hash] = fn.apply(this, args);
    };
}
/*
* memoize.js
* by @philogb and @addyosmani
* further optimizations by @mathias, @DmitryBaranovsk & @GotNoSugarBaby
* fixes by @AutoSponge
* perf tests: http://bit.ly/q3zpG3
* Released under an MIT license.
*/
(function (global) {
    "use strict";
    global.memoize || (global.memoize = (typeof JSON === 'object' && typeof JSON.stringify === 'function' ?
        function (func) {
            var stringifyJson = JSON.stringify,
                cache = {};
            var cachedfun = function () {
                var hash = stringifyJson(arguments);
                return (hash in cache) ? cache[hash] : cache[hash] = func.apply(this, arguments);
            };
            cachedfun.__cache = (function(){
                cache.remove || (cache.remove = function(){
                    var hash = stringifyJson(arguments);
                    return (delete cache[hash]);
                });
                return cache;
            }).call(this);
            return cachedfun;
        } : function (func) {
            return func;
        }));
}(this));
function test(a, b) {
  return a * 10 + b;
}
var memo = memoize(test);

////////////////////
//Array.prototype //
////////////////////

/**
 * reduce    
 * gets a single value (it "summarizes") by iterating over all values in an array and passes them through a function
 * an optional second parameter sets the current value (10 in the example below)
 */
[0,1,2,3,4].reduce(function(previousValue, currentValue, index, array){
  return previousValue + currentValue;
}, 10);

// finding the average value in an array of numbers
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

// the tracking value (previousValue) can be an object instead of a string!
countwords(["apple", "apple", "pear"]); // {apple:2, pear:1}
function countWords(arr) {
  return arr.reduce(function(countMap, word) {
    countMap[word] = ++countMap[word] || 1 // increment or initialize to 1
    return countMap
  }, {}) // second argument to reduce initialises countMap to {}
}

/**
 * slice
 * @param {number} begin
 * @param {number} end
 */
// If no begin or end is given, it returns a copy of the array
// arguments is an ARRAY-LIKE OBJECT
// pass it through this to create an array:
var args = Array.prototype.slice.call(arguments);
//Array: this is the name of the base object that we want
//prototype: this can be thought of as the namespace for the instance methods of an array
//slice: this extracts a section of an array and returns a new array, and without a beginning and ending index, it simply returns a copy of the array
//call: this is a very useful function, it allows you to call a function from one object and use it in the context of another

/**
 * splice(index , howMany[, element1[, ...[, elementN]]])
 * change the content of an array, adding or removing elements
 * @param {number} index index at which to start changing
 * @param {number} howmany how many elements to remove
 * @param {string?} elements stuff to add
 */

/**
 * every (callback(element, index, array)[, thisArg])) 
 * return boolean if every array item passed to callback passes condition (thisArg sets this)
 */

function isBigEnough(element, index, array) {
  return (element >= 10);
}
[12, 5, 8, 130, 44].every(isBigEnough);//false
[12, 54, 18, 130, 44].every(isBigEnough);//true

//keystroke pattern
var keyCodes=new Array(10);
var pattern=[38,38,40,40,37,39,37,39,66,65];
function keydownHandler(e){
  keyCodes.shift();//rm keyCodes[0]
  keyCodes.push(e.keyCode);
  if(keyCodes.every(function(element, index, array){return element===pattern[index];})){
    document.getElementById("rainbow-message").style.display="";
  }
}
window.onkeydown=keydownHandler;

/**
 * sort 
 * arr.sort([compareFunction]) 
 * If compareFunction is not supplied,
 * elements are sorted by converting them to strings and comparing strings in
 * Unicode code point order. For example, "Cherry" comes before "banana". In a
 * numeric sort, 9 comes before 80, but because numbers are converted to
 * strings, "80" comes before "9" in Unicode order.
 * If compareFunction(a, b) is less than 0, sort a to a lower index than b, i.e. a comes first.
 * If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
 * If compareFunction(a, b) is greater than 0, sort b to a lower index than a.
 */
[4, 22, 5, 10, 3].sort(function(a, b) {
  return a - b;
});
// For non-ASCII chars, use localCompare
["réservé", "premier", "cliché", "communiqué", "café" ,"adieu"].sort(function (a, b) {
    return a.localeCompare(b);
});
// Randomize an array
["a", "b", "c"].sort(function() { return 0.5 - Math.random() });

/*
 * map(callback[, thisArg])
 * creates a new array with the results of calling a provided function on every element in this array.
 */
[1, 2, 3].map(function(n, 1){
  return n + 1;
})

// filter(condition) return an array with items that pass condition
function isBigEnough(element) {
  return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);//--> [12, 130, 44]

// some(condition) return boolean if one or more array items pass condition
// push() an item on the back
// pop() an item off the back
// shift() an item off the front
// unshift() an item onto the front


////////////////
//Backbone.js //
////////////////

//Defaults
var Meal = Backbone.Model.extend({
  defaults: {
    "appetizer":  "caesar salad",
    "entree":     "ravioli",
    "dessert":    "cheesecake",
    "eaten": function(){ return new Date(); }
  }
});
alert("Dessert will be " + (new Meal).get('dessert') + " at " + );

//When creating models, defaults objects are passed by reference, so if you
//include an object as a default value, it will be shared among all instances.
//Instead, define defaults as a function:
var Meal = Backbone.Model.extend({
  defaults: function(){
    return {
      "entree": "pizza",
      "eaten": newDate()
    }
  }
});
var meal = new Meal;
console.log(meal.get("eaten"));