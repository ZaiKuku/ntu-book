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
