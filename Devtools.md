# Chrome Dev Tools

## Console

### Methods API

> table(data[, columns])
> Output a pretty table built from a multidimensional object

> $_
Return the most recently evaluated expression
> 'foo' + 'bar'
> $\_.length //= 6

> $0 - $4
> Reference selected DOM elements

> $(selector, [startNode])
> Sugar for document.querySelector()

> $$
> (selector, [startNode])
> Sugar for document.querySelectorAll()
> $$

> clear()
> clears the console of its history.

> copy(object)
> copies a string representation of the specified object to the clipboard.

> getEventListeners(object)

> monitorEvents(object[, events]); unmonitorEvents(object)
> monitorEvents(window, "resize");
> monitorEvents(window, ["resize", "scroll"])

> profile([name]); profileEnd([name])
