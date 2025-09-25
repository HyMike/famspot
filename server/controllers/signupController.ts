import { Request, Response } from "express"
import createAccount from "../services/userService";
import { UserData } from "../types/user.types";


export const createUser = async (req: Request, res: Response) => {

    try { 
        const userData: UserData = { ...req.body };
        
        const newUser = await createAccount(userData);
        

    } catch (error) {
        console.error;
    }

}


