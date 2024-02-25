import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
    class Permission extends Model {
        static associate(models) {
            Permission.belongsTo(models.role, { foreignKey: 'roleId' });
        }
    }

    Permission.init({
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        modelName: 'permission',
        sequelize,
    });

    return Permission;
}