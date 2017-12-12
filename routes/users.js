import {userMiddleware} from '../middlewares';
import {error400Text, userNotFoundText} from './constant';

class Users {

    getAllUsers(req, res) {
        userMiddleware.allUsers
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err));
    }

    deleteUserById(req, res) {
        const id = Number(req.params.id);
        if(Number.isInteger(id)) {
            userMiddleware.deleteUserById(id)
                .then(() => {
                    res.send('Remove success');
                })
                .catch(() => res.status(404).send(userNotFoundText));
        } else {
            res.status(400).send(error400Text);
        }
    }
}

const users = new Users();
export default users;
