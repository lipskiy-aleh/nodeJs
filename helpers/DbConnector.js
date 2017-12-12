import mongoose from 'mongoose';
import { DBconfig } from '../config/server';

mongoose.connect(DBconfig.mongoose.url);

mongoose.connection.on('error', err => {
    log.error(err);
});


export default mongoose;
