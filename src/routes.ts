import { Router } from 'express';
import UsersController from '@controllers/UsersController';
import RelationshipsController from '@controllers/RelationshipsController';
import DbSeedController from '@controllers/DbSeedController';
import DbCleanController from '@controllers/DbCleanController';

const routes = Router();

routes
    // People
    .get('/person/:cpf', UsersController.getByCpf)
    .post('/person', UsersController.create)
    // Relationships
    .post('/relationship', RelationshipsController.create)
    .get('/recommendations/:cpf', RelationshipsController.recommendations)
    // Clean all data
    .delete('/clean', DbCleanController.clean)
    // Seeds
    .post('/seeds/users', DbSeedController.createUsers)
    .post('/seeds/relationships', DbSeedController.createRelationships)

export { routes };