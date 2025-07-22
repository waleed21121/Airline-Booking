export function getKeyName (...args: string[]) {
    return `Airlines:${args.join(':')}`
}

export const flightsKey = (whereObj: string, orderObj: string) => getKeyName('Flights', whereObj, orderObj);
export const flightKeyById = (id: number) => getKeyName('Flight', id.toString());