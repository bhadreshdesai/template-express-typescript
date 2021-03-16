// https://github.com/sequelize/sequelize/issues/6524#issuecomment-329664805

index.js
// models/index.js
/**
  index.js is an import utility that grabs all models in the same folder,
  and instantiate a Sequelize object once for all models (instead of for each model).
  This is done by passing the single Sequelize object to each
  model as a reference, which each model then piggy-backs (sequelize.define())
  for creating a single db class model.
*/

"use strict"; // typical JS thing to enforce strict syntax

const fs = require("fs"); // file system for grabbing files
const path = require("path"); // better than '\/..\/' for portability
const Sequelize = require("sequelize"); // Sequelize is a constructor
const env = process.env.NODE_ENV || "development"; // use process environment
const config = require(path.join(__dirname, '..', 'config.js'))[env] // Use the .config.json file in the parent folder
const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: config.dialect,
});

// Load each model file
const models = Object.assign({}, ...fs.readdirSync(__dirname)
  .filter(file =>
    (file.indexOf(".") !== 0) && (file !== "index.js")
  )
  .map(function (file) {
    const model = require(path.join(__dirname, file));
    // console.log(model.init(sequelize).tableName)
    return {
      [model.name]: model.init(sequelize),
    };
  })
);

// Load model associations
for (const model of Object.keys(models)) {
  typeof models[model].associate === 'function' && models[model].associate(models);
}

module.exports = models;

Post.js
// models/Post.js
/**
  Post.js
  Class model for Post
*/

'use strict';

const Sequelize = require('sequelize');

module.exports =
  class Post extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        body: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        assets: {
          type: Sequelize.JSON,
          allowNull: true
        },
      }, { sequelize })
    };

    static associate(models) {
      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.Post);
      this.hasMany(models.Comment, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });

      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.Post);
      this.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
    }
  }

User.js
// models/User.js
/**
  User.js
  Class model for User
*/

'use strict';

const Sequelize = require('sequelize');

module.exports =
  class User extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        salt: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isEmail: true
          }
        },
        isActive: {
          type: Sequelize.BOOLEAN
        }
      }, { sequelize })
    };

    static associate(models) {
      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.User);
      this.hasMany(models.Post, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });

      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.User);
      this.hasMany(models.Comment, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
    }
  }

Comment.js
// models/Comment.js
/**
  Comment.js
  Class model for Comment
*/

'use strict';

const Sequelize = require('sequelize');

module.exports =
  class Comment extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        body: {
          type: Sequelize.TEXT,
          allowNull: false,
        }
      }, { sequelize })
    };

    static associate(models) {
      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.Comment);
      this.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });

      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.Comment);
      this.belongsTo(models.Post, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
    }
  }