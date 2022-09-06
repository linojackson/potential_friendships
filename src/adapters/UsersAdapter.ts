import { Request, Response } from "express";
import * as UserService from "@services/UserService";

export function getByCpf(request: Request,response: Response) {
	const createUser = UserService.getByCpf(
		request.params.cpf,
		request.users,
		response
	);

	if (createUser) {
		return response
			.status(createUser.statusCode)
			.json(createUser.body);
	}
}

export function create(request: Request,response: Response) {
	const createUser = UserService.create(
		request.body,
		request.users,
		response
	);

	if (createUser) {
		return response
			.status(createUser.statusCode)
			.json(createUser.body);
	}
}