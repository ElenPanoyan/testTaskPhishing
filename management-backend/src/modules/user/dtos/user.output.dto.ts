import {User} from "../../../db/schemas/user.schema";

export class UserOutputDto {
    id: string;
    email: string;
    fullName: string;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.fullName = user.fullName;
    }
}

