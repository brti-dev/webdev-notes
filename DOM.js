/** @DOM_Tree */

// There are 12 node types. In practice we usually work with 4 of them:
// document – the “entry point” into DOM.
// element nodes – HTML - tags, the tree building blocks.
// text nodes – contain text.
// comments – sometimes we can put information there, it won’t be shown, but JS can read it from the DOM.

// Console manipulation
// Select a node with mouse, or in console, type node, eg:
// > document.body
// Manipulate the current node:
// > $0.style.backgroundColor='pink'

/** @document node */

// Searching
document.getElementById(String id)
Node.querySelectorAll(cssSelectors)
    for (let elem of document.querySelectorAll('ul > li:last-child')) {
        alert(elem.innerHTML); 
    }
Node.querySelector(cssSelectors) // Returns only the first element for the given CSS selector
Node.matches(cssSelectors): bool // Checks if elem matches cssSelectors
    function isHeading(e) {
        return e.matches('h1, h2, h3, h4, h5')
    }
    for (let elem of document.body.children) {
        if (elem.matches('a[href$="zip"]')) {
            alert("The archive reference: " + elem.href);
        }
    }
Node.closest(cssSelectors) // Finds the closest ancestor up the tree

// Properties for all nodes
Node.childNodes // Returns a live collection of immediate child nodes
    for (let i = 0; i < document.body.childNodes.length; i++) {
        alert(document.body.childNodes[i]); // Text, DIV, Text, UL, ..., SCRIPT
    }
    // Since the returnable is an iteable collection, for...of can be used
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

// Properties for element nodes
Node.parentElement
Node.children
Node.firstElementChild
Node.lastElementChild
Node.previousElementSibling
Node.nextElementSibling

// DOM Node Properties
Node.nodeType // Returns: 1 for elements, 3 for text nodes, 8 for comment nodes...
Node.nodeName // For elements, tag name(uppercased unless XML - mode).For non - element nodes nodeName describes what it is.Read - only.
Node.tagName // Like Node.nodeName
Node.innerHTML // Changes replace existing innerHTML
Node.outerHTML // Changes remove node from DOM and replace it with a new node
Node.data // For text and comment nodes
    '<!-- if isadmin -->'.data === ' if isadmin '
Node.textContent // Strip tags
    'foo <b>bar <a href="#foobar">foobar</a></b>'.textContent = 'foo bar foobar'
    document.querySelector('li').textContent = '<b>foo</b>' // Escapes html tags on set; Useful to filter user input
Node.hidden // Get or set the elements visibility; Equivalent to style=display:none;

// Data attributes
// Access elements with the dataset property:
document.body.dataset.about // Access element: <body data-about="emus">
order.dataset.orderState = 'Pending' // Update element: <div id="order" class="order" data-order-state="new">A new order.</div>

// Modify document
document.createElement(tag) // Creates a new element node with the given tag:
    let div = document.createElement('div');
    div.className = 'alert';
    div.innerHTML = '<strong>I am error</strong>';
    document.body.append(div);
document.createTextNode(text) // Creates a new text node with the given text:
    let textNode = document.createTextNode('Here I am');
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
Node.className // Change the `class` prop
Node.classList: DOMTokenList // List of classNames
    const div = document.createElement('div');
    div.className = 'foo';
    div.classList.add('bar')
    div.classList.forEach(cn => console.log(cn)) //=> foo; bar;
Node.classList.add(className) // adds className
Node.classList.remove(className) // removes className
Node.classList.toggle(className) // adds className if it doesn’t exist, otherwise removes it.
Node.classList.contains(className) // checks for the given class, returns true / false.
Node.style // Object to get or set style props
    document.getElementById('foo').backgroundColor = 'pink'
    elem.style.display = '' // unset style prop
Node.cssText // Replaces all style props (!)
    const css = `color: red !important;
        background-color: yellow;
        width: 100px;
        text-align: center;`;
    div.style.cssText = css // equivalent to:
    div.setAttribute('style', css)
getComputedStyle(element, [pseudo]): object // Returns the resolved styles of `element`
    const { width, height } = getComputedStyle(element)
