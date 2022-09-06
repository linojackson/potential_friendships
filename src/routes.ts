import { Router } from 'express';
import * as UsersAdapter from '@adapters/UsersAdapter';
import * as RelationshipsAdapter from '@adapters/RelationshipsAdapter';
import * as DbCleanAdapter from '@adapters/DbCleanAdapter';
import * as DbSeedAdapter from '@adapters/DbSeedAdapter';

const routes = Router();

routes
    // People
    .get('/person/:cpf', UsersAdapter.getByCpf)
    .post('/person', UsersAdapter.create)
    // Relationships
    .post('/relationship', RelationshipsAdapter.create)
    .get('/recommendations/:cpf', RelationshipsAdapter.recommendations)
    // Clean all data
    .delete('/clean', DbCleanAdapter.clean)
    // Seeds
    .post('/seeds/users', DbSeedAdapter.createUsers)
    .post('/seeds/relationships', DbSeedAdapter.createRelationships)

export { routes };