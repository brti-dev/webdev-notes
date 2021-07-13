# Queries

## Create

### Inheritance

```
CREATE TABLE cities (
  name       text,
  population real,
  elevation  int     -- (in ft)
);
CREATE TABLE capitals (
  state      char(2) UNIQUE NOT NULL
) INHERITS (cities);
```

All `capitals` rows inherit columns from `cities` table. A capital will be a city and appear in selects of `cities` but a city won't necessarily be a capital.

`SELECT * FROM cities;` Output:

```
      name      | population | elevation
----------------+------------+-----------
 Fairfax        |            |
 Virginia Beach |            |
 Winchester     |            |
 Richmond       |            |
(4 rows)
```

`Select * FROM capitals` Output:

```
   name   | population | elevation | state
----------+------------+-----------+-------
 Richmond |            |           | VA
(1 row)
```

To exclude `capitals`: `SELECT name, elevation FROM ONLY cities WHERE elevation > 500;`

## Insert

```
INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27');
INSERT INTO weather (city, temp_lo, temp_hi, prcp, date)
    VALUES ('San Francisco', 43, 57, 0.0, '1994-11-29');
```

## Delete

```
DROP TABLE name;
```

## Select

```psql
SELECT * FROM weather;

SELECT city, temp_lo, temp_hi, prcp, date FROM weather;

SELECT city, (temp_hi+temp_lo)/2 AS temp_avg, date FROM weather;

SELECT * FROM weather WHERE city = 'San Francisco' AND prcp > 0.0;

SELECT * FROM weather ORDER BY city;

SELECT * FROM weather ORDER BY city, temp_lo;

SELECT DISTINCT city FROM weather;

SELECT DISTINCT city FROM weather ORDER BY city;
```

### Joins

```psql
SELECT * FROM weather, cities WHERE city = name;

SELECT weather.city, weather.temp_lo, weather.temp_hi,
       weather.prcp, weather.date, cities.location
    FROM weather, cities
    WHERE cities.name = weather.city;
```

## Aggregate Functions

- count
- sum
- avg (average)
- max (maximum)
- min (minimum)

```
SELECT max(temp_lo) FROM weather;

*SELECT city FROM weather WHERE temp_lo = max(temp_lo);
SELECT city FROM weather
    WHERE temp_lo = (SELECT max(temp_lo) FROM weather);

SELECT city, max(temp_lo)
    FROM weather
    GROUP BY city;

SELECT city, max(temp_lo)
    FROM weather
    GROUP BY city
    HAVING max(temp_lo) < 40;

SELECT city, max(temp_lo)
    FROM weather
    WHERE city LIKE 'S%'            -- (1)
    GROUP BY city
    HAVING max(temp_lo) < 40;
```

## Window Functions

Complex calculations of output

```psql
SELECT depname, empno, salary, avg(salary) OVER (PARTITION BY depname) FROM empsalary;
```

Output:

```
  depname  | empno | salary |          avg
-----------+-------+--------+-----------------------
 develop   |    11 |   5200 | 5020.0000000000000000
 develop   |     7 |   4200 | 5020.0000000000000000
 develop   |     9 |   4500 | 5020.0000000000000000
 develop   |     8 |   6000 | 5020.0000000000000000
 develop   |    10 |   5200 | 5020.0000000000000000
 personnel |     5 |   3500 | 3700.0000000000000000
 personnel |     2 |   3900 | 3700.0000000000000000
 sales     |     3 |   4800 | 4866.6666666666666667
 sales     |     1 |   5000 | 4866.6666666666666667
 sales     |     4 |   4800 | 4866.6666666666666667
(10 rows)
```

## Updates

```
UPDATE weather
    SET temp_hi = temp_hi - 2,  temp_lo = temp_lo - 2
    WHERE date > '1994-11-28';
```

## Deletions

```
DELETE FROM weather WHERE city = 'Hayward';
```

# Advanced Features

## Views

Views allow you to encapsulate the details of the structure of your tables, which might change as your application evolves, behind consistent interfaces.

Views can be used in almost any place a real table can be used. Building views upon other views is not uncommon.

```psql
CREATE VIEW myview AS
    SELECT city, temp_lo, temp_hi, prcp, date, location
        FROM weather, cities
        WHERE city = name;

SELECT * FROM myview;
```

## Foreign Keys

```psql
CREATE TABLE cities (
        city     varchar(80) primary key, -- Create key
        location point
);
CREATE TABLE weather (
        city      varchar(80) references cities(city), -- Reference key
        temp_lo   int,
        temp_hi   int,
        prcp      real,
        date      date
);
* INSERT INTO weather VALUES ('Berkeley', 45, 53, 0.0, '1994-11-28'); --fails
```

## Transactions

```
BEGIN;
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
-- etc etc
COMMIT;
```
