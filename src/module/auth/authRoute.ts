import { Router } from "express";
import { validateBody } from "../../middlewares/requestMiddleware";
import { loginBody, registrasiBody } from "./authRequest";
import * as authController from './authController';
const route = Router();

route.post('/signup', validateBody(registrasiBody), authController.registration);
route.post('/login', validateBody(loginBody), authController.login);
route.post('/refresh', authController.refresh);
route.post('/logout', authController.logout);
route.post('/admin', authController.admin);
export default route;