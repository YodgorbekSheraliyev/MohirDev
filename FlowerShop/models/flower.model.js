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
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: true, 
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {timestamps: true})
    return Flower
}
