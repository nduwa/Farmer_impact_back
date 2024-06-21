import { expression } from "joi";
import DBmigrationControler from "../controllers/dbMigrationController";

const dbMigrationRouter = expression.Router();

dbMigrationRouter.get(
  "/migration/:table",
  DBmigrationControler.fetchDataAndInsert
);

export default dbMigrationRouter;
