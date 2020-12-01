# GraphQL Schema

Types are defined by Schema Definition Language (SDL)
Schema defines types and how clients can request data
Schema = collection of GraphQL types:

## Interface

```graphql
scalar DateTime
interface AgendaItem {
  name: String!
  start: DateTime!
  end: DateTime!
}
type StudyGroup implements AgendaItem {
  name: String!
  start: DateTime!
  end: DateTime!
  participants: [User!]!
  topic: String!
}
type Workout implements AgendaItem {
  name: String!
  start: DateTime!
  end: DateTime!
  reps: Int!
}
type Query {
  agenda: [AgendaItem!]!
}
```

The GraphQL type system supports the following basic data types:

- Int: A signed 32-bit integer.
- Float: A signed double-precision floating-point value.
- String: A UTF-8 character sequence.
- Boolean: true or false.
- ID: This represents a unique identifier, serialized as a string. Using an ID instead of a string indicates that it is not intended to be human-readable.

Three root types that serve as entry points for requests sent by client:

## Query
```graphql
type Query {
    allPersons(last: Int): [Person!]
}
```

### Fragments

```
fragment liftInfo on Lift {
  name status capacity night elevationGain
}
query liftToAccessTrail {
  Trail(id: "dance-fight") {
    groomed
    name
    accessedByLifts {
      ...liftInfo
    }
  }
}
```

## Mutation
```
type Mutation {
    createPerson(name: String!, age: Int!): Person!
}
```

## Subscription
```
type Subscription {
    newPerson: Person!
}
```

# GraphQL Document

Perform an operation

```graphql
query {
    allPersons {
        name
        age
    }
}

mutation {}

subscription {}
```

## Variables

Method to factor dynamic values out of the query, and pass them as a separate dictionary

````graphql
# @method HeroNameAndFriends
# @variableName $episode
# @variableType Episode
# @defaultValue JEDI
query HeroNameAndFriends($episode: Episode = JEDI) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}

# passed variables
{ episode: "EMPIRE" }
````

# Resolver Functions

Populate the data for a single field in the schema

```javascript
/**
 * @param parent This is the return value of the resolver for this field's parent (the resolver for a parent field always executes before the resolvers for that field's children).
 * @param args This object contains all GraphQL arguments provided for this field.
 * @param context This object is shared across all resolvers that execute for a particular operation. Use this to share per-operation state, such as authentication information and access to data sources.
 * @param info This contains information about the execution state of the operation (used only in advanced cases).
 * @returns One of the following: (1) Data of the type required by the resolver's corresponding schema field (string, integer, object, etc.); (2) A promise that fulfills with data of the required type
 */
const resolvers = {
    fieldName: (parent, args, context, info) => data;
}
```

# Custom scalar type: Date

## Schema

```graphql
scalar Date

type MyType {
   created: Date
}
```

## Resolver

```javascript
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const resolverMap = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value) // ast value is always in string format
      }
      return null;
    },
  }),
};
```