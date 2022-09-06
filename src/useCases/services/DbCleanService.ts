import { CustomJSONResponse } from "@entities/CustomJSONResponse";
import { Relationships } from "@entities/Relationship";
import { Users } from "@entities/User";

export function clean(users: Users, relationships: Relationships, customJsonResponse: CustomJSONResponse) {
	users.length = 0;
	relationships.length = 0;

	return customJsonResponse = {
		statusCode: 200,
		body: {
			message: 'All data clear'
		}
	};
}