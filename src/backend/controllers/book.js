import { db } from "../index.js"

export const searchBooks = async (req, res) => {
  const bookName = req.query.BookName;
  const authorName = req.query.AuthorName;
  const courseName = req.query.CourseName;
  const deptCode = req.query.DeptCode;
  const isbn = req.query.ISBN;
  if(!bookName && !authorName && !courseName && !deptCode && !isbn) {
    return res.status(400).json({message: "At least one search parameter is required."});
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
      WHERE LOWER(b.Title) LIKE LOWER('%${bookName || ''}%')
      AND LOWER(b.AuthorName) LIKE LOWER('%${authorName || ''}%')
      ${deptCode ? `AND cd.departmentCode = '${deptCode}'` : ``}
      ${courseName ? `AND LOWER(c.courseName) LIKE LOWER('%${courseName}%')` : ``}
      AND b.ISBN LIKE '%${isbn || ''}%'
      GROUP BY b.ISBN
    `);
    const books = await Promise.all(booksQuery.rows.map(async book => {
      const genreQuery = await db.query(`
        SELECT g.genre
        FROM GENRE AS g
        WHERE g.bookID = '${book.isbn}'
      `);
      const genre = genreQuery.rows.map(row => row.genre);
      const deptQuery = await db.query(`
        SELECT cd.departmentCode
        FROM COURSEDEPT AS cd
          JOIN TEXTBOOK AS tb ON tb.serialNumber = cd.serialNumber AND tb.semester = cd.semester
        WHERE tb.bookID = '${book.isbn}'
      `);
      const dept = deptQuery.rows.map(row => row.departmentcode);
      return {
        ISBN: book.isbn,
        Title: book.title,
        PublisherName: book.publishername,
        AuthorName: book.authorname,
        Genres: genre,
        Departments: dept,
        LowestPrice: book.lowestprice,
        HighestPrice: book.highestprice
      }
    }));
    console.log(books);
    return res.status(200).json(books);
  } catch(error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBookInfoAndUsedBooks = async (req, res) => {
  const { id } = req.params;
  if(!id) {
    return res.status(400).json({message: "ID of the book (ISBN) is required."});
  }

  try {
    const bookInfoQuery = await db.query(`
      SELECT b.Title, b.PublisherName
      FROM BOOK AS b
      WHERE b.ISBN = '${id}'
    `);
    if(bookInfoQuery.rows.length === 0) {
      return res.status(404).json({message: "Book not found."});
    }
    const bookInfo = bookInfoQuery.rows[0];

    const genreQuery = await db.query(`
      SELECT g.genre
      FROM GENRE AS g
      WHERE g.bookID = '${id}'
    `);
    const genre = genreQuery.rows.map(row => row.genre);
    
    const departmentsQuery = await db.query(`
      SELECT dept.departmentCode
      FROM COURSEDEPT AS dept
        JOIN TEXTBOOK AS tb ON tb.serialNumber = dept.serialNumber AND tb.semester = dept.semester
      WHERE tb.bookID = '${id}'
    `);
    const departments = departmentsQuery.rows.map(row => row.departmentcode);

    const usedBooksQuery = await db.query(`
      SELECT ub.usedBookID AS UsedBookID, 
        ub.bookPicture AS BookPicture, 
        ub.askingPrice AS AskingPrice, 
        ub.bookCondition AS BookCondition
      FROM USEDBOOK AS ub
      WHERE ub.bookid = '${id}'
    `);
    const usedBooks = usedBooksQuery.rows.map(book => ({
      UsedBookID: book.usedbookid,
      BookPicture: book.bookpicture,
      AskingPrice: book.askingprice,
      BookCondition: book.bookcondition
    }));
    console.log(usedBooks);

    //console.log(usedBooks.rows);
    return res.status(200).json({
      "Title": bookInfo.title,
      "Publisher": bookInfo.publishername,
      "Genres": genre,
      "Departments": departments,
      "UsedBooks": usedBooks,
    });
  } catch(error) {
    return res.status(500).json({ message: error.message });
  }
}; 

export const addTextBookInfo = async (req, res) => {

}

export const addBook = async (req, res) => {
  // TODO: authentication of admin
  const {ISBN, title, genre, publisherName, suggestedRetailPrice} = req.body;
  if(!ISBN || !title || !genre || !publisherName || !suggestedRetailPrice) {
    return res.status(400).json({message: "All fields are required."});
  }

  try {
    const book = await db.query(`
      INSERT INTO BOOK (ISBN, Title, PublisherName, SuggestedRetailPrice)
      VALUES ('${ISBN}', '${title}', '${publisherName}', '${suggestedRetailPrice}')
    `);
    console.log(book);

    for (let g of genre) {
      const genreInsert = await db.query(`
        INSERT INTO GENRE (bookID, genre)
        VALUES ('${ISBN}', '${g}')
      `);
      console.log(genreInsert);
    }
    
    return res.status(200).json({ "ISBN": ISBN });
  } catch(error) {
    return res.status(500).json({ message: error.message });
  }
}

export const updateBookDetails = async (req, res) => {
  
}

export const deleteBook = async (req, res) => {
  const { id } = req.params; // ISBN of the book
  try {
    await db.query(`
      DELETE FROM BOOK
      WHERE ISBN = '${id}
    `);
    return res.status(200).json({ "BookID": id });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}