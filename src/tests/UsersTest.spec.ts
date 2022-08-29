import request from 'supertest';
import { app } from '../app';
import { User } from '@models/User';

describe('Create user', () => {

	it('should not be able to send missing information', async () => {
		const messageError: object = { message: 'Fields must have a value' }
		const user: User = { cpf: '12345678909' };

		const response = await request(app).post('/person').send(user);

		expect(response.status).toBe(400);
		expect(response.body).toEqual(messageError);
	})

	it('cpf need to be 11 numbers', async () => {
		const messageError: object = { message: 'CPF is invalid' }
		const user: User = { cpf: '1234567890a', name: 'Joaozinho' };

		const response = await request(app).post('/person').send(user);

		expect(response.status).toBe(400);
		expect(response.body).toEqual(messageError);
	})

	it('should be able to create a new user', async () => {
		const messageSuccess: object = { message: 'User created' }
		const user: User = { cpf: '12345678909', name: 'Joaozinho' };

		const response = await request(app).post('/person').send(user);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(messageSuccess);
	})

	it('should not be able to create a user who already exists', async () => {
		const messageError: object = { message: 'User already exists' }
		const user: User = { cpf: '12345678909', name: 'Joaozinho' };

		const response = await request(app).post('/person').send(user);

		expect(response.status).toBe(400);
		expect(response.body).toEqual(messageError);
	})
    
});

describe('Get user', () => {

	it('user not found', async () => {
		const messageError: object = { message: 'User not found' }
		const user: User = { cpf: '12345678910' };

		const response = await request(app).get(`/person/${user.cpf}`).send(user);

		expect(response.status).toBe(404);
		expect(response.body).toEqual(messageError);
	})

	it('user founded', async () => {
		const user: User = { cpf: '12345678909' };
		
		const response = await request(app).get(`/person/${user.cpf}`);

		expect(response.status).toBe(200);
		expect(response.body.cpf).toEqual(user.cpf);
	})

});