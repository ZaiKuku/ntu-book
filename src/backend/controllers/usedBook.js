import { db } from "../index.js";

// Get used book details
export const getUsedBook = async (req, res) => {
  const { id: usedBookId } = req.params;

  try {
    const query = {
      text: "SELECT * FROM usedbook WHERE usedbookid = $1",
      values: [usedBookId],
    };
    const result = await db.query(query);
    if (!result.rows.length)
      return res.status(404).json({ error: "Used book not found" });
    const usedBook = result.rows[0];
    return res.status(200).json({
      data: {
        UsedBookID: usedBookId,
        AdditionalDetails: usedBook.additionaldetails,
        BookPicture: usedBook.bookpicture,
        BookCondition: usedBook.bookcondition,
        SellerID: usedBook.seller,
        ListTimestamp: usedBook.listtimestamp,
        AskingPrice: usedBook.askingprice,
        BookID: usedBook.bookid,
      },
    });
  } catch (error) {
    const message = "Failed to get used book details. Reason: " + error.message;
    return res.status(500).json({ error: message });
  }
};

// Get used book comments
export const getComments = async (req, res) => {
  const { id: usedBookId } = req.params;

  try {
    const existenceQuery = {
      text: "SELECT usedbookid FROM usedbook WHERE usedbookid = $1",
      values: [usedBookId],
    };
    const existenceResult = await db.query(existenceQuery);
    if (!existenceResult.rowCount)
      return res.status(404).json({ error: "Used book not found" });
    const commentsQuery = {
      text: `SELECT commenter, content, commenttimestamp 
      FROM comments WHERE usedbookid = $1
      ORDER BY commenttimestamp DESC`,
      values: [usedBookId],
    };
    const commentsResult = await db.query(commentsQuery);
    const data = commentsResult.rows.map((comment) => {
      return {
        CommenterID: comment.commenter,
        Comment: comment.content,
        CommentTimestamp: comment.commenttimestamp,
      };
    });
    return res.status(200).json({ data });
  } catch (error) {
    const message = "Failed to get comments. Reason: " + error.message;
    return res.status(500).json({ error: message });
  }
};

// Add used book
export const addUsedBook = async (req, res) => {
  const { AdditionalDetails, BookPicture, BookCondition, AskingPrice, BookID } =
    req.body;

  if (!(BookPicture && BookCondition && AskingPrice && BookID))
    return res.status(400).json({ error: "Please provide required details" });

  // const sellerID = req.authorization_id;
  const SellerID = "z99995183";

  try {
    const query = {
      text: `INSERT INTO usedbook 
      (additionaldetails, bookpicture, bookcondition, seller, askingprice, bookid) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING usedbookid, listtimestamp`,
      values: [
        AdditionalDetails ?? "",
        BookPicture,
        BookCondition,
        SellerID,
        AskingPrice,
        BookID,
      ],
    };
    const result = await db.query(query);
    return res.status(200).json({
      data: {
        UsedBookID: result.rows[0].usedbookid,
        AdditionalDetails: AdditionalDetails,
        BookPicture: BookPicture,
        BookCondition: BookCondition,
        SellerID: SellerID,
        ListTimestamp: result.rows[0].listtimestamp,
        AskingPrice: AskingPrice,
      },
    });
  } catch (error) {
    const message = "Failed to add used book. Reason: " + error.message;
    return res.status(500).json({ error: message });
  }
};

// Add comment
export const addComment = async (req, res) => {
  const { id: usedBookId } = req.params;
  const { Comment } = req.body;
  if (!Comment) return res.status(400).json({ error: "Missing comment" });
  // const sellerID = req.authorization_id;
  const SellerID = "z99995183";

  try {
    const query = {
      text: `INSERT INTO comments 
      (usedbookid, commenter, content) 
      VALUES ($1, $2, $3) RETURNING commenttimestamp`,
      values: [usedBookId, SellerID, Comment],
    };
    const result = await db.query(query);
    return res.status(200).json({
      data: {
        CommenterID: SellerID,
        Comment,
        CommentTimestamp: result.rows[0].commenttimestamp,
      },
    });
  } catch (error) {
    const message = "Failed to add comment. Reason: " + error.message;
    return res.status(500).json({ error: message });
  }
};

// Update used book details
export const updateUsedBook = async (req, res) => {
  const { id: usedBookId } = req.params;
  const { AdditionalDetails, BookPicture, BookCondition, AskingPrice, BookID } =
    req.body;

  try {
    const existenceQuery = {
      text: "SELECT * FROM usedbook WHERE usedbookid = $1",
      values: [usedBookId],
    };
    const existenceResult = await db.query(existenceQuery);
    if (!existenceResult.rowCount)
      return res.status(404).json({ error: "Used book not found" });
    const query = {
      text: `UPDATE usedbook SET additionaldetails = $1, bookpicture = $2, bookcondition = $3, 
      askingprice = $4, bookid = $5 WHERE usedbookid = $6`,
      values: [
        AdditionalDetails ?? existenceResult.rows[0].additionaldetails,
        BookPicture ?? existenceResult.rows[0].bookpicture,
        BookCondition ?? existenceResult.rows[0].bookcondition,
        AskingPrice ?? existenceResult.rows[0].askingprice,
        BookID ?? existenceResult.rows[0].bookid,
        usedBookId,
      ],
    };
    await db.query(query);
    return res.status(200).json({
      data: {
        UsedBookID: usedBookId,
        AdditionalDetails:
          AdditionalDetails ?? existenceResult.rows[0].additionaldetails,
        BookPicture: BookPicture ?? existenceResult.rows[0].bookpicture,
        BookCondition: BookCondition ?? existenceResult.rows[0].bookcondition,
        SellerID: existenceResult.rows[0].seller,
        ListTimestamp: existenceResult.rows[0].listtimestamp,
        AskingPrice: AskingPrice ?? existenceResult.rows[0].askingprice,
        BookID: BookID ?? existenceResult.rows[0].bookid,
      },
    });
  } catch (error) {
    const message = "Failed to update used book. Reason: " + error.message;
    return res.status(500).json({ error: message });
  }
};

// Delete used book
export const deleteUsedBook = async (req, res) => {
  const { id: usedBookId } = req.params;

  try {
    const existenceQuery = {
      text: "SELECT * FROM usedbook WHERE usedbookid = $1",
      values: [usedBookId],
    };
    const existenceResult = await db.query(existenceQuery);
    if (!existenceResult.rowCount)
      return res.status(404).json({ error: "Used book not found" });
    const deleteQuery = {
      text: "DELETE FROM usedbook WHERE usedbookid = $1",
      values: [usedBookId],
    };
    await db.query(deleteQuery);
    return res.status(200).json({
      data: {
        UsedBookID: usedBookId,
      },
    });
  } catch (error) {
    const message = "Failed to delete used book. Reason: " + error.message;
    return res.status(500).json({ error: message });
  }
};
