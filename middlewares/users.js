import {User as userModel} from '../models';
import {DEFAULT_PASSWORD} from '../config/server';

class Users {
    constructor() {
        this.users = [];
    }

    get allUsers() {
        return userModel.find({});
    }

    findUserByLoginAndPassword(login, password) {
        return userModel.find({login: login, password: password});
    }

    findUserById(id) {
        return userModel.find({ id: id });
    }

    findOrCreateByTwitterId(profile) {
        return userModel.findOrCreate({
            where: {twitterId: profile.id},
            defaults: {
                login: profile.username,
                name: profile.displayName,
                twitterId: profile.id,
                password: DEFAULT_PASSWORD,
            }}
        );
    }

    // createUser(name, username, password = null, twitterId = null) {
    //     const newUser = {
    //         id: this.users.length,
    //         twitterId: twitterId,
    //         name: name,
    //         login: username,
    //         password: password
    //     };
    //     this.users.push(newUser);
    //     return newUser;
    // }

    deleteUserById(id) {
        return userModel.remove({ id: id});
    }
}

const users = new Users();
export default users;
