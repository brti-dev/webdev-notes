/** @DOM_Tree */

// HTML is received in the browser --> tokens --> Nodes --> DOM

// Tokens:
// DOCTYPE
// start tag
// end tag
// comment
// character
// end-of-file

// Reflow/Layout: Calculate geometric info (dimensions, positions) of elements (expensive); Happens upon DOM load and subsequent layout changes.
// Repaint: Drawing of pixels and layout on screen; Triggers: visibility, background-color, outline
// Eg. changing `el.style.visibility` triggers repaint; Changing `el.style.display` triggers both

// Event loop
// JS is single threaded: functions, events execute on call stack one at a time
// Aync events are handled outside the stack by the browser heap and queue... But they won't be passed back to the stack until its empty

// Interface EventTarget
// Interface Node implements EventTarget
// Interface Element implements Node
// Interface HTMLElement implements Element

// There are 12 node types. In practice we usually work with 4 of them:
// document – Special object to access DOM
// element nodes – HTML - tags, the tree building blocks.
// text nodes – contain text.
// comments – sometimes we can put information there, it won’t be shown, but JS can read it from the DOM.

/** @document node */

document // Object tree representing DOM
document.documentElement // Root element <html>
document.body // Body element <body>
    // Reliably get the doc height
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

alert('Full document height, with scrolled out part: ' + scrollHeight);

// Searching
document.getElementById(id: string)
document.getElementsByClassName(className: string)
    // Chain to find elements within:
    document.getElementById("foo").getElementsByClassName("bar")[0];
document.getElementsByTagName(tagname: string): HTMLCollection
    const gallery = document.getElementById('gallery')
    const imgs = gallery.getElementsByTagName('img')
    const promises = [...imgs].map(img => new Promise(resolve => img.addEventListener('load', resolve, {once:true})))
    Promise.all(promises).then(console.log('images loaded'))
document.querySelectorAll(cssSelectors)
    for (let elem of document.querySelectorAll('ul > li:last-child')) {
        alert(elem.innerHTML); 
    }
document.querySelector(cssSelectors) // Returns only the first element for the given CSS selector
Element.matches(cssSelectors): bool // Checks if elem matches cssSelectors
    function isHeading(e) {
        return e.matches('h1, h2, h3, h4, h5')
    }
    for (let elem of document.body.children) {
        if (elem.matches('a[href$="zip"]')) {
            alert("The archive reference: " + elem.href);
        }
    }
Node.contains(otherNode): boolean // Finds element within
Element.closest(cssSelectors) // Finds the closest ancestor up the tree

// Searching: Properties for all nodes (including text and comment nodes)
Node.childNodes // Returns a live collection of immediate child nodes
    for (let i = 0; i < document.body.childNodes.length; i++) {
        alert(document.body.childNodes[i]); // Text, DIV, Text, UL, ..., SCRIPT
    }
    // Since the returnable is an iterable collection, for...of can be used
    for (let node of document.body.childNodes) {
        alert(node); // shows all nodes from the collection
    }
    // Convert to array to use array methods
    Array.from(document.body.childNodes).filter
Node.firstChild
Node.lastChild
Node.nextSibling
Node.previousSibling
Node.parentNode

// Searching Properties for element nodes
Node.parentElement
Node.children
Node.firstElementChild
Node.lastElementChild
Node.previousElementSibling
Node.nextElementSibling

// DOM Node Properties
Node.nodeType // Returns: 1 for elements, 3 for text nodes, 8 for comment nodes...
Node.nodeName // For elements, tag name (uppercased unless XML).For non - element nodes nodeName describes what it is.Read - only.
Node.tagName // Like Node.nodeName
Node.innerHTML // Changes replace existing innerHTML
Node.outerHTML // Changes remove node from DOM and replace it with a new node
Node.data // For text and comment nodes
    '<!-- if isadmin -->'.data === ' if isadmin '
Node.textContent // Strip tags
    'foo <b>bar <a href="#foobar">foobar</a></b>'.textContent === 'foo bar foobar'
    document.querySelector('li').textContent = '<b>foo</b>' // Escapes html tags on set; Useful to filter user input
HTMLElement.innerText // Visual representation of text
    'foo <b style="text-transform:uppercase">bar</b> <span hidden>foobar</span>'.textContent === 'foo BAR'
HTMLElement.hidden // Get or set the elements visibility; Sets on `hidden` attribute
Element.attributes: NamedNodeMap // Get all the attributes of the tag
    const el = <a href="#foo" target="_blank" />
    [...el.attributes] == ['href', 'target']
    el.attributes.href.textContent === '#foo' // same as:
    el.getAttribute('href')
Element.childElementCount: Number
Element.id: string 

// Data attributes
// Access elements with the dataset property:
document.body.dataset.aboutMe // Access element: <body data-about-me="I am">
order.dataset.orderState = 'Pending' // Update element: <div id="order" class="order" data-order-state="new">A new order.</div>

// Modify document
document.createElement(tag) // Creates a new element node with the given tag:
    const div = document.createElement('div');
    div.className = 'alert';
    div.innerHTML = '<strong>I am error</strong>';
    document.body.append(div);
document.createTextNode(text) // Creates a new text node with the given text:
    let textNode = document.createTextNode('Here I am');
document.createDocumentFragment() // Create an empty fragment with which child nodes can be inserted
    const frag = document.createDocumentFragment()
    for (let i = 0; i < 100; i++) {
        const p = document.createElement('p')
        p.innerText = i.toString()
        frag.appendChild(p)
    }
    document.body.appendChild(frag)
Node.before(...nodes or strings) // insert nodes or strings before node
    div.before('<p>foo</p>', document.createElement('hr')) //= &lt;p&gt;Hello&lt;/p&gt;<hr><div id="div"></div>
Node.prepend(...nodes or strings) //insert nodes or strings at the beginning of node
Node.append(...nodes or strings) //append nodes or strings at the end of node
Node.after(...nodes or strings) // insert nodes or strings after node
Node.replaceWith(...nodes or strings) // replaces node with the given nodes or strings
Node.insertAdjacentHTML(where, html) // where: ["beforebegin", "afterbegin", "beforeend", "afterend"]
    div.insertAdjacentHTML('beforebegin', '<p>Hello</p>');
    document.body.insertAdjacentHTML("afterbegin", `<div class="alert">
        <strong>Hi there!</strong> You've read an important message.
    </div>`);
Node.insertAdjacentText(where, text) // the same syntax, but a string of text is inserted “as text” instead of HTML,
Node.insertAdjacentElement(where, elem) // the same syntax, but inserts an element.
    var tempDiv = document.createElement('div');
    tempDiv.style.backgroundColor = randomColor();
    document.body.insertAdjacentElement('afterbegin', tempDiv);
Node.remove()
Node.removeChild(childNode)
    //<div id="top"><div id="nested"></div></div>
    // To remove a specified element when knowing its parent node:
    let d = document.getElementById("top");
    let d_nested = document.getElementById("nested");
    let throwawayNode = d.removeChild(d_nested);
    // To remove a specified element without having to specify its parent node:
    let node = document.getElementById("nested");
    if (node.parentNode) node.parentNode.removeChild(node);
    // To remove all children from an element:
    let element = document.getElementById("top");
    while (element.firstChild) element.removeChild(element.firstChild);
Node.cloneNode([deep]) // param {boolean} deep: If true, then node and its whole subtree—including text that may be in child Text nodes—is also copied; If false, only node will be cloned. Any text that node contains is not cloned, either(since text is contained by one or more child Text nodes).
    let div2 = div.cloneNode(true); // clone the message
    div2.querySelector('strong').innerHTML = 'Bye there!'; // change the clone
    div.after(div2); // show the clone after the existing div
DocumentFragment // Class wrapper to pass around lists of nodes.
    let fragment = new DocumentFragment();
    for (let i = 1; i <= 3; i++) {
        let li = document.createElement('li');
        li.append(i);
        fragment.append(li);
    }
    document.querySelector('ul').append(fragment); //= <ul><li>1</li><li>2</li><li>3</li></ul>

// Style and class properties

Element.getAttribute(attr: string): string // Get an element attribute
Element.getAttributeNames(): Array
    for (let name of element.getAttributeNames()) {
        let value = element.getAttribute(name);
        console.log(name, value);
    }
Element.setAttribute(attr, value)
    h1.setAttribute('id', 'main-header')
Node.className // Change the `class` prop
Node.classList: DOMTokenList // List of classNames
    const div = document.createElement('div');
    div.className = 'foo';
    div.classList.add('bar')
    div.classList.forEach(cn => console.log(cn)) //=> foo; bar;
Node.classList.add(className) // adds className
Node.classList.remove(className) // removes className
Node.classList.toggle(className, [test: boolean]) // adds className if it doesn’t exist, otherwise removes it; if `test` is present, will only toggle if test passes
Node.classList.contains(className) // checks for the given class, returns true / false.
Node.style // Object to get or set style props
    document.getElementById('foo').style.backgroundColor = 'pink'
    elem.style.display = '' // unset style prop
Node.style.cssText // Replaces all style props (!) (But not inherited styles)
    const css = `color: red !important;
        background-color: yellow;
        width: 100px;
        text-align: center;`;
    div.style.cssText = css // equivalent to:
    div.setAttribute('style', css)
getComputedStyle(element, [pseudo_elem]): object // Returns the resolved CSS styles of `element`
    const { width, height } = getComputedStyle(element) // Returns strings in px, or 'auto' for inline elements

// Size and scroll
HTMLElement.offsetParent: Element // Select nearest ancestor with CSS positioning
HTMLElement.offsetLeft: Number HTMLElement.offsetTop: Number // Returns pixels offset from parent offset
HTMLElement.offsetWidth HTMLElement.offsetHeight // Returns outside dimensions including border
    // Geometry props return zero for hidden elements
    el.hidden=true
    el.offsetWidth === 0 && el.offsetHeight === 0
    // Check if an element is hidden
    function isHidden(elem) {
        return !elem.offsetWidth && !elem.offsetHeight;
    }
Element.clientWidth Element.clientHeight // Returns dimensions inside border: height + padding - scrollbar
    // Get whole of root dimensions
    documentElement.clientHeight
    documentElement.clientWidth
Element.scrollHeight Element.scrollWidth // Returns dimensions of the whole element including sections not visible in the viewport
Element.scrollTop Element.scrollLeft // Get or set the scroll position
    el.scrollTop = 0 // Force scroll position to top
    // Get the current scroll position
    window.pageYOffset
    window.pageXOffset
window.scrollBy(x, y)
    window.scrollBy(0,10) // Scroll down 10px
window.scrollTo(x, y)
    window.scrollTo(0,0) // Scroll to top of page
elem.scrollIntoView([top=true]) // Scroll to the position of the element; @attr top (default=true) Scroll to the top of the element, or if false the bottom part of the window
    this.scrollIntoView(false) // Scroll so this element is on the bottom of the viewport

// Coordinates
Element.getBoundingClientRect(): DOMRect // The returned value is a DOMRect object which is the smallest rectangle which contains the entire element, including its padding and border-width. The left, top, right, bottom, x, y, width, and height properties describe the position and size of the overall rectangle in pixels. Properties other than width and height are relative to the top-left of the viewport.
    function getCoordsRelativeToDocument(elem) {
        let box = elem.getBoundingClientRect()
        return {
            top: box.top + window.pageYOffset,
            right: box.right + window.pageXOffset,
            bottom: box.bottom + window.pageYOffset,
            left: box.left + window.pageXOffset
        }
    }
    function createTooltipElement(elem, html) {
        let message = document.createElement('div')
        message.style.cssText = "position:absolute;"
        let coords = getCoordsRelativeToDocument(elem)
        message.style.left = coords.left + "px"
        message.style.top = coords.bottom + "px"
        message.innerHTML = html
        return message
    }
    for (let el of document.querySelectorAll('.tooltip')) {
        const tooltip = createTooltipElement(el, el.getAttribute('title'))
        document.body.append(tooltip)
    }
Document.elementFromPoint(x, y) // Returns the topmost Element at the specified coordinates (relative to the viewport).
    // Get the element in the middle of the window
    let centerX = document.documentElement.clientWidth / 2;
    let centerY = document.documentElement.clientHeight / 2;
    let elem = document.elementFromPoint(centerX, centerY);

/** @events */

click // when the mouse clicks on an element (touchscreen devices generate it on a tap).
contextmenu // when the mouse right-clicks on an element.
dblclick // when the mouse is double clicked
DOMContentLoaded // when the HTML is loaded and processed, DOM is fully built.
    document.addEventListener("DOMContentLoaded", () => alert("DOM built"))
focus // when the visitor focuses on an element, e.g. on an <input>.
keydown keyup // when a keyboard key is pressed and released.
mouseover mouseout // when the mouse cursor comes over / leaves an element.
mousedown mouseup // when the mouse button is pressed / released over an element.
mousemove // when the mouse is moved.
submit // when the visitor submits a <form>.
transitionrun // when a CSS transition begins.
transitionend // when a CSS-animation finishes.

// HTML events are passed as functions. The following are equivalent:
// <input type="button" onclick="alert(event.type)" value="Event type">
// function(event) { alert(event.type) }

/**
 * @param event string Event type
 * @param listener function|object|class
 * Callback function on trigger
 * Object|Class with handleEvent method
 * @param options
 * once: if true, then the listener is automatically removed after it triggers
 * capture: the phase where to handle the event. For historical reasons, options can also be false/true, that’s the same as {capture: false/true}.
 * passive: if true, then the handler will not call preventDefault().
 */
element.addEventListener(event, listener, [options]);
    // Object as listener
    const listener = {
        handleEvent(event) {
            alert(`${event.type} at ${event.currentTarget}`)
        }
    }
    el.addEventListener('click', listener)
element.removeEventListener(event, listener, [options]);

// Event object properties
Event.bubbles: boolean // whether or not the event bubbles up through the DOM.
Event.cancelable: boolean // whether the event is cancelable, eg can preventDefault()
Event.composed: boolean // whether or not the event can bubble across the boundary between the shadow DOM and the regular DOM.
Event.currentTarget: Element // Element that handled the event; Same as this, unless the handler is an arrow function, or its this is bound to something else, then we can get the element from event.currentTarget.
Event.defaultPrevented: boolean // whether or not the call to event.preventDefault() canceled the event.
    // <p>Right-click for the document menu</p>
    // <button id="button">Right-click for the button menu</button>
    document.getElementById('button').oncontextmenu = function(event) {
        event.preventDefault();
        alert("Button context menu");
    };
    document.oncontextmenu = function(event) {
        if (event.defaultPrevented) return;
        event.preventDefault();
        alert("Document context menu");
    };
Event.isTrusted: boolean // whether or not the event was initiated by the browser (after a user click, for instance) or by a script (using an event creation method, like Event.initEvent).
Event.target: Element // Element that triggered the event that bubbled up to event.currentTarget
    // Use event.target to delegate one event rather than assigning many listeners
    table.onclick = function(event) {
        let td = event.target.closest('td'); // where was the click?
        if (!td) return; // not on TD? Then we're not interested
        if (!table.contains(td)) return // In case of nested tables, event.target may be a <td>, but lying outside of the current table. So we check if that’s actually our table’s <td>.
        highlight(target); // highlight it
    };
Event.type: string // Event type, eg. "click".
MouseEvent.clientX; MouseEvent.clientY // Window-relative coordinates of the cursor, for pointer events.
MouseEvent.screenX; MouseEvent.screenY // coordinate of the mouse pointer in global (screen) coordinates.
MouseEvent.ctrlKey: boolean  // Returns true if the control key was down when the mouse event was fired.
MouseEvent.shiftKey: boolean // Returns true if the shift key was down when the mouse event was fired.
KeyboardEvent.key: string // Target key, eg k, Home, ArrowUp
// Event object methods
Event.preventDefault()
Event.stopPropagation() // Prevent further bubbling to parent elements; (!) Its use can limit functionality of other events: Instead use event.defaultPrevented() to check.
Event.stopImmediatePropagation() // Prevent all bubbling, including on this element

/** @custom_events */
Element.dispatchEvent(event)
    document.addEventListener("hello", function(event) { // (1)
        alert("Hello from " + event.target.tagName); // Hello from H1
    });
    let event = new Event("hello", {bubbles: true}); // (2)
    elem.dispatchEvent(event);
    // additional details come with the event to the handler
    elem.addEventListener("hello", function(event) {
        alert(event.detail.name);
    });
    elem.dispatchEvent(new CustomEvent("hello", {
        detail: { name: "John" }
    }));