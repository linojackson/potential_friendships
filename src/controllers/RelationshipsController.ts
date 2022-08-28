import { Request, Response } from "express";

function create(request: Request,response: Response) {
	const { cpf1, cpf2 } = request.body;
	if (!cpf2 || !cpf1) {
		return response.status(400).json({ message: 'Fields must have a value' });
	}
	const user1Exists = request.users.find( (user) => user.cpf == cpf1);
	const user2Exists = request.users.find( (user) => user.cpf == cpf2);
	const relationshipExists = request.relationships.find( (relationship) => (
		(relationship.cpf1 === cpf1 || relationship.cpf1 === cpf2)
		&& (relationship.cpf2 === cpf1 || relationship.cpf2 === cpf2)
	));

	if (cpf1.length !== 11 || !Number(cpf1) ) {
		return response.status(400).json({ message: 'CPF1 is invalid' });
	}
	if (cpf2.length !== 11 || !Number(cpf2) ) {
		return response.status(400).json({ message: 'CPF2 is invalid' });
	}
	if (relationshipExists) {
		return response.status(400).json({ message: 'Relationship already exists' });
	}
	if (!user1Exists || !user2Exists) {
		return response.status(404).json({ message: 'Some user not exists' });
	}
	
	request.relationships.push({
		cpf1,
		cpf2
	});

	return response.status(200).json({ message: 'Relationship created' });
}

function recommendations(request: Request,response: Response) {
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


export default {
	create,
	recommendations
}