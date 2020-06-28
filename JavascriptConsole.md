# Javascript Console

- Use `warn()` and `error()` to debug, etc
- `dir(object)` Displays an interactive list of the properties of the specified JavaScript object.
- use the debugger command (not a console method!)
    function foo () {
      debugger;
      //blah ablh
    }
- String substitution
  - %s string
  - %i integer, %d digit, %f floating-point number
  - %c CSS output
    console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");
- The `assert()` method conditionally displays an error string (its second parameter) only if its first parameter evaluates to false. For instance, in the following example an error message is written to the console only if the number of child nodes belonging to the list element is greater than 500:
    console.assert(list.childNodes.length < 500, "Node count is > 500");
- `group()` (or `groupCollapsed()`) and `groupEnd()` to group output
- `time(strname)` and `timeEnd(strname)` to track time
- Evaluating elements
  - $() document.querySelector()
  - $$() document.querySelectorAll()
  - $x() xpath    $x('/html/body/script');
- `$_` returns the value of the most recently evaluated expression https://developer.chrome.com/devtools/docs/commandline-api#_
- `monitorEvents()`
    monitorEvents(window, "resize");

## Controls

PgUp: increment by 10
Shift + PgUp: increment by 100
Alt + Up: increment by 0.1