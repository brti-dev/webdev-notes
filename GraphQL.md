
# GraphQL Schema

Types are defined by Schema Definition Language (SDL)
Schema defines types and how clients can request data
Schema = collection of GraphQL types:

```graphql
type Person {
    name: String!
    age: Int!
    posts: [Post!]
}

type Post {
    author: Person!
    title: String!
}
```

Three root types that serve as entry points for requests sent by client:

```graphql
type Query {
    allPersons(last: Int): [Person!]
}
type Mutation {
    createPerson(name: String!, age: Int!): Person!
}
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

# Resolver Functions

Populate the data for a single field in the schema

```javascript
/**
 * @param parent	This is the return value of the resolver for this field's parent (the resolver for a parent field always executes before the resolvers for that field's children).
 * @param args	    This object contains all GraphQL arguments provided for this field.
 * @param context	This object is shared across all resolvers that execute for a particular operation. Use this to share per-operation state, such as authentication information and access to data sources.
 * @param info	    This contains information about the execution state of the operation (used only in advanced cases).
 * @returns         One of the following: (1) Data of the type required by the resolver's corresponding schema field (string, integer, object, etc.); (2) A promise that fulfills with data of the required type
 */
const resolvers = {
    fieldName: (parent, args, context, info) => data;
}
```

