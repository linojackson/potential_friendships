export interface User {
	cpf: string;
	name: string;
}

export interface Users extends Array<User>{}