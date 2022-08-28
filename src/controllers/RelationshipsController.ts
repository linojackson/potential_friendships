function create(request,response) {
	const { cpf1, cpf2 } = request.body;
	if (!cpf2 || !cpf1) {
		return response.status(400).json({ message: 'Fields must have a value' });
	}
	const user1Exists = request.app.locals.users.find( (user) => user.cpf == cpf1);
	const user2Exists = request.app.locals.users.find( (user) => user.cpf == cpf2);
	const relationshipExists = request.app.locals.relationships.find( (relationship) => (
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
	
	request.app.locals.relationships.push({
		cpf1,
		cpf2
	});

	console.log(request.app.locals.relationships);

	return response.status(200).json({ message: 'Relationship created' });
}

export default {
	create
}