// const { Sequelize} = require("sequelize")
// const sequelize = new Sequelize()
module.exports = (sequelize, DataTypes) => {
    const Admin =   sequelize.define('admin', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            allowNull: false,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: false, 
            
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true 
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            
        }
    }, {timestamps: true})
    return Admin
}
