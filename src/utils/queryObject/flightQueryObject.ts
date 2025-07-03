
import { Airport, Flight } from "../../models";
import { IFlightQuery } from "../../schemas/query/flightQuery.schema";
import { Includeable, Order, WhereOptions } from "sequelize";
import { AppError } from "../";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";

export default function (data: IFlightQuery) {
    let obj: {
        where: WhereOptions<Flight>,
        include: Includeable | Includeable[] | undefined,
        order: Order
    } = {
        where: {},
        include: [
            {model: Airport, as: 'arrivalAirport'},
            {model: Airport, as: 'departureAirport'}
        ],
        order: []
    };

    let arrivalAirportId, departureAirportId, travellers = 1, firstPrice = 0, secondPrice = 20000, tripDate = new Date('1970-01-01'), sort: [[string, string]];

    if(data.trip) {
        [departureAirportId, arrivalAirportId] = data.trip.split('-');
        if(!arrivalAirportId) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Error when filtering flights.", "The trip must be string consists of the codes of the departure and the arrival airport of the following format: XXX-YYY.");
        }
        Object.defineProperty(obj.where, 'arrivalAirportId', {
            value: arrivalAirportId,
            writable: true,
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(obj.where, 'departureAirportId', { 
            value: departureAirportId,
            writable: true,
            enumerable: true,
            configurable: true 
        });
    }
    
    if(data.travellers) {
        travellers = data.travellers;
        Object.defineProperty(obj.where, "totalSeats", { 
            value: { [Op.gte]: travellers },
            writable: true,
            enumerable: true,
            configurable: true
        });
    }

    if(data.price) {
        let [a, b] = data.price.split('-');
        if(isNaN(parseInt(a)) || isNaN(parseInt(b))) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Error when filtering flights.", "The price must be string of consists of two prices of the following format: XXXX-YYYY.");
        }
        firstPrice = parseInt(a);
        secondPrice = parseInt(b);
        Object.defineProperty(obj.where, "price", {
            value: { [Op.between]: [firstPrice, secondPrice] },
            writable: true,
            enumerable: true,
            configurable: true
        });
    }

    if(data.tripDate) {
        tripDate = data.tripDate;
        Object.defineProperty(obj.where, "departureTime", { 
            value: { [Op.gte]: tripDate },
            writable: true,
            enumerable: true,
            configurable: true 
        });
    }

    if(data.sort) {
        const temp = data.sort.split(',');
        temp.forEach((ele) => {
            const [a, b] = ele.split('_');
            if (a in Object.keys(Flight) && (b === 'ASC' || b === 'DESC')) {
                sort!.push([a, b])
            } else {
                throw new AppError(StatusCodes.BAD_REQUEST, "Error when filtering flights.", "The sort attribute must be of the following format: attribute_[ASC, DESC].")
            }
        })
        obj.order = sort!;
    }

    return obj;
}