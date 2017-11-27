import {error400Text, cityNotFoundText} from './constant';
import {citiesMiddleware} from '../middlewares';

class Cities {

    getAllCities(req, res) {
        citiesMiddleware.allCities
            .then(cities => res.json(cities))
            .catch(err => res.status(500).send(err));
    }

    addCity(req, res) {
        citiesMiddleware.addCity(req.body)
            .then(newCity => res.json(newCity))
            .catch(err => res.status(500).send(err));
    }

    updateCity(req, res) {
        const id = Number(req.params.id);
        citiesMiddleware.updateOrCreateCityById(id, req.body)
            .then(updatedCity => res.json(updatedCity))
            .catch(err => res.status(500).send(err));
    }

    getCityById(req, res) {
        const id = Number(req.params.id);
        if(Number.isInteger(id)) {
            citiesMiddleware.getCityById(id)
                .then(city => {
                    if(!city) {
                        throw new Error(404);
                    }
                    res.json(city);
                })
                .catch(() => res.status(404).send(cityNotFoundText));
        } else {
            res.status(400).send(error400Text);
        }
    }

    deleteCityById(req, res) {
        const id = Number(req.params.id);
        if(Number.isInteger(id)) {
            citiesMiddleware.deleteCityById(id)
                .then(() => {
                    res.send('Remove success');
                })
                .catch(() => res.status(404).send(cityNotFoundText));
        } else {
            res.status(400).send(error400Text);
        }
    }
}

const cities = new Cities();
export default cities;
