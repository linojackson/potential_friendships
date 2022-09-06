import { CustomJSONResponse } from "@entities/CustomJSONResponse";
import { Relationship, Relationships } from "@entities/Relationship";
import { User, Users } from "@entities/User";
import { validateRelationshipExists, validateRelationshipNotNull } from "@validations/RelationshipValidation";
import { validateCpfIsValid, validateUserExists } from "@validations/UserValidation";

export function create(
	users: Users,
	relationship: Relationship,
	relationships: Relationships,
	customJsonResponse: CustomJSONResponse
){
	const { cpf1, cpf2 } = relationship;
	const relationshipNotNull = validateRelationshipNotNull(relationship);

	if (!relationshipNotNull) {
		return customJsonResponse = {
			statusCode: 400,
			body: {
				message: 'Fields must have a value'
			}
		};
	}

	const user1Exists: User = users.find( (user) => user.cpf == relationship.cpf1);
	const user2Exists: User = users.find( (user) => user.cpf == relationship.cpf2);
	const relationshipExists = validateRelationshipExists(relationship, relationships);
	const cpf1IsValid: boolean = validateCpfIsValid(relationship.cpf1);
	const cpf2IsValid: boolean = validateCpfIsValid(relationship.cpf2);

	if (!cpf1IsValid) {
		return customJsonResponse = {
			statusCode: 400,
			body: {
				message: 'CPF1 is invalid'
			}
		};
	}
	if (!cpf2IsValid) {
		return customJsonResponse = {
			statusCode: 400,
			body: {
				message: 'CPF2 is invalid'
			}
		};
	}
	if (relationshipExists) {
		return customJsonResponse = {
			statusCode: 400,
			body: {
				message: 'Relationship already exists'
			}
		};
	}
	if (!user1Exists || !user2Exists) {
		return customJsonResponse = {
			statusCode: 404,
			body: {
				message: 'Some user not exists'
			}
		};
	}
	
	relationships.push({
		cpf1,
		cpf2
	});

	return customJsonResponse = {
		statusCode: 200,
		body: {
			message: 'Relationship created'
		}
	};
}

export function recommendations(
	user: User,
	users: Users,
	relationships: Relationships,
	customJsonResponse: CustomJSONResponse
){
	const cpfIsValid: boolean = validateCpfIsValid(user.cpf);
	const foundedUser: boolean = validateUserExists(user, users);

	if (!cpfIsValid) {
		return customJsonResponse = {
			statusCode: 400,
			body: {
				message: 'CPF is invalid'
			}
		};
	}

	if (!foundedUser) {
		return customJsonResponse = {
			statusCode: 404,
			body: {
				message: 'User not found'
			}
		};
	}
	
	// Get all friends of a CPF
	const filterRealtions = relationships
		.filter( (relationship) => {
			return (relationship.cpf1 === user.cpf || relationship.cpf2 === user.cpf)
		})
		.map(relationship => {
			return (user.cpf === relationship.cpf1) ?
				relationship.cpf2 : relationship.cpf1
		});

	// Get all friends of friends of a CPF
	const potentialFrindsFilter = relationships
		.filter(relationship => {
			return ((filterRealtions.indexOf(relationship.cpf1) >= 0) 
					&& (filterRealtions.indexOf(relationship.cpf2) < 0))
				|| ((filterRealtions.indexOf(relationship.cpf2) >= 0) 
					&& (filterRealtions.indexOf(relationship.cpf1) < 0))
		})
		.map(relationship => {
			return (filterRealtions.indexOf(relationship.cpf1) >= 0) ?
				relationship.cpf2 : relationship.cpf1
		})
		.filter(potentialFriend => potentialFriend !== user.cpf);

	// Calculate rank of potential friends
	const rankedFriends = potentialFrindsFilter.reduce((users, currentUser) => {
		const indexCpfExists = users.findIndex(potentialFriend => potentialFriend.cpf == currentUser)

		if (indexCpfExists >= 0) {
			users[indexCpfExists].count++;
			return users
		} else {
			const newCpf = {
				cpf: currentUser,
				count: 1,
			}
			users.push(newCpf)
			return users
		}
	}, []);

	// Rank potential friends by correlation
	const potentialFriendsSorted = rankedFriends.sort((a, b) => {
		if (a.count < b.count) {
			return 1;
		}
		if (a.count > b.count) {
			return -1;
		}
		// a must be equal to b
		return 0;
	});
  
	// Return only CPF of potential friends
	const formatedpotentialFriends = potentialFriendsSorted.map(user => user.cpf)

	return customJsonResponse = {
		statusCode: 200,
		body: formatedpotentialFriends
	};
}