import { Router } from "express";
import { validateBody } from "../../middlewares/requestMiddleware";
import { registrasiBody } from "./authRequest";
import * as authController from './authController';
const route = Router();

route.post('/signup', validateBody(registrasiBody), authController.registration);