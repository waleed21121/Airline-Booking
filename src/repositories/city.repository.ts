import CrudRepository from "./crud.repository";
import { City } from '../models'

export default class CityRepository extends CrudRepository<City> {
    constructor() {
        super(City);
    }
}