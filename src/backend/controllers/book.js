import { db } from "../index.js";

export const searchBooks = async (req, res) => {
  const bookName = req.query.BookName;
  const authorName = req.query.AuthorName;
  const courseName = req.query.CourseName;
  const deptCode = req.query.DeptCode;
  const isbn = req.query.ISBN;
  if (!bookName && !authorName && !courseName && !deptCode && !isbn) {
    return res
      .status(400)
      .json({ error: "At least one search parameter is required." });
  }

  // I am not sure the below SQL is correct or not
  try {
    const booksQuery = await db.query(`
      SELECT b.ISBN, b.Title, b.PublisherName, b.AuthorName, MIN(ub.AskingPrice) AS LowestPrice, MAX(ub.AskingPrice) AS HighestPrice 
      FROM BOOK AS b
        JOIN USEDBOOK AS ub ON ub.bookID = b.ISBN
        LEFT JOIN TEXTBOOK AS tb ON tb.bookID = b.ISBN
        LEFT JOIN COURSEDEPT AS cd ON cd.serialNumber = tb.serialNumber AND cd.semester = tb.semester
        LEFT JOIN COURSE AS c ON c.serialNumber = tb.serialNumber AND c.semester = tb.semester
      WHERE LOWER(b.Title) LIKE LOWER('%${bookName || ""}%')
      AND LOWER(b.AuthorName) LIKE LOWER('%${authorName || ""}%')
      ${deptCode ? `AND cd.departmentCode = '${deptCode}'` : ``}
      ${
        courseName
          ? `AND LOWER(c.courseName) LIKE LOWER('%${courseName}%')`
          : ``
      }
      AND b.ISBN LIKE '%${isbn || ""}%'
      GROUP BY b.ISBN
    `);
    const books = await Promise.all(
      booksQuery.rows.map(async (book) => {
        const genreQuery = await db.query(`
        SELECT g.genre
        FROM GENRE AS g
        WHERE g.bookID = '${book.isbn}'
      `);
        const genre = genreQuery.rows.map((row) => row.genre);
        const deptQuery = await db.query(`
        SELECT cd.departmentCode
        FROM COURSEDEPT AS cd
          JOIN TEXTBOOK AS tb ON tb.serialNumber = cd.serialNumber AND tb.semester = cd.semester
        WHERE tb.bookID = '${book.isbn}'
      `);
        const dept = deptQuery.rows.map((row) => row.departmentcode);
        return {
          ISBN: book.isbn,
          Title: book.title,
          PublisherName: book.publishername,
          AuthorName: book.authorname,
          Genres: genre,
          Departments: dept,
          LowestPrice: book.lowestprice,
          HighestPrice: book.highestprice,
        };
      }),
    );
    return res.status(200).json({ data: books });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getBookInfoAndUsedBooks = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ error: "ID of the book (ISBN) is required." });
  }

  try {
    const bookInfoQuery = await db.query(`
      SELECT b.Title, b.PublisherName
      FROM BOOK AS b
      WHERE b.ISBN = '${id}'
    `);
    if (bookInfoQuery.rows.length === 0) {
      return res.status(404).json({ error: "Book not found." });
    }
    const bookInfo = bookInfoQuery.rows[0];

    const genreQuery = await db.query(`
      SELECT g.genre
      FROM GENRE AS g
      WHERE g.bookID = '${id}'
    `);
    const genre = genreQuery.rows.map((row) => row.genre);

    const departmentsQuery = await db.query(`
      SELECT dept.departmentCode
      FROM COURSEDEPT AS dept
        JOIN TEXTBOOK AS tb ON tb.serialNumber = dept.serialNumber AND tb.semester = dept.semester
      WHERE tb.bookID = '${id}'
    `);
    const departments = departmentsQuery.rows.map((row) => row.departmentcode);

    const usedBooksQuery = await db.query(`
      SELECT ub.usedBookID AS UsedBookID, 
        ub.bookPicture AS BookPicture, 
        ub.askingPrice AS AskingPrice, 
        ub.bookCondition AS BookCondition
      FROM USEDBOOK AS ub
      WHERE ub.bookid = '${id}'
    `);
    const usedBooks = usedBooksQuery.rows.map((book) => ({
      UsedBookID: book.usedbookid,
      BookPicture: book.bookpicture,
      AskingPrice: book.askingprice,
      BookCondition: book.bookcondition,
    }));

    return res.status(200).json({
      data: {
        Title: bookInfo.title,
        Publisher: bookInfo.publishername,
        Genres: genre,
        Departments: departments,
        UsedBooks: usedBooks,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addTextBookInfo = async (req, res) => {
  // TODO: auth

  const { BookID, SerialNumber, Semester } = req.body;
  if (!BookID || !SerialNumber || !Semester) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const checkBook = await db.query(`
      SELECT * FROM BOOK WHERE ISBN = '${BookID}'
    `);
    if (checkBook.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Book with that ISBN does not exist." });
    }

    const checkCourse = await db.query(`
      SELECT * FROM COURSE WHERE SerialNumber = '${SerialNumber}' AND Semester = '${Semester}'
    `);
    if (checkCourse.rows.length === 0) {
      return res
        .status(404)
        .json({
          error: "Course with that SerialNumber and Semester does not exist.",
        });
    }

    await db.query(`
      INSERT INTO TEXTBOOK (BookID, SerialNumber, Semester)
      VALUES ('${BookID}', '${SerialNumber}', '${Semester}')
    `);
    return res.status(200).json({
      data: {
        BookID: BookID,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addBook = async (req, res) => {
  // TODO: auth of admin

  const { ISBN, Title, Author, Genre, PublisherName, SuggestedRetailPrice } =
    req.body;
  if (
    !ISBN ||
    !Title ||
    !Author ||
    !Genre ||
    !PublisherName ||
    !SuggestedRetailPrice
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    await db.query(`
      INSERT INTO BOOK (ISBN, Title, PublisherName, SuggestedRetailPrice, AuthorName)
      VALUES ('${ISBN}', '${Title}', '${PublisherName}', '${SuggestedRetailPrice}', '${Author}')
    `);

    for (let g of Genre) {
      await db.query(`
        INSERT INTO GENRE (bookID, genre)
        VALUES ('${ISBN}', '${g}')
      `);
    }

    return res.status(200).json({
      data: {
        ISBN: ISBN,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateBookDetails = async (req, res) => {
  // TODO: auth of admin
  const { id } = req.params; // ISBN of the book
  let { ISBN, Title, Genre, AuthorName, PublisherName, SuggestedRetailPrice } =
    req.body; // Updated values
  if (
    !ISBN &&
    !Title &&
    !Genre &&
    !AuthorName &&
    !PublisherName &&
    !SuggestedRetailPrice
  ) {
    return res.status(400).json({ error: "At least one field is required." });
  }

  if (ISBN || Title || AuthorName || PublisherName || SuggestedRetailPrice) {
    try {
      await db.query(`
        UPDATE BOOK
        SET 
          ${ISBN ? `ISBN = '${ISBN}',` : ``}
          ${Title ? `Title = '${Title}',` : ``}
          ${AuthorName ? `AuthorName = '${AuthorName}',` : ``}
          ${PublisherName ? `PublisherName = '${PublisherName}',` : ``}
          ${
            SuggestedRetailPrice
              ? `SuggestedRetailPrice = '${SuggestedRetailPrice}'`
              : ``
          }
        WHERE ISBN = '${id}'
      `);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (Genre) {
    try {
      await db.query(`
        DELETE FROM GENRE
        WHERE bookID = '${ISBN ? ISBN : id}'
      `);
      for (let g of Genre) {
        await db.query(`
          INSERT INTO GENRE (bookID, genre)
          VALUES ('${id}', '${g}')
        `);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(200).json({
    data: {
      BookID: ISBN ? ISBN : id,
    },
  });
};

export const deleteBook = async (req, res) => {
  // TODO: auth of admin

  const { id } = req.params; // ISBN of the book
  try {
    await db.query(`
      DELETE FROM BOOK
      WHERE ISBN = '${id}'
    `);
    return res.status(200).json({
      data: {
        BookID: id,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
