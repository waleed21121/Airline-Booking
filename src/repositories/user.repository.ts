import CrudRepository from "./crud.repository";
import { User } from "../models";

export default class UserRepository extends CrudRepository<User> {
    constructor() {
        super(User);
    }
}