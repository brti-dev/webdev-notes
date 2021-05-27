
// Compile to js and check for type errors
// $ tsc greeter.ts

// Create React App with Typescript
// $ create-react-app my-app --scripts-version=react-scripts-ts
// react-scripts-ts is a set of adjustments to take the standard create-react-app project pipeline and bring TypeScript into the mix.

/** @TYPES **/

// Types defined by Javascript
type types = {
    Undefined: undefined //the set with the only element undefined
    Null: null //the set with the only element null
    Boolean: boolean //the set with the two elements false and true
    Number: number //the set of all numbers
    BigInt: bigint //the set of all arbitrary-precision integers
    String: string //the set of all strings
    Symbol: symbol //the set of all symbols
    Object: object //the set of all objects (which includes functions and arrays)
}

// Additional types defined by Typescript
type TypescriptTypes = {
    Any: any;
    Array: Array<any>;
}

// Types in React
type ReactTypes = {
    SyntheticEvent: React.SyntheticEvent<HTMLInputElement> // This is usually good enough
    FormEvent: React.FormEvent<HTMLFormElement>
}

// Array type
let arr1: number[] = [] // Array populated with numbers
let arr2: Array<number> = [] // Same

// Tuple type
let point: [number, number] = [7, 4]; // without defining

// Function types
(param: any) => any
// example
const func: (num: number) => string =
  (num: number) => String(num);
// example
function stringify123(callback: (num: number) => string): string {
    return callback(123);
}
stringify123((param) => `foo${param}`)

// Union types
function foo(bar: number|string): void {
    return undefined
}

// Undefined/null aren't implied types
let maybeNumber: number = null; // @ts-ignore: Type 'null' is not assignable to type 'number'. (2322)
let maybeNumber: null|number = null; //ok
maybeNumber = 123; //ok

// Assign a more specific type than would be inferred by TS
// TS infers HTML element
const myCanvas = document.getElementById("main_canvas")
// Specify a canvas element
const myCanvasSpecific = document.getElementById("main_canvas") as HTMLCanvasElement
const myCanvasSpecificWithAngleParams = <HTMLCanvasElement>document.getElementById("main_canvas");

/** @Interface */

// Interfaces are extensible, whereas type aliases are not so much
// @see https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces

interface Animal {
  name: string
}
interface Bear extends Animal {
  honey: boolean
}
const bear = getBear() 
bear.name
bear.honey

// Interfaces as records
interface Point {
    x: number
    y: number
    square(): number
    square: () => number
    distance(between: Point): number
}

// Interfaces + Union type
interface StoriesFetchInitAction {
    type: 'STORIES_FETCH_INIT';
}
interface StoriesFetchSuccessAction {
    type: 'STORIES_FETCH_SUCCESS'; 
    payload: Stories;
}
interface StoriesFetchFailureAction { 
    type: 'STORIES_FETCH_FAILURE';
}
interface StoriesRemoveAction { 
    type: 'REMOVE_STORY'; 
    payload: Story;
}
type StoriesAction =
  | StoriesFetchInitAction
  | StoriesFetchSuccessAction
  | StoriesFetchFailureAction
  | StoriesRemoveAction;
const reducer = (action: StoriesAction) => {}

/** @Parameters */

// Parameterized types use angular brackets
class SimpleStack<T> { // Parameter <T> will be assigned string type later
    #data: Array<T> = [];
    push(x: T): void {
        this.#data.push(x);
    }
    pop(): T {
        const result = this.#data.pop();
        if (result === undefined) {
            throw new Error();
        }
        return result;
    }
    get length() {
        return this.#data.length;
    }
}
const stringStack = new SimpleStack<string>();
stringStack.push('first');
stringStack.push('second');
stringStack.length === 2;
stringStack.pop() === 'second';

// Assign types to Map using parameterized type
const myMap: Map<boolean, string> = new Map([
    [false, 'no'],
    [true, 'yes'],
]);

// Parameterized type for function
function id<T>(x: T): T {
    return x;
}
id<number>(123) // call function, assign <T> type number

function fillArray<T>( // introduce the type variable
    len: number,
    elem: T, // use the type variable, pick it up from the argument.
) {
  return new Array<T>(len).fill(elem); // pass on T to the Array constructor.
}
// %inferred-type: string[]
const star_arr = fillArray(3, '*');
assert.deepEqual(star_arr, ['*', '*', '*']);

// .tsx vs .ts files
let a1: any;
let s1 = a1 as string // ok in tsx and ts
let s2 = <string>a1 // only valid in ts
