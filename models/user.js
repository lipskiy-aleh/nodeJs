import {dbConnector} from '../helpers';
import {Schema} from 'mongoose';
import initUsers from '../data/users.json';

const modelName = 'User';

const UserSchema = new Schema({
    id: {type: Number},
    name: {type: String},
    twitterId: {type: Number},
    login: {type: String},
    password: {type: String}
});
const User = dbConnector.model(modelName, UserSchema);

function initData() {
    initUsers.forEach( el => new User(el).save());
}
initData();

export default User;
