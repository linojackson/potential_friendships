import { Request, Response } from "express";
import * as DbCleanService from "@services/DbCleanService";

export function clean(request: Request,response: Response) {
	const cleanData = DbCleanService.clean(request.users, request.relationships, response);

	if (cleanData) {
		return response.status(cleanData.statusCode).json(cleanData.body);
	}
}