import {db} from "../index.js";

export default {
    getUser,
    createUser,
    updateUser
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

    const query = {
        text: `INSERT INTO users (StudentID, SchoolEmail, Username, Fname, Lname, Password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        values: [StudentID, SchoolEmail, Username, Fname, Lname, Password],
    };

    return db.query(query)
        .then((result) => {
            return result.rows[0].id;
        })
        .catch((err) => {
            console.log(err);
            return null;
        });

}

function updateUser(StudentID, SchoolEmail, Username, Fname, Lname, Password) {
    // If an attribute is NULL or undefined, do not overwrite the existing column with None, just keep the original value

    const currentUser = getUser('StudentID', StudentID);

    if (currentUser == null) {
        return null;
    }

    if (SchoolEmail == null) {
        SchoolEmail = currentUser.SchoolEmail;
    }

    if (Username == null) {
        Username = currentUser.Username;
    }

    if (Fname == null) {
        Fname = currentUser.Fname;
    }

    if (Lname == null) {
        Lname = currentUser.Lname;
    }

    if (Password == null) {
        Password = currentUser.Password;
    }

    const query = {
        text: `UPDATE users SET SchoolEmail = $1, Username = $2, Fname = $3, Lname = $4, Password = $5 WHERE StudentID = $6`,
        values: [SchoolEmail, Username, Fname, Lname, Password, StudentID],
    };

    return db.query(query)
        .then((result) => {
            return result.rowCount;
        })
        .catch((err) => {
            console.log(err);
            return null;
        });
}