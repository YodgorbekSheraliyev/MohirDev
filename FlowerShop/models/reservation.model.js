module.exports = (sequelize, DataTypes) => {
    const Reservation =   sequelize.define('reservation', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            allowNull: false,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING(100),
            allowNull: false, 
            
        },
        phone: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        region: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        }
    }, {timestamps: true})
    return Reservation
}
