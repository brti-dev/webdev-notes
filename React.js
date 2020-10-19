
/** @INSTALL_SETUP **/

// Create React App
// $ npx create-react-app my-app

/** @ABOUT REACT **/

/*
- A library, not a framework
    - Not opinionated
    - No required patterns like MVC
- Declarative rather than imperative
    - Declares what the program should accomplish rather than how to accomplish it
    - Declares how the view looks given data --> builds a virtual representation of the view in memory --> handles changes automatically
- Component-based
    - Encapsulation of information
    - Loose-coupling between different components
- No Templates
    - Use JSX markup to create nested DOM elements
- Isomorphic
    - Same code on browser and server
*/

/** @PROPS **/

// Properties passed to components
// Props should be immutable and shouldn't change during the component's lifecycle
function Foo(props) {
    const {bar} = props;
    return <h1>{bar}</h1>
}
const element = <Foo bar='bar' />

// Using props.children to pass props up to parent
function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}
function WelcomeDialog() {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">Welcome</h1>
            <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
        </FancyBorder>
    );
}
// Another example with multiple props
function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">{props.left}</div>
            <div className="SplitPane-right">{props.right}</div>
        </div>
    );
}
function App() {
    return (
        <SplitPane left={<Contacts />} right={<Chat />} />
    );
}

/** @STATE **/

// Pure function components are fine!
// Example: sum() doesn't modify props and same input always returns same resuls
function sum(a, b) {
    return a + b;
}
// Impure functions that modify props should utilize React states
// Example: Impure function
function withdraw(account, amount) {
    account.total -= amount;
}
// Example: refactored with state
function Account({ initialAmount }) {
    const [accountTotal, setTransaction] = useState(initialAmount);
    function withdraw(amount) {
        setTransaction(accountTotal -= amount);
    }
    function deposit(amount) {
        setTransaction(accountTotal += amount);
    }
    return (
        <>
            <p>Account value: <b>${accountTotal}</b></p>
            <button type="button" onClick={() => withdraw(5)}>Withdraw $5</button>
            <button type="button" onClick={() => deposit(5)}>Deposit $5</button>
        </>
    )
}
const element = <Account initialAmount="100" />

/** @LISTS_AND_KEYS **/

// Keys should be given to the elements inside the array to give the elements a stable identity
// They should be unique in the array, not globally unique

// Example: Transform an array into a list of elements
const numbers = [1, 2, 3];
const listItems = numbers.map(number => <li key={number.toString()}>{number}</li>);
const list = <ul>{listItems}</ul>

/************/
/** @HOOKS **/
/************/

/** @useState
 * Preserve variables between function calls, beyond function exit
 * Necessary for variables within components that don't act like pure functions with respect for their props
 * @param {mixed} InitialState Takes initial state as argument, then returns two values:
 * @returns {Array} [current state, function to update state and enqueue a re-render of the component]
*/
const [state, setState] = useState(initialState);

// Example with counter
function Counter({initialCount}) {
    const [count, setCount] = useState(initialCount);
    return (
        <>
            Count: {count}
            <button onClick={() => setCount(initialCount)}>Reset</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
        </>
    );
}

// Example with local storage data
const [value, setvalue] = React.useState(
    // Preserve search query via useState + local storage
    // local storage side effect
    localStorage.getItem(key) || initialState
)

/** @useReducer
 * Alternative to useState. Preferable when complex state logic, or when the next state depends on the previous one
 * Pass dispatch down instead of callbacks
 * @param {Function} reducer Return a new state based on given action (state, action) => newState
 * @param {mixed} initialArg
 * @param {?} init ???
 * @returns {mixed} state Current state
 * @returns {Function} dispatch Dispatch method; Function to call to supply a new state
 */
const [state, dispatch] = useReducer(reducer, initialArg, init);

// Example with a counter
const initialState = {count: 0};
function reducer(state, action) {
    return action.type == 'decrement' ? {count: state.count + 1} : {count: state.count - 1};
}
function Counter() {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <>
            Count: <b>{state.count}</b> 
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </>
    );
}

/** @useEffect
 * 
 * Allows opt-in to component lifecycle: Inform React this component needs to do something after render.
 * Used for Data fetching, setting up a subscription, and manually changing the DOM, etc.
 * 
 * @param {Function} effectFunction Where the side-effect occurs; Called initially and (if dependency variable exists) if dependency variables change
 * @param {Array} DepVars Dependency variables; If one changes, the function is called on re-render; if [] called every time; if nothing given, call every time
 * 
 * @returns {Function} An optional function to clean up before calling the effect again on the next render
*/
React.useEffect(() => {
    // update locally-stored search term whenever `value` changes
    localStorage.setItem(key, value)
}, [value, key]) // Only re-run the effect if `key` and/or `value` changes

/** @useRef
 * Creates a reference to an element
 * Persists throughout the lifetime of the component
 * @param {?} initialValue
 * @returns {Object} `current` property 
 */
function TextInputWithFocusButton() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
        // `current` points to the mounted text input element
        inputEl.current.focus();
    };
    return (
        <>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}

/**
 * @useCallback
 * 
 * Useful for passing callbacks to optimized child components to prevent unneccesary renders
 * 
 * @param {Function} callback An inline callback
 * @param {Array} dependencies
 * 
 * @returns {Function} Memoized version of the callback, changes when one of the dependencies has changed
 */
const memoizedCallback = useCallback(
    () => {
        doSomething(a, b);
    },
    [dependencyA, dependencyB],
);

// Memoized callback used with Side Effect
// Invoke a function whenever a variable changes
const handleFetchData = useCallback(() => {
    fetch('/api').then(response => response.json()).then(result => { doSomethingWithData(result); });
}, [dependencyVariable]); // Create a memoized function `handleFetchData` every time dependencyVariable changes, which triggers the effect below
useEffect(() => {
    handleFetchData(); // Invoke the thing
}, [handleFetchData]);

// Callback as reference
// CB function has access to the referenced DOM node
const Simple = () => {
    const ref = useCallback(node => {
        if (node) node.focus() // a side effect!
    }, [])
    return <div ref={ref}>:)</div>
}
// A more complex example:
function ComponentWithRefRead() {
    const [text, setText] = React.useState('Some text ...');

    function handleOnChange(event) {
        setText(event.target.value);
    }

    /** @var node DOM element */
    const ref = React.useCallback((node) => {
        if (!node) return;

        const { width } = node.getBoundingClientRect();

        document.title = `Width:${width}`;
    }, [text]);

    return (
        <div>
            <input type="text" value={text} onChange={handleOnChange} />
            <div>
                <span ref={ref}>{text}</span>
            </div>
        </div>
    );
}

/**
 * @useMemo
 * 
 * Useful for expensive calculations
 * Write your code so that it still works without useMemo — and then add it to optimize performance.
 * 
 * @param {Function} createFunction A function to create the returned memoized value
 * @param {Array} Deps Dependency variables 
 * 
 * @returns {*} A memoized value; Changes when any of `Deps` changes
 */
const memoizedValue = useMemo(() => createFunction(a, b), [a, b]);

/** @memo
 * Render the component only when props change
 */
const MyComponent = React.memo((props) => {
/* render using props */
});

/******************/
/** CUSTOM HOOKS **/
/******************/

/** @useSemiPersistentState
 * Preserve key-value pairs in local storage
 * @param {string} key A key to define this instance so `value` is not overwritten
 * @param {string} initialState Default value for useState()
 */
function useSemiPersistentState(key, initialState) {
    const [value, setvalue] = React.useState(
        localStorage.getItem(key) || initialState
    )

    React.useEffect(() => {
        console.log(`useEffect:${key}`)
        // update locally-stored search term whenever `value` changes
        localStorage.setItem(key, value)
    }, [value, key]) // Only re-run the effect if `key` and/or `value` changes

    return [value, setvalue]
}

/*************/
/** STYLING **/
/*************/

import styles from './App.module.css';
// .item {
//     border: 2px solid gray;
//     position: relative; }
//     .item > dl {
//         padding: 1em; }
//         .item > dl + button {
//             position: absolute;
//             top: 1em;
//             right: 1em;
//         }
// .button {
//     background-color: silver;
//     border: 2px solid gray; }
//     .button:hover > svg > g {
//         fill: white;
//         stroke: white;
//     }
// .buttony {
//     font-weight: bold; 
// }
// .button-over {
//     background-color: white;
//     border-color: black;
// }
import cs from 'classnames'; 
import styled from 'styled-components'; // CSS in JS
// Import SVG as React Component
import { ReactComponent as Check } from './check.svg';

let StyledDL = styled.dl`
    display: flex;
  `
let StyledDT = styled.dt`
    flex-basis: 25%;
    font-weight: bold;
    text-align: right;
    margin: 0;
    padding: 0 1em 0 0;
  `
let StyledDD = styled.dd`
    flex-basis: 25%;
    margin: 0;
    padding: 0;
    background-color: ${props => props.backgroundColor};
    color: white;
  `
const Element = ({ objectID, title, year_published }) => {
    let buttonClass = cs(styles.button, styles.buttony)
    return (
        <div className={styles.item} style={{ display: 'flex' }}>
            <StyledDL key={objectID} style={{ width: '80%' }}>
                <StyledDT>Title</StyledDT>
                <StyledDD backgroundColor="gray"><a href="/foo.html">{title}</a></StyledDD>
                <StyledDT>Release</StyledDT>
                <StyledDD backgroundColor="black">{year_published}</StyledDD>
            </StyledDL>
            <button type="button" className={buttonClass} style={{ width: '20%' }}>
                <Check height="18px" width="18px" />
            </button>
        </div>
    )
}
