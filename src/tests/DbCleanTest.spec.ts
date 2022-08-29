import request from 'supertest';
import { app } from '../app';

describe('Clean variables', () => {

	it('should be able to clean all data', async () => {
		const response = await request(app).delete('/clean');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ message: 'All data clear' });
	})
});