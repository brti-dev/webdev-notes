# Design Patterns

“software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification”
- SOLID (single responsibility, openclosed, Liskov substitution, interface segregation, and dependency inversion)

You should be able to describe a class’s responsibility in 25 words or less, rarely using the words “and” or “or.” If your sentence gets too long or mired in clauses, it is probably time to consider defining new classes along the lines of some of the responsibilities you have described.

polymorphism = the same interface is used with a different underlying code

## Antipatterns

- God Objects
    - obj with too many methods or props

## Creational Patterns

Singleton: private constructor and methods, static inistance that persists
- Alternative to globals
- Set config or preference variables

Factory: How to create object instances when code focuses on abstract types; Specialist classes handle instantiation

Builder: Alternate to excessive arguments in constructor
- E.g. $order = new Pizza(new PizzaRecipe("small")->cheese(true)->pepperoni->(true)->build());

Lazy Load: Build a list of objects without having to reconstruct the same object again
- E.g. Build User object, get followers, get user objects of followers and their followers...

Prototype: Duplicate objects
- E.g. Build transactions
