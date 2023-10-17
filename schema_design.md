# Schema Design

## SQL that creates the tables

```sql
CREATE TABLE "users" (
  "StudentID" varchar PRIMARY KEY,
  "Email" varchar,
  "Username" varchar,
  "Fname" varchar,
  "Lname" varchar,
  "Password" varchar
);

CREATE TABLE "book_post" (
  "PostID" integer PRIMARY KEY,
  "Description" varchar,
  "BookPicture" varchar,
  "BookCondition" integer,
  "PostedBy" varchar,
  "PostTime" timestamp,
  "Price" integer,
  "BookID" integer
);

CREATE TABLE "purchase" (
  "PostID" integer PRIMARY KEY,
  "PurchasedBy" varchar,
  "PurchaseTime" timestamp
);

CREATE TABLE "buy_request" (
  "RequestedBy" varchar,
  "ToBuy" integer,
  PRIMARY KEY ("RequestedBy", "ToBuy")
);

CREATE TABLE "book" (
  "ISBN" integer PRIMARY KEY,
  "Author" varchar,
  "Title" varchar,
  "Genre" varchar,
  "Edition" varchar,
  "Publisher" varchar
);

CREATE TABLE "course" (
  "CourseID" integer,
  "CourseName" varchar,
  "Semester" varchar,
  "Instructor" varchar,
  PRIMARY KEY ("CourseID", "Department")

);

CREATE TABLE "course_dept" (
    "CourseID" integer,
    "Semester" varchar,
    "Department" varchar,
    PRIMARY KEY ("CourseID", "Department", "Semester")
)

CREATE TABLE "assigned_book" (
  "CourseID" varchar,
  "BookID" integer,
  PRIMARY KEY ("CourseID", "BookID")
);

COMMENT ON COLUMN "book_post"."BookPicture" IS 'Store image URL';

COMMENT ON COLUMN "book_post"."BookCondition" IS 'Categorical variable';

ALTER TABLE "book_post" ADD FOREIGN KEY ("PostedBy") REFERENCES "users" ("StudentID");

ALTER TABLE "purchase" ADD FOREIGN KEY ("PurchasedBy") REFERENCES "users" ("StudentID");

ALTER TABLE "buy_request" ADD FOREIGN KEY ("RequestedBy") REFERENCES "users" ("StudentID");

ALTER TABLE "buy_request" ADD FOREIGN KEY ("ToBuy") REFERENCES "book_post" ("PostID");

ALTER TABLE "book_post" ADD FOREIGN KEY ("BookID") REFERENCES "book" ("ISBN");

ALTER TABLE "assigned_book" ADD FOREIGN KEY ("CourseID") REFERENCES "course" ("CourseID");

ALTER TABLE "assigned_book" ADD FOREIGN KEY ("BookID") REFERENCES "book" ("ISBN");

ALTER TABLE "purchase" ADD FOREIGN KEY ("PostID") REFERENCES "book_post" ("PostID");


```

## Schema Design

In this section, we will discuss the schema design of our database. We will also discuss the rationale behind our design choices.

Our schema consists of 8 tables: `users`, `book_post`, `purchase`, `buy_request`, `book`, `course`, `course_dept` and `assigned_book`. The `users` table stores information about the users of our application. The `book_post` table stores information about the books that are posted for sale. The `purchase` table stores information about the purchase event of a customer perchasing a book. The `buy_request` table stores information about the books that are requested to be purchased. The `book` table stores information about all the books in our databases. The `course` table stores information about all the courses offered by NTU. The `course_dept` table stores information about which department a course belongs to. The `assigned_book` table stores information about which books are assigned to which courses.

The primary key of `users` is `StudentID`, which is the student ID in NTU. 

The primary key of `book_post` is `PostID`, which is the ID of the post. The `PostedBy` attribute in `book_post` has a reference to `StudentID` in `users` table. The `BookID` attribute in `book_post` has a reference to `ISBN` in `book` table.

 The relation `purchase` was derived from the relation `purchased` in ER diagram, although the relation theoratically can be a part of the `book_post` relation and does not lead to denormalization, however, since not every book post will find a buyer, it is better to put the purchase related functions to a separate table to avoid too many null values in our database. The primary key of `purchase` is a combination of `PostID` and `PurchasedBy`, which is the ID of the post and the student ID of the purchaser. The `purchase` relation has a reference to `PostID` in `book_post` table and a reference to `StudentID` in `users` table.
 
 The `buy_request` relation is also derived from `request_to_buy` and M to N relation in the ER diagram. The primary key of `buy_request` is a combination of `RequestedBy` and `ToBuy`, which is the student ID of the requester and the ID of the post. The `buy_request` relation has a reference to `RequestedBy` in `users` table and a reference to `ToBuy` in `book_post` table. 
 
 The primary key of `book` is `ISBN`, which is the ISBN of the book. 
 
 The primary key of `course` is `CourseID` and `semester`, which is the serial number and the semester of the course. 

 The primary key of `course_dept` is a combination of `CourseID`, `Department` and `Semester`, which is the serial number, the department and the semester of the course. The `CourseID` attribute in `course_dept` has a reference to `CourseID` in `course` table. The `Semester` attribute in `course_dept` has a reference to `Semester` in `course` table. The `Department` attribute in `course_dept` has a reference to `Department` in `course` table. We separate `course_dept` to a separate table because a course can belong to multiple departments. If we make `Department` into the original `course` table, then the candidate keys will be `CourseID`, `Semester`, and `Department`, since this is the only way to determine a tuple in the database due to the rule of NTU. However, the `instructor` attribute only depends on `CourseID` and `Semester` (a different instructor will lead to different serial number due to NTU course regulations), so if we do not make `course_dept` a separate table, our database will violate 2NF. ANd since it is very common for a course to belong to different department, we consider it is necessary to conduct normalization.
 
 The primary key of `assigned_book` is a combination of `CourseID` and `BookID`, which is the course ID and the ISBN of the book. The `CourseID` attribute in `assigned_book` has a reference to `CourseID` in `course` table. The `BookID` attribute in `assigned_book` has a reference to `ISBN` in `book` table.

## Data Dictionary

### users
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| StudentID | Student ID of the user | varchar | Primary Key | Not Null | 9 digits |
| Email | Email of the user | varchar | | Not Null | |
| Username | Username of the user | varchar | | Not Null | |
| Fname | First name of the user | varchar | | Not Null | |
| Lname | Last name of the user | varchar | | Not Null | |
| Password | Hash of the password of the user | varchar | | Not Null | |

### book_post
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| PostID | ID of the post | integer | Primary Key | Not Null | |
| Description | Description of the book | varchar | | Not Null | |
| BookPicture | URL of the book picture | varchar | | Not Null | |
| BookCondition | Condition of the book | integer | | Not Null | 1-5 |
| PostedBy | Student ID of the user who posted the book | varchar | Foreign Key (`users.StudentID`) | Not Null | |
| PostTime | Time of the post | timestamp | | Not Null | |
| Price | Price of the book | integer | | Not Null | |
| BookID | ISBN of the book | integer | Foreign Key (`book.ISBN`) | Not Null | |

| Referential Triggers | On Delete | On Update |
| --- | --- | --- |
| `users.StudentID` | Cascade | Cascade |
| `book.ISBN` | Cascade | Cascade |

### purchase
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| PostID | ID of the post | integer | Primary Key, Foreign Key (`book_post.PostID`) | Not Null | |
| PurchasedBy | Student ID of the user who purchased the book | varchar | Foreign Key (`users.StudentID`) | Not Null | |
| PurchaseTime | Time of the purchase | timestamp | | Not Null | |

| Referential Triggers | On Delete | On Update |
| --- | --- | --- |
| `book_post.PostID` | No Action | Cascade |

### buy_request
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| RequestedBy | Student ID of the user who requested to buy the book | varchar | Primary Key, Foreign Key (`users.StudentID`) | Not Null | |
| ToBuy | ID of the post | integer | Primary Key, Foreign Key (`book_post.PostID`) | Not Null | |

| Referential Triggers | On Delete | On Update |
| --- | --- | --- |
| `users.StudentID` | Cascade | Cascade |
| `book_post.PostID` | Cascade | Cascade |

### book
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| ISBN | ISBN of the book | integer | Primary Key | Not Null | Required to be a valid ISBN number |
| Author | Author of the book | varchar | | Not Null | |
| Title | Title of the book | varchar | | Not Null | |
| Genre | Genre of the book | varchar | | Not Null | |
| Edition | Edition of the book | varchar | | Not Null | |
| Publisher | Publisher of the book | varchar | | Not Null | |

### course
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| CourseID | Serial number of the course (流水號) | varchar | Primary Key | Not Null | |
| CourseName | Name of the course | varchar | | Not Null | |
| Semester | Semester of the course | varchar | Primary Key | Not Null | |
| Instructor | Instructor of the course | varchar | | Not Null | |

### course_dept
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| CourseID | Serial number of the course (流水號) | varchar | Primary Key, Foreign Key (`course.CourseID`) | Not Null | |
| Semester | Semester of the course | varchar | Primary Key | Not Null | |
| Department | Department of the course | varchar | Primary Key | Not Null | |

| Referential Triggers | On Delete | On Update |
| --- | --- | --- |
| `course.CourseID` | Cascade | Cascade |
| `course.Semester` | Cascade | Cascade |


### assigned_book
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| CourseID | Course ID of the course | varchar | Primary Key, Foreign Key (`course.CourseID`) | Not Null | |
| BookID | ISBN of the book | integer | Primary Key, Foreign Key (`book.ISBN`) | Not Null | |

| Referential Triggers | On Delete | On Update |
| --- | --- | --- |
| `course.CourseID` | Cascade | Cascade |
| `book.ISBN` | Cascade | Cascade |

## Analysis of schema normalization

### 1NF
Since all the attributes in our schema are atomic, our schema is in 1NF.

### 2NF
Our database is in 2NF because there is no partial dependency in our schema. From the previous section, we can see that the attributes in all table fully depends on the primary key of the table and we have conducted necessary measures to prevent violation of 2NF. And also our database is in 1NF, so our database is in 2NF.

### 3NF
Our database is in 3NF because there is no transitive dependency in our schema. From the previous section, we can see that the attributes in all table does not depend on any non-key attribute. And since our database is in 2NF, our database is in 3NF.

### BCNF
Our database is in BCNF because there is no non-trivial functional dependency that depends on a non super key in our schema. From the previous section, we can see that the attributes in all table does not depend on any non-key attribute. And since our database is in 3NF, our database is in BCNF.

### 4NF
We can see that there is no multi-valued dependency in our schema. Therefore, our database is in 4NF.
 


