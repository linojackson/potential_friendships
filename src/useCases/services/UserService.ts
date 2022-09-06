import { CustomJSONResponse, MessageJSON } from "@entities/CustomJSONResponse";
import { User, Users } from "@entities/User";
import * as UserValidations from "@validations/UserValidation";

export function getByCpf(cpf: string, users: Users, customJsonResponse: CustomJSONResponse) {

	const cpfIsValid = UserValidations.validateCpfIsValid(cpf);
	const foundedUser: User = users.find( (user) => user.cpf == cpf);

	if (!cpfIsValid) {
		const messageJSON: MessageJSON = { message: 'CPF is invalid' };
		return customJsonResponse = {
			statusCode: 400,
			body: messageJSON
		};
	}

	if (foundedUser) {
		return customJsonResponse = {
			statusCode: 200,
			body: foundedUser
		};
	}else{
		const messageJSON: MessageJSON = { message: 'User not found' };
		return customJsonResponse = {
			statusCode: 404,
			body: messageJSON
		};
	}
}

export function create(user: User, users: Users, customJsonResponse: CustomJSONResponse) {
	const cpfIsValid = UserValidations.validateCpfIsValid(user.cpf);
	const userNotNull = UserValidations.validateUserNotNull(user);
	const userExists = UserValidations.validateUserExists(user, users);
	let messageJSON: MessageJSON = { message: 'User created' };
	
	if (!userNotNull) {
		messageJSON.message = 'Fields must have a value';
		return customJsonResponse = {
			statusCode: 400,
			body: messageJSON
		};
	}
	if (!cpfIsValid) {
		messageJSON.message = 'CPF is invalid';
		return customJsonResponse = {
			statusCode: 400,
			body: messageJSON
		};
	}
	if (userExists) {
		messageJSON.message = 'User already exists';
		return customJsonResponse = {
			statusCode: 400,
			body: messageJSON
		};
	}
	
	const { cpf, name }: User = user;
	users.push({
		cpf,
		name
	});

	return customJsonResponse = {
		statusCode: 200,
		body: messageJSON
	};
}
