import CrudRepository from "./crud.repository";
import { Seat } from "../models";

export default class SeatRepository extends CrudRepository<Seat> {
    constructor() {
        super(Seat);
    }
}