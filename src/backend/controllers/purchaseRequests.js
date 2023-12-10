import { db } from "../index.js";

// Get all requests for used book
export const getRequests = async (req, res) => {
  const { id: usedBookId } = req.params;
  const SellerID = req.authorization_id;

  try {
    const existenceQuery = {
      text: "SELECT * FROM usedbook WHERE usedbookid = $1",
      values: [usedBookId],
    };
    const existenceResult = await db.query(existenceQuery);
    if (!existenceResult.rows.length)
      return res.status(404).json({ error: "Used book not found" });
    if (SellerID !== existenceResult.rows[0].sellerid && SellerID !== "admin")
      return res.status(403).json({ error: "You do not own this used book" });
    const query = {
      text: "SELECT * FROM purchaserequest WHERE usedbookid = $1",
      values: [usedBookId],
    };
    const result = await db.query(query);
    const requests = result.rows.map((req) => ({
      BuyerID: req.buyerid,
      RequestTimestamp: req.requesttimestamp,
    }));
    return res.status(200).json({
      data: requests,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// Get the request that a user has made for a used book (if anu)
export const getRequest = async (req, res) => {
  const { id: usedBookId } = req.params;
  const BuyerID = req.authorization_id;

  try {
    const existenceQuery = {
      text: "SELECT * FROM usedbook WHERE usedbookid = $1",
      values: [usedBookId],
    };
    const existenceResult = await db.query(existenceQuery);
    if (!existenceResult.rows.length)
      return res.status(404).json({ error: "Used book not found" });
    const query = {
      text: `
        SELECT * FROM purchaserequest 
        WHERE usedbookid = $1
        AND buyerid = $2
      `,
      values: [usedBookId, BuyerID],
    };
    const result = await db.query(query);
    return res.status(200).json({
      data: result.rowCount
        ? {
            RequestTimestamp: result.rows[0].requesttimestamp,
          }
        : {},
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// Add purchase request
export const addRequest = async (req, res) => {
  const { id: usedBookId } = req.params;
  const BuyerID = req.authorization_id;

  try {
    const usedBookExistenceQuery = {
      text: "SELECT * FROM usedbook WHERE usedbookid = $1",
      values: [usedBookId],
    };
    const usedBookExistenceResult = await db.query(usedBookExistenceQuery);
    if (!usedBookExistenceResult.rowCount)
      return res.status(404).json({ error: "Used book not found" });
    const requestExistenceQuery = {
      text: `
        SELECT * FROM purchaserequest 
        WHERE usedbookid = $1
        AND buyerid = $2
      `,
      values: [usedBookId, BuyerID],
    };
    const requestExistenceResult = await db.query(requestExistenceQuery);
    if (requestExistenceResult.rowCount)
      return res
        .status(400)
        .json({ error: "You have already requested this used book" });
    const query = {
      text: `INSERT INTO purchaserequest 
      (buyerid, usedbookid) 
      VALUES ($1, $2) RETURNING requesttimestamp`,
      values: [BuyerID, usedBookId],
    };
    const result = await db.query(query);
    return res.status(200).json({
      data: {
        UsedBookID: usedBookId,
        BuyerID,
        RequestTimestamp: result.rows[0].requesttimestamp,
      },
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// Add rating
export const addRating = async (req, res) => {
  const { id: usedBookId } = req.params;
  const { StarsCount, Review } = req.body;
  if (!StarsCount)
    return res.status(400).json({ error: "Missing stars count" });
  if (!(0 <= StarsCount && StarsCount <= 5))
    return res
      .status(400)
      .json({ error: "Stars count must be between 0 and 5 inclusive" });
  const BuyerID = req.authorization_id;

  try {
    const usedBookExistenceQuery = {
      text: "SELECT * FROM usedbook WHERE usedbookid = $1",
      values: [usedBookId],
    };
    const usedBookExistenceResult = await db.query(usedBookExistenceQuery);
    if (!usedBookExistenceResult.rowCount)
      return res.status(404).json({ error: "Used book not found" });
    const purchaseExistenceQuery = {
      text: `
        SELECT * FROM purchase 
        WHERE usedbookid = $1
        AND buyerid = $2
      `,
      values: [usedBookId, BuyerID],
    };
    const purchaseExistenceResult = await db.query(purchaseExistenceQuery);
    if (!purchaseExistenceResult.rowCount)
      return res
        .status(403)
        .json({ error: "You have not purchased this used book" });
    const ratingExistenceQuery = {
      text: `
        SELECT * FROM rating 
        WHERE usedbookid = $1
      `,
      values: [usedBookId],
    };
    const ratingExistenceResult = await db.query(ratingExistenceQuery);
    if (ratingExistenceResult.rowCount)
      return res
        .status(400)
        .json({ error: "You have already rated this used book" });

    const query = {
      text: `INSERT INTO rating 
      (usedbookid, starscount, review)
      VALUES ($1, $2, $3)`,
      values: [usedBookId, StarsCount, Review ?? ""],
    };
    await db.query(query);
    return res.status(200).json({
      data: {
        UsedBookID: usedBookId,
        StarsCount: StarsCount,
        Review: Review ?? "",
      },
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// Add a purchase
export const addPurchase = async (req, res) => {
  const { id: usedBookId } = req.params;
  const { BuyerID } = req.body;
  if (!BuyerID) return res.status(400).json({ error: "Missing buyer ID" });
  const SellerID = req.authorization_id;

  try {
    const usedBookExistenceQuery = {
      text: "SELECT * FROM usedbook WHERE usedbookid = $1",
      values: [usedBookId],
    };
    const usedBookExistenceResult = await db.query(usedBookExistenceQuery);
    if (!usedBookExistenceResult.rowCount)
      return res.status(404).json({ error: "Used book not found" });
    if (
      SellerID !== usedBookExistenceResult.rows[0].sellerid &&
      SellerID !== "admin"
    )
      return res.status(403).json({ error: "You do not own this used book" });
    const purchaseExistenceQuery = {
      text: `
          SELECT * FROM purchase 
          WHERE usedbookid = $1
        `,
      values: [usedBookId],
    };
    const purchaseExistenceResult = await db.query(purchaseExistenceQuery);
    if (purchaseExistenceResult.rowCount)
      return res
        .status(400)
        .json({ error: "This used book has already been sold" });
    const requestExistenceQuery = {
      text: `
          SELECT * FROM purchaserequest 
          WHERE usedbookid = $1
          AND buyerid = $2
        `,
      values: [usedBookId, BuyerID],
    };
    const requestExistenceResult = await db.query(requestExistenceQuery);
    if (!requestExistenceResult.rowCount)
      return res.status(404).json({ error: "Request not found" });
    const query = {
      text: `INSERT INTO purchase 
      (usedbookid, buyerid)
      VALUES ($1, $2)`,
      values: [usedBookId, BuyerID],
    };
    const result = await db.query(query);
    return res.status(200).json({
      data: {
        UsedBookID: usedBookId,
        BuyerID,
        PurchaseTimeStamp: result.rows[0].purchasetimestamp,
      },
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
