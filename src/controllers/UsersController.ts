import { Request, Response } from "express";

function getByCpf(request: Request,response: Response) {
	const foundedUser = request.users.find( (user) => user.cpf == request.params.cpf);
	if (foundedUser) {
		return response.status(200).json(foundedUser);
	}else{
		return response.status(404).json({ message: 'User not found' });
	}
}

function create(request: Request,response: Response) {
	const { cpf, name } = request.body;
	if (!cpf || !name) {
		return response.status(400).json({ message: 'Fields must have a value' });
	}
	const userExists = request.users.find( (user) => user.cpf == cpf);

	if (cpf.length !== 11 || !Number(cpf) ) {
		return response.status(400).json({ message: 'CPF is invalid' });
	}
	if (userExists) {
		return response.status(400).json({ message: 'User already exists' });
	}
	
	request.users.push({
		cpf,
		name
	});

	return response.status(200).json({ message: 'User created' });
}

function clean(request: Request,response: Response) {
	request.users.length = 0;
	request.relationships.length = 0;

	return response.status(200).json({ message: 'All data clear' });
}

export default {
	getByCpf,
	create,
	clean
}