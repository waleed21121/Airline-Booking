import { Airport, City } from './';

// 1 to m relationship

City.hasMany(Airport, {
    foreignKey: 'cityID'
})

Airport.belongsTo(City, {
    foreignKey: 'cityID',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})