import { User } from '@models/User';

function getByCpf(request,response) {
	const foundedUser = request.app.locals.users.find( (user) => user.cpf == request.params.cpf);
	if (foundedUser) {
		return response.status(200).json(foundedUser);
	}else{
		return response.status(404).json({ message: 'User not found' });
	}
}

function create(request,response) {
	const { cpf, name } = request.body;
	const userExists = request.app.locals.users.find( (user) => user.cpf == cpf);

	if (cpf.length !== 11 || !Number(cpf) ) {
		return response.status(400).json({ message: 'CPF is invalid' });
	}
	if (!cpf || !name) {
		return response.status(400).json({ message: 'Fields must have a value' });
	}
	if (userExists) {
		return response.status(400).json({ message: 'User already exists' });
	}
	
	request.app.locals.users.push({
		cpf,
		name
	});

	return response.status(200).json({ message: 'User created' });
}

function clean(request,response) {
	request.app.locals.users = [];
	request.app.locals.relationships = [];

	return response.status(200).json({ message: 'All data clear' });
}

export default {
	getByCpf,
	create,
	clean
}
// export class UsersController {
// 	teste() {
// 		const user = new User();
// 	}
// }