import { Request, Response } from "express";

function getByCpf(request: Request,response: Response) {
	if (request.params.cpf.length !== 11 || !Number(request.params.cpf) ) {
		throw response.status(400).json({ message: 'CPF is invalid' });
	}
	const foundedUser = request.users.find( (user) => user.cpf == request.params.cpf);
	if (foundedUser) {
		return response.status(200).json(foundedUser);
	}else{
		throw response.status(404).json({ message: 'User not found' });
	}
}

function create(request: Request,response: Response) {
	const { cpf, name } = request.body;
	if (!cpf || !name) {
		throw response.status(400).json({ message: 'Fields must have a value' });
	}
	const userExists = request.users.find( (user) => user.cpf == cpf);

	if (cpf.length !== 11 || !Number(cpf) ) {
		throw response.status(400).json({ message: 'CPF is invalid' });
	}
	if (userExists) {
		throw response.status(400).json({ message: 'User already exists' });
	}
	
	request.users.push({
		cpf,
		name
	});

	return response.status(200).json({ message: 'User created' });
}

export default {
	getByCpf,
	create
}