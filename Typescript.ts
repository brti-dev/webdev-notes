
// Compile to js
// $ tsc greeter.ts

/** TYPES **/

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
    SyntheticEvent: React.SyntheticEvent<HTMLIFrameElement> // This is usually good enough
    FormEvent: React.FormEvent<HTMLFormElement>
}

// Tuple type
let point: [number, number] = [7, 4] // without defining

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
assert.equal(stringStack.length, 2);
assert.equal(stringStack.pop(), 'second');

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