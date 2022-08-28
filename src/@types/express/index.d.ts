import { Users } from "@models/User";
import { Relationships } from "@models/Relationship";

declare global{
    namespace Express {
        interface Request {
            users: Users;
            relationships: Relationships;
        }
    }
}