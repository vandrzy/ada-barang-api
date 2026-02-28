import { Router } from "express";
import * as loginMiddleware from '../../middlewares/loginMiddleware';
import * as requestMiddleware from '../../middlewares/requestMiddleware';
import * as productRequest from './productRequest';
import * as productController from './productController';
import { upload } from "../../middlewares/imageMiddleware";

const route = Router();

route.post('/', loginMiddleware.authMiddleware, loginMiddleware.authorizeMiddleware(['admin']), upload.single('image'), requestMiddleware.validateBody(productRequest.createProductRequest),  productController.createProduct);
route.delete('/:shortCode/category', loginMiddleware.authMiddleware, loginMiddleware.authorizeMiddleware(['admin']), requestMiddleware.validateParams(productRequest.shortCodeProductParams), requestMiddleware.validateBody(productRequest.deleteCategoriesFromProductBody), productController.deleteCategoriesFromProduct);
route.delete('/:shortCode', loginMiddleware.authMiddleware, loginMiddleware.authorizeMiddleware(['admin']), requestMiddleware.validateParams(productRequest.shortCodeProductParams), productController.deleteProduct);
route.post('/:shortCode', loginMiddleware.authMiddleware, loginMiddleware.authorizeMiddleware(['admin']), requestMiddleware.validateParams(productRequest.shortCodeProductParams), requestMiddleware.validateBody(productRequest.updateProductBody), upload.single('image'), productController.updateProduct);
route.get('/', loginMiddleware.authMiddleware, loginMiddleware.authorizeMiddleware(['admin']), requestMiddleware.validateQuery(productRequest.getAllProductsQuery), productController.getProducts);
route.get('/:shortCode', loginMiddleware.authMiddleware, loginMiddleware.authorizeMiddleware(['admin', 'user']), requestMiddleware.validateParams(productRequest.shortCodeProductParams), productController.getProductByShortCode);

export default route;