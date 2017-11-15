import Sequelize from 'sequelize';
import { DBconfig } from '../config/server';

const sequelize = new Sequelize(
    DBconfig.dbName,
    DBconfig.username,
    DBconfig.password,
    DBconfig.sequelizeOptions
);

// Check connection section
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;
