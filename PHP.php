<?php

/**********/
/* Syntax */
/**********/

#############
# OPERATORS #
#############

# Ternary operator
$action = (empty($_POST['action'])) ? 'default' : $_POST['action'];
$foo = $bar ?: $baz;

# Null Coalesce Operator
$action = $_POST['action'] ?? 'default';
# ...Identical to:
if (isset($_POST['action'])) $action = $_POST['action'];
else $action = 'default';
# Nesting
echo null ?? null ?? 1 ?? 2; // outputs 1

# printf
# Use %, %d decimal integer signed, %u unsigned, %s string, %f floating point
# format a floating point number `f` to represent a dollar value
printf("The total is: $%.2f", 123.42 / 12); #= The total is: $10.29

###########
# STRINGS #
###########

addcslashes // Quote string with slashes in a C style
addslashes // Quote string with slashes
bin2hex // Convert binary data into hexadecimal representation
chop // Alias of rtrim
chr // Generate a single-byte string from a number
chunk_split // Split a string into smaller chunks
convert_cyr_string // Convert from one Cyrillic character set to another
convert_uudecode // Decode a uuencoded string
convert_uuencode // Uuencode a string
count_chars // Return information about characters used in a string
crc32 // Calculates the crc32 polynomial of a string
crypt // One-way string hashing
explode // Split a string by a string
fprintf // Write a formatted string to a stream
get_html_translation_table // Returns the translation table used by htmlspecialchars and htmlentities
hebrev // Convert logical Hebrew text to visual text
hebrevc // Convert logical Hebrew text to visual text with newline conversion
hex2bin // Decodes a hexadecimally encoded binary string
html_entity_decode // Convert HTML entities to their corresponding characters
htmlentities // Convert all applicable characters to HTML entities
htmlspecialchars_decode // Convert special HTML entities back to characters
htmlspecialchars // Convert special characters to HTML entities
implode // Join array elements with a string
join // Alias of implode
lcfirst // Make a string's first character lowercase
levenshtein // Calculate Levenshtein distance between two strings
localeconv // Get numeric formatting information
ltrim // Strip whitespace (or other characters) from the beginning of a string
md5_file // Calculates the md5 hash of a given file
md5 // Calculate the md5 hash of a string
metaphone // Calculate the metaphone key of a string
money_format // Formats a number as a currency string
nl_langinfo // Query language and locale information
nl2br // Inserts HTML line breaks before all newlines in a string
number_format // Format a number with grouped thousands
ord // Convert the first byte of a string to a value between 0 and 255
parse_str // Parses the string into variables
printf // Output a formatted string
quoted_printable_decode // Convert a quoted-printable string to an 8 bit string
quoted_printable_encode // Convert a 8 bit string to a quoted-printable string
quotemeta // Quote meta characters
rtrim // Strip whitespace (or other characters) from the end of a string
setlocale // Set locale information
sha1_file // Calculate the sha1 hash of a file
sha1 // Calculate the sha1 hash of a string
similar_text // Calculate the similarity between two strings
soundex // Calculate the soundex key of a string
sprintf // Return a formatted string
sscanf // Parses input from a string according to a format
str_getcsv // Parse a CSV string into an array
str_ireplace // Case-insensitive version of str_replace
str_pad // Pad a string to a certain length with another string
str_repeat // Repeat a string
str_replace // Replace all occurrences of the search string with the replacement string
str_rot13 // Perform the rot13 transform on a string
str_shuffle // Randomly shuffles a string
str_split // Convert a string to an array
str_word_count // Return information about words used in a string
strcasecmp // Binary safe case-insensitive string comparison
strchr // Alias of strstr
strcmp ( string $str1 , string $str2 ) : int # Returns < 0 if str1 is less than str2; > 0 if str1 is greater than str2, and 0 if they are equal.
strcoll // Locale based string comparison
strcspn // Find length of initial segment not matching mask
strip_tags // Strip HTML and PHP tags from a string
stripcslashes // Un-quote string quoted with addcslashes
stripos // Find the position of the first occurrence of a case-insensitive substring in a string
stripslashes // Un-quotes a quoted string
stristr // Case-insensitive strstr
strlen // Get string length
strnatcasecmp // Case insensitive string comparisons using a "natural order" algorithm
strnatcmp // String comparisons using a "natural order" algorithm
strncasecmp // Binary safe case-insensitive string comparison of the first n characters
strncmp // Binary safe string comparison of the first n characters
strpbrk // Search a string for any of a set of characters
strpos // Find the position of the first occurrence of a substring in a string
strrchr // Find the last occurrence of a character in a string
strrev // Reverse a string
strripos // Find the position of the last occurrence of a case-insensitive substring in a string
strrpos // Find the position of the last occurrence of a substring in a string
strspn // Finds the length of the initial segment of a string consisting entirely of characters contained within a given mask
strstr // Find the first occurrence of a string
strtok // Tokenize string
strtolower // Make a string lowercase
strtoupper // Make a string uppercase
strtr // Translate characters or replace substrings
substr_compare // Binary safe comparison of two strings from an offset, up to length characters
substr_count // Count the number of substring occurrences
substr_replace // Replace text within a portion of a string
substr // Return part of a string
trim // Strip whitespace (or other characters) from the beginning and end of a string
ucfirst // Make a string's first character uppercase
ucwords // Uppercase the first character of each word in a string
vfprintf // Write a formatted string to a stream
vprintf // Output a formatted string
vsprintf // Return a formatted string
wordwrap // Wraps a string to a given number of characters

# Binary safe string comparison

##########
# ARRAYS #
##########

array_change_key_case // Changes the case of all keys in an array
array_chunk // Split an array into chunks
array_column // Return the values from a single column in the input array
array_combine // Creates an array by using one array for keys and another for its values
array_count_values // Counts all the values of an array
array_diff_assoc // Computes the difference of arrays with additional index check
array_diff_key // Computes the difference of arrays using keys for comparison
array_diff_uassoc // Computes the difference of arrays with additional index check which is performed by a user supplied callback function
array_diff_ukey // Computes the difference of arrays using a callback function on the keys for comparison
array_diff() // Computes the difference of arrays
array_fill_keys // Fill an array with values, specifying keys
array_fill // Fill an array with values
array_filter ( array $array [, callable $callback [, int $flag = 0 ]] ) : array // Filters elements of an array using a callback function
  # Remove empty array items by omitting callback 
  array_filter(array('foo', false, -1, null, '', 0, '0')); #= array('foo', -1)
array_flip // Exchanges all keys with their associated values in an array
array_intersect_assoc // Computes the intersection of arrays with additional index check
array_intersect_key // Computes the intersection of arrays using keys for comparison
array_intersect_uassoc // Computes the intersection of arrays with additional index check, compares indexes by a callback function
array_intersect_ukey // Computes the intersection of arrays using a callback function on the keys for comparison
array_intersect // Computes the intersection of arrays
array_key_exists // Checks if the given key or index exists in the array
array_key_first // Gets the first key of an array
array_key_last // Gets the last key of an array
array_keys // Return all the keys or a subset of the keys of an array
array_map // Applies the callback to the elements of the given arrays
array_merge_recursive // Merge one or more arrays recursively
array_merge // Merge one or more arrays
array_multisort // Sort multiple or multi-dimensional arrays
array_pad // Pad array to the specified length with a value
array_pop // Pop the element off the end of array
array_product // Calculate the product of values in an array
array_push // Push one or more elements onto the end of array
array_rand // Pick one or more random keys out of an array
array_reduce // Iteratively reduce the array to a single value using a callback function
array_replace_recursive // Replaces elements from passed arrays into the first array recursively
array_replace // Replaces elements from passed arrays into the first array
array_reverse // Return an array with elements in reverse order
array_search // Searches the array for a given value and returns the first corresponding key if successful
array_shift // Shift an element off the beginning of array
array_slice // Extract a slice of the array
array_splice // Remove a portion of the array and replace it with something else
array_sum // Calculate the sum of values in an array
array_udiff_assoc // Computes the difference of arrays with additional index check, compares data by a callback function
array_udiff_uassoc // Computes the difference of arrays with additional index check, compares data and indexes by a callback function
array_udiff // Computes the difference of arrays by using a callback function for data comparison
array_uintersect_assoc // Computes the intersection of arrays with additional index check, compares data by a callback function
array_uintersect_uassoc // Computes the intersection of arrays with additional index check, compares data and indexes by separate callback functions
array_uintersect // Computes the intersection of arrays, compares data by a callback function
array_unique // Removes duplicate values from an array
array_unshift // Prepend one or more elements to the beginning of an array
array_values // Return all the values of an array
array_walk_recursive // Apply a user function recursively to every member of an array
array_walk // Apply a user supplied function to every member of an array
arsort // Sort an array in reverse order and maintain index association
asort // Sort an array and maintain index association
compact // Create array containing variables and their values
count // Count all elements in an array, or something in an object
current // Return the current element in an array
each // Return the current key and value pair from an array and advance the array cursor
end // Set the internal pointer of an array to its last element
extract // Import variables into the current symbol table from an array
in_array // Checks if a value exists in an array
key_exists // Alias of array_key_exists
key // Fetch a key from an array
krsort // Sort an array by key in reverse order
ksort // Sort an array by key
list // Assign variables as if they were an array
natcasesort // Sort an array using a case insensitive "natural order" algorithm
natsort // Sort an array using a "natural order" algorithm
next // Advance the internal pointer of an array
pos // Alias of current
prev // Rewind the internal array pointer
range // Create an array containing a range of elements
reset // Set the internal pointer of an array to its first element
rsort // Sort an array in reverse order
shuffle // Shuffle an array
sizeof // Alias of count
sort // Sort an array
uasort // Sort an array with a user-defined comparison function and maintain index association
uksort // Sort an array by keys using a user-defined comparison function
usort // Sort an array by values using a user-defined comparison function

# Destructure and assignment and [] shorthands
$data = [[1, 'Tom'], [2, 'Fred']];
list($id1, $name1) = $data[0];
[$id1, $name1] = $data[0];
foreach ($data as list($id, $name)) {}
foreach ($data as [$id, $name]) {}
# Assoc array
$data = [["id" => 1, "name" => 'Tom'],["id" => 2, "name" => 'Fred']];
["id" => $id1, "name" => $name1] = $data[0];
foreach ($data as ["id" => $id, "name" => $name]) {}

#############
# FUNCTIONS #
#############

# REFERENCES #

# Using a reference to permanently change the values in an array
$bands = array("The Beatles", "Outkast", "Queen");
foreach ($bands as &$band) {
  $band = strtoupper($band);
}

# Pass reference to funtion
function goodbye(&$greeting) {
  $greeting = "See you later";
}
$myVar = "Hi there";
goodbye( $myVar );
echo $myVar; //= "See you later"

# ANONYMOUS FUNCTIONS #

$make_foo = function(int $num) {
  return "You made " . $num . " foo" . ($num != 1 ? 's' : '') . PHP_EOL;
};
echo $make_foo(5);

# Instead of writing a function that will only be used minimally, make an anymous function
$names = array_map( function( $name ) {
  return "Hello " . ucfirst( $name ) . "!";
}, $names );

# Make a custom sort eg. for an associative array with nested keys
$games = array(
  array("title" => "Super Mario Bros.", "year_published" => 1985),
  array("title" => "Super Mario World", "year_published" => 1990),
  array("title" => "Super Mario 64", "year_published" => 1996),
  array("title" => "Mario Bros", "year_published" => 1983),
);
usort($games, function($gameA, $gameB){
  return strcmp($gameA['year_published'], $gameB['year_published']); //Identical to:
  return ($gameA['year_published'] < $gameB['year_published']) ? -1 : 1;
});
# Similarly, make a closure via anonymous function:
function getSortFunction($sort_key) {
  return function ($a, $b) use ($sort_key) {
    return strcmp($a['title'], $b['title']);
  };
}
usort($games, getSortFunction("title"));

# SPREAD TOKEN #

function sum(...$numbers) {
    $acc = 0;
    foreach ($numbers as $n) {
        $acc += $n;
    }
    return $acc;
}
echo sum(1, 2, 3, 4);

function add($a, $b) {
    return $a + $b;
}
echo add(...[1, 2]);

// Type hint
function total_intervals($unit, DateInterval ...$intervals) { /**/ }
$a = new DateInterval('P1D');
$b = new DateInterval('P2D');
echo total_intervals('d', $a, $b).' days';

/*********/
/* REGEX */
/*********/

// Named groups

$test = '/http:\/\/(?P<domain>[a-z0-9\-_\.]+)\/(?P<path>.*)/';
preg_match($test, 'http://foo.com/bar', $matches);
$matches['domain'] == 'foo.com';
$matches['path'] == 'bar';

/* DateTime */

//See also: Carbon

# Create a DatePeriod instance that spans the past 30 days using an inverted, one-day interval
$dateStart = new \DateTime();
$dateInterval = \DateInterval::createFromDateString('-1 day');
$datePeriod = new \DatePeriod($dateStart, $dateInterval, 30);
foreach ($datePeriod as $date) {
  echo $date->format("Y-m-d");
}

/* Database */

# PDO #

# Basic select statement
$sql = "SELECT * FROM users WHERE username=?";
$statement = $pdo->prepare($sql);
$statement->execute([$username]);
while ($row = $statement->fetch()) {
  /* ... */
}

# Checking the table for existence
$stmt = $pdo->query("SELECT 1 FROM users WHERE name=foo");
$userExists = $stmt->fetchColumn();

# Get row count
$num_rows = $pdo->query("SELECT count(1) FROM t")->fetchColumn();

# Multiple executions of a prepared statement
$data = [1 => 1000, 5 => 300, 9 => 200];
$stmt = $pdo->prepare('UPDATE users SET bonus = bonus + ? WHERE id = ?');
foreach ($data as $id => $bonus){ $stmt->execute([$bonus, $id]); }

# Fetch a single row
$row = $stmt->fetch();

# Fetch value of a single column
$stmt = $pdo->query("SELECT foo, bar FROM table WHERE id=123 LIMIT 1");
$foo = $stmt->fetchColumn();
$bar = $stmt->fetchColumn(1);
while ($foo = $stmt->fetchColumn()) {}

# Using fetchAll and wrappers
# Only use when a few rows are expected as results!!!
$data = $pdo->query('SELECT id, name FROM users')->fetchAll(PDO::FETCH_ASSOC);    //= array (0 => array('id'=>1001, 'name'=>'John'), 1 => array('id'=>1002, 'name'=>'Mike'),)
$data = $pdo->query('SELECT name FROM users')->fetchAll(PDO::FETCH_COLUMN);       //= array (0 => 'John', 1 => 'Mike',)
$data = $pdo->query('SELECT id, name FROM users')->fetchAll(PDO::FETCH_KEY_PAIR); //= array (1001 => 'John', 1002 => 'Mike',)
$data = $pdo->query('SELECT * FROM users')->fetchAll(PDO::FETCH_UNIQUE);          //= array (1001 => array('id'=>1001, 'name'=>'John'),...
$data = $pdo->query('SELECT sex, name, car FROM users')->fetchAll(PDO::FETCH_GROUP); // Assoc array w/ keys ['male', 'female']
# Create an object of a particular class
$news = $pdo->query('SELECT * FROM news')->fetchAll(PDO::FETCH_CLASS, 'News');

# Prepare LIKE statements
$sql = "SELECT * FROM vocab WHERE user_id=:user_id AND definitions LIKE CONCAT('%', :query_definition, '%') OR pinyin LIKE CONCAT('%', :pinyin, '%') LIMIT 0, 100";

# Transactions
$pdo->beginTransaction();
try {
  // Execute statements
  $pdo->commit();
} catch (PDOException $e) {
  $pdo->rollBack();
}

# Streams #

# Filter to censor dirty words in a stream
class DirtyWordsFilter extends php_user_filter
{
  /**
  * @param resource $in Incoming bucket brigade
  * @param resource $out Outgoing bucket brigade
  * @param int $consumed Number of bytes consumed
  * @param bool $closing Last bucket brigade in stream?
  */
  public function filter($in, $out, &$consumed, $closing)
  {
    $words = array('grime', 'dirt', 'grease');
    $wordData = array();
    foreach ($words as $word) {
      $replacement = array_fill(0, mb_strlen($word), '*');
      $wordData[$word] = implode('', $replacement);
    }
    $bad = array_keys($wordData);
    $good = array_values($wordData);
    // Iterate each bucket from incoming bucket brigade
    while ($bucket = stream_bucket_make_writeable($in)) {
      // Censor dirty words in bucket data
      $bucket->data = str_replace($bad, $good, $bucket->data);
      // Increment total data consumed
      $consumed += $bucket->datalen;
      // Send bucket to downstream brigade
      stream_bucket_append($out, $bucket);
    }
    return PSFS_PASS_ON;
  }
}
stream_filter_register('dirty_words_filter', 'DirtyWordsFilter');
$handle = fopen('data.txt', 'rb');
stream_filter_append($handle, 'dirty_words_filter');
while (feof($handle) !== true) {
  echo fgets($handle); // <-- Outputs censored text
}
fclose($handle);

/* Directory structure */

/*
project-root/
  .git/            # Git configuration and source directory
  assets/          # Uncompiled/raw CSS, LESS, Sass, JavaScript, images
  bin/             # Command line scripts
  config/          # Application configuration
  node_modules/    # Node.js modules for managing front end
  public/          # Publicly accessible files at http://example.com/
      index.php    # Main entry point - front controller
      ...
  src/             # PHP source code files
      Controller/  # Controllers
      ...
  templates/       # Template files
  tests/           # Unit and functional tests
  translations/    # Translation files
      en_US.yaml
  var/             # Temporary application files
      cache/       # Cache files
      log/         # Application specific log files
  vendor/          # 3rd party packages and components with Composer
  .gitignore       # Ignored files and dirs in Git (node_modules, var, vendor...)
  composer.json    # Composer dependencies file
  phpunit.xml.dist # PHPUnit configuration file

  More: https://docs.php.earth/faq/misc/structure/
        https://www.nikolaposa.in.rs/blog/2017/01/16/on-structuring-php-projects/
*/

/* PHP Server on local machine */

# $ php -S localhost:8000

/* CLI */

# Interactive shell: 
#$ php -a

#Run a script: `$ php hello.php world`

# hello.php
# $argc is an integer variable containing the argument count
# $argv is an array variable containing each argument’s value. The first argument is always the name of your PHP script file, in this case hello.php
if ($argc !== 2) {
    echo "Usage: php hello.php <name>.\n";
    exit(1);
}
$name = $argv[1];
echo "Hello, $name\n";

## Security

#Hash passwords
password_hash("mypassword", PASSWORD_DEFAULT);
password_verify("mypassword", $hash);
#Store in DB with 255 length

#Filter input
$query = filter_input(INPUT_GET, "query");
$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);

## Packages and Libraries

### PHPUnit

#Run it:
#  $ ./vendor/bin/phpunit tests

#Useful tests attributes
$this->expectException(Exception::class); User::getByEmail('invalid');
$this->expectOutputString('foo'); print 'foo';
$this->assertInstanceOf(User::class, new User('Bob'));
$this->assertEquals(1, 1);

#Dependencies
public function testEmpty() {
    $stack = [];
    $this->assertEmpty($stack);
    return $stack;
}
/**
 * @depends testEmpty
 */
public function testPush(array $stack) {
    array_push($stack, 'foo');
    $this->assertSame('foo', $stack[count($stack)-1]);
    $this->assertNotEmpty($stack);
    return $stack;
}

#Share Fixture
class APITest extends TestCase
{
    protected static $client;

    public static function setUpBeforeClass(): void
    {
        $client = new GuzzleHttp\Client();
        self::$client = $client;
    }

    public function testApiClient()
    {
        $this->assertInstanceOf(GuzzleHttp\Client::class, self::$client);
    }
}

### Monolog

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

$log = new Logger('name');
// Register a handler -- file loc and minimum error level to record
$log->pushHandler(new StreamHandler('app.log', Logger::DEBUG));

$user_logger = new Logger('User:3123123');
$user_logger->pushHandler(new StreamHandler('app.log', Logger::DEBUG));
// Record additional, such as the user who triggered the log or IP
$user_logger->pushProcessor(function ($record) {
    $record['extra']['username'] = User::getCurrentUsername();
    $record['extra']['IP'] = $_SERVER['REMOTE_ADDR'];
    return $record;
});

try {
    $user = User::getById(0, $user_logger);
    $user->save();
} catch (UserException | Exception $exception) {
    echo "Error: " . $exception->getMessage() . PHP_EOL;
    $log->warning($exception);
}

// Output to JS console
use Monolog\Handler\BrowserConsoleHandler;
$log_console = new Logger('console');
$log_console->pushHandler(new BrowserConsoleHandler());
$log_console->warning('A warning message for console');

// Log line/file:class/function where the log message came from
use Monolog\Processor\IntrospectionProcessor;
$log_detailed = new Logger('detailed');
$log_detailed->pushHandler(new StreamHandler('app.log', Logger::DEBUG));
$log_detailed->pushProcessor(new IntrospectionProcessor());
$log_detailed->error("An error!");

### Carbon -- Date and time

printf("Right now is %s", Carbon::now()->toDateTimeString());
printf("Right now in Vancouver is %s", Carbon::now('America/Vancouver')); // automatically converted to string
$tomorrow = Carbon::now()->addDay();
$lastWeek = Carbon::now()->subWeek();

// Carbon embed 822 languages:
echo $tomorrow->locale('fr')->isoFormat('dddd, MMMM Do YYYY, h:mm') . PHP_EOL;
echo $tomorrow->locale('ar')->isoFormat('dddd, MMMM Do YYYY, h:mm') . PHP_EOL;

$officialDate = Carbon::now()->toRfc2822String();

$howOldAmI = Carbon::createFromDate(1975, 5, 21)->age;

$noonTodayLondonTime = Carbon::createFromTime(12, 0, 0, 'Europe/London');

$internetWillBlowUpOn = Carbon::create(2038, 01, 19, 3, 14, 7, 'GMT');

if (Carbon::now()->isWeekend()) {
    echo 'Weekend! Party!';
}
echo Carbon::now()->subMinutes(2)->diffForHumans() . PHP_EOL; // '2 minutes ago'

### Respect/Validation

v::numericVal()->positive()->between(1, 255)->validate($input);
v::dateTime()
    ->between(new DateTime('yesterday'), new DateTime('tomorrow'))
    ->validate(new DateTime('now')); // true
v::numericVal()->max(10)->validate(5); // true
v::stringVal()->between('a', 'f')->validate('d'); // true
v::dateTime()->between('yesterday', 'tomorrow')->validate('now'); // true

### Others

// - vlucas/phpdotenv Loads environment variables from `.env` to `getenv()`, `$_ENV` and `$_SERVER` automagically.
// - nesbot/carbon Datetime
// - guzzle Http