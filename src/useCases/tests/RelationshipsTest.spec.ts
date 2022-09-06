import request from 'supertest';
import { app } from '../../app';
import { Relationship } from '@entities/Relationship';
import { User } from '@entities/User';

describe('Create relationship', () => {

	beforeAll(async () => {
		await request(app).post('/seeds/users').send();
		await request(app).post('/seeds/relationships').send();
	});

	it('should not be able to send missing information', async () => {
		const messageError: object = { message: 'Fields must have a value' }
		const relationship: Relationship = { cpf1: '12345678910' };

		const response = await request(app).post('/relationship').send(relationship);

		expect(response.status).toBe(400);
		expect(response.body).toEqual(messageError);
	})

	it('cpf1 need to be 11 numbers', async () => {
		const messageError: object = { message: 'CPF1 is invalid' }
		const relationship: Relationship = { cpf1: '1234567890a', cpf2: '12345678920' };

		const response = await request(app).post('/relationship').send(relationship);

		expect(response.status).toBe(400);
		expect(response.body).toEqual(messageError);
	})

	it('cpf2 need to be 11 numbers', async () => {
		const messageError: object = { message: 'CPF2 is invalid' }
		const relationship: Relationship = { cpf1: '12345678910', cpf2: '1234567890a' };

		const response = await request(app).post('/relationship').send(relationship);

		expect(response.status).toBe(400);
		expect(response.body).toEqual(messageError);
	})

	it('should be able to create a new relationship', async () => {
		const messageSuccess: object = { message: 'Relationship created' }
		const relationship: Relationship = { cpf1: '12345678910', cpf2: '12345678920' };

		const response = await request(app).post('/relationship').send(relationship);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(messageSuccess);
	})

	it('should not be able to create a relationship what already exists', async () => {
		const messageError: object = { message: 'Relationship already exists' }
		const relationship: Relationship = { cpf1: '12345678910', cpf2: '12345678920' };

		const response = await request(app).post('/relationship').send(relationship);

		expect(response.status).toBe(400);
		expect(response.body).toEqual(messageError);
	})

	it('should not be able to create a relationship with user who dont exists', async () => {
		const messageError: object = { message: 'Some user not exists' }
		const relationship: Relationship = { cpf1: '12345678910', cpf2: '12345678901' };

		const response = await request(app).post('/relationship').send(relationship);

		expect(response.status).toBe(404);
		expect(response.body).toEqual(messageError);
	})
    
});

describe('Get recommendations', () => {
	
	it('cpf need to be 11 numbers', async () => {
		const messageError: object = { message: 'CPF is invalid' }
		const user: User = { cpf: '1234567891aaa' };

		const response = await request(app).get(`/recommendations/${user.cpf}`);

		expect(response.status).toBe(400);
		expect(response.body).toEqual(messageError);
	})

	it('user not found', async () => {
		const messageError: object = { message: 'User not found' }
		const user: User = { cpf: '12345678999' };

		const response = await request(app).get(`/recommendations/${user.cpf}`);

		expect(response.status).toBe(404);
		expect(response.body).toEqual(messageError);
	})

	it('should be return potential friendships', async () => {
		const arrayExpected = [ '77777777777', '66666666666' ]
		const user: User = { cpf: '11111111111' };

		const response = await request(app).get(`/recommendations/${user.cpf}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(arrayExpected);
	})

});