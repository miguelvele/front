import { Router } from "express";
import * as controller from "../controllers/users.controller.js";

const route = Router();
// Muestra todos los registros
route.get('/user',controller.findAllUser);
// Muestra un solo registro
route.get('/user/:id',controller.findUser);
// inserta un registro
route.post('/user',controller.insertUser);
// actualiza un registro
route.put('/user',controller.updateUser);
// borra un registro
route.delete('/user/:id', controller.deleteUser);
export default route;