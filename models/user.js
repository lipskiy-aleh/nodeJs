import Sequelize from 'sequelize';
import {dbConnector} from '../helpers';

const tableName = 'users';

const User = dbConnector.define(tableName, {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    twitterId: {
        type: Sequelize.BIGINT,
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// const defaultListOfUsers = [
//     {name: 'Aleh0', login: 'aleh0', password: '1230'},
//     {name: 'Aleh1', login: 'aleh1', password: '1231'},
//     {name: 'Aleh2', login: 'aleh2', password: '1232'},
//     {name: 'Aleh3', login: 'aleh3', password: '1233'},
// ];

// User.sync({force: true}).then(() => {
//     defaultListOfUsers.map(user => {
//         User.create(user);
//     });
// });


export default User;
