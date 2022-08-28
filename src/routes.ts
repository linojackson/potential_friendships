import { Router } from 'express';
import UsersController from '@controllers/UsersController';
import RelationshipsController from '@controllers/RelationshipsController';

const routes = Router();

routes
    .get('/person/:cpf', UsersController.getByCpf)
    .post('/person', UsersController.create)
    .delete('/clean', UsersController.clean)
    .post('/relationship', RelationshipsController.create)
    .get('/recommendations/:cpf', RelationshipsController.recommendations)

export default routes;