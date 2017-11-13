import jwt from 'jsonwebtoken';
import {jwtSecretKey} from '../config/server';
import {userMiddleware} from '../middlewares';


class JWTAuthentication {

    auth(req, res) {
        const login = req.body.login;
        const password = req.body.password;
        const user = userMiddleware.findUserByLoginAndPassword(login, password);
        if (user) {
            const token = jwt.sign({ userId: user.id }, jwtSecretKey);
            res.json({
                'code': 200,
                'message': 'OK',
                'data': {
                    'user': {
                        'login': user.login,
                        'username': user.username
                    }
                },
                'token': token
            });
        } else {
            res.json({
                'code': 404,
                'message': 'User not Found',
            });
        }
    }

}

const jWTAuthentication = new JWTAuthentication();
export default jWTAuthentication;
