import { DataTypes, Model, Sequelize } from "sequelize";

class User extends Model {
  public username!: string; // Note that the `null assertion` `!` is required in strict mode.
  public email!: string;
  public password!: string;

  static initModel(sequelize: Sequelize): Model<User> {
    return User.init(
      {
        username: {
          type: new DataTypes.STRING(128),
          allowNull: false
        },
        email: {
          type: new DataTypes.STRING(128),
          allowNull: false
        },
        password: {
          type: new DataTypes.STRING(128),
          allowNull: false
        }
      },
      {
        modelName: "User",
        sequelize
      }
    );
  }
}

/*
export default function (sequelize: Sequelize): Model<User> {
  return User.init(
    {
      username: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      password: {
        type: new DataTypes.STRING(128),
        allowNull: false
      }
    },
    {
      modelName: "User",
      sequelize
    }
  );
}
*/

export default User;
