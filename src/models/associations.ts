import { Airport, City, Flight, Airplane } from './';

// 1 to m relationship

City.hasMany(Airport, {
    foreignKey: 'cityID'
})

Airport.belongsTo(City, {
    foreignKey: 'cityID',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

// 1 to m relationship
Airplane.hasMany(Flight, {
    foreignKey: 'airplaneId'
})

Flight.belongsTo(Airplane, {
    targetKey: 'id',
    foreignKey: 'airplaneId',
    as: 'flightAirplane',
    onDelete: 'CASCADE'
})

// 1 to m relationship
Airport.hasMany(Flight, {
    foreignKey: 'departureAirportId'
})

Flight.belongsTo(Airport, {
    targetKey: 'code',
    foreignKey: 'departureAirportId',
    as: 'departureAirport',
    onDelete: 'CASCADE'
})

// 1 to m relationship
Airport.hasMany(Flight, {
    foreignKey: 'arrivalAirportId'
})

Flight.belongsTo(Airport, {
    targetKey: 'code',
    foreignKey: 'arrivalAirportId',
    as: 'arrivalAirport',
    onDelete: 'CASCADE'
})