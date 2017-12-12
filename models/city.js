import {dbConnector} from '../helpers';
import {Schema} from 'mongoose';

const modelName = 'City';

const CitySchema = new Schema({
    id: {type: Number},
    name: {type: String},
    country: {type: String},
    capital: {type: Boolean},
    location: {
        lat: {type: Number},
        long: {type: Number}
    }
});
const City = dbConnector.model(modelName, CitySchema);

export default City;
