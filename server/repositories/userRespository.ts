import { query, testConnection } from "../database/db";
import { UserData } from "../types/user.types";


export const createUser = async (userData: UserData) => {
    try {
        const sql = `INSERT INTO users (name, email, zip_code, age_range)
        VALUES ($1, $2, $3, $4) 
        RETURNING id, name, email, zip_code AS "zipCode", age_range AS "ageRange", created_at AS "createdAt"
        `;
        const params = [userData.name, userData.email, userData.zipCode, userData.ageRange]
        const user = await query(sql, params); 
        console.log(user);
        return user[0];
    

    } catch (error){
        console.log(error);
    }
 
}

export const getAllUsers = async () => {
    try {

        const sql = `
        SELECT 
        id, 
        name, 
        email, 
        zip_code AS "zipCode", 
        age_range AS "ageRange", 
        created_at AS "createdAt"
        FROM users
        `;
        const allUsers = await query(sql);
        return allUsers; 
        
    } catch (error){
        console.error("Error fetching users:", error);

    }
}


