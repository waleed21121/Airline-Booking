import CrudRepository from "./crud.repository";
import { Flight } from "../models";

export default class FlightRepository extends CrudRepository<Flight> {
    constructor() {
        super(Flight);
    }
}