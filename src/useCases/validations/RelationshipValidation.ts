import { Relationship, Relationships } from "@entities/Relationship";

export function validateRelationshipExists(relationship: Relationship, relationships: Relationships) {
	const relationshipExists = relationships.find((internRelationship) => {
		if (
			(internRelationship.cpf1 === relationship.cpf1
				|| internRelationship.cpf1 === relationship.cpf2)
			&& (internRelationship.cpf2 === relationship.cpf1
				|| internRelationship.cpf2 === relationship.cpf2)
		){
			return true;
		}
		return false;
	});

	if (relationshipExists) {
		return true;
	}
	return false;
}

export function validateRelationshipNotNull(relationship: Relationship) {
    if (relationship) {
        if (relationship.cpf1 && relationship.cpf2) {
            return true;
        }
    }
    return false;
}
