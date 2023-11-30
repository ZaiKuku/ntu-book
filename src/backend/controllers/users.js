import generateJWT from '../utils/authorization';
import hashPassword from '../utils/authorization';
import model from "../model/users.js";

async function signup(req, res) {

    if (!req.body.StudentID || !req.body.SchoolEmail || !req.body.Username || !req.body.Fname || !req.body.Lname || !req.body.Password) {
        return res.status(400).send('Missing value');
    }

    if (!req.body.SchoolEmail.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
        return res.status(400).send('Invalid email format');
    }

    const user = await model.getUser('SchoolEmail', req.body.SchoolEmail);

    if (user) {
        return res.status(400).send('Email already exists');
    }

    const user_id = await model.createUser(req.body.StudentID, req.body.SchoolEmail, req.body.Username, req.body.Fname, req.body.Lname, hashPassword(req.body.Password));

    if (!user_id) {
        return res.status(500).send('Internal server error');
    }

    const result = await generateJWT(user_id);

    return res.status(200).send({ data: { 'Token': result } });

}

function signin(req, res) {

    if (!req.body.StudentID || !req.body.Password) {
        return res.status(400).send('Missing value');
    }

    model.getUser('StudentID', req.body.StudentID).then((user) => {
        if (!user) {
            return res.status(400).send('Email does not exist');
        }

        if (user.password !== hashPassword(req.body.Password)) {
            return res.status(400).send('Password does not match');
        }

        const result = {
            data: {
                Token: generateJWT(user.id)
            }
        }
        return res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('Internal server error');
    });

}

function updateProfile(req, res) {


    if (!req.body.StudentID || !req.body.SchoolEmail || !req.body.Username || !req.body.Fname || !req.body.Lname || !req.body.Password) {
        return res.status(400).send('Missing value');
    }

    if (!req.body.SchoolEmail.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
        return res.status(400).send('Invalid email format');
    }

    let user_id = req.authorization_id;

    model.updateUser(req.body.StudentID, req.body.SchoolEmail, req.body.Username, req.body.Fname, req.body.Lname, hashPassword(req.body.Password)).then((result) => {
        if (!result) {
            return res.status(500).send('Internal server error');
        }
        return res.status(200).json({ data: result });
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('Internal server error');
    });

}

function getProfile(req, res) {
    // Request params: id
    // Method GET
    // /users/:id/public
    /*
    Successful Response Example:

    {
  "data": {
      "StudentID": "b12345678",
      "Username": "johndoe",
      "AverageRating": 4.5,
      "Ratings": [
				{
	        "StudentID": "b12345687",
					"StarsCount": 5,
	        "Review": "Good",
				},
				{
	        "StudentID": "b12345699",
					"StarsCount": 4, 
	        "Review": "Nice Book",
				},
			]
	  }
}
    */

    let result;

    const user_id = req.params.id;

    model.getUser('StudentID', user_id).then((user) => {
        if (!user) {
            return res.status(400).send('User does not exist');
        }

        result = {
            data: {
                StudentID: user.StudentID,
                Username: user.Username,
            }
        }

    }).catch((err) => {
        console.log(err);
        return res.status(500).send('Internal server error');
    });

    //Another function in model to get ratings

    model.getRating(user_id).then((rating) => {
        if (!rating) {
            return res.status(400).send('User does not exist');
        }

        result.data.AverageRating = rating.AverageRating;
        result.data.Ratings = rating.Ratings;

        return res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('Internal server error');
    });

}

module.exports = {
    signup,
    signin,
    updateProfile,
    getProfile
}