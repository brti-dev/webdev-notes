/*****************/
/** @ReactRouter */
/*****************/

// 1. Hash-based
//     - Uses URL anchor
//     - Server renders index.html only; Crawlers assume all links are anchors
//     - Natural fit for SPA

import { HashRouter as Router } from 'react-router-dom';

// 2. Browser History
//     - Uses HTML5 API
//     - Useful for rendering pages via server
//     - Allows crawling

import { BrowserRouter as Router } from 'react-router-dom';


/** @Route component */

//Specifies a path and renders a component only if the current location matches.

<Router>
    <Route path='/foo'>
        <Foo />
    </Route>
</Router>

/** @Props */

// Routes get access to props.location and props.history

<Router>
    <Route path='/foo' component={Foo} />
</Router>

function Foo(props) {
    let { location: { search } } = props;

    // Parse query string
    const params = new URLSearchParams(search);
    const vars = {};
    if (params.get('status')) {
        vars.status = params.get('status');
    }

    return (
        <>
            <Bar />
            <Baz vars={vars} />
        </>
    );
}
function BarWithoutRouter(props) {
    // No access to router props... yet.
}
let Bar = withRouter(BarWithoutRouter);

/** @history library */

// Properties & Methods
history.length //(number) The number of entries in the history stack
history.action //(string) The current action (PUSH, REPLACE, or POP)
history.location //(object) The current location. May have the following properties:
history.pathname //(string) The path of the URL
history.search //(string) The URL query string
history.hash //(string) The URL hash fragment
history.state //(object) location-specific state that was provided to e.g. push(path, state) when this location was pushed onto the stack. Only available in browser and memory history.
history.push(path, [state]) //(function) Pushes a new entry onto the history stack
history.replace(path, [state]) //(function) Replaces the current entry on the history stack. Useful when two routes are not really different; Like a redirect
history.go(n) //(function) Moves the pointer in the history stack by n entries
history.goBack() //(function) Equivalent to go(-1)
history.goForward() //(function) Equivalent to go(1)
history.block(prompt) //(function) Prevents navigation (see the history docs)
