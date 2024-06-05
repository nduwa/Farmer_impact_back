import express from 'express'
import ParchmentTransportController from '../controllers/parchmentTransportController';
import deliveryReportController from '../controllers/deliveryReportController';
import verifyToken from '../middlewares/auth';
const parchmentTransportRoutes = express.Router()

parchmentTransportRoutes.post('/deliver',verifyToken,ParchmentTransportController.deliverParchment);
parchmentTransportRoutes.get('/reports',ParchmentTransportController.getDeliveryReports);
parchmentTransportRoutes.get('/reportLots',ParchmentTransportController.getDeliveryReportLots);
parchmentTransportRoutes.get('/lot_by_id/:id',ParchmentTransportController.getDeliveryReportLotById);
parchmentTransportRoutes.get('/report_by_id/:id',ParchmentTransportController.getDeliveryReportById);
parchmentTransportRoutes.put('/update/:id',verifyToken,ParchmentTransportController.updateDeliveryReport);
parchmentTransportRoutes.post('/deliverParchment/',verifyToken,deliveryReportController.report_delivery);
export default parchmentTransportRoutes
