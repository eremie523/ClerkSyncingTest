import { createUserProps } from "@/types";
import { fetchMongooseConnection } from "../mongodb";
import Users from "../mongodb/Models/Users";
import { handleError } from "../utils";

export const createUser = async (user: createUserProps) => {
    try {
        await fetchMongooseConnection()

        let newUser = await Users.create(user)

        newUser.save()

        return JSON.parse(JSON.stringify(newUser));
    } catch (error: any) {
       handleError(error)
    }
}   