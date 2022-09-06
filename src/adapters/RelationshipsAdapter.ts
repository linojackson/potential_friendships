import { Request, Response } from "express";
import * as RelationshipService from "@services/RelationshipService";

export function create(request: Request,response: Response) {
	const createRelationship = RelationshipService.create(
		request.users,
		request.body,
		request.relationships,
		response
	);

	if (createRelationship) {
		return response
			.status(createRelationship.statusCode)
			.json(createRelationship.body);
	}
}

export function recommendations(request: Request,response: Response) {
	const getRecommendations = RelationshipService.recommendations(
		request.params,
		request.users,
		request.relationships,
		response
	);

	if (getRecommendations) {
		return response
			.status(getRecommendations.statusCode)
			.json(getRecommendations.body);
	}
}