// chamar os controllers com os metodos
import { Router } from 'express';
import UsersController from '@controllers/UsersController';

const routes = Router();

routes.get('/person/:cpf', UsersController.getByCpf)
    .post('/person', UsersController.create)
    .delete('/clean', UsersController.clean)

export default routes;