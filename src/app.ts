import express, { request } from 'express';
import routes from './routes';

const app = express();

request.users = [];
request.relationships = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

export default app;