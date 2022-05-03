# Jest

## Expect

When you're writing tests, you often need to check that values meet certain conditions. `expect` gives you access to a number of "matchers" that let you validate different things.

For additional Jest matchers maintained by the Jest Community check out [`jest-extended`](https://github.com/jest-community/jest-extended).

## Methods

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc.slice(2)} />

---

## Reference

### `expect(value)`

The `expect` function is used every time you want to test a value. You will rarely call `expect` by itself. Instead, you will use `expect` along with a "matcher" function to assert something about a value.

It's easier to understand this with an example. Let's say you have a method `bestLaCroixFlavor()` which is supposed to return the string `'grapefruit'`. Here's how you would test that:

```js
test('the best flavor is grapefruit', () => {
  expect(bestLaCroixFlavor()).toBe('grapefruit')
})
```

In this case, `toBe` is the matcher function. There are a lot of different matcher functions, documented below, to help you test different things.

The argument to `expect` should be the value that your code produces, and any argument to the matcher should be the correct value. If you mix them up, your tests will still work, but the error messages on failing tests will look strange.

### `expect.extend(matchers)`

You can use `expect.extend` to add your own matchers to Jest. For example, let's say that you're testing a number utility library and you're frequently asserting that numbers appear within particular ranges of other numbers. You could abstract that into a `toBeWithinRange` matcher:

```js
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      }
    }
  },
})

test('numeric ranges', () => {
  expect(100).toBeWithinRange(90, 110)
  expect(101).not.toBeWithinRange(0, 100)
  expect({ apples: 6, bananas: 3 }).toEqual({
    apples: expect.toBeWithinRange(1, 10),
    bananas: expect.not.toBeWithinRange(11, 20),
  })
})
```

_Note_: In TypeScript, when using `@types/jest` for example, you can declare the new `toBeWithinRange` matcher in the imported module like this:

```ts
interface CustomMatchers<R = unknown> {
  toBeWithinRange(floor: number, ceiling: number): R
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}
```

#### Async Matchers

`expect.extend` also supports async matchers. Async matchers return a Promise so you will need to await the returned value. Let's use an example matcher to illustrate the usage of them. We are going to implement a matcher called `toBeDivisibleByExternalValue`, where the divisible number is going to be pulled from an external source.

```js
expect.extend({
  async toBeDivisibleByExternalValue(received) {
    const externalValue = await getExternalValueFromRemoteSource()
    const pass = received % externalValue == 0
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be divisible by ${externalValue}`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${received} to be divisible by ${externalValue}`,
        pass: false,
      }
    }
  },
})

test('is divisible by external value', async () => {
  await expect(100).toBeDivisibleByExternalValue()
  await expect(101).not.toBeDivisibleByExternalValue()
})
```

#### Custom Matchers API

Matchers should return an object (or a Promise of an object) with two keys. `pass` indicates whether there was a match or not, and `message` provides a function with no arguments that returns an error message in case of failure. Thus, when `pass` is false, `message` should return the error message for when `expect(x).yourMatcher()` fails. And when `pass` is true, `message` should return the error message for when `expect(x).not.yourMatcher()` fails.

Matchers are called with the argument passed to `expect(x)` followed by the arguments passed to `.yourMatcher(y, z)`:

```js
expect.extend({
  yourMatcher(x, y, z) {
    return {
      pass: true,
      message: () => '',
    }
  },
})
```

These helper functions and properties can be found on `this` inside a custom matcher:

#### `this.isNot`

A boolean to let you know this matcher was called with the negated `.not` modifier allowing you to display a clear and correct matcher hint (see example code).

#### `this.promise`

A string allowing you to display a clear and correct matcher hint:

- `'rejects'` if matcher was called with the promise `.rejects` modifier
- `'resolves'` if matcher was called with the promise `.resolves` modifier
- `''` if matcher was not called with a promise modifier

#### `this.equals(a, b)`

This is a deep-equality function that will return `true` if two objects have the same values (recursively).

#### `this.expand`

A boolean to let you know this matcher was called with an `expand` option. When Jest is called with the `--expand` flag, `this.expand` can be used to determine if Jest is expected to show full diffs and errors.

#### `this.utils`

There are a number of helpful tools exposed on `this.utils` primarily consisting of the exports from [`jest-matcher-utils`](https://github.com/facebook/jest/tree/main/packages/jest-matcher-utils).

The most useful ones are `matcherHint`, `printExpected` and `printReceived` to format the error messages nicely. For example, take a look at the implementation for the `toBe` matcher:

```js
const { diff } = require('jest-diff')
expect.extend({
  toBe(received, expected) {
    const options = {
      comment: 'Object.is equality',
      isNot: this.isNot,
      promise: this.promise,
    }

    const pass = Object.is(received, expected)

    const message = pass
      ? () =>
          // eslint-disable-next-line prefer-template
          this.utils.matcherHint('toBe', undefined, undefined, options) +
          '\n\n' +
          `Expected: not ${this.utils.printExpected(expected)}\n` +
          `Received: ${this.utils.printReceived(received)}`
      : () => {
          const diffString = diff(expected, received, {
            expand: this.expand,
          })
          return (
            // eslint-disable-next-line prefer-template
            this.utils.matcherHint('toBe', undefined, undefined, options) +
            '\n\n' +
            (diffString && diffString.includes('- Expect')
              ? `Difference:\n\n${diffString}`
              : `Expected: ${this.utils.printExpected(expected)}\n` +
                `Received: ${this.utils.printReceived(received)}`)
          )
        }

    return { actual: received, message, pass }
  },
})
```

This will print something like this:

```bash
  expect(received).toBe(expected)

    Expected value to be (using Object.is):
      "banana"
    Received:
      "apple"
```

When an assertion fails, the error message should give as much signal as necessary to the user so they can resolve their issue quickly. You should craft a precise failure message to make sure users of your custom assertions have a good developer experience.

#### Custom snapshot matchers

To use snapshot testing inside of your custom matcher you can import `jest-snapshot` and use it from within your matcher.

Here's a snapshot matcher that trims a string to store for a given length, `.toMatchTrimmedSnapshot(length)`:

```js
const { toMatchSnapshot } = require('jest-snapshot')

expect.extend({
  toMatchTrimmedSnapshot(received, length) {
    return toMatchSnapshot.call(
      this,
      received.substring(0, length),
      'toMatchTrimmedSnapshot'
    )
  },
})

it('stores only 10 characters', () => {
  expect('extra long string oh my gerd').toMatchTrimmedSnapshot(10)
})

/*
Stored snapshot will look like:

exports[`stores only 10 characters: toMatchTrimmedSnapshot 1`] = `"extra long"`;
*/
```

It's also possible to create custom matchers for inline snapshots, the snapshots will be correctly added to the custom matchers. However, inline snapshot will always try to append to the first argument or the second when the first argument is the property matcher, so it's not possible to accept custom arguments in the custom matchers.

```js
const { toMatchInlineSnapshot } = require('jest-snapshot')

expect.extend({
  toMatchTrimmedInlineSnapshot(received, ...rest) {
    return toMatchInlineSnapshot.call(this, received.substring(0, 10), ...rest)
  },
})

it('stores only 10 characters', () => {
  expect('extra long string oh my gerd').toMatchTrimmedInlineSnapshot()
  /*
  The snapshot will be added inline like
  expect('extra long string oh my gerd').toMatchTrimmedInlineSnapshot(
    `"extra long"`
  );
  */
})
```

#### async

If your custom inline snapshot matcher is async i.e. uses `async`-`await` you might encounter an error like "Multiple inline snapshots for the same call are not supported". Jest needs additional context information to find where the custom inline snapshot matcher was used to update the snapshots properly.

```js
const { toMatchInlineSnapshot } = require('jest-snapshot')

expect.extend({
  async toMatchObservationInlineSnapshot(fn, ...rest) {
    // The error (and its stacktrace) must be created before any `await`
    this.error = new Error()

    // The implementation of `observe` doesn't matter.
    // It only matters that the custom snapshot matcher is async.
    const observation = await observe(async () => {
      await fn()
    })

    return toMatchInlineSnapshot.call(this, recording, ...rest)
  },
})

it('observes something', async () => {
  await expect(async () => {
    return 'async action'
  }).toMatchTrimmedInlineSnapshot()
  /*
  The snapshot will be added inline like
  await expect(async () => {
    return 'async action';
  }).toMatchTrimmedInlineSnapshot(`"async action"`);
  */
})
```

#### Bail out

Usually `jest` tries to match every snapshot that is expected in a test.

Sometimes it might not make sense to continue the test if a prior snapshot failed. For example, when you make snapshots of a state-machine after various transitions you can abort the test once one transition produced the wrong state.

In that case you can implement a custom snapshot matcher that throws on the first mismatch instead of collecting every mismatch.

```js
const { toMatchInlineSnapshot } = require('jest-snapshot')

expect.extend({
  toMatchStateInlineSnapshot(...args) {
    this.dontThrow = () => {}

    return toMatchInlineSnapshot.call(this, ...args)
  },
})

let state = 'initial'

function transition() {
  // Typo in the implementation should cause the test to fail
  if (state === 'INITIAL') {
    state = 'pending'
  } else if (state === 'pending') {
    state = 'done'
  }
}

it('transitions as expected', () => {
  expect(state).toMatchStateInlineSnapshot(`"initial"`)

  transition()
  // Already produces a mismatch. No point in continuing the test.
  expect(state).toMatchStateInlineSnapshot(`"loading"`)

  transition()
  expect(state).toMatchStateInlineSnapshot(`"done"`)
})
```

### `expect.anything()`

`expect.anything()` matches anything but `null` or `undefined`. You can use it inside `toEqual` or `toBeCalledWith` instead of a literal value. For example, if you want to check that a mock function is called with a non-null argument:

```js
test('map calls its argument with a non-null argument', () => {
  const mock = jest.fn()
  ;[1].map(x => mock(x))
  expect(mock).toBeCalledWith(expect.anything())
})
```

### `expect.any(constructor)`

`expect.any(constructor)` matches anything that was created with the given constructor or if it's a primitive that is of the passed type. You can use it inside `toEqual` or `toBeCalledWith` instead of a literal value. For example, if you want to check that a mock function is called with a number:

```js
class Cat {}
function getCat(fn) {
  return fn(new Cat())
}

test('randocall calls its callback with a class instance', () => {
  const mock = jest.fn()
  getCat(mock)
  expect(mock).toBeCalledWith(expect.any(Cat))
})

function randocall(fn) {
  return fn(Math.floor(Math.random() * 6 + 1))
}

test('randocall calls its callback with a number', () => {
  const mock = jest.fn()
  randocall(mock)
  expect(mock).toBeCalledWith(expect.any(Number))
})
```

### `expect.arrayContaining(array)`

`expect.arrayContaining(array)` matches a received array which contains all of the elements in the expected array. That is, the expected array is a **subset** of the received array. Therefore, it matches a received array which contains elements that are **not** in the expected array.

You can use it instead of a literal value:

- in `toEqual` or `toBeCalledWith`
- to match a property in `objectContaining` or `toMatchObject`

```js
describe('arrayContaining', () => {
  const expected = ['Alice', 'Bob']
  it('matches even if received contains additional elements', () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected))
  })
  it('does not match if received does not contain expected elements', () => {
    expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected))
  })
})
```

```js
describe('Beware of a misunderstanding! A sequence of dice rolls', () => {
  const expected = [1, 2, 3, 4, 5, 6]
  it('matches even with an unexpected number 7', () => {
    expect([4, 1, 6, 7, 3, 5, 2, 5, 4, 6]).toEqual(
      expect.arrayContaining(expected)
    )
  })
  it('does not match without an expected number 2', () => {
    expect([4, 1, 6, 7, 3, 5, 7, 5, 4, 6]).not.toEqual(
      expect.arrayContaining(expected)
    )
  })
})
```

### `expect.assertions(number)`

`expect.assertions(number)` verifies that a certain number of assertions are called during a test. This is often useful when testing asynchronous code, in order to make sure that assertions in a callback actually got called.

For example, let's say that we have a function `doAsync` that receives two callbacks `callback1` and `callback2`, it will asynchronously call both of them in an unknown order. We can test this with:

```js
test('doAsync calls both callbacks', () => {
  expect.assertions(2)
  function callback1(data) {
    expect(data).toBeTruthy()
  }
  function callback2(data) {
    expect(data).toBeTruthy()
  }

  doAsync(callback1, callback2)
})
```

The `expect.assertions(2)` call ensures that both callbacks actually get called.

### `expect.closeTo(number, numDigits?)`

`expect.closeTo(number, numDigits?)` is useful when comparing floating point numbers in object properties or array item. If you need to compare a number, please use `.toBeCloseTo` instead.

The optional `numDigits` argument limits the number of digits to check **after** the decimal point. For the default value `2`, the test criterion is `Math.abs(expected - received) < 0.005 (that is, 10 ** -2 / 2)`.

For example, this test passes with a precision of 5 digits:

```js
test('compare float in object properties', () => {
  expect({
    title: '0.1 + 0.2',
    sum: 0.1 + 0.2,
  }).toEqual({
    title: '0.1 + 0.2',
    sum: expect.closeTo(0.3, 5),
  })
})
```

### `expect.hasAssertions()`

`expect.hasAssertions()` verifies that at least one assertion is called during a test. This is often useful when testing asynchronous code, in order to make sure that assertions in a callback actually got called.

For example, let's say that we have a few functions that all deal with state. `prepareState` calls a callback with a state object, `validateState` runs on that state object, and `waitOnState` returns a promise that waits until all `prepareState` callbacks complete. We can test this with:

```js
test('prepareState prepares a valid state', () => {
  expect.hasAssertions()
  prepareState(state => {
    expect(validateState(state)).toBeTruthy()
  })
  return waitOnState()
})
```

The `expect.hasAssertions()` call ensures that the `prepareState` callback actually gets called.

### `expect.not.arrayContaining(array)`

`expect.not.arrayContaining(array)` matches a received array which does not contain all of the elements in the expected array. That is, the expected array **is not a subset** of the received array.

It is the inverse of `expect.arrayContaining`.

```js
describe('not.arrayContaining', () => {
  const expected = ['Samantha']

  it('matches if the actual array does not contain the expected elements', () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(
      expect.not.arrayContaining(expected)
    )
  })
})
```

### `expect.not.objectContaining(object)`

`expect.not.objectContaining(object)` matches any received object that does not recursively match the expected properties. That is, the expected object **is not a subset** of the received object. Therefore, it matches a received object which contains properties that are **not** in the expected object.

It is the inverse of `expect.objectContaining`.

```js
describe('not.objectContaining', () => {
  const expected = { foo: 'bar' }

  it('matches if the actual object does not contain expected key: value pairs', () => {
    expect({ bar: 'baz' }).toEqual(expect.not.objectContaining(expected))
  })
})
```

### `expect.not.stringContaining(string)`

`expect.not.stringContaining(string)` matches the received value if it is not a string or if it is a string that does not contain the exact expected string.

It is the inverse of `expect.stringContaining`.

```js
describe('not.stringContaining', () => {
  const expected = 'Hello world!'

  it('matches if the received value does not contain the expected substring', () => {
    expect('How are you?').toEqual(expect.not.stringContaining(expected))
  })
})
```

### `expect.not.stringMatching(string | regexp)`

`expect.not.stringMatching(string | regexp)` matches the received value if it is not a string or if it is a string that does not match the expected string or regular expression.

It is the inverse of `expect.stringMatching`.

```js
describe('not.stringMatching', () => {
  const expected = /Hello world!/

  it('matches if the received value does not match the expected regex', () => {
    expect('How are you?').toEqual(expect.not.stringMatching(expected))
  })
})
```

### `expect.objectContaining(object)`

`expect.objectContaining(object)` matches any received object that recursively matches the expected properties. That is, the expected object is a **subset** of the received object. Therefore, it matches a received object which contains properties that **are present** in the expected object.

Instead of literal property values in the expected object, you can use matchers, `expect.anything()`, and so on.

For example, let's say that we expect an `onPress` function to be called with an `Event` object, and all we need to verify is that the event has `event.x` and `event.y` properties. We can do that with:

```js
test('onPress gets called with the right thing', () => {
  const onPress = jest.fn()
  simulatePresses(onPress)
  expect(onPress).toBeCalledWith(
    expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    })
  )
})
```

### `expect.stringContaining(string)`

`expect.stringContaining(string)` matches the received value if it is a string that contains the exact expected string.

### `expect.stringMatching(string | regexp)`

`expect.stringMatching(string | regexp)` matches the received value if it is a string that matches the expected string or regular expression.

You can use it instead of a literal value:

- in `toEqual` or `toBeCalledWith`
- to match an element in `arrayContaining`
- to match a property in `objectContaining` or `toMatchObject`

This example also shows how you can nest multiple asymmetric matchers, with `expect.stringMatching` inside the `expect.arrayContaining`.

```js
describe('stringMatching in arrayContaining', () => {
  const expected = [
    expect.stringMatching(/^Alic/),
    expect.stringMatching(/^[BR]ob/),
  ]
  it('matches even if received contains additional elements', () => {
    expect(['Alicia', 'Roberto', 'Evelina']).toEqual(
      expect.arrayContaining(expected)
    )
  })
  it('does not match if received does not contain expected elements', () => {
    expect(['Roberto', 'Evelina']).not.toEqual(expect.arrayContaining(expected))
  })
})
```

### `expect.addSnapshotSerializer(serializer)`

You can call `expect.addSnapshotSerializer` to add a module that formats application-specific data structures.

For an individual test file, an added module precedes any modules from `snapshotSerializers` configuration, which precede the default snapshot serializers for built-in JavaScript types and for React elements. The last module added is the first module tested.

```js
import serializer from 'my-serializer-module'
expect.addSnapshotSerializer(serializer)

// affects expect(value).toMatchSnapshot() assertions in the test file
```

If you add a snapshot serializer in individual test files instead of adding it to `snapshotSerializers` configuration:

- You make the dependency explicit instead of implicit.
- You avoid limits to configuration that might cause you to eject from [create-react-app](https://github.com/facebookincubator/create-react-app).

See [configuring Jest](Configuration.md#snapshotserializers-arraystring) for more information.

### `.not`

If you know how to test something, `.not` lets you test its opposite. For example, this code tests that the best La Croix flavor is not coconut:

```js
test('the best flavor is not coconut', () => {
  expect(bestLaCroixFlavor()).not.toBe('coconut')
})
```

### `.resolves`

Use `resolves` to unwrap the value of a fulfilled promise so any other matcher can be chained. If the promise is rejected the assertion fails.

For example, this code tests that the promise resolves and that the resulting value is `'lemon'`:

```js
test('resolves to lemon', () => {
  // make sure to add a return statement
  return expect(Promise.resolve('lemon')).resolves.toBe('lemon')
})
```

Note that, since you are still testing promises, the test is still asynchronous. Hence, you will need to [tell Jest to wait](TestingAsyncCode.md#promises) by returning the unwrapped assertion.

Alternatively, you can use `async/await` in combination with `.resolves`:

```js
test('resolves to lemon', async () => {
  await expect(Promise.resolve('lemon')).resolves.toBe('lemon')
  await expect(Promise.resolve('lemon')).resolves.not.toBe('octopus')
})
```

### `.rejects`

Use `.rejects` to unwrap the reason of a rejected promise so any other matcher can be chained. If the promise is fulfilled the assertion fails.

For example, this code tests that the promise rejects with reason `'octopus'`:

```js
test('rejects to octopus', () => {
  // make sure to add a return statement
  return expect(Promise.reject(new Error('octopus'))).rejects.toThrow('octopus')
})
```

Note that, since you are still testing promises, the test is still asynchronous. Hence, you will need to [tell Jest to wait](TestingAsyncCode.md#promises) by returning the unwrapped assertion.

Alternatively, you can use `async/await` in combination with `.rejects`.

```js
test('rejects to octopus', async () => {
  await expect(Promise.reject(new Error('octopus'))).rejects.toThrow('octopus')
})
```

### `.toBe(value)`

Use `.toBe` to compare primitive values or to check referential identity of object instances. It calls `Object.is` to compare values, which is even better for testing than `===` strict equality operator.

For example, this code will validate some properties of the `can` object:

```js
const can = {
  name: 'pamplemousse',
  ounces: 12,
}

describe('the can', () => {
  test('has 12 ounces', () => {
    expect(can.ounces).toBe(12)
  })

  test('has a sophisticated name', () => {
    expect(can.name).toBe('pamplemousse')
  })
})
```

Don't use `.toBe` with floating-point numbers. For example, due to rounding, in JavaScript `0.2 + 0.1` is not strictly equal to `0.3`. If you have floating point numbers, try `.toBeCloseTo` instead.

Although the `.toBe` matcher **checks** referential identity, it **reports** a deep comparison of values if the assertion fails. If differences between properties do not help you to understand why a test fails, especially if the report is large, then you might move the comparison into the `expect` function. For example, to assert whether or not elements are the same instance:

- rewrite `expect(received).toBe(expected)` as `expect(Object.is(received, expected)).toBe(true)`
- rewrite `expect(received).not.toBe(expected)` as `expect(Object.is(received, expected)).toBe(false)`

### `.toHaveBeenCalled()`

Also under the alias: `.toBeCalled()`

Use `.toHaveBeenCalledWith` to ensure that a mock function was called with specific arguments. The arguments are checked with the same algorithm that `.toEqual` uses.

For example, let's say you have a `drinkAll(drink, flavour)` function that takes a `drink` function and applies it to all available beverages. You might want to check that `drink` gets called for `'lemon'`, but not for `'octopus'`, because `'octopus'` flavour is really weird and why would anything be octopus-flavoured? You can do that with this test suite:

```js
function drinkAll(callback, flavour) {
  if (flavour !== 'octopus') {
    callback(flavour)
  }
}

describe('drinkAll', () => {
  test('drinks something lemon-flavoured', () => {
    const drink = jest.fn()
    drinkAll(drink, 'lemon')
    expect(drink).toHaveBeenCalled()
  })

  test('does not drink something octopus-flavoured', () => {
    const drink = jest.fn()
    drinkAll(drink, 'octopus')
    expect(drink).not.toHaveBeenCalled()
  })
})
```

### `.toHaveBeenCalledTimes(number)`

Also under the alias: `.toBeCalledTimes(number)`

Use `.toHaveBeenCalledTimes` to ensure that a mock function got called exact number of times.

For example, let's say you have a `drinkEach(drink, Array<flavor>)` function that takes a `drink` function and applies it to array of passed beverages. You might want to check that drink function was called exact number of times. You can do that with this test suite:

```js
test('drinkEach drinks each drink', () => {
  const drink = jest.fn()
  drinkEach(drink, ['lemon', 'octopus'])
  expect(drink).toHaveBeenCalledTimes(2)
})
```

### `.toHaveBeenCalledWith(arg1, arg2, ...)`

Also under the alias: `.toBeCalledWith()`

Use `.toHaveBeenCalledWith` to ensure that a mock function was called with specific arguments. The arguments are checked with the same algorithm that `.toEqual` uses.

For example, let's say that you can register a beverage with a `register` function, and `applyToAll(f)` should apply the function `f` to all registered beverages. To make sure this works, you could write:

```js
test('registration applies correctly to orange La Croix', () => {
  const beverage = new LaCroix('orange')
  register(beverage)
  const f = jest.fn()
  applyToAll(f)
  expect(f).toHaveBeenCalledWith(beverage)
})
```

### `.toHaveBeenLastCalledWith(arg1, arg2, ...)`

Also under the alias: `.lastCalledWith(arg1, arg2, ...)`

If you have a mock function, you can use `.toHaveBeenLastCalledWith` to test what arguments it was last called with. For example, let's say you have a `applyToAllFlavors(f)` function that applies `f` to a bunch of flavors, and you want to ensure that when you call it, the last flavor it operates on is `'mango'`. You can write:

```js
test('applying to all flavors does mango last', () => {
  const drink = jest.fn()
  applyToAllFlavors(drink)
  expect(drink).toHaveBeenLastCalledWith('mango')
})
```

### `.toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)`

Also under the alias: `.nthCalledWith(nthCall, arg1, arg2, ...)`

If you have a mock function, you can use `.toHaveBeenNthCalledWith` to test what arguments it was nth called with. For example, let's say you have a `drinkEach(drink, Array<flavor>)` function that applies `f` to a bunch of flavors, and you want to ensure that when you call it, the first flavor it operates on is `'lemon'` and the second one is `'octopus'`. You can write:

```js
test('drinkEach drinks each drink', () => {
  const drink = jest.fn()
  drinkEach(drink, ['lemon', 'octopus'])
  expect(drink).toHaveBeenNthCalledWith(1, 'lemon')
  expect(drink).toHaveBeenNthCalledWith(2, 'octopus')
})
```

Note: the nth argument must be positive integer starting from 1.

### `.toHaveReturned()`

Also under the alias: `.toReturn()`

If you have a mock function, you can use `.toHaveReturned` to test that the mock function successfully returned (i.e., did not throw an error) at least one time. For example, let's say you have a mock `drink` that returns `true`. You can write:

```js
test('drinks returns', () => {
  const drink = jest.fn(() => true)

  drink()

  expect(drink).toHaveReturned()
})
```

### `.toHaveReturnedTimes(number)`

Also under the alias: `.toReturnTimes(number)`

Use `.toHaveReturnedTimes` to ensure that a mock function returned successfully (i.e., did not throw an error) an exact number of times. Any calls to the mock function that throw an error are not counted toward the number of times the function returned.

For example, let's say you have a mock `drink` that returns `true`. You can write:

```js
test('drink returns twice', () => {
  const drink = jest.fn(() => true)

  drink()
  drink()

  expect(drink).toHaveReturnedTimes(2)
})
```

### `.toHaveReturnedWith(value)`

Also under the alias: `.toReturnWith(value)`

Use `.toHaveReturnedWith` to ensure that a mock function returned a specific value.

For example, let's say you have a mock `drink` that returns the name of the beverage that was consumed. You can write:

```js
test('drink returns La Croix', () => {
  const beverage = { name: 'La Croix' }
  const drink = jest.fn(beverage => beverage.name)

  drink(beverage)

  expect(drink).toHaveReturnedWith('La Croix')
})
```

### `.toHaveLastReturnedWith(value)`

Also under the alias: `.lastReturnedWith(value)`

Use `.toHaveLastReturnedWith` to test the specific value that a mock function last returned. If the last call to the mock function threw an error, then this matcher will fail no matter what value you provided as the expected return value.

For example, let's say you have a mock `drink` that returns the name of the beverage that was consumed. You can write:

```js
test('drink returns La Croix (Orange) last', () => {
  const beverage1 = { name: 'La Croix (Lemon)' }
  const beverage2 = { name: 'La Croix (Orange)' }
  const drink = jest.fn(beverage => beverage.name)

  drink(beverage1)
  drink(beverage2)

  expect(drink).toHaveLastReturnedWith('La Croix (Orange)')
})
```

### `.toHaveNthReturnedWith(nthCall, value)`

Also under the alias: `.nthReturnedWith(nthCall, value)`

Use `.toHaveNthReturnedWith` to test the specific value that a mock function returned for the nth call. If the nth call to the mock function threw an error, then this matcher will fail no matter what value you provided as the expected return value.

For example, let's say you have a mock `drink` that returns the name of the beverage that was consumed. You can write:

```js
test('drink returns expected nth calls', () => {
  const beverage1 = { name: 'La Croix (Lemon)' }
  const beverage2 = { name: 'La Croix (Orange)' }
  const drink = jest.fn(beverage => beverage.name)

  drink(beverage1)
  drink(beverage2)

  expect(drink).toHaveNthReturnedWith(1, 'La Croix (Lemon)')
  expect(drink).toHaveNthReturnedWith(2, 'La Croix (Orange)')
})
```

Note: the nth argument must be positive integer starting from 1.

### `.toHaveLength(number)`

Use `.toHaveLength` to check that an object has a `.length` property and it is set to a certain numeric value.

This is especially useful for checking arrays or strings size.

```js
expect([1, 2, 3]).toHaveLength(3)
expect('abc').toHaveLength(3)
expect('').not.toHaveLength(5)
```

### `.toHaveProperty(keyPath, value?)`

Use `.toHaveProperty` to check if property at provided reference `keyPath` exists for an object. For checking deeply nested properties in an object you may use [dot notation](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Property_accessors) or an array containing the keyPath for deep references.

You can provide an optional `value` argument to compare the received property value (recursively for all properties of object instances, also known as deep equality, like the `toEqual` matcher).

The following example contains a `houseForSale` object with nested properties. We are using `toHaveProperty` to check for the existence and values of various properties in the object.

```js
// Object containing house features to be tested
const houseForSale = {
  bath: true,
  bedrooms: 4,
  kitchen: {
    amenities: ['oven', 'stove', 'washer'],
    area: 20,
    wallColor: 'white',
    'nice.oven': true,
  },
  livingroom: {
    amenities: [
      {
        couch: [
          ['large', { dimensions: [20, 20] }],
          ['small', { dimensions: [10, 10] }],
        ],
      },
    ],
  },
  'ceiling.height': 2,
}

test('this house has my desired features', () => {
  // Example Referencing
  expect(houseForSale).toHaveProperty('bath')
  expect(houseForSale).toHaveProperty('bedrooms', 4)

  expect(houseForSale).not.toHaveProperty('pool')

  // Deep referencing using dot notation
  expect(houseForSale).toHaveProperty('kitchen.area', 20)
  expect(houseForSale).toHaveProperty('kitchen.amenities', [
    'oven',
    'stove',
    'washer',
  ])

  expect(houseForSale).not.toHaveProperty('kitchen.open')

  // Deep referencing using an array containing the keyPath
  expect(houseForSale).toHaveProperty(['kitchen', 'area'], 20)
  expect(houseForSale).toHaveProperty(
    ['kitchen', 'amenities'],
    ['oven', 'stove', 'washer']
  )
  expect(houseForSale).toHaveProperty(['kitchen', 'amenities', 0], 'oven')
  expect(houseForSale).toHaveProperty(
    'livingroom.amenities[0].couch[0][1].dimensions[0]',
    20
  )
  expect(houseForSale).toHaveProperty(['kitchen', 'nice.oven'])
  expect(houseForSale).not.toHaveProperty(['kitchen', 'open'])

  // Referencing keys with dot in the key itself
  expect(houseForSale).toHaveProperty(['ceiling.height'], 'tall')
})
```

### `.toBeCloseTo(number, numDigits?)`

Use `toBeCloseTo` to compare floating point numbers for approximate equality.

The optional `numDigits` argument limits the number of digits to check **after** the decimal point. For the default value `2`, the test criterion is `Math.abs(expected - received) < 0.005` (that is, `10 ** -2 / 2`).

Intuitive equality comparisons often fail, because arithmetic on decimal (base 10) values often have rounding errors in limited precision binary (base 2) representation. For example, this test fails:

```js
test('adding works sanely with decimals', () => {
  expect(0.2 + 0.1).toBe(0.3) // Fails!
})
```

It fails because in JavaScript, `0.2 + 0.1` is actually `0.30000000000000004`.

For example, this test passes with a precision of 5 digits:

```js
test('adding works sanely with decimals', () => {
  expect(0.2 + 0.1).toBeCloseTo(0.3, 5)
})
```

Because floating point errors are the problem that `toBeCloseTo` solves, it does not support big integer values.

### `.toBeDefined()`

Use `.toBeDefined` to check that a variable is not undefined. For example, if you want to check that a function `fetchNewFlavorIdea()` returns _something_, you can write:

```js
test('there is a new flavor idea', () => {
  expect(fetchNewFlavorIdea()).toBeDefined()
})
```

You could write `expect(fetchNewFlavorIdea()).not.toBe(undefined)`, but it's better practice to avoid referring to `undefined` directly in your code.

### `.toBeFalsy()`

Use `.toBeFalsy` when you don't care what a value is and you want to ensure a value is false in a boolean context. For example, let's say you have some application code that looks like:

```js
drinkSomeLaCroix()
if (!getErrors()) {
  drinkMoreLaCroix()
}
```

You may not care what `getErrors` returns, specifically - it might return `false`, `null`, or `0`, and your code would still work. So if you want to test there are no errors after drinking some La Croix, you could write:

```js
test('drinking La Croix does not lead to errors', () => {
  drinkSomeLaCroix()
  expect(getErrors()).toBeFalsy()
})
```

In JavaScript, there are six falsy values: `false`, `0`, `''`, `null`, `undefined`, and `NaN`. Everything else is truthy.

### `.toBeGreaterThan(number | bigint)`

Use `toBeGreaterThan` to compare `received > expected` for number or big integer values. For example, test that `ouncesPerCan()` returns a value of more than 10 ounces:

```js
test('ounces per can is more than 10', () => {
  expect(ouncesPerCan()).toBeGreaterThan(10)
})
```

### `.toBeGreaterThanOrEqual(number | bigint)`

Use `toBeGreaterThanOrEqual` to compare `received >= expected` for number or big integer values. For example, test that `ouncesPerCan()` returns a value of at least 12 ounces:

```js
test('ounces per can is at least 12', () => {
  expect(ouncesPerCan()).toBeGreaterThanOrEqual(12)
})
```

### `.toBeLessThan(number | bigint)`

Use `toBeLessThan` to compare `received < expected` for number or big integer values. For example, test that `ouncesPerCan()` returns a value of less than 20 ounces:

```js
test('ounces per can is less than 20', () => {
  expect(ouncesPerCan()).toBeLessThan(20)
})
```

### `.toBeLessThanOrEqual(number | bigint)`

Use `toBeLessThanOrEqual` to compare `received <= expected` for number or big integer values. For example, test that `ouncesPerCan()` returns a value of at most 12 ounces:

```js
test('ounces per can is at most 12', () => {
  expect(ouncesPerCan()).toBeLessThanOrEqual(12)
})
```

### `.toBeInstanceOf(Class)`

Use `.toBeInstanceOf(Class)` to check that an object is an instance of a class. This matcher uses `instanceof` underneath.

```js
class A {}

expect(new A()).toBeInstanceOf(A)
expect(() => {}).toBeInstanceOf(Function)
expect(new A()).toBeInstanceOf(Function) // throws
```

### `.toBeNull()`

`.toBeNull()` is the same as `.toBe(null)` but the error messages are a bit nicer. So use `.toBeNull()` when you want to check that something is null.

```js
function bloop() {
  return null
}

test('bloop returns null', () => {
  expect(bloop()).toBeNull()
})
```

### `.toBeTruthy()`

Use `.toBeTruthy` when you don't care what a value is and you want to ensure a value is true in a boolean context. For example, let's say you have some application code that looks like:

```js
drinkSomeLaCroix()
if (thirstInfo()) {
  drinkMoreLaCroix()
}
```

You may not care what `thirstInfo` returns, specifically - it might return `true` or a complex object, and your code would still work. So if you want to test that `thirstInfo` will be truthy after drinking some La Croix, you could write:

```js
test('drinking La Croix leads to having thirst info', () => {
  drinkSomeLaCroix()
  expect(thirstInfo()).toBeTruthy()
})
```

In JavaScript, there are six falsy values: `false`, `0`, `''`, `null`, `undefined`, and `NaN`. Everything else is truthy.

### `.toBeUndefined()`

Use `.toBeUndefined` to check that a variable is undefined. For example, if you want to check that a function `bestDrinkForFlavor(flavor)` returns `undefined` for the `'octopus'` flavor, because there is no good octopus-flavored drink:

```js
test('the best drink for octopus flavor is undefined', () => {
  expect(bestDrinkForFlavor('octopus')).toBeUndefined()
})
```

You could write `expect(bestDrinkForFlavor('octopus')).toBe(undefined)`, but it's better practice to avoid referring to `undefined` directly in your code.

### `.toBeNaN()`

Use `.toBeNaN` when checking a value is `NaN`.

```js
test('passes when value is NaN', () => {
  expect(NaN).toBeNaN()
  expect(1).not.toBeNaN()
})
```

### `.toContain(item)`

Use `.toContain` when you want to check that an item is in an array. For testing the items in the array, this uses `===`, a strict equality check. `.toContain` can also check whether a string is a substring of another string.

For example, if `getAllFlavors()` returns an array of flavors and you want to be sure that `lime` is in there, you can write:

```js
test('the flavor list contains lime', () => {
  expect(getAllFlavors()).toContain('lime')
})
```

This matcher also accepts others iterables such as strings, sets, node lists and HTML collections.

### `.toContainEqual(item)`

Use `.toContainEqual` when you want to check that an item with a specific structure and values is contained in an array. For testing the items in the array, this matcher recursively checks the equality of all fields, rather than checking for object identity.

```js
describe('my beverage', () => {
  test('is delicious and not sour', () => {
    const myBeverage = { delicious: true, sour: false }
    expect(myBeverages()).toContainEqual(myBeverage)
  })
})
```

### `.toEqual(value)`

Use `.toEqual` to compare recursively all properties of object instances (also known as "deep" equality). It calls `Object.is` to compare primitive values, which is even better for testing than `===` strict equality operator.

For example, `.toEqual` and `.toBe` behave differently in this test suite, so all the tests pass:

```js
const can1 = {
  flavor: 'grapefruit',
  ounces: 12,
}
const can2 = {
  flavor: 'grapefruit',
  ounces: 12,
}

describe('the La Croix cans on my desk', () => {
  test('have all the same properties', () => {
    expect(can1).toEqual(can2)
  })
  test('are not the exact same can', () => {
    expect(can1).not.toBe(can2)
  })
})
```

> Note: `.toEqual` won't perform a _deep equality_ check for two errors. Only the `message` property of an Error is considered for equality. It is recommended to use the `.toThrow` matcher for testing against errors.

If differences between properties do not help you to understand why a test fails, especially if the report is large, then you might move the comparison into the `expect` function. For example, use `equals` method of `Buffer` class to assert whether or not buffers contain the same content:

- rewrite `expect(received).toEqual(expected)` as `expect(received.equals(expected)).toBe(true)`
- rewrite `expect(received).not.toEqual(expected)` as `expect(received.equals(expected)).toBe(false)`

### `.toMatch(regexp | string)`

Use `.toMatch` to check that a string matches a regular expression.

For example, you might not know what exactly `essayOnTheBestFlavor()` returns, but you know it's a really long string, and the substring `grapefruit` should be in there somewhere. You can test this with:

```js
describe('an essay on the best flavor', () => {
  test('mentions grapefruit', () => {
    expect(essayOnTheBestFlavor()).toMatch(/grapefruit/)
    expect(essayOnTheBestFlavor()).toMatch(new RegExp('grapefruit'))
  })
})
```

This matcher also accepts a string, which it will try to match:

```js
describe('grapefruits are healthy', () => {
  test('grapefruits are a fruit', () => {
    expect('grapefruits').toMatch('fruit')
  })
})
```

### `.toMatchObject(object)`

Use `.toMatchObject` to check that a JavaScript object matches a subset of the properties of an object. It will match received objects with properties that are **not** in the expected object.

You can also pass an array of objects, in which case the method will return true only if each object in the received array matches (in the `toMatchObject` sense described above) the corresponding object in the expected array. This is useful if you want to check that two arrays match in their number of elements, as opposed to `arrayContaining`, which allows for extra elements in the received array.

You can match properties against values or against matchers.

```js
const houseForSale = {
  bath: true,
  bedrooms: 4,
  kitchen: {
    amenities: ['oven', 'stove', 'washer'],
    area: 20,
    wallColor: 'white',
  },
}
const desiredHouse = {
  bath: true,
  kitchen: {
    amenities: ['oven', 'stove', 'washer'],
    wallColor: expect.stringMatching(/white|yellow/),
  },
}

test('the house has my desired features', () => {
  expect(houseForSale).toMatchObject(desiredHouse)
})
```

```js
describe('toMatchObject applied to arrays', () => {
  test('the number of elements must match exactly', () => {
    expect([{ foo: 'bar' }, { baz: 1 }]).toMatchObject([
      { foo: 'bar' },
      { baz: 1 },
    ])
  })

  test('.toMatchObject is called for each elements, so extra object properties are okay', () => {
    expect([{ foo: 'bar' }, { baz: 1, extra: 'quux' }]).toMatchObject([
      { foo: 'bar' },
      { baz: 1 },
    ])
  })
})
```

### `.toMatchSnapshot(propertyMatchers?, hint?)`

This ensures that a value matches the most recent snapshot. Check out [the Snapshot Testing guide](SnapshotTesting.md) for more information.

You can provide an optional `propertyMatchers` object argument, which has asymmetric matchers as values of a subset of expected properties, **if** the received value will be an **object** instance. It is like `toMatchObject` with flexible criteria for a subset of properties, followed by a snapshot test as exact criteria for the rest of the properties.

You can provide an optional `hint` string argument that is appended to the test name. Although Jest always appends a number at the end of a snapshot name, short descriptive hints might be more useful than numbers to differentiate **multiple** snapshots in a **single** `it` or `test` block. Jest sorts snapshots by name in the corresponding `.snap` file.

### `.toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)`

Ensures that a value matches the most recent snapshot.

You can provide an optional `propertyMatchers` object argument, which has asymmetric matchers as values of a subset of expected properties, **if** the received value will be an **object** instance. It is like `toMatchObject` with flexible criteria for a subset of properties, followed by a snapshot test as exact criteria for the rest of the properties.

Jest adds the `inlineSnapshot` string argument to the matcher in the test file (instead of an external `.snap` file) the first time that the test runs.

Check out the section on [Inline Snapshots](SnapshotTesting.md#inline-snapshots) for more info.

### `.toStrictEqual(value)`

Use `.toStrictEqual` to test that objects have the same types as well as structure.

Differences from `.toEqual`:

- Keys with `undefined` properties are checked. e.g. `{a: undefined, b: 2}` does not match `{b: 2}` when using `.toStrictEqual`.
- Array sparseness is checked. e.g. `[, 1]` does not match `[undefined, 1]` when using `.toStrictEqual`.
- Object types are checked to be equal. e.g. A class instance with fields `a` and `b` will not equal a literal object with fields `a` and `b`.

```js
class LaCroix {
  constructor(flavor) {
    this.flavor = flavor
  }
}

describe('the La Croix cans on my desk', () => {
  test('are not semantically the same', () => {
    expect(new LaCroix('lemon')).toEqual({ flavor: 'lemon' })
    expect(new LaCroix('lemon')).not.toStrictEqual({ flavor: 'lemon' })
  })
})
```

### `.toThrow(error?)`

Also under the alias: `.toThrowError(error?)`

Use `.toThrow` to test that a function throws when it is called. For example, if we want to test that `drinkFlavor('octopus')` throws, because octopus flavor is too disgusting to drink, we could write:

```js
test('throws on octopus', () => {
  expect(() => {
    drinkFlavor('octopus')
  }).toThrow()
})
```

> Note: You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail.

You can provide an optional argument to test that a specific error is thrown:

- regular expression: error message **matches** the pattern
- string: error message **includes** the substring
- error object: error message is **equal to** the message property of the object
- error class: error object is **instance of** class

For example, let's say that `drinkFlavor` is coded like this:

```js
function drinkFlavor(flavor) {
  if (flavor == 'octopus') {
    throw new DisgustingFlavorError('yuck, octopus flavor')
  }
  // Do some other stuff
}
```

We could test this error gets thrown in several ways:

```js
test('throws on octopus', () => {
  function drinkOctopus() {
    drinkFlavor('octopus')
  }

  // Test that the error message says "yuck" somewhere: these are equivalent
  expect(drinkOctopus).toThrowError(/yuck/)
  expect(drinkOctopus).toThrowError('yuck')

  // Test the exact error message
  expect(drinkOctopus).toThrowError(/^yuck, octopus flavor$/)
  expect(drinkOctopus).toThrowError(new Error('yuck, octopus flavor'))

  // Test that we get a DisgustingFlavorError
  expect(drinkOctopus).toThrowError(DisgustingFlavorError)
})
```

### `.toThrowErrorMatchingSnapshot(hint?)`

Use `.toThrowErrorMatchingSnapshot` to test that a function throws an error matching the most recent snapshot when it is called.

You can provide an optional `hint` string argument that is appended to the test name. Although Jest always appends a number at the end of a snapshot name, short descriptive hints might be more useful than numbers to differentiate **multiple** snapshots in a **single** `it` or `test` block. Jest sorts snapshots by name in the corresponding `.snap` file.

For example, let's say you have a `drinkFlavor` function that throws whenever the flavor is `'octopus'`, and is coded like this:

```js
function drinkFlavor(flavor) {
  if (flavor == 'octopus') {
    throw new DisgustingFlavorError('yuck, octopus flavor')
  }
  // Do some other stuff
}
```

The test for this function will look this way:

```js
test('throws on octopus', () => {
  function drinkOctopus() {
    drinkFlavor('octopus')
  }

  expect(drinkOctopus).toThrowErrorMatchingSnapshot()
})
```

And it will generate the following snapshot:

```js
exports[`drinking flavors throws on octopus 1`] = `"yuck, octopus flavor"`
```

Check out [React Tree Snapshot Testing](/blog/2016/07/27/jest-14) for more information on snapshot testing.

### `.toThrowErrorMatchingInlineSnapshot(inlineSnapshot)`

Use `.toThrowErrorMatchingInlineSnapshot` to test that a function throws an error matching the most recent snapshot when it is called.

Jest adds the `inlineSnapshot` string argument to the matcher in the test file (instead of an external `.snap` file) the first time that the test runs.

Check out the section on [Inline Snapshots](SnapshotTesting.md#inline-snapshots) for more info.

# Jest-dom

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev @testing-library/jest-dom
```

or

for installation with [yarn](https://yarnpkg.com/) package manager.

```
yarn add --dev @testing-library/jest-dom
```

> Note: We also recommend installing the jest-dom eslint plugin which provides
> auto-fixable lint rules that prevent false positive tests and improve test
> readability by ensuring you are using the right matchers in your tests. More
> details can be found at
> [eslint-plugin-jest-dom](https://github.com/testing-library/eslint-plugin-jest-dom).

## Usage

Import `@testing-library/jest-dom` once (for instance in your [tests setup
file][]) and you're good to go:

[tests setup file]: https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array

```javascript
// In your own jest-setup.js (or any other name)
import '@testing-library/jest-dom'

// In jest.config.js add (if you haven't already)
setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
```

### With TypeScript

If you're using TypeScript, make sure your setup file is a `.ts` and not a `.js`
to include the necessary types.

You will also need to include your setup file in your `tsconfig.json` if you
haven't already:

```json
  // In tsconfig.json
  "include": [
    ...
    "./jest-setup.ts"
  ],
```

## Custom matchers

`@testing-library/jest-dom` can work with any library or framework that returns
DOM elements from queries. The custom matcher examples below are written using
matchers from `@testing-library`'s suite of libraries (e.g. `getByTestId`,
`queryByTestId`, `getByText`, etc.)

### `toBeDisabled`

```typescript
toBeDisabled()
```

This allows you to check whether an element is disabled from the user's
perspective. According to the specification, the following elements can be
[disabled](https://html.spec.whatwg.org/multipage/semantics-other.html#disabled-elements):
`button`, `input`, `select`, `textarea`, `optgroup`, `option`, `fieldset`, and
custom elements.

This custom matcher considers an element as disabled if the element is among the
types of elements that can be disabled (listed above), and the `disabled`
attribute is present. It will also consider the element as disabled if it's
inside a parent form element that supports being disabled and has the `disabled`
attribute present.

#### Examples

```html
<button data-testid="button" type="submit" disabled>submit</button>
<fieldset disabled><input type="text" data-testid="input" /></fieldset>
<a href="..." disabled>link</a>
```

```javascript
expect(getByTestId('button')).toBeDisabled()
expect(getByTestId('input')).toBeDisabled()
expect(getByText('link')).not.toBeDisabled()
```

> This custom matcher does not take into account the presence or absence of the
> `aria-disabled` attribute. For more on why this is the case, check
> [#144](https://github.com/testing-library/jest-dom/issues/144).

---

### `toBeEnabled`

```typescript
toBeEnabled()
```

This allows you to check whether an element is not disabled from the user's
perspective.

It works like `not.toBeDisabled()`. Use this matcher to avoid double negation in
your tests.

> This custom matcher does not take into account the presence or absence of the
> `aria-disabled` attribute. For more on why this is the case, check
> [#144](https://github.com/testing-library/jest-dom/issues/144).

---

### `toBeEmptyDOMElement`

```typescript
toBeEmptyDOMElement()
```

This allows you to assert whether an element has no visible content for the
user. It ignores comments but will fail if the element contains white-space.

#### Examples

```html
<span data-testid="not-empty"><span data-testid="empty"></span></span>
<span data-testid="with-whitespace"> </span>
<span data-testid="with-comment"><!-- comment --></span>
```

```javascript
expect(getByTestId('empty')).toBeEmptyDOMElement()
expect(getByTestId('not-empty')).not.toBeEmptyDOMElement()
expect(getByTestId('with-whitespace')).not.toBeEmptyDOMElement()
```

---

### `toBeInTheDocument`

```typescript
toBeInTheDocument()
```

This allows you to assert whether an element is present in the document or not.

#### Examples

```html
<span data-testid="html-element"><span>Html Element</span></span>
<svg data-testid="svg-element"></svg>
```

```javascript
expect(
  getByTestId(document.documentElement, 'html-element')
).toBeInTheDocument()
expect(getByTestId(document.documentElement, 'svg-element')).toBeInTheDocument()
expect(
  queryByTestId(document.documentElement, 'does-not-exist')
).not.toBeInTheDocument()
```

> Note: This matcher does not find detached elements. The element must be added
> to the document to be found by toBeInTheDocument. If you desire to search in a
> detached element please use: [`toContainElement`](#tocontainelement)

---

### `toBeInvalid`

```typescript
toBeInvalid()
```

This allows you to check if an element, is currently invalid.

An element is invalid if it has an
[`aria-invalid` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute)
with no value or a value of `"true"`, or if the result of
[`checkValidity()`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)
is `false`.

#### Examples

```html
<input data-testid="no-aria-invalid" />
<input data-testid="aria-invalid" aria-invalid />
<input data-testid="aria-invalid-value" aria-invalid="true" />
<input data-testid="aria-invalid-false" aria-invalid="false" />

<form data-testid="valid-form">
  <input />
</form>

<form data-testid="invalid-form">
  <input required />
</form>
```

```javascript
expect(getByTestId('no-aria-invalid')).not.toBeInvalid()
expect(getByTestId('aria-invalid')).toBeInvalid()
expect(getByTestId('aria-invalid-value')).toBeInvalid()
expect(getByTestId('aria-invalid-false')).not.toBeInvalid()

expect(getByTestId('valid-form')).not.toBeInvalid()
expect(getByTestId('invalid-form')).toBeInvalid()
```

---

### `toBeRequired`

```typescript
toBeRequired()
```

This allows you to check if a form element is currently required.

An element is required if it is having a `required` or `aria-required="true"`
attribute.

#### Examples

```html
<input data-testid="required-input" required />
<input data-testid="aria-required-input" aria-required="true" />
<input data-testid="conflicted-input" required aria-required="false" />
<input data-testid="aria-not-required-input" aria-required="false" />
<input data-testid="optional-input" />
<input data-testid="unsupported-type" type="image" required />
<select data-testid="select" required></select>
<textarea data-testid="textarea" required></textarea>
<div data-testid="supported-role" role="tree" required></div>
<div data-testid="supported-role-aria" role="tree" aria-required="true"></div>
```

```javascript
expect(getByTestId('required-input')).toBeRequired()
expect(getByTestId('aria-required-input')).toBeRequired()
expect(getByTestId('conflicted-input')).toBeRequired()
expect(getByTestId('aria-not-required-input')).not.toBeRequired()
expect(getByTestId('optional-input')).not.toBeRequired()
expect(getByTestId('unsupported-type')).not.toBeRequired()
expect(getByTestId('select')).toBeRequired()
expect(getByTestId('textarea')).toBeRequired()
expect(getByTestId('supported-role')).not.toBeRequired()
expect(getByTestId('supported-role-aria')).toBeRequired()
```

---

### `toBeValid`

```typescript
toBeValid()
```

This allows you to check if the value of an element, is currently valid.

An element is valid if it has no
[`aria-invalid` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute)s
or an attribute value of `"false"`. The result of
[`checkValidity()`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)
must also be `true` if it's a form element.

#### Examples

```html
<input data-testid="no-aria-invalid" />
<input data-testid="aria-invalid" aria-invalid />
<input data-testid="aria-invalid-value" aria-invalid="true" />
<input data-testid="aria-invalid-false" aria-invalid="false" />

<form data-testid="valid-form">
  <input />
</form>

<form data-testid="invalid-form">
  <input required />
</form>
```

```javascript
expect(getByTestId('no-aria-invalid')).toBeValid()
expect(getByTestId('aria-invalid')).not.toBeValid()
expect(getByTestId('aria-invalid-value')).not.toBeValid()
expect(getByTestId('aria-invalid-false')).toBeValid()

expect(getByTestId('valid-form')).toBeValid()
expect(getByTestId('invalid-form')).not.toBeValid()
```

---

### `toBeVisible`

```typescript
toBeVisible()
```

This allows you to check if an element is currently visible to the user.

An element is visible if **all** the following conditions are met:

- it is present in the document
- it does not have its css property `display` set to `none`
- it does not have its css property `visibility` set to either `hidden` or
  `collapse`
- it does not have its css property `opacity` set to `0`
- its parent element is also visible (and so on up to the top of the DOM tree)
- it does not have the
  [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden)
  attribute
- if `<details />` it has the `open` attribute

#### Examples

```html
<div data-testid="zero-opacity" style="opacity: 0">Zero Opacity Example</div>
<div data-testid="visibility-hidden" style="visibility: hidden">
  Visibility Hidden Example
</div>
<div data-testid="display-none" style="display: none">Display None Example</div>
<div style="opacity: 0">
  <span data-testid="hidden-parent">Hidden Parent Example</span>
</div>
<div data-testid="visible">Visible Example</div>
<div data-testid="hidden-attribute" hidden>Hidden Attribute Example</div>
<details>
  <summary>Title of hidden text</summary>
  Hidden Details Example
</details>
<details open>
  <summary>Title of visible text</summary>
  <div>Visible Details Example</div>
</details>
```

```javascript
expect(getByText('Zero Opacity Example')).not.toBeVisible()
expect(getByText('Visibility Hidden Example')).not.toBeVisible()
expect(getByText('Display None Example')).not.toBeVisible()
expect(getByText('Hidden Parent Example')).not.toBeVisible()
expect(getByText('Visible Example')).toBeVisible()
expect(getByText('Hidden Attribute Example')).not.toBeVisible()
expect(getByText('Hidden Details Example')).not.toBeVisible()
expect(getByText('Visible Details Example')).toBeVisible()
```

---

### `toContainElement`

```typescript
toContainElement(element: HTMLElement | SVGElement | null)
```

This allows you to assert whether an element contains another element as a
descendant or not.

#### Examples

```html
<span data-testid="ancestor"><span data-testid="descendant"></span></span>
```

```javascript
const ancestor = getByTestId('ancestor')
const descendant = getByTestId('descendant')
const nonExistantElement = getByTestId('does-not-exist')

expect(ancestor).toContainElement(descendant)
expect(descendant).not.toContainElement(ancestor)
expect(ancestor).not.toContainElement(nonExistantElement)
```

---

### `toContainHTML`

```typescript
toContainHTML(htmlText: string)
```

Assert whether a string representing a HTML element is contained in another
element. The string should contain valid html, and not any incomplete html.

#### Examples

```html
<span data-testid="parent"><span data-testid="child"></span></span>
```

```javascript
// These are valid uses
expect(getByTestId('parent')).toContainHTML('<span data-testid="child"></span>')
expect(getByTestId('parent')).toContainHTML('<span data-testid="child" />')
expect(getByTestId('parent')).not.toContainHTML('<br />')

// These won't work
expect(getByTestId('parent')).toContainHTML('data-testid="child"')
expect(getByTestId('parent')).toContainHTML('data-testid')
expect(getByTestId('parent')).toContainHTML('</span>')
```

> Chances are you probably do not need to use this matcher. We encourage testing
> from the perspective of how the user perceives the app in a browser. That's
> why testing against a specific DOM structure is not advised.
>
> It could be useful in situations where the code being tested renders html that
> was obtained from an external source, and you want to validate that that html
> code was used as intended.
>
> It should not be used to check DOM structure that you control. Please use
> [`toContainElement`](#tocontainelement) instead.

---

### `toHaveAccessibleDescription`

```typescript
toHaveAccessibleDescription(expectedAccessibleDescription?: string | RegExp)
```

This allows you to assert that an element has the expected
[accessible description](https://w3c.github.io/accname/).

You can pass the exact string of the expected accessible description, or you can
make a partial match passing a regular expression, or by using
[expect.stringContaining](https://jestjs.io/docs/en/expect.html#expectnotstringcontainingstring)/[expect.stringMatching](https://jestjs.io/docs/en/expect.html#expectstringmatchingstring-regexp).

#### Examples

```html
<a
  data-testid="link"
  href="/"
  aria-label="Home page"
  title="A link to start over"
  >Start</a
>
<a data-testid="extra-link" href="/about" aria-label="About page">About</a>
<img src="avatar.jpg" data-testid="avatar" alt="User profile pic" />
<img
  src="logo.jpg"
  data-testid="logo"
  alt="Company logo"
  aria-describedby="t1"
/>
<span id="t1" role="presentation">The logo of Our Company</span>
```

```js
expect(getByTestId('link')).toHaveAccessibleDescription()
expect(getByTestId('link')).toHaveAccessibleDescription('A link to start over')
expect(getByTestId('link')).not.toHaveAccessibleDescription('Home page')
expect(getByTestId('extra-link')).not.toHaveAccessibleDescription()
expect(getByTestId('avatar')).not.toHaveAccessibleDescription()
expect(getByTestId('logo')).not.toHaveAccessibleDescription('Company logo')
expect(getByTestId('logo')).toHaveAccessibleDescription(
  'The logo of Our Company'
)
```

---

### `toHaveAccessibleName`

```typescript
toHaveAccessibleName(expectedAccessibleName?: string | RegExp)
```

This allows you to assert that an element has the expected
[accessible name](https://w3c.github.io/accname/). It is useful, for instance,
to assert that form elements and buttons are properly labelled.

You can pass the exact string of the expected accessible name, or you can make a
partial match passing a regular expression, or by using
[expect.stringContaining](https://jestjs.io/docs/en/expect.html#expectnotstringcontainingstring)/[expect.stringMatching](https://jestjs.io/docs/en/expect.html#expectstringmatchingstring-regexp).

#### Examples

```html
<img data-testid="img-alt" src="" alt="Test alt" />
<img data-testid="img-empty-alt" src="" alt="" />
<svg data-testid="svg-title"><title>Test title</title></svg>
<button data-testid="button-img-alt"><img src="" alt="Test" /></button>
<p><img data-testid="img-paragraph" src="" alt="" /> Test content</p>
<button data-testid="svg-button"><svg><title>Test</title></svg></p>
<div><svg data-testid="svg-without-title"></svg></div>
<input data-testid="input-title" title="test" />
```

```javascript
expect(getByTestId('img-alt')).toHaveAccessibleName('Test alt')
expect(getByTestId('img-empty-alt')).not.toHaveAccessibleName()
expect(getByTestId('svg-title')).toHaveAccessibleName('Test title')
expect(getByTestId('button-img-alt')).toHaveAccessibleName()
expect(getByTestId('img-paragraph')).not.toHaveAccessibleName()
expect(getByTestId('svg-button')).toHaveAccessibleName()
expect(getByTestId('svg-without-title')).not.toHaveAccessibleName()
expect(getByTestId('input-title')).toHaveAccessibleName()
```

---

### `toHaveAttribute`

```typescript
toHaveAttribute(attr: string, value?: any)
```

This allows you to check whether the given element has an attribute or not. You
can also optionally check that the attribute has a specific expected value or
partial match using
[expect.stringContaining](https://jestjs.io/docs/en/expect.html#expectnotstringcontainingstring)/[expect.stringMatching](https://jestjs.io/docs/en/expect.html#expectstringmatchingstring-regexp)

#### Examples

```html
<button data-testid="ok-button" type="submit" disabled>ok</button>
```

```javascript
const button = getByTestId('ok-button')

expect(button).toHaveAttribute('disabled')
expect(button).toHaveAttribute('type', 'submit')
expect(button).not.toHaveAttribute('type', 'button')

expect(button).toHaveAttribute('type', expect.stringContaining('sub'))
expect(button).toHaveAttribute('type', expect.not.stringContaining('but'))
```

---

### `toHaveClass`

```typescript
toHaveClass(...classNames: string[], options?: {exact: boolean})
```

This allows you to check whether the given element has certain classes within
its `class` attribute.

You must provide at least one class, unless you are asserting that an element
does not have any classes.

#### Examples

```html
<button data-testid="delete-button" class="btn extra btn-danger">
  Delete item
</button>
<button data-testid="no-classes">No Classes</button>
```

```javascript
const deleteButton = getByTestId('delete-button')
const noClasses = getByTestId('no-classes')

expect(deleteButton).toHaveClass('extra')
expect(deleteButton).toHaveClass('btn-danger btn')
expect(deleteButton).toHaveClass('btn-danger', 'btn')
expect(deleteButton).not.toHaveClass('btn-link')

expect(deleteButton).toHaveClass('btn-danger extra btn', { exact: true }) // to check if the element has EXACTLY a set of classes
expect(deleteButton).not.toHaveClass('btn-danger extra', { exact: true }) // if it has more than expected it is going to fail

expect(noClasses).not.toHaveClass()
```

---

### `toHaveFocus`

```typescript
toHaveFocus()
```

This allows you to assert whether an element has focus or not.

#### Examples

```html
<div><input type="text" data-testid="element-to-focus" /></div>
```

```javascript
const input = getByTestId('element-to-focus')

input.focus()
expect(input).toHaveFocus()

input.blur()
expect(input).not.toHaveFocus()
```

---

### `toHaveFormValues`

```typescript
toHaveFormValues(expectedValues: {
  [name: string]: any
})
```

This allows you to check if a form or fieldset contains form controls for each
given name, and having the specified value.

> It is important to stress that this matcher can only be invoked on a [form][]
> or a [fieldset][] element.
>
> This allows it to take advantage of the [.elements][] property in `form` and
> `fieldset` to reliably fetch all form controls within them.
>
> This also avoids the possibility that users provide a container that contains
> more than one `form`, thereby intermixing form controls that are not related,
> and could even conflict with one another.

This matcher abstracts away the particularities with which a form control value
is obtained depending on the type of form control. For instance, `<input>`
elements have a `value` attribute, but `<select>` elements do not. Here's a list
of all cases covered:

- `<input type="number">` elements return the value as a **number**, instead of
  a string.
- `<input type="checkbox">` elements:
  - if there's a single one with the given `name` attribute, it is treated as a
    **boolean**, returning `true` if the checkbox is checked, `false` if
    unchecked.
  - if there's more than one checkbox with the same `name` attribute, they are
    all treated collectively as a single form control, which returns the value
    as an **array** containing all the values of the selected checkboxes in the
    collection.
- `<input type="radio">` elements are all grouped by the `name` attribute, and
  such a group treated as a single form control. This form control returns the
  value as a **string** corresponding to the `value` attribute of the selected
  radio button within the group.
- `<input type="text">` elements return the value as a **string**. This also
  applies to `<input>` elements having any other possible `type` attribute
  that's not explicitly covered in different rules above (e.g. `search`,
  `email`, `date`, `password`, `hidden`, etc.)
- `<select>` elements without the `multiple` attribute return the value as a
  **string** corresponding to the `value` attribute of the selected `option`, or
  `undefined` if there's no selected option.
- `<select multiple>` elements return the value as an **array** containing all
  the values of the [selected options][].
- `<textarea>` elements return their value as a **string**. The value
  corresponds to their node content.

The above rules make it easy, for instance, to switch from using a single select
control to using a group of radio buttons. Or to switch from a multi select
control, to using a group of checkboxes. The resulting set of form values used
by this matcher to compare against would be the same.

[selected options]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedOptions
[form]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement
[fieldset]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFieldSetElement
[.elements]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements

#### Examples

```html
<form data-testid="login-form">
  <input type="text" name="username" value="jane.doe" />
  <input type="password" name="password" value="12345678" />
  <input type="checkbox" name="rememberMe" checked />
  <button type="submit">Sign in</button>
</form>
```

```javascript
expect(getByTestId('login-form')).toHaveFormValues({
  username: 'jane.doe',
  rememberMe: true,
})
```

### `toHaveStyle`

```typescript
toHaveStyle(css: string | object)
```

This allows you to check if a certain element has some specific css properties
with specific values applied. It matches only if the element has _all_ the
expected properties applied, not just some of them.

#### Examples

```html
<button
  data-testid="delete-button"
  style="display: none; background-color: red"
>
  Delete item
</button>
```

```javascript
const button = getByTestId('delete-button')

expect(button).toHaveStyle('display: none')
expect(button).toHaveStyle({ display: 'none' })
expect(button).toHaveStyle(`
  background-color: red;
  display: none;
`)
expect(button).toHaveStyle({
  backgroundColor: 'red',
  display: 'none',
})
expect(button).not.toHaveStyle(`
  background-color: blue;
  display: none;
`)
expect(button).not.toHaveStyle({
  backgroundColor: 'blue',
  display: 'none',
})
```

This also works with rules that are applied to the element via a class name for
which some rules are defined in a stylesheet currently active in the document.
The usual rules of css precedence apply.

---

### `toHaveTextContent`

```typescript
toHaveTextContent(text: string | RegExp, options?: {normalizeWhitespace: boolean})
```

This allows you to check whether the given node has a text content or not. This
supports elements, but also text nodes and fragments.

When a `string` argument is passed through, it will perform a partial
case-sensitive match to the node content.

To perform a case-insensitive match, you can use a `RegExp` with the `/i`
modifier.

If you want to match the whole content, you can use a `RegExp` to do it.

#### Examples

```html
<span data-testid="text-content">Text Content</span>
```

```javascript
const element = getByTestId('text-content')

expect(element).toHaveTextContent('Content')
expect(element).toHaveTextContent(/^Text Content$/) // to match the whole content
expect(element).toHaveTextContent(/content$/i) // to use case-insensitive match
expect(element).not.toHaveTextContent('content')
```

---

### `toHaveValue`

```typescript
toHaveValue(value: string | string[] | number)
```

This allows you to check whether the given form element has the specified value.
It accepts `<input>`, `<select>` and `<textarea>` elements with the exception of
`<input type="checkbox">` and `<input type="radio">`, which can be meaningfully
matched only using [`toBeChecked`](#tobechecked) or
[`toHaveFormValues`](#tohaveformvalues).

For all other form elements, the value is matched using the same algorithm as in
[`toHaveFormValues`](#tohaveformvalues) does.

#### Examples

```html
<input type="text" value="text" data-testid="input-text" />
<input type="number" value="5" data-testid="input-number" />
<input type="text" data-testid="input-empty" />
<select multiple data-testid="select-number">
  <option value="first">First Value</option>
  <option value="second" selected>Second Value</option>
  <option value="third" selected>Third Value</option>
</select>
```

##### Using DOM Testing Library

```javascript
const textInput = getByTestId('input-text')
const numberInput = getByTestId('input-number')
const emptyInput = getByTestId('input-empty')
const selectInput = getByTestId('select-number')

expect(textInput).toHaveValue('text')
expect(numberInput).toHaveValue(5)
expect(emptyInput).not.toHaveValue()
expect(selectInput).toHaveValue(['second', 'third'])
```

---

### `toHaveDisplayValue`

```typescript
toHaveDisplayValue(value: string | RegExp | (string|RegExp)[])
```

This allows you to check whether the given form element has the specified
displayed value (the one the end user will see). It accepts `<input>`,
`<select>` and `<textarea>` elements with the exception of
`<input type="checkbox">` and `<input type="radio">`, which can be meaningfully
matched only using [`toBeChecked`](#tobechecked) or
[`toHaveFormValues`](#tohaveformvalues).

#### Examples

```html
<label for="input-example">First name</label>
<input type="text" id="input-example" value="Luca" />

<label for="textarea-example">Description</label>
<textarea id="textarea-example">An example description here.</textarea>

<label for="single-select-example">Fruit</label>
<select id="single-select-example">
  <option value="">Select a fruit...</option>
  <option value="banana">Banana</option>
  <option value="ananas">Ananas</option>
  <option value="avocado">Avocado</option>
</select>

<label for="multiple-select-example">Fruits</label>
<select id="multiple-select-example" multiple>
  <option value="">Select a fruit...</option>
  <option value="banana" selected>Banana</option>
  <option value="ananas">Ananas</option>
  <option value="avocado" selected>Avocado</option>
</select>
```

##### Using DOM Testing Library

```javascript
const input = screen.getByLabelText('First name')
const textarea = screen.getByLabelText('Description')
const selectSingle = screen.getByLabelText('Fruit')
const selectMultiple = screen.getByLabelText('Fruits')

expect(input).toHaveDisplayValue('Luca')
expect(input).toHaveDisplayValue(/Luc/)
expect(textarea).toHaveDisplayValue('An example description here.')
expect(textarea).toHaveDisplayValue(/example/)
expect(selectSingle).toHaveDisplayValue('Select a fruit...')
expect(selectSingle).toHaveDisplayValue(/Select/)
expect(selectMultiple).toHaveDisplayValue([/Avocado/, 'Banana'])
```

---

### `toBeChecked`

```typescript
toBeChecked()
```

This allows you to check whether the given element is checked. It accepts an
`input` of type `checkbox` or `radio` and elements with a `role` of `checkbox`,
`radio` or `switch` with a valid `aria-checked` attribute of `"true"` or
`"false"`.

#### Examples

```html
<input type="checkbox" checked data-testid="input-checkbox-checked" />
<input type="checkbox" data-testid="input-checkbox-unchecked" />
<div role="checkbox" aria-checked="true" data-testid="aria-checkbox-checked" />
<div
  role="checkbox"
  aria-checked="false"
  data-testid="aria-checkbox-unchecked"
/>

<input type="radio" checked value="foo" data-testid="input-radio-checked" />
<input type="radio" value="foo" data-testid="input-radio-unchecked" />
<div role="radio" aria-checked="true" data-testid="aria-radio-checked" />
<div role="radio" aria-checked="false" data-testid="aria-radio-unchecked" />
<div role="switch" aria-checked="true" data-testid="aria-switch-checked" />
<div role="switch" aria-checked="false" data-testid="aria-switch-unchecked" />
```

```javascript
const inputCheckboxChecked = getByTestId('input-checkbox-checked')
const inputCheckboxUnchecked = getByTestId('input-checkbox-unchecked')
const ariaCheckboxChecked = getByTestId('aria-checkbox-checked')
const ariaCheckboxUnchecked = getByTestId('aria-checkbox-unchecked')
expect(inputCheckboxChecked).toBeChecked()
expect(inputCheckboxUnchecked).not.toBeChecked()
expect(ariaCheckboxChecked).toBeChecked()
expect(ariaCheckboxUnchecked).not.toBeChecked()

const inputRadioChecked = getByTestId('input-radio-checked')
const inputRadioUnchecked = getByTestId('input-radio-unchecked')
const ariaRadioChecked = getByTestId('aria-radio-checked')
const ariaRadioUnchecked = getByTestId('aria-radio-unchecked')
expect(inputRadioChecked).toBeChecked()
expect(inputRadioUnchecked).not.toBeChecked()
expect(ariaRadioChecked).toBeChecked()
expect(ariaRadioUnchecked).not.toBeChecked()

const ariaSwitchChecked = getByTestId('aria-switch-checked')
const ariaSwitchUnchecked = getByTestId('aria-switch-unchecked')
expect(ariaSwitchChecked).toBeChecked()
expect(ariaSwitchUnchecked).not.toBeChecked()
```

---

### `toBePartiallyChecked`

```typescript
toBePartiallyChecked()
```

This allows you to check whether the given element is partially checked. It
accepts an `input` of type `checkbox` and elements with a `role` of `checkbox`
with a `aria-checked="mixed"`, or `input` of type `checkbox` with
`indeterminate` set to `true`

#### Examples

```html
<input type="checkbox" aria-checked="mixed" data-testid="aria-checkbox-mixed" />
<input type="checkbox" checked data-testid="input-checkbox-checked" />
<input type="checkbox" data-testid="input-checkbox-unchecked" />
<div role="checkbox" aria-checked="true" data-testid="aria-checkbox-checked" />
<div
  role="checkbox"
  aria-checked="false"
  data-testid="aria-checkbox-unchecked"
/>
<input type="checkbox" data-testid="input-checkbox-indeterminate" />
```

```javascript
const ariaCheckboxMixed = getByTestId('aria-checkbox-mixed')
const inputCheckboxChecked = getByTestId('input-checkbox-checked')
const inputCheckboxUnchecked = getByTestId('input-checkbox-unchecked')
const ariaCheckboxChecked = getByTestId('aria-checkbox-checked')
const ariaCheckboxUnchecked = getByTestId('aria-checkbox-unchecked')
const inputCheckboxIndeterminate = getByTestId('input-checkbox-indeterminate')

expect(ariaCheckboxMixed).toBePartiallyChecked()
expect(inputCheckboxChecked).not.toBePartiallyChecked()
expect(inputCheckboxUnchecked).not.toBePartiallyChecked()
expect(ariaCheckboxChecked).not.toBePartiallyChecked()
expect(ariaCheckboxUnchecked).not.toBePartiallyChecked()

inputCheckboxIndeterminate.indeterminate = true
expect(inputCheckboxIndeterminate).toBePartiallyChecked()
```

---

### `toHaveErrorMessage`

```typescript
toHaveErrorMessage(text: string | RegExp)
```

This allows you to check whether the given element has an
[ARIA error message](https://www.w3.org/TR/wai-aria/#aria-errormessage) or not.

Use the `aria-errormessage` attribute to reference another element that contains
custom error message text. Multiple ids is **NOT** allowed. Authors MUST use
`aria-invalid` in conjunction with `aria-errormessage`. Learn more from
[`aria-errormessage` spec](https://www.w3.org/TR/wai-aria/#aria-errormessage).

Whitespace is normalized.

When a `string` argument is passed through, it will perform a whole
case-sensitive match to the error message text.

To perform a case-insensitive match, you can use a `RegExp` with the `/i`
modifier.

To perform a partial match, you can pass a `RegExp` or use
`expect.stringContaining("partial string")`.

#### Examples

```html
<label for="startTime"> Please enter a start time for the meeting: </label>
<input
  id="startTime"
  type="text"
  aria-errormessage="msgID"
  aria-invalid="true"
  value="11:30 PM"
/>
<span id="msgID" aria-live="assertive" style="visibility:visible">
  Invalid time: the time must be between 9:00 AM and 5:00 PM
</span>
```

```javascript
const timeInput = getByLabel('startTime')

expect(timeInput).toHaveErrorMessage(
  'Invalid time: the time must be between 9:00 AM and 5:00 PM'
)
expect(timeInput).toHaveErrorMessage(/invalid time/i) // to partially match
expect(timeInput).toHaveErrorMessage(expect.stringContaining('Invalid time')) // to partially match
expect(timeInput).not.toHaveErrorMessage('Pikachu!')
```

## Deprecated matchers

### `toBeEmpty`

> Note: This matcher is being deprecated due to a name clash with
> `jest-extended`. See more info in #216. In the future, please use only
> [`toBeEmptyDOMElement`](#toBeEmptyDOMElement)

```typescript
toBeEmpty()
```

This allows you to assert whether an element has content or not.

#### Examples

```html
<span data-testid="not-empty"><span data-testid="empty"></span></span>
```

```javascript
expect(getByTestId('empty')).toBeEmpty()
expect(getByTestId('not-empty')).not.toBeEmpty()
```

---

### `toBeInTheDOM`

> This custom matcher is deprecated. Prefer
> [`toBeInTheDocument`](#tobeinthedocument) instead.

```typescript
toBeInTheDOM()
```

This allows you to check whether a value is a DOM element, or not.

Contrary to what its name implies, this matcher only checks that you passed to
it a valid DOM element. It does not have a clear definition of what "the DOM"
is. Therefore, it does not check whether that element is contained anywhere.

This is the main reason why this matcher is deprecated, and will be removed in
the next major release. You can follow the discussion around this decision in
more detail [here](https://github.com/testing-library/jest-dom/issues/34).

As an alternative, you can use [`toBeInTheDocument`](#tobeinthedocument) or
[`toContainElement`](#tocontainelement). Or if you just want to check if a value
is indeed an `HTMLElement` you can always use some of
[jest's built-in matchers](https://jestjs.io/docs/en/expect#tobeinstanceofclass):

```js
expect(document.querySelector('.ok-button')).toBeInstanceOf(HTMLElement)
expect(document.querySelector('.cancel-button')).toBeTruthy()
```

> Note: The differences between `toBeInTheDOM` and `toBeInTheDocument` are
> significant. Replacing all uses of `toBeInTheDOM` with `toBeInTheDocument`
> will likely cause unintended consequences in your tests. Please make sure when
> replacing `toBeInTheDOM` to read through the documentation of the proposed
> alternatives to see which use case works better for your needs.

### `toHaveDescription`

> This custom matcher is deprecated. Prefer
> [`toHaveAccessibleDescription`](#tohaveaccessibledescription) instead, which
> is more comprehensive in implementing the official spec.

```typescript
toHaveDescription(text: string | RegExp)
```

This allows you to check whether the given element has a description or not.

An element gets its description via the
[`aria-describedby` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute).
Set this to the `id` of one or more other elements. These elements may be nested
inside, be outside, or a sibling of the passed in element.

Whitespace is normalized. Using multiple ids will
[join the referenced elements’ text content separated by a space](https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_description).

When a `string` argument is passed through, it will perform a whole
case-sensitive match to the description text.

To perform a case-insensitive match, you can use a `RegExp` with the `/i`
modifier.

To perform a partial match, you can pass a `RegExp` or use
`expect.stringContaining("partial string")`.

#### Examples

```html
<button aria-label="Close" aria-describedby="description-close">X</button>
<div id="description-close">Closing will discard any changes</div>

<button>Delete</button>
```

```javascript
const closeButton = getByRole('button', { name: 'Close' })

expect(closeButton).toHaveDescription('Closing will discard any changes')
expect(closeButton).toHaveDescription(/will discard/) // to partially match
expect(closeButton).toHaveDescription(expect.stringContaining('will discard')) // to partially match
expect(closeButton).toHaveDescription(/^closing/i) // to use case-insensitive match
expect(closeButton).not.toHaveDescription('Other description')

const deleteButton = getByRole('button', { name: 'Delete' })
expect(deleteButton).not.toHaveDescription()
expect(deleteButton).toHaveDescription('') // Missing or empty description always becomes a blank string
```
