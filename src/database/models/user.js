import { compare, hash } from 'bcrypt';
import { DataTypes, Model } from 'sequelize';

import { tokenHelper, mailHelper } from '@/helpers';
import db from '@/database';

export default function (sequelize) {
  class User extends Model {
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }

    generateToken(expiresIn = '1h') {
      const data = { id: this.id, email: this.email };
      return tokenHelper.generateToken(data, expiresIn);
    }

    async getRole(){
      const role = await db.models.role.findByPk(this.roleId, {
        include: {
          model: db.models.permission,
          attributes: ['name']
        }
      });
      return {
        id: role.id,
        name: role.name,
        permissions: role.permissions
      };
    }

    validatePassword(plainPassword) {
      return compare(plainPassword, this.password);
    }

    sendMail(mail) {
      const payload = { ...mail, to: `${this.fullName} <${this.email}>` };
      return mailHelper.sendMail(payload);
    }

    static associate(models) {
      User.belongsTo(models.role, { foreignKey: 'roleId' });
    }
  }

  User.init({
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    modelName: 'user',
    sequelize,
  });

  User.addHook('beforeSave', async (instance) => {
    if (instance.changed('password')) {
      // eslint-disable-next-line no-param-reassign
      instance.password = await hash(instance.password, 10);
    }
  });

  User.addHook('afterCreate', (instance) => {
    // Send welcome message to user.
    const payload = {
      subject: 'Welcome to Express Starter',
      html: 'Your account is created successfully!',
    };
    instance.sendMail(payload);
  });

  User.addHook('afterDestroy', (instance) => {
    // Send good by message to user.
    const payload = {
      subject: 'Sorry to see you go',
      html: 'Your account is destroyed successfully!',
    };
    instance.sendMail(payload);
  });

  return User;
}
