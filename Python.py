
# type checking
type(123) #=<type 'int'>
type(123) is int #True
# To check if a variable is of a given type, use isinstance:
isinstance(123, int) #True
isinstance(123, (float, str, set, dict)) #False

# List attributes and methods and find more info
foo = "bar"
dir(foo)
help(foo.index)

# multiline printing
print("""\
hello
world
""")

# OPERATORS #

self.ability_scores = {
    "str": 11, "dex": 12, "con": 10, "int": 16, "wis": 14, "cha": 13
} if ability_scores is None else ability_scores

# STRINGS #

# print raw strings
print(r"C:\name")

# concatenate and repeat strings
("も" + "し") * 2
print('-' * 40)

# Slice strings
"Python"[0:2] #= Py

#String position
"Python".find("y") #= 1
"foo".rfind("o")   #= 2

# Format strings
'Hello, %s.' % name
'{0} {1} cost ${2}'.format(6, 'bananas', 1.74)
'{quantity} {item} cost ${price}'.format(quantity=6, item='bananas', price=1.74)
'{2}.{1}.{0}/{0}{0}.{1}{1}.{2}{2}'.format('foo', 'bar', 'baz')
'{}/{}/{}'.format('foo', 'bar', 'baz')
"Weight in tons {0.weight}"       # 'weight' attribute of first positional arg
"Units destroyed: {players[0]}"   # First element of keyword argument 'players'
coord = (3, 5)
'X: {0[0]};  Y: {0[1]}'.format(coord)
# f-strings
foo = 1
bar = 2
f"Hello, {foo}. You are {bar}."
f"{foo=} {bar=}" #python 3.8
# Aligning the text and specifying a width:
'{:<30}'.format('left aligned')  #='left aligned                  '
'{:>30}'.format('right aligned') #='                 right aligned'
'{:^30}'.format('centered')      #='           centered           '
'{:*^30}'.format('centered')     #='***********centered***********'
# Using the comma as a thousands separator:
'{:,}'.format(1234567890) #= '1,234,567,890'
# Expressing a percentage:
points = 19
total = 22
'Correct answers: {:.2%}'.format(points/total) #= 'Correct answers: 86.36%'

# INTEGERS #

# String to int
int('2001')
int('8,990'.replace(',',''))

# LISTS #

# print a list
from pprint import pprint
pprint(list)

# Adding items to a list; All the following processes are identical!
a.append(x)
a[len(a):] = [x]
a.insert(len(a), x)

# Remove
words = ['cat', 'window', 'defenestrate']
removed = words.pop(-1) #= defenestrate
del words[1]

# Appends and pops from the end of list are fast, but doing inserts or pops from the beginning of a list is slow (because all of the other elements have to be shifted by one).
# collections.deque  was designed to have fast appends and pops from both ends
from collections import deque
queue = deque(["Eric", "John", "Michael"])
queue.append("Terry")           # Terry arrives
queue.append("Graham")          # Graham arrives
queue.popleft()                 # The first to arrive now leaves >>> 'Eric'
queue.popleft()                 # The second to arrive now leaves >>> 'John'
queue                           # Remaining queue in order of arrival >>> deque(['Michael', 'Terry', 'Graham'])

# List Comprehensions are a concise way to create lists
squares = [x**2 for x in range(10)] # Equivalent to:
squares = []
for x in range(10):
    squares.append(x**2) # creates xor overwrites a variable named x that still exists after the loop completes
[(x, y) for x in [1,2,3] for y in [3,1,4] if x != y] == [(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]

# Iteration
words = ['cat', 'window', 'defenestrate']
for w in words:
	print(w, len(w))
a = ['Mary', 'had', 'a', 'little', 'lamb']
for i in range(len(a)):
	print(i, a[i])
for i, v in enumerate(['Mary', 'had', 'a', 'little', 'lamb']):
	print(i, v)

# Lists are mutable!
def foo(list_reference):
    list_reference.append('bar')
bar = ['foo']
foo(bar)
bar == ['foo', 'bar']

# List operations
len(list) #
list.append(x) # Add an item to the end of the list. Equivalent to a[len(a):] = [x].
list.extend(iterable) # Extend the list by appending all the items from the iterable. Equivalent to a[len(a):] = iterable.
list.insert(i, x) # Insert an item at a given position. The first argument is the index of the element before which to insert, so a.insert(0, x) inserts at the front of the list, and a.insert(len(a), x) is equivalent to a.append(x).
list.remove(x) # Remove the first item from the list whose value is equal to x. It raises a ValueError if there is no such item.
list.pop([i]) # Remove the item at the given position in the list, and return it. If no index is specified, a.pop() removes and returns the last item in the list. (The square brackets around the i in the method signature denote that the parameter is optional, not that you should type square brackets at that position. You will see this notation frequently in the Python Library Reference.)
list.clear() # Remove all items from the list. Equivalent to del a[:].
list.index(x[, start[, end]]) # Return zero-based index in the list of the first item whose value is equal to x. Raises a ValueError if there is no such item.
# The optional arguments start and end are interpreted as in the slice notation and are used to limit the search to a particular subsequence of the list. The returned index is computed relative to the beginning of the full sequence rather than the start argument.
list.count(x) # Return the number of times x appears in the list.
list.sort(key=None, reverse=False) # Sort the items of the list in place (the arguments can be used for sort customization, see sorted() for their explanation).
list.reverse() # Reverse the elements of the list in place.
list.copy() # Return a shallow copy of the list. Equivalent to a[:].

# Different Data Sets

# Tuples are unmutable lists
pair = (3, 5) # Tuples are surrounded by parentheses instead of square brackets
pair[0] #= 3
x,y = pair
pair[1] = 6 #* Error -- unmutable

# Sets are unordered lists of unique items
games = {"Super Mario Bros.", "Tetris", "Chrono Trigger", "Tetris", "The Legend of Zelda"} # One "Tetris" iteration will be removed
games.add("Red Dead Redemption")
favoriteGames = {"Chrono Trigger", "Tetris", "Hollow Knight"}
games - favoriteGames #= {'Super Mario Bros.', 'Red Dead Redemption', 'The Legend of Zelda'}
games & favoriteGames #= {'Chrono Trigger', 'Tetris'}
games | favoriteGames #= {'Hollow Knight', 'Tetris', 'Super Mario Bros.', 'Red Dead Redemption', 'Chrono Trigger', 'The Legend of Zelda'}

# Dictionaries are like associative arrays
my_dict = {'sape': 4139, 'guido': 4127, 'jack': 4098}
dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])
dict(sape=4139, guido=4127, jack=4098) # When the keys are simple strings, pairs can be assigned using keyword arguments
"sape" in my_dict #= True
"foo" not in my_dict #= True
my_dict['xxx'] #= KeyError
my_dict.get("xxx") #= None
my_dict.get("xxx", default_value) # assign a default value if the key doesn't exist
list(my_dict) == ['sape', 'guido', 'jack']
sorted(my_dict) == ['guido', 'jack', 'sape']
#merge two dicts
merged = {**d1, **d2}

# Dictionary operations
# Some return view objects, which are dynamically changed if the dictionary changes
list(d) #Return a list of all the keys used in the dictionary d.
len(d) #Return the number of items in the dictionary d.
d[key] #Return the item of d with key key. Raises a KeyError if key is not in the map.
d[key] = value #Set d[key] to value.
del d[key] #Remove d[key] from d. Raises a KeyError if key is not in the map.
key in d #Return True if d has a key key, else False.
key not in d #Equivalent to not key in d.
iter(d) #Return an iterator over the keys of the dictionary. This is a shortcut for iter(d.keys()).
reversed(d) #Return a reverse iterator over the keys of the dictionary. This is a shortcut for reversed(d.keys()).
d.clear() #Remove all items from the dictionary.
d.copy() #Return a shallow copy of the dictionary.
d.get(key[, default]) #Return the value for key if key is in the dictionary, else default. If default is not given, it defaults to None, so that this method never raises a KeyError.
d.items() #Return a new view of the dictionary’s items ((key, value) pairs). See the documentation of view objects.
for k, v in my_dict.items():
    print (k, v)
d.keys() #Return a new view of the dictionary’s keys. See the documentation of view objects.
d.pop(key[, default]) #If key is in the dictionary, remove it and return its value, else return default. If default is not given and key is not in the dictionary, a KeyError is raised.
d.popitem() #Remove and return a (key, value) pair from the dictionary. Pairs are returned in LIFO order.
d.setdefault(key[, default]) #If key is in the dictionary, return its value. If not, insert key with a value of default and return default. default defaults to None.
d.update([other]) #Update the dictionary with the key/value pairs from other, overwriting existing keys. Return None.
#update() accepts either another dictionary object or an iterable of key/value pairs (as tuples or other iterables of length two). If keyword arguments are specified, the dictionary is then updated with those key/value pairs: d.update(red=1, blue=2).
d.values() #Return a new view of the dictionary’s values. See the documentation of view objects.

# Dictionary view usage
dishes = {'eggs': 2, 'sausage': 1, 'bacon': 1, 'spam': 500}
keys = dishes.keys()
values = dishes.values()
list(keys) #=['eggs', 'sausage', 'bacon', 'spam']
del dishes['eggs']
del dishes['sausage']
list(keys) #=['bacon', 'spam']
# set operations
keys & {'eggs', 'bacon', 'salad'} #={'bacon'}
keys ^ {'sausage', 'juice'} #={'juice', 'sausage', 'bacon', 'spam'}

# Code that modifies a collection while iterating over that same collection can be tricky to get right. 
# Instead, it is usually more straight-forward to loop over a copy of the collection or to create a new collection:
# Strategy:  Iterate over a copy
for user, status in users.copy().items():
    if status == 'inactive':
        del users[user]
# Strategy:  Create a new collection
active_users = {}
for user, status in users.items():
    if status == 'active':
        active_users[user] = status

# FUNCTIONS #

# Denying a function's default to be changed in subsequent calls
def f(a, L=None):
    if L is None:
        L = []
    L.append(a)
    return L

# Deliver a dictionary to a function
def parrot(voltage, state='a stiff', action='voom'):
    print("-- This parrot wouldn't", action, end=' ')
    print("if you put", voltage, "volts through it.", end=' ')
    print("E's", state, "!")
d = {"action": "VOOM", "voltage": "four million", "state": "bleedin' demised"}
parrot(**d)

# Pack a *list and **dictionary into the function
def cheeseshop(kind, *arguments, **keywords):
    print("-- Do you have any", kind, "?") #= Limburger
    for arg in arguments:
        print(arg) #= "It's very runny, sir.", "It's really very, VERY runny, sir."
    for kw in keywords:
        print(kw, ":", keywords[kw]) #= <Dict>
cheeseshop("Limburger", "It's very runny, sir.", "It's really very, VERY runny, sir.",
           shopkeeper="Michael Palin", client="John Cleese", sketch="Cheese Shop Sketch")
# Another example
def concat(*args, sep="/"):
    return sep.join(args)
concat("earth", "mars", "venus") == 'earth/mars/venus'

# Anonymous functions can be made with the lambda keyword
def make_incrementor(n):
    return lambda x: x + n

f = make_incrementor(42)
f(0) #= 42
f(1) #= 43

# CLASSES #

class MyClass:
    """A simple example class"""
    i = 12345
    def f(self):
        return 'hello world'
# attributes assigned to MyClass:
Myclass.__doc__ == """A simple example class"""
Myclass.i == 12345
MyClass.f()

# PYTHON STANDARD LIBRARY #

# Datetime
from datetime import datetime

datetime.now() # aware local date and time
datetime.utcnow() # naive UTC date and time

# Pillow (Pythin Image Library)
from PIL import Image
im = Image.open("hopper.ppm")
print(im.format, im.size, im.mode) #= PPM (512, 512) RGB