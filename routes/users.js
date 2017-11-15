import {userMiddleware} from '../middlewares';

class Users {

    getAllUsers(req, res) {
        userMiddleware.allUsers
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err));
    }

}

const users = new Users();
export default users;
