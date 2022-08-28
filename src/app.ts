// instanciar as variaveis globais
// chamar os padroes as models e os carai (?)
import { User } from '@models/User';
import express from 'express';
import routes from './routes';

const app = express();
app.locals.users = [];
app.locals.relationships = [];

app.locals.users.push({
    cpf: '09876543210',
    name: 'DJ Rogerinho'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

export default app;