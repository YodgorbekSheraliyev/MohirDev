module.exports = (sequelize, DataTypes) => {
    const Flower =   sequelize.define('flower', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false, 
        },
        image: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false, 
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {timestamps: true})
    return Flower
}
