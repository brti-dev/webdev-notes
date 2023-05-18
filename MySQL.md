# SELECT

Use IN for multiple queries of a single column
`SELECT 
    officeCode, 
    city, 
    phone, 
    country
FROM
    offices
WHERE
    country IN ('USA' , 'France');`
...`country NOT IN ('North Korea' , 'Syria');`

Use IN for a subquery
`SELECT    
    orderNumber, 
    customerNumber, 
    status, 
    shippedDate
FROM    
    orders
WHERE orderNumber IN
( # imagine this part as a comma list of orderNumber (948379,94393,84948)
     SELECT 
         orderNumber
     FROM 
         orderDetails
     GROUP BY 
         orderNumber
     HAVING SUM(quantityOrdered * priceEach) > 60000
);`

# Foreign Key

= References between two columns
Constraints placed to maintain connection integrity
Foreign key columns in child tables reference Primary key in parent table

```mysql
[CONSTRAINT constraint_name]
FOREIGN KEY [foreign_key_name] (column_name, ...)
REFERENCES parent_table(colunm_name,...)
[ON DELETE reference_option]
[ON UPDATE reference_option]

CREATE TABLE access (
  id VARCHAR(255) PRIMARY KEY,
  user_id BIGINT NOT NULL,
  expires DATETIME,
  INDEX i_user_id(user_id),
  CONSTRAINT fk_access_user_id
    FOREIGN KEY (user_id)
    REFERENCES user(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
```

Reference Options

- CASCADE: if a row from the parent table is deleted or updated, the values of the matching rows in the child table automatically deleted or updated.
- SET NULL: if a row from the parent table is deleted or updated, the values of the foreign key column (or columns) in the child table are set to NULL.
- RESTRICT: if a row from the parent table has a matching row in the child table, MySQL rejects deleting or updating rows in the parent table.

# Transactions

= Set of operations ultimately ensuring all actions were executed; No partial table modifications

```php
mysql_query("START TRANSACTION");
$a1 = mysql_query("INSERT INTO rarara (l_id) VALUES('1')");
$a2 = mysql_query("INSERT INTO rarara (l_id) VALUES('2')");
if ($a1 and $a2) {
    mysql_query("COMMIT");
} else {
    mysql_query("ROLLBACK");
}
```

# UUID

Generate an ID with strong entropy rather than auto-increment int.

# JSON

```mysql
CREATE TABLE medical_record (id INT, patient_id INT, attributes JSON, PRIMARY KEY (id));
INSERT INTO medical_record (patient_id, maladies) VALUES (1049, '{"has cough": true, "temperature": 38, "foo": {"bar": 1, "baz": 1}}');
SELECT * FROM medical_record WHERE attributes -> '$.foo.bar' > 0;
UPDATE medical_record SET attributes = JSON_INSERT(attributes, '$.has sore throat', true);
SELECT * FROM medical_record WHERE attributes -> '$.has sore throat' == true;
```
