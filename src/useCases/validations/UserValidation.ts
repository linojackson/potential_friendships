import { User } from "@entities/User";
import { Users } from "@entities/User";

export function validateCpfIsValid(cpf: string) {
    if (cpf.length === 11 && Number(cpf) ) {
		return true;
	}
    return false;
}

export function validateUserNotNull(user: User) {
    if (user) {
        const { cpf, name } = user;
        if (cpf && name) {
            return true;
        }
    }
    return false;
}

export function validateUserExists(user: User, users: Users) {
    const cpf = user.cpf;
	const userExists = users.find( (user) => user.cpf == cpf);
    
	if (userExists) {
		return true;
	}
    return false;
}
