# Schema Design

## SQL that creates the tables

```sql
CREATE TABLE "users" (
  "StudentID" varchar PRIMARY KEY,
  "SchoolEmail" varchar,
  "Username" varchar,
  "Fname" varchar,
  "Lname" varchar,
  "Password" varchar
);

CREATE TABLE "usedBook" (
  "UsedBookID" integer PRIMARY KEY,
  "AdditionalDetails" varchar,
  "BookPicture" varchar,
  "BookCondition" integer,
  "Seller" varchar,
  "ListTime" timestamp,
  "AskingPrice" integer,
  "BookID" integer
);

CREATE TABLE "purchase" (
  "UsedBookID" integer PRIMARY KEY,
  "Buyer" varchar,
  "PurchaseTime" timestamp
);

CREATE TABLE "purchaseRequest" (
  "Buyer" varchar,
  "UsedBookID" integer,
  PRIMARY KEY ("Buyer", "UsedBookID")
);

CREATE TABLE "book" (
  "ISBN" integer PRIMARY KEY,
  "Author" varchar,
  "Title" varchar,
  "Genre" varchar,
  "Edition" varchar,
  "Publisher" varchar,
  "SuggestedRetailPrice" integer
);

CREATE TABLE "course" (
  "CourseID" integer,
  "CourseName" varchar,
  "Semester" varchar,
  "InstructorName" varchar,
  PRIMARY KEY ("CourseID", "Semester")
);

CREATE TABLE "courseDept" (
  "CourseID" integer,
  "Semester" varchar,
  "DepartmentName" varchar,
  PRIMARY KEY ("CourseID", "Semester", "DepartmentName")
);

CREATE TABLE "textbook" (
  "CourseID" varchar,
  "BookID" integer,
  PRIMARY KEY ("CourseID", "BookID")
);

CREATE TABLE "rating" (
  "Rater" varchar,
  "RatedStudent" varchar,
  "StarsCount" integer,
  "Comment" varchar,
  PRIMARY KEY ("Rater", "RatedStudent")
);

CREATE TABLE "comment" (
  "UsedBookID" integer,
  "Commenter" varchar,
  "Comment" varchar,
  PRIMARY KEY ("UsedBookID", "Commenter")
);

COMMENT ON COLUMN "usedBook"."BookPicture" IS 'Store image URL';

COMMENT ON COLUMN "usedBook"."BookCondition" IS 'Categorical variable';

ALTER TABLE "usedBook" ADD FOREIGN KEY ("Seller") REFERENCES "users" ("StudentID");

ALTER TABLE "purchase" ADD FOREIGN KEY ("Buyer") REFERENCES "users" ("StudentID");

ALTER TABLE "purchaseRequest" ADD FOREIGN KEY ("Buyer") REFERENCES "users" ("StudentID");

ALTER TABLE "purchaseRequest" ADD FOREIGN KEY ("UsedBookID") REFERENCES "usedBook" ("UsedBookID");

ALTER TABLE "usedBook" ADD FOREIGN KEY ("BookID") REFERENCES "book" ("ISBN");

ALTER TABLE "textbook" ADD FOREIGN KEY ("CourseID") REFERENCES "course" ("CourseID");

ALTER TABLE "textbook" ADD FOREIGN KEY ("BookID") REFERENCES "book" ("ISBN");

ALTER TABLE "purchase" ADD FOREIGN KEY ("UsedBookID") REFERENCES "usedBook" ("UsedBookID");

ALTER TABLE "courseDept" ADD FOREIGN KEY ("CourseID") REFERENCES "course" ("CourseID");

ALTER TABLE "courseDept" ADD FOREIGN KEY ("Semester") REFERENCES "course" ("Semester");

ALTER TABLE "rating" ADD FOREIGN KEY ("Rater") REFERENCES "users" ("StudentID");

ALTER TABLE "rating" ADD FOREIGN KEY ("RatedStudent") REFERENCES "users" ("StudentID");

ALTER TABLE "comment" ADD FOREIGN KEY ("UsedBookID") REFERENCES "usedBook" ("UsedBookID");

ALTER TABLE "comment" ADD FOREIGN KEY ("Commenter") REFERENCES "users" ("StudentID");

```
## Schema Design

In this section, we will discuss the schema design of our database. We will also discuss the rationale behind our design choices.

Our schema consists of 9 tables: `users`, `usedBook`, `purchase`, `purchaseRequest`, `book`, `course`, `courseDept`, `textbook`, `rating`, and `comment`. The `users` table stores information about the users of our application. The `usedBook` table stores information about the used books that are posted for sale. The `purchase` table stores information about the purchase event of a customer purchasing a used book. The `purchaseRequest` table stores information about the books that are requested to be purchased. The `book` table stores information about all the books in our database. The `course` table stores information about all the courses offered by NTU. The `courseDept` table stores information about which department a course belongs to. The `textbook` table stores information about which books are assigned to which courses. The `rating` table stores information about user ratings, and the `comment` table stores user comments.

The primary key of `users` is `StudentID`, which is the student ID in NTU.

The primary key of `usedBook` is `UsedBookID`, which is the ID of the used book post. The `Seller` attribute in `usedBook` has a reference to `StudentID` in `users` table. The `BookID` attribute in `usedBook` has a reference to `ISBN` in `book` table.

The relation `purchase` was derived from the relation `purchased` in ER diagram, although the relation theoretically can be a part of the `usedBook` relation and does not lead to denormalization, however, since not every used book post will find a buyer, it is better to put the purchase related functions into a separate table to avoid too many null values in our database. The primary key of `purchase` is `UsedBookID`, which is the ID of the used book post. The `purchase` relation has a reference to `UsedBookID` in `usedBook` table and a reference to `StudentID` in `users` table.

The `purchaseRequest` relation is also derived from `request_to_buy` and M to N relation in the ER diagram. The primary key of `purchaseRequest` is a combination of `Buyer` and `UsedBookID`, which is the student ID of the requester and the ID of the used book post. The `purchaseRequest` relation has a reference to `Buyer` in `users` table and a reference to `UsedBookID` in `usedBook` table.

The primary key of `book` is `ISBN`, which is the ISBN of the book.

The primary key of `course` is a combination of `CourseID` and `Semester`, which is the serial number and the semester of the course.

The primary key of `courseDept` is a combination of `CourseID`, `DepartmentName`, and `Semester`, which is the serial number, the department name, and the semester of the course. The `CourseID` attribute in `courseDept` has a reference to `CourseID` in `course` table. The `Semester` attribute in `courseDept` has a reference to `Semester` in `course` table. The `DepartmentName` attribute in `courseDept` has a reference to `DepartmentName` in `course` table. We separate `courseDept` into a separate table because a course can belong to multiple departments. If we make `DepartmentName` part of the original `course` table, then the candidate keys will be `CourseID`, `Semester`, and `DepartmentName`, since this is the only way to determine a tuple in the database due to the rule of NTU. However, the `InstructorName` attribute only depends on `CourseID` and `Semester` (a different instructor will lead to a different serial number due to NTU course regulations), so if we do not make `courseDept` a separate table, our database will violate 2NF. And since it is very common for a course to belong to different departments, we consider it necessary to conduct normalization.

The primary key of `textbook` is a combination of `CourseID` and `BookID`, which is the course ID and the ISBN of the book. The `CourseID` attribute in `textbook` has a reference to `CourseID` in `course` table. The `BookID` attribute in `textbook` has a reference to `ISBN` in `book` table.

The `rating` table stores information about user ratings, and the `comment` table stores user comments. The `Rater` attribute in the `rating` table has a reference to `StudentID` in the `users` table, and the `RatedStudent` attribute in the `rating` table also has a reference to `StudentID` in the `users` table. The `UsedBookID` attribute in the `comment` table has a reference to the `UsedBookID` in the `usedBook` table, and the `Commenter` attribute in the `comment` table has a reference to `StudentID` in the `users` table.

## Data Dictionary

### users
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| StudentID | Student ID of the user | varchar | Primary Key | Not Null | 9 digits |
| SchoolEmail | School email of the user | varchar | | Not Null | |
| Username | Username of the user | varchar | | Not Null | |
| Fname | First name of the user | varchar | | Not Null | |
| Lname | Last name of the user | varchar | | Not Null | |
| Password | Hash of the password of the user | varchar | | Not Null | |

### usedBook
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| UsedBookID | ID of the used book post | integer | Primary Key | Not Null | |
| AdditionalDetails | Additional details about the book | varchar | | Not Null | |
| BookPicture | URL of the book picture | varchar | | Not Null | |
| BookCondition | Condition of the book | integer | | Not Null | 1-5 |
| Seller | Student ID of the user who posted the book | varchar | Foreign Key (`users.StudentID`) | Not Null | |
| ListTime | Time of the post | timestamp | | Not Null | |
| AskingPrice | Price of the book | integer | | Not Null | |
| BookID | ISBN of the book | integer | Foreign Key (`book.ISBN`) | Not Null | |

| Referential Triggers | On Delete | On Update |
| --- | --- | --- |
| `users.StudentID` | Cascade | Cascade |
| `book.ISBN` | Cascade | Cascade |

### purchase
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| UsedBookID | ID of the used book post | integer | Primary Key, Foreign Key (`usedBook.UsedBookID`) | Not Null | |
| Buyer | Student ID of the user who purchased the book | varchar | Foreign Key (`users.StudentID`) | Not Null | |
| PurchaseTime | Time of the purchase | timestamp | | Not Null | |

| Referential Triggers | On Delete | On Update |
| --- | --- | --- |
| `usedBook.UsedBookID` | No Action | Cascade |

### purchaseRequest
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| Buyer | Student ID of the user who requested to buy the book | varchar | Primary Key, Foreign Key (`users.StudentID`) | Not Null | |
| UsedBookID | ID of the used book post | integer | Primary Key, Foreign Key (`usedBook.UsedBookID`) | Not Null | |

| Referential Triggers | On Delete | On Update |
| --- | --- | --- |
| `users.StudentID` | Cascade | Cascade |
| `usedBook.UsedBookID` | Cascade | Cascade |

### book
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| ISBN | ISBN of the book | integer | Primary Key | Not Null | Required to be a valid ISBN number |
| Author | Author of the book | varchar | | Not Null | |
| Title | Title of the book | varchar | | Not Null | |
| Genre | Genre of the book | varchar | | Not Null | |
| Edition | Edition of the book | varchar | | Not Null | |
| Publisher | Publisher of the book | varchar | | Not Null | |
| SuggestedRetailPrice | Suggested retail price of the book | integer | | Not Null | |

### course
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| CourseID | Serial number of the course | integer | Primary Key | Not Null | |
| CourseName | Name of the course | varchar | | Not Null | |
| Semester | Semester of the course | varchar | Primary Key | Not Null | |
| InstructorName | Instructor of the course | varchar | | Not Null | |

### courseDept
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| CourseID | Serial number of the course | integer | Primary Key, Foreign Key (`course.CourseID`) | Not Null | |
| Semester | Semester of the course | varchar | Primary Key | Not Null | |
| DepartmentName | Department of the course | varchar | Primary Key | Not Null | |

| Referential Triggers | On Delete | On Update |
| --- | --- | --- |
| `course.CourseID` | Cascade | Cascade |
| `course.Semester` | Cascade | Cascade |

### textbook
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| CourseID | Course ID of the course | varchar | Primary Key, Foreign Key (`course.CourseID`) | Not Null | |
| BookID | ISBN of the book | integer | Primary Key, Foreign Key (`book.ISBN`) | Not Null | |

| Referential Triggers | On Delete | On Update |
| --- | --- | --- |
| `course.CourseID` | Cascade | Cascade |
| `book.ISBN` | Cascade | Cascade |

### rating
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| Rater | Student ID of the user providing the rating | varchar | Primary Key, Foreign Key (`users.StudentID`) | Not Null | |
| RatedStudent | Student ID of the user being rated | varchar | Primary Key, Foreign Key (`users.StudentID`) | Not Null | |
| StarsCount | Number of stars in the rating | integer | | Not Null | |
| Comment | Additional comment in the rating | varchar | | | |

### comment
| Column name | Meaning | Data Type | Key | Constraint | Domain |
| --- | --- | --- | --- | --- | --- |
| UsedBookID | ID of the used book post | integer | Primary Key, Foreign Key (`usedBook.UsedBookID`) | Not Null | |
| Commenter | Student ID of the user leaving the comment | varchar | Primary Key, Foreign Key (`users.StudentID`) | Not Null | |
| Comment | The comment left by the user | varchar | | | |

## Analysis of schema normalization

### 1NF
Since all the attributes in our schema are atomic, our schema is in 1NF.

### 2NF
Our database is in 2NF because there is no partial dependency in our schema. The attributes in all tables fully depend on the primary key of the table, and we have conducted necessary measures to prevent the violation of 2NF. Our database is also in 1NF, so it is in 2NF.

### 3NF
Our database is in 3NF because there is no transitive dependency in our schema. The attributes in all tables do not depend on any non-key attribute. Since our database is in 2NF, it is in 3NF.

### BCNF
Our database is in BCNF because there is no non-trivial functional dependency that depends on a non-super key in our schema. The attributes in all tables do not depend on any non-key attribute. Since our database is in 3NF, it is in BCNF.

### 4NF
There is no multi-valued dependency in our schema. Therefore, our database is in 4NF.

 


