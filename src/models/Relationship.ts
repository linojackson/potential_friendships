export interface Relationship {
	cpf1: string;
	cpf2?: string;
}

export interface Relationships extends Array<Relationship>{}

export function verifyRelationshipExists(relationship: Relationship, cpf1: string, cpf2: string) {
	return (relationship.cpf1 === cpf1 || relationship.cpf1 === cpf2)
	&& (relationship.cpf2 === cpf1 || relationship.cpf2 === cpf2)
}