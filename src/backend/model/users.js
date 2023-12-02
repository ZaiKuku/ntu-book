import {db} from "../index.js";

export default {
    getUser,
    createUser,
    updateUser,
    getRating
};

function getUser(column, value) {

    const query = {
        text: `SELECT * FROM users WHERE ${column} = $1`,
        values: [value],
    };

    return db.query(query)
        .then((result) => {
            return result.rows[0];
        })
        .catch((err) => {
            console.log(err);
            return null;
        });
}

function createUser(StudentID, SchoolEmail, Username, Fname, Lname, Password) {

    //Captalize StudentID
    StudentID = StudentID.toUpperCase();

    const query = {
        text: `INSERT INTO users (StudentID, SchoolEmail, Username, Fname, Lname, Password) VALUES ($1, $2, $3, $4, $5, $6)`,
        values: [StudentID, SchoolEmail, Username, Fname, Lname, Password],
    };

    return db.query(query)
        .then((result) => {
            return result[0].StudentID;;
        })
        .catch((err) => {
            console.log(err);
            return null;
        });

}

async function updateUser(StudentID, SchoolEmail, Username, Fname, Lname, Password) {
    // If an attribute is NULL or undefined, do not overwrite the existing column with None, just keep the original value

    const currentUser = await getUser('StudentID', StudentID);

    if (currentUser == null) {
        return null;
    }

    if (SchoolEmail == null) {
        SchoolEmail = currentUser.schoolemail;
    }

    if (Username == null) {
        Username = currentUser.username;
    }

    if (Fname == null) {
        Fname = currentUser.fname;
    }

    if (Lname == null) {
        Lname = currentUser.lname;
    }

    if (Password == null) {
        Password = currentUser.password;
    }

    const query = {
        text: `UPDATE users SET SchoolEmail = $1, Username = $2, Fname = $3, Lname = $4, Password = $5 WHERE StudentID = $6`,
        values: [SchoolEmail, Username, Fname, Lname, Password, StudentID],
    };

    return db.query(query)
        .then(() => {
            return {
                StudentID: StudentID,
                SchoolEmail: SchoolEmail,
                Username: Username,
                Fname: Fname,
                Lname: Lname
            };
        })
        .catch((err) => {
            console.log(err);
            return null;
        });
}

async function getRating(StudentID) {

    const currRatingQuery = `WITH currRating AS (
        SELECT r.*, ub.Seller, p.Buyer FROM rating AS r
        JOIN purchase AS p ON r.UsedBookID = p.UsedBookID 
        JOIN UsedBook AS ub ON p.UsedBookID = ub.UsedBookID
        WHERE ub.Seller = $1
    )`;

    const ratingQuery = {
        text: `
        ${currRatingQuery}
        SELECT r.Buyer AS StudentID, r.StarsCount, r.Review FROM currRating AS r
        `,
        values: [StudentID],
    };

    const avgRatingQuery = {
        text: `
        ${currRatingQuery}
        SELECT AVG(r.StarsCount) AS avgRating FROM currRating AS r LIMIT 1
        `,
        values: [StudentID],
    };

    let Ratings = [];
    let AverageRating = 0;

    Ratings =  await db.query(ratingQuery);

    AverageRating = await db.query(avgRatingQuery);


    return {
        Ratings: Ratings.rows,
        AverageRating: AverageRating.rows[0].avgrating
    }
}