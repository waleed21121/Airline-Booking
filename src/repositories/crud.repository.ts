import { Attributes, DestroyOptions, FindOptions, Model, ModelStatic, UpdateOptions } from "sequelize";
import { Logger } from "../config";
import { Col, Fn, Literal, MakeNullishOptional } from "sequelize/types/utils";

export default abstract class CrudRepository <T extends Model> {
    protected model: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    async create(data: MakeNullishOptional<T["_creationAttributes"]>): Promise<T> {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    async delete(options: DestroyOptions<Attributes<T>>): Promise<number> {
        try {
            return await this.model.destroy(options);
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    async find(options: FindOptions<Attributes<T>>): Promise<T[]> {
        try {
            const response = await this.model.findAll(options);
            return response;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    async findOne(options: FindOptions<Attributes<T>>): Promise<T | null> {
        try {
            const response = await this.model.findOne(options);
            return response;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    async update(data: { 
        [key in keyof Attributes<T>]?: Fn | Col | Literal | Attributes<T>[key] | undefined
    }, 
    options: Omit<UpdateOptions<Attributes<T>>, "returning"> & {
    returning: true | (keyof Attributes<T>)[];
    } ): Promise<[affectedCount: number, affectedRows: T[]]> {
        try {
            const response = this.model.update(data, options);
            return response;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }
}