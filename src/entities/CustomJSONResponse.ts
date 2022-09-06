import { User } from "./User";

export interface MessageJSON {
	message: string;
}

export interface CustomJSONResponse {
	statusCode: number;
	body?: MessageJSON | User | Array<String>;
}