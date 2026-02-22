import { Router } from "express";
import * as loginMiddleware from '../../middlewares/loginMiddleware';
import * as requestMiddleware from '../../middlewares/requestMiddleware';
import * as categoryRequest from './categoryRequest';
import * as categoryController from './categoryController';

const route = Router();

route.post('/', loginMiddleware.authMiddleware, loginMiddleware.authorizeMiddleware(['admin']), requestMiddleware.validateBody(categoryRequest.createCategoryRequest), categoryController.createCategory);
route.get('/', loginMiddleware.authMiddleware, loginMiddleware.authorizeMiddleware(['admin']), requestMiddleware.validateQuery(categoryRequest.getAllCategoriesQuery), categoryController.getAllCategories);
route.delete('/', loginMiddleware.authMiddleware, loginMiddleware.authorizeMiddleware(['admin']), requestMiddleware.validateQuery(categoryRequest.shortCodeCategoryQuery), categoryController.deleteCategory);
route.patch('/activate', loginMiddleware.authMiddleware, loginMiddleware.authorizeMiddleware(['admin']), requestMiddleware.validateQuery(categoryRequest.shortCodeCategoryQuery), categoryController.activateCategory);
route.patch('/', loginMiddleware.authMiddleware, loginMiddleware.authorizeMiddleware(['admin']), requestMiddleware.validateQuery(categoryRequest.shortCodeCategoryQuery), requestMiddleware.validateBody(categoryRequest.updateCategoryRequest), categoryController.updateCategory);

export default route;