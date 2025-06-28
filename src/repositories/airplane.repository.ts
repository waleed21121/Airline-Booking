import CrudRepository from "./crud.repository";
import { Airplane } from '../models'

export default class AirplaneRepository extends CrudRepository<Airplane> {
    constructor() {
        super(Airplane);
    }
}