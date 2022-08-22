declarative -- determine what a view looks like rather than what it does

Single-file component

*.vue file

Encapsulate into a single file:
 - logic (js)
 - template (html)
 - style (css)

# Reactive data

```js
// Reactive data should be in the form of an object or collection
const foo = reactive({ foo: 1, bar: 2 })
const map = reactive(
  new Map([
    ['foo', 1],
    ['bar', 2],
  ])
)
const set = reactive(new Set(['foo', 'bar']))

// Mutating the reactive data triggers a re-render
foo.foo++
map.set('foo', 2)
set.add('baz')
```

# Ref

```js
// Reference primitive
const counter = ref(1)
const isOurChildrenLearning = ref(true)

// Mutate or access the reference using the `value` property
counter.value++

// Objects are reactive
const obj = reactive({ foo: 1 })
obj.foo++ // Triggers a re-render
```

# Computed ref

```js
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery',
  ],
})
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
// Access or mutate the computed property using the `value` property
publishedBooksMessage.value // 'No'
```

# Directives

- Used to attach behavior to DOM elements

## v-bind Bind attributes
const myId = 1001
const nestedObject = {
  class: 'my-class',
  id: 'my-id',
}
const parseTitle = (title) => {/** */}
const formatDate = (date) => {/** */}
const attr = "data-foo"
const foo = "bar"
//--
<div v-bind:id="myId"></div>
// same as:
<div v-bind:id="myId"></div>
<span v-bind="nestedObject"></span> // Binds both class and id attributes
// Bind function expressions
<time v-bind:datetime="formatDate('2022-02-22')">
  <span v-bind:title="parseTitle('My Title')"></span>
</time>
// Bind dynamic attributes
<div v-bind:[attr]="foo"></div>

## v-text Render text content
<div v-text="text"></div>
// same as:
<div>{{ text }}</div>

## v-html Interpret data as HTML; Update tag content innerHTML
// NOTE: vulnerable to XSS
const rawhtml = '<span style="color:red">Hello World</span>'
// --
<div v-html="rawhtml"></div>

## v-show Hide or show a component; Manipulates CSS display property
<div v-show="show"></div>

## v-if, v-else, v-else-if Conditionally render a view
<span v-if="isOurChildrenLearning"></span>
<span v-else-if="someCheck === 1"></span>
<span v-else></span>

## v-on Bind event handlers
<button v-on:click="onClick">Click Me</button>
// same as:
<button @click="onClick">Click Me</button>

## v-for Render the element or template block multiple times based on the source data.
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
const item = reactive({ message: 'Baz', messenger: 'John' })
//--
<li v-for="item in items">
  {{ item.message }}
</li>
<li v-for="({message}, index) in items">
  {{ index }} -- {{ message }}
</li>
<template v-for="(value, key, index) in item" v-bind:key="index">
  <dt>{{key}}</dt>
  <dd>{{value}}</dd>
</template>

## v-model Bind data to form fields
const message = ref('Hello World');
const number = ref(1);
//--
<input type="text" v-model="message">
<input type="text" v-model.lazy="message"> // Synced after `change` event (not `input`)
<input type="text" v-model.trim="message"> // Trim whitespace
<input type="number" v-model.number="message"> // Bind to number type

# Components

// Dynamic component
import MyComponent from './MyComponent.vue'
import MyOtherComponent from './MyOtherComponent.vue'
const component = ref(MyComponent)
//--
<button @click="component = MyOtherComponent">Switch Components</button>
<component :is="component"></component>

// component props
// types: String, Number, Boolean, Object, Array, Date, Function, Symbol

// Slots
<C>fuuu</C>
//C component:
<template><b><slot>Default stuff</slot></b></template>
// Named slots
<C>
  <template #header>My Header</template>
  <p>Main content</p>
  <template #footer>My Footer</template>
</C>
//--
<div class="container">
  <header>
    <slot name="header">Default Header</slot>
  </header>
  <main>
    <slot>Default Content</slot>
  </main>
  <footer>
    <slot name="footer">Default Footer</slot>
  </footer>
</div>
// Scoped slots: pass data to the parent
<MyComponent v-slot="slotProps">
  <!-- slotProps assigned data from child -->
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
//--
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>

# Provide & Inject

- Provide context to child components

// App
const message = ref('Hello World')
const updateMessage = (newMessage) => {
  message.value = newMessage
}
provide('message', {message, updateMessage})
// Descendant
const {message, updateMessage} = inject('message')
<input :value="message" @input="event => updateMessage(event.target.value)" />

// Read-only context
import { provide, inject, readonly } from 'vue'
const message = readonly('Hello World')
