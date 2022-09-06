import { Relationships } from "@entities/Relationship";
import { Users } from "@entities/User";
import { Request, Response } from "express";


export function createRelationships(request: Request,response: Response) {
	const relationshipSeed: Relationships = [
        { cpf1: '11111111111', cpf2: '22222222222'},
        { cpf1: '11111111111', cpf2: '33333333333'},
        { cpf1: '11111111111', cpf2: '44444444444'},
        { cpf1: '55555555555', cpf2: '11111111111'},
        { cpf1: '33333333333', cpf2: '66666666666'},
        { cpf1: '44444444444', cpf2: '77777777777'},
        { cpf1: '77777777777', cpf2: '55555555555'},
        { cpf1: '44444444444', cpf2: '33333333333'}
    ];

    request.relationships.push(...relationshipSeed);

	return response.status(200).json({ message: 'Relationships seeds created' });
}

export function createUsers(request: Request,response: Response) {
	const userSeed: Users = [
        { cpf: '11111111111', name: 'Joao'},
        { cpf: '22222222222', name: 'Maria'},
        { cpf: '33333333333', name: 'Jose'},
        { cpf: '44444444444', name: 'Pedro'},
        { cpf: '55555555555', name: 'Mario'},
        { cpf: '66666666666', name: 'Rita'},
        { cpf: '77777777777', name: 'Carol'},
        { cpf: '12345678910', name: 'Ricardo'},
        { cpf: '12345678920', name: 'Fatima'}
    ];

    request.users.push(...userSeed);

	return response.status(200).json({ message: 'Users seeds created' });
}