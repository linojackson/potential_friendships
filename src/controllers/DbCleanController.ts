import { Request, Response } from "express";

function clean(request: Request,response: Response) {
	request.users.length = 0;
	request.relationships.length = 0;

	return response.status(200).json({ message: 'All data clear' });
}

export default {
	clean
}