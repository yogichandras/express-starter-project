import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
    class Role extends Model {
        static associate(models) {
            Role.hasMany(models.user, { foreignKey: 'roleId' });
            Role.hasMany(models.permission, { foreignKey: 'roleId' });
        }
    }

    Role.init({
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
    }, {
        modelName: 'role',
        sequelize,
    });

    return Role;
}