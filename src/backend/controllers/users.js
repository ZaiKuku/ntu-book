import generateJWT from '../utils/authorization';
import hashPassword from '../utils/authorization';

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

    model.updateUser(user_id, req.body.StudentID, req.body.SchoolEmail, req.body.Username, req.body.Fname, req.body.Lname, hashPassword(req.body.Password)).then((result) => {
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


}

module.exports = {
    signup,
    signin,
    updateProfile,
    getProfile
}