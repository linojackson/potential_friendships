import { verifyRelationshipExists } from "@models/Relationship";
import { Request, Response } from "express";

function create(request: Request,response: Response) {
	const { cpf1, cpf2 } = request.body;

	if (!cpf2 || !cpf1) {
		throw response.status(400).json({ message: 'Fields must have a value' });
	}

	const user1Exists = request.users.find( (user) => user.cpf == cpf1);
	const user2Exists = request.users.find( (user) => user.cpf == cpf2);
	const relationshipExists = request.relationships.find(
		(relationship) => verifyRelationshipExists(relationship, cpf1, cpf2)
	);

	if (cpf1.length !== 11 || !Number(cpf1) ) {
		throw response.status(400).json({ message: 'CPF1 is invalid' });
	}
	if (cpf2.length !== 11 || !Number(cpf2) ) {
		throw response.status(400).json({ message: 'CPF2 is invalid' });
	}
	if (relationshipExists) {
		throw response.status(400).json({ message: 'Relationship already exists' });
	}
	if (!user1Exists || !user2Exists) {
		throw response.status(404).json({ message: 'Some user not exists' });
	}
	
	request.relationships.push({
		cpf1,
		cpf2
	});

	return response.status(200).json({ message: 'Relationship created' });
}

function recommendations(request: Request,response: Response) {
	if (request.params.cpf.length !== 11 || !Number(request.params.cpf) ) {
		throw response.status(400).json({ message: 'CPF is invalid' });
	}

	const foundedUser = request.users.find( (user) => user.cpf == request.params.cpf);
	if (!foundedUser) {
		throw response.status(404).json({ message: 'User not found' });
	}
	
	// Get all friends of a CPF
	const filterRealtions = request.relationships
		.filter( (relationship) => {
			return (relationship.cpf1 === request.params.cpf || relationship.cpf2 === request.params.cpf)
		})
		.map(relationship => {
			return (request.params.cpf === relationship.cpf1) ?
				relationship.cpf2 : relationship.cpf1
		});

	// Get all friends of friends of a CPF
	const potentialFrindsFilter = request.relationships
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
		.filter(potentialFriend => potentialFriend !== request.params.cpf);

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

	return response.status(200).json(formatedpotentialFriends);
}


export default {
	create,
	recommendations
}