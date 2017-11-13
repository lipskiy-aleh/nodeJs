import {userMiddleware} from '../middlewares';

class Users {

    getAllUsers(req, res) {
        res.json(userMiddleware.allUsers);
    }

}

const users = new Users();
export default users;
