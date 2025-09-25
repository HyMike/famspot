import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); 

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});


export const query = async <T = any>(text: string, params?: any[]): Promise<T [] > => {
    const result = await pool.query(text, params);
    return result.rows;
  }

export const testConnection = async ()=> {
    try {
        const result = await query('SELECT NOW()');
        console.log('Database connected successfully:')
      } catch (error) {
        console.error('Database connection failed:', error);
      }

}
