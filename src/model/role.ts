import { Sequelize, Model, DataTypes } from "sequelize";

class Role extends Model {
  public id!: number;
  public name!: string;

  static initModel(sequelize: Sequelize): Model<Role> {
    return Role.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: new DataTypes.STRING(128),
          allowNull: false
        }
      },
      {
        modelName: "Role",
        sequelize
      }
    );
  }
}

/*
export default function (sequelize: Sequelize): Model<Role> {
  return Role.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false
      }
    },
    {
      tableName: "roles",
      sequelize
    }
  );
}
*/

export default Role;
