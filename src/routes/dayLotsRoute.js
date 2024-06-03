import express from "express";
import DayLotsControler from "../controllers/dayLotsController";
const daylotsRoutes = express.Router();

daylotsRoutes.get("/daylots", DayLotsControler.getAllDayLots);
daylotsRoutes.get("/buckets", DayLotsControler.getAllBuckets);

export default daylotsRoutes;
