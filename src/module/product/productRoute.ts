import { Router } from "express";
import * as loginMiddleware from '../../middlewares/loginMiddleware';
import * as requestMiddleware from '../../middlewares/requestMiddleware';
import * as productRequest from './productRequest';
import * as productController from './productController';
import { upload } from "../../middlewares/imageMiddleware";

const route = Router();

route.post('/', loginMiddleware.authMiddleware, loginMiddleware.authorizeMiddleware(['admin']), requestMiddleware.validateBody(productRequest.createProductRequest), upload.single('image'), productController.createProduct);
route.delete('/:shortCode/category', loginMiddleware.authMiddleware, loginMiddleware.authorizeMiddleware(['admin']), requestMiddleware.validateParams(productRequest.shortCodeProductParams), requestMiddleware.validateBody(productRequest.deleteCategoriesFromProductBody), productController.deleteCategoriesFromProduct);
route.delete('/:shortCode', loginMiddleware.authMiddleware, loginMiddleware.authorizeMiddleware(['admin']), requestMiddleware.validateParams(productRequest.shortCodeProductParams), productController.deleteProduct);
route.post('/:shortCode', loginMiddleware.authMiddleware, loginMiddleware.authorizeMiddleware(['admin']), requestMiddleware.validateParams(productRequest.shortCodeProductParams), requestMiddleware.validateBody(productRequest.updateProductBody), upload.single('image'), productController.updateProduct);
export default route;