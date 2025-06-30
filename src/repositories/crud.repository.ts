import { Attributes, DestroyOptions, FindOptions, Model, ModelStatic, UpdateOptions } from "sequelize";
import { Logger } from "../config";
import { Col, Fn, Literal, MakeNullishOptional } from "sequelize/types/utils";

export default abstract class CrudRepository <T extends Model> {
    protected model: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    async create(data: MakeNullishOptional<T["_creationAttributes"]>): Promise<T> {
        const response = await this.model.create(data);
        return response;
    }

    async delete(options: DestroyOptions<Attributes<T>>): Promise<number> {
        return await this.model.destroy(options);
    }

    async find(options: FindOptions<Attributes<T>>): Promise<T[]> {
        const response = await this.model.findAll(options);
        return response;
    }

    async findOne(options: FindOptions<Attributes<T>>): Promise<T | null> {
        const response = await this.model.findOne(options);
        return response;
    }

    async update(data: { 
        [key in keyof Attributes<T>]?: Fn | Col | Literal | Attributes<T>[key] | undefined
    }, 
    options: Omit<UpdateOptions<Attributes<T>>, "returning"> & {
    returning: true | (keyof Attributes<T>)[];
    } ): Promise<[affectedCount: number, affectedRows: T[]]> {
        
        const response = this.model.update(data, options);
        return response;
    }
}