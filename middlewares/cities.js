// { name: ‘Brest’,country: ‘Belarus’,capital: false, location: { lat: 52.097621, long: 23.734050 } }
import {City as cityModel} from '../models';
import mongodb from 'mongodb';

class Cities {
    constructor() {
        const connectionUrl = 'mongodb://localhost/nodeJsMentoring';
        this.nativeDbConnector = mongodb.MongoClient.connect(connectionUrl);

        this.optionsForUpdate = {new: true};
    }

    get allCities() {
        return cityModel.find({});
    }

    addCity(newCity) {
        return new Promise((resolve, reject) => {
            new cityModel(newCity).save(err => {
                if(err) {
                    reject('City not saved ' + err);
                } else {
                    console.log('City saved');
                    resolve(newCity);
                }
            });
        });
    }

    getCityById(id) {
        return cityModel.find({ id: id });
    }

    deleteCityById(id) {
        return cityModel.remove({ id: id});
    }

    updateOrCreateCityById(id, updatedCity) {
        return cityModel.findOneAndUpdate({id: id}, updatedCity, this.optionsForUpdate);
    }

    getRandomCity() {
        const randomId = Math.random() * 10;
        return this.nativeDbConnector
            .then((db) => {
                return db.collection('cities')
                    .findOne({ id: randomId});
            });
    }
}

const cities = new Cities();
export default cities;
