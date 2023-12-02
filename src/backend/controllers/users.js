import { generateJWT, hashPassword } from '../utils/authorization.js';
import model from "../model/users.js";

function check_email(email) {
    if (!email.match(/^[a-zA-Z0-9]+@ntu.edu.tw$/)) {
        return false;
    }
    return true;
}

export async function signUp(req, res) {
    if (!req.body.StudentID || !req.body.SchoolEmail || !req.body.Username || !req.body.Fname || !req.body.Lname || !req.body.Password) {
        return res.status(400).json({ error: 'Missing value' });
    }

    if (!check_email(req.body.SchoolEmail)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    const user = await model.getUser('SchoolEmail', req.body.SchoolEmail);

    if (user) {
        return res.status(400).json({ error: 'Email already in use' });
    }

    const user_id = await model.createUser(req.body.StudentID, req.body.SchoolEmail, req.body.Username, req.body.Fname, req.body.Lname, hashPassword(req.body.Password));

    if (!user_id) {
        return res.status(500).json({ error: 'Internal server error' });
    }

    const result = await generateJWT(req.body.StudentID);

    return res.status(200).json({ data: { 'Token': result } });
}

export function signIn(req, res) {
    if (!req.body.StudentID || !req.body.Password) {
        return res.status(400).json({ error: 'Missing value' });
    }

    model.getUser('StudentID', req.body.StudentID).then((user) => {
        if (!user) {
            return res.status(404).json({ error: 'Email does not exist' });
        }

        if (user.password !== hashPassword(req.body.Password)) {
            return res.status(400).json({ error: 'Password does not match' });
        }

        const result = {
            data: {
                Token: generateJWT(req.body.StudentID)
            }
        }
        return res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    });
}

export function updateProfile(req, res) {
    if (!req.body.StudentID) {
        return res.status(400).json({ error: 'Missing value' });
    }

    if (req.body.SchoolEmail && !check_email(req.body.SchoolEmail)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    let user_id = req.authorization_id;

    if (user_id != req.body.StudentID) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    let newPassword = null;
    if (req.body.Password) {
        newPassword = hashPassword(req.body.Password);
    }

    model.updateUser(req.body.StudentID, req.body.SchoolEmail, req.body.Username, req.body.Fname, req.body.Lname, newPassword).then((result) => {
        if (!result) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ data: result });
    }).catch((err) => {
        return res.status(500).json({ error: 'Internal server error' });
    });
}

export function getProfile(req, res) {
    let result;

    const user_id = req.params.id;

    model.getUser('StudentID', user_id).then((user) => {
        if (!user) {
            return res.status(404).json({ error: 'User does not exist' });
        }

        result = {
            data: {
                StudentID: user.StudentID,
                Username: user.Username,
            }
        };
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    });

    model.getRating(user_id).then((rating) => {
        if (!rating) {
            return res.status(404).json({ error: 'User does not exist' });
        }

        result.data.AverageRating = rating.AverageRating;
        result.data.Ratings = rating.Ratings;

        return res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    });
}

export function getPrivateProfile(req, res) {
    // To be implemented
}
