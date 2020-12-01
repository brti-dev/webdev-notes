# Documents

Store data in form of field-value pairs.
Values include objects, arrays, arrays of objects...
Similar to JSON objects
Subdocuments encouraged rather than seperate collections

## Collection

Set of documents.
Primary Key
- Automatically indexed
- Field name `_id`
- Special data type ObjectId
No required schema
- Flexible
- Requires schema checking in code
- Support for chemas as of 3.6

# Start Service

1. Run MongoDB as a service
    $ brew services start mongodb-community@4.4
2. Verify MongoDB is running by searching for it in running processes
    $ ps aux | grep -v grep | grep mongod
3. Start shell
    $ mongo            

# Scripts

> $ mongo issuetracker scripts/init.mongo.js
> $ mongo mongodb+srv://root:root91@cluster0.dsrzl.mongodb.net/issuetracker scripts/init.mongo.js

# Databases

Show current DB:
    $ db
Show dbs available to user:
    $ show dbs
Switch db:
    $ use <db>
List collections:
    $ db.getCollectionInfos()
    $ db.getCollectionNames()

# CRUD Operations

## Create

db.collection.insertOne(<document>, { writeConcern: <document> })
db.collection.insertMany([ <document 1> , <document 2>, ... ], { writeConcern: <document>, ordered: <boolean> })

## Read

db.collection.find(query, projection)
    `$ db.bios.find( { _id: 5 } )`
    `$ db.bios.find( { "name.last": "Hopper" } )`
    `$ db.bios.find( { birth: { $gt: new Date('1950-01-01') } } )`
    `$ db.bios.find( { birth: { $gt: new Date('1940-01-01'), $lt: new Date('1960-01-01') } } )`
    `$ db.bios.find( { "name.last": { $regex: /^N/ } })`
    `$ db.bios.find( { contribs: { $in: [ "ALGOL", "Lisp" ]} } )`
    `$ db.bios.find( { contribs: { $all: [ "ALGOL", "Lisp" ] } } )`
    `$ db.bios.find( { }, { name: 1, contribs: 1 } )` Get whole collection but only project `name` and `contribs` fields
db.collection.estimatedDocumentCount()

## Update

db.collection.updateOne(filter, update, options)
    `db.restaurant.updateOne(
        { "name" : "Central Perk Cafe" },
        { $set: { "violations" : 3 } }
    );`
db.collection.updateMany(filter, update, options)
    `$ db.restaurant.updateMany(
        { violations: { $gt: 4 } },
        { $set: { "Review" : true } }
    );`
db.collection.findOneAndUpdate(filter, update, options)
    Find the first document based on a filter, then increment the `current` value by 1, then return the updated doc:
    `db.counters.findOneAndUpdate(
        { "name" : "foo" },
        { $inc: { current: 1 } },
        { returnNewDocument: true }
    )`
db.collection.replaceOne(filter, replacement, options)
    `$ db.employees.replaceOne({ id: 4 }, {
        id: 4,
        name : { first : "Bobby" },
        age : 66
    });`

## Delete

db.collection.deleteOne()
    `$ db.employees.deleteOne({ id: 4 })`
    `$ db.orders.deleteOne( { "expiryts" : { $lt: ISODate("2015-11-01T12:40:15Z") } } );`
db.collection.deleteMany()

# Indexes

- An index supports a query when the index contains all the fields scanned by the query.
- The query scans the index and not the collection.
- Indexes should be highly selective
    - A limited number of documents should be scanned using the query in order to return the result.
    - A field `status` with possible vals `new` and `processed` is low-selective
    - Suggestion: make a compund index that combines `status` with another field like `created_at`, or seperate collections for each status
- Indexes should fit entirely on RAM; Check with db.collection.totalIndexSize()

## Methods

db.collection.createIndex()
db.collection.dropIndex()
db.collection.dropIndexes()
db.collection.getIndexes() // Returns an array of documents that describe the existing indexes on a collection.
db.collection.hideIndex() // Hides an index from the query planner.
db.collection.reIndex() // Rebuilds all existing indexes on a collection.
db.collection.totalIndexSize() // Returns total size in bytes
db.collection.unhideIndex() // Unhides an index from the query planner.

## Single Field

- Create if all queries use same single key

`$ db.employees.createIndex({ age: 1 })` Create an index on the `age` field for faster queries

`db.employees.createIndex({ id: 1 }, { unique: true })` Enforce unique field

## Compund Index

- Multiple fields indexed
- Support combination of various queries of the indexed fields
- Order of fields indexed determines sort order!

## Multikey Index

- Index content stored in arrays.
- Automatically determined by MongoDB if indexed field is an array in docs

## Text Index

- Used to search words and phrases within the value, rather than whole strings of other indexes
- Can be data-intensive since all words are tokenized
- A collection can have only ONE, but it can include multiple fields, eg:
    `$ db.reviews.createIndex(
       {
         subject: "text",
         comments: "text"
       }
     )`
- The $text operator is used to search text indexes
    `{
      $text:
        {
          $search: <string>, // search term
          $language: <string>, // determines the list of stop words and the rules for the stemmer and tokenizer for the search string
          $caseSensitive: <boolean>,
          $diacriticSensitive: <boolean>
        }
    }`
- Search text scores are weighted and can be returned and sorted with $meta:
    `db.articles.find(
       { $text: { $search: "cake" } },
       { score: { $meta: "textScore" } }
    ).sort( { score: { $meta: "textScore" } } )`

## Partial Index

- Only index docs that meet filter requirements.
- Can save storage since only subset of docs are indexed.
- Eg. Index the `cuisine` and `name` fileds but only on documents with a `rating` > 5:
    `db.restaurants.createIndex(
       { cuisine: 1, name: 1 },
       { partialFilterExpression: { rating: { $gt: 5 } } }
    )`

## TTL Index

- Automatically removed after a certain amount of time

# Agreggate

Group by a field, `organization`:
    `db.employees.aggregate([
        { $group: { _id: '$organization', average_age: { $avg: '$age' } } }
    ])`
Set `_id: null` to not group by any field
    `$ db.employees.aggregate([
        { $group: { _id: null, total_age: { $sum: '$age' } } }
    ])`

# Operators

## Query Selectors

Comparison

$eq     Matches values that are equal to a specified value.
    { <field>: { $eq: <value> } }
    { <field>: <value> }
$gt     Matches values that are greater than a specified value.
    $ db.inventory.update(
       { "carrier.fee": { $gt: 2 } },
       { $set: { price: 9.99 } },
       { multi: true }
    )
$gte    Matches values that are greater than or equal to a specified value.
$in     Matches any of the values specified in an array.
$lt     Matches values that are less than a specified value.
$lte    Matches values that are less than or equal to a specified value.
$ne     Matches all values that are not equal to a specified value.
$nin    Matches none of the values specified in an array.

Logical

$and    Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
$not    Inverts the effect of a query expression and returns documents that do not match the query expression.
$nor    Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
$or     Joins query clauses with a logical OR returns all documents that match the conditions of either clause.

Element

$exists Matches documents that have the specified field.
    `$ db.employees.find({ 'name.middle': { $exists:true } })`
$type   Selects documents if a field is of the specified type.

Evaluation

$expr   Allows use of aggregation expressions within the query language.
$jsonSchema Validate documents against the given JSON Schema.
$mod    Performs a modulo operation on the value of a field and selects documents with a specified result.
$regex  Selects documents where values match a specified regular expression.
$text   Performs text search.
$where  Matches documents that satisfy a JavaScript expression.

Geospatial

$geoIntersects  Selects geometries that intersect with a GeoJSON geometry. The 2dsphere index supports $geoIntersects.
$geoWithin      Selects geometries within a bounding GeoJSON geometry. The 2dsphere and 2d indexes support $geoWithin.
$near           Returns geospatial objects in proximity to a point. Requires a geospatial index. The 2dsphere and 2d indexes support $near.
$nearSphere     Returns geospatial objects in proximity to a point on a sphere. Requires a geospatial index. The 2dsphere and 2d indexes support $nearSphere.

Array

$all        Matches arrays that contain all elements specified in the query.
$elemMatch  Selects documents if element in the array field matches all the specified $elemMatch conditions.
$size       Selects documents if the array field is a specified size.

Bitwise

$bitsAllClear   Matches numeric or binary values in which a set of bit positions all have a value of 0.
$bitsAllSet     Matches numeric or binary values in which a set of bit positions all have a value of 1.
$bitsAnyClear   Matches numeric or binary values in which any bit from a set of bit positions has a value of 0.
$bitsAnySet     Matches numeric or binary values in which any bit from a set of bit positions has a value of 1.

Comments

$comment        Adds a comment to a query predicate.

Projection Operators

$           Projects the first element in an array that matches the query condition.
$elemMatch  Projects the first element in an array that matches the specified $elemMatch condition.
$meta       Projects the document’s score assigned during $text operation.
    `db.articles.find(
       { $text: { $search: "cake" } },
       { score: { $meta: "textScore" } }
    ).sort( { score: { $meta: "textScore" } } )
    .limit(2)`
$slice      Limits the number of elements projected from an array. Supports skip and limit slices.

## Update Operators

Fields

$currentDate    Sets the value of a field to current date, either as a Date or a Timestamp.
$inc        Increments the value of the field by the specified amount.
$min        Only updates the field if the specified value is less than the existing field value.
$max        Only updates the field if the specified value is greater than the existing field value.
$mul        Multiplies the value of the field by the specified amount.
$rename     Renames a field.
$set        Sets the value of a field in a document.
$setOnInsert    Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents.
$unset      Removes the specified field from a document.
    `$ db.employees.updateOne({ id:5 }, { $unset: { 'name.middle': '' } })`

Array Operators

$           Acts as a placeholder to update the first element that matches the query condition.
$[]         Acts as a placeholder to update all elements in an array for the documents that match the query condition.
$[<identifier>] Acts as a placeholder to update all elements that match the arrayFilters condition for the documents that match the query condition.
$addToSet   Adds elements to an array only if they do not already exist in the set.
$pop        Removes the first or last item of an array.
$pull       Removes all array elements that match a specified query.
$push       Adds an item to an array.
$pullAll    Removes all matching values from an array.

Array Modifiers

$each       Modifies the $push and $addToSet operators to append multiple items for array updates.
$position   Modifies the $push operator to specify the position in the array to add elements.
$slice      Modifies the $push operator to limit the size of updated arrays.
$sort       Modifies the $push operator to reorder documents stored in an array.

Bitwise

$bit    Performs bitwise AND, OR, and XOR updates of integer values.