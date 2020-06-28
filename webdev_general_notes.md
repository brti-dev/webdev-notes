
# Redis

## [Redis Commands](http://redis.io/commands)

Start the server
    $ redis-server
Check
    $ redis-cli ping
Open commands
    $ redis-cli
    redis 127.0.0.1:6379> ping
    PONG
    redis 127.0.0.1:6379> set mykey somevalue
    OK
    redis 127.0.0.1:6379> get mykey
    "somevalue"
Force dataset snapshot
    $ redis-cli save
Close
    $ redis-cli shutdown // saves too
Get all keys
    $ redis-cli keys '*'
Delete a bunch of keys
    $ redis-cli KEYS "user:*" | xargs redis-cli DEL

## Types

__Key-String__
    SET <key> <value> [EX <seconds>] [PX <milliseconds>] [NX (if not exists)|XX (if exists)]
    set user:id:tobi "100"
    setnx user:id:tobi "999" //won't work; "SET if Not eXists"
    get user:id:tobi // "100"
    set server:name "fido"
    expire server:name 120
    ttl server:name // 119
    mset key1 "hello" key2 "world"
    mget key1 key2 // 1) "hello" 2) "world"
    incr user:ids // 1
    incrby user:ids 10 // 11
    decr
    decrby
    incr counter // 1
    getset counter 0 // 1 => get the old value, set a new value
    exists
    del

__List__ a series of ordered values
    rpush posts "Hello World"
    lpush posts "I'm back"
    lrange posts 0 -1 // 1) "I'm back" 2) Hello world"
    llen posts // 2
    lpush mylist a b c // 1) c 2) b 3) a (!!!)
    lpop //...
    rpop //...
    LTRIM <key> <startpos> <stoppos>
  Use blocking operations like `BRPOP` and `BLPOP` instead of polling a list

__Set__ unordered collections of unique strings
  Also has useful functions like intersection, union and difference bt multiple sets
    sadd posts:id:1:tags "new york" "ice cream"
    smembers posts:id:1:tags // 1) "new york" 2) "ice cream"
    sismember posts:id:1:tags "mind control" // 0
    sadd posts:id:2:tags "new york" "gyros"
    sunion posts:id:1:tags posts:id:2:tags // 1) "new york" 2) "ice cream" 3) "gyros"
    sinter posts:id:1:tags posts:id:2:tags // 1) "new york"
    sunionstore tags posts:id:1:tags posts:id:2:tags
    scard tags // 3 (card = cardinality...)
  // Poker ex.
    sadd deck CA C2 C3 C4 C5 C6 C7 C8 C9 C10 CJ CQ CK DA D2 D3 D4 D5 D6 D7 D8 D9 D10 DJ DQ DK HA H2 H3 H4 H5 H6 H7 H8 H9 H10 HJ HQ HK SA S2 S3 S4 S5 S6 S7 S8 S9 S10 SJ SQ SK
      (integer) 52
    sunionstore game:1:deck deck // copy
      (integer) 52
    spop game:1:deck // random item
      C6
    spop game:1:deck
      D3
    spop game:1:deck
      H6
    spop game:1:deck
      CA
    spop game:1:deck
      DA
    scard game:1:deck
      (integer) 47
    srandmember // get a random item without removing it
      DK

__Sorted Set__ similar to a regular set, but now each value has an associated _score_ which is used to sort the elements
    zadd hackers 1912 "Alan Turing" 1906 "Grace Hopper"
    zrange hackers 0 -1 // 1) "Grace Hopper" 2) "Alan Turing"
    zRevRange hackers 0 -1 WITHSCORES // 1) "Alan Turing" 2) 1912 3) "Grace Hopper" 4) 1906
    zRangeByScore hackers -inf 1950 // get all items between negative infinity and 1950
    zRemRangeByScore hackers 1940 1950 // remove items between 1940 and 1950
    zRank hackers 0 // "Grace Hopper"
    zcard hackers // 2 -> "CARDinal"
  // ie autocomplete
    zadd autocomplete 0 "tetris:Tetris:game" 0 "shigeru miyamoto:Shigeru Miyamoto:person" 0 "kirby's dream land:Kirby's Dream Land:game" 0 "kirby's adventure:Kirby's Adventure:game" 0 "killer instinct:Killer Instinct:game" // input:output:type
      1) "Killer Instinct:game"
      2) "Kirby's Adventure:game"
      3) "Kirby's Dream Land:game"
      4) "Shigeru Miyamoto:person"
      5) "Tetris:game"
    zRangeByLex autocomplete [kir (kirz //note the z so
  // ie high scores
    zadd scores 1 stanley 1 philys 1 creed
    zIncrBy scores 5 creed
    zRevRange scores 0 -1
      1) Creed
      2) Philys
      3) Stanley
    zRevRank scores creed // 0
    zcount scores -infinity 1 // "2" with scores between negative infinity and 1
    zRevRangeByScore scores +infinity (1 withscores //show all (withschores) above 1

__Hashes__ maps between string fields and string values, so they are the perfect data type to represent objects (ie: A User with a number of fields)
    hset game:1 title "Tetris" // single field
    hget game:1 title // "Tetris"
    hmset game:2 title "Super Mario World" platform "SNES"
    hgetall game:2 // 1) "title" 2) "Super Mario World" 3) "platform" 4) "SNES"
    hincrby game:1 fans 1 // 1
    hdel game:1 fans

# Meteor

Collections
- store persistent data
- accessed on both server and client
- documents ?
  - every inserted document has a unique `_id` field

  //js
  Tasks = new Mongo.Collection("tasks");
  //console
  $ meteor mongo
  $ db.tasks.insert({ text: "Hello world!", createdAt: new Date() });

# MVC

Model
- Business/knowledge/interact with data
- API
View
- Presentation
- Visual representation of the model
- UI
Controller
- handle communication between the users and the model
- gives instructions to the model -- push/pull/listen for model updates



# Networking

TCP (Transmission Control Protocol) provides reliable, ordered and error-checked delivery of packets between programs running on computers connected to a local area network, intranet or the public Internet. HTTP, HTTPS, SMTP, POP3, IMAP, SSH, FTP, Telnet and a variety of other protocols are typically encapsulated in TCP. An alternative to the reliability of TCP is UDP.
- The packets are a sequence of octets (bytes) and consists of a header followed by a body. The header describes the packet's source, destination and control information. The body contains the data IP is transmitting.
- Node servers sometimes deal with TCP streams that send binary data. Buffers can be used to handle raw binary data.

Telnet is an insecure networking protocol used to transmit text over TCP
- largely abandoned since sending data over an open network like the internet via telnet can be easily intercepted/read

