import logger from "../utils/logger";

class Database {
  constructor() {
    logger.info("Database constructed");
  }
}
export const database = new Database();

// https://github.com/suksant/sequelize-typescript-examples/blob/master/sequelize-express/src/models/index.ts
// https://www.guidestack.pl/how-to-create-models-in-sequelize/
// https://github.com/piotrbienias/organizer-backend/blob/master/src/config/db.js
