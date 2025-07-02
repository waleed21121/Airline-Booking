import { Airport } from "../models";
import CrudRepository from "./crud.repository";

export default class AirportRepository extends CrudRepository<Airport> {
    constructor () {
        super(Airport)
    }
}