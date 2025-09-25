import { createUser } from "../repositories/userRespository";
import { UserData } from "../types/user.types";


const createAccount = async (userData: UserData) => {
    try {
        const user = await createUser(userData); 
    } catch (error) {
        console.error; 

    }

}



export default createAccount;