// Setup cron job
// fetch users from database (userData)
// #loop thru and grab each user and send that data to openrouter with message. 
// retrieve message back as json. 
// user id: "", event_title: '', description: (short description)"", event_date = ""
//  take this data and update back into the respository ==> database


interface OpenAIMessage {
    role: "assistant" | "user" | "system";
    content: string | null;
  }
  
import cron from "node-cron"; 
import { UserData } from "../types/user.types";
import { getAllUsers } from "../repositories/userRespository";
import getEvents from "../services/openRouterService";

function extractJSON(content: string | null): any[] | null {
    if (!content) return null;
    
    // Remove ```json and ``` markers
    const cleaned = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    try {
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return null;
    }
}
 

export const getEvent = async () => {
    const allUsers = await getAllUsers();
    const user = allUsers?.[0];
  
    if (!user) {
      console.error("No users found");
      return;
    }
  
    const { id, zipCode, ageRange } = user;
  
    try {
      const response = await getEvents({ id, zipCode, ageRange });
  
      if (!response?.content) {
        throw new Error("No content");
      }
      console.log(response.content);
    //    console.log(extractJSON(response.content));
   
    //   const jsonString = response.content.replace(/```json|```/g, '').trim();
    //   const events = JSON.parse(jsonString);
  
    //   console.log(events); // ✅ array of events
  
    } catch (error) {
      console.error("Error getting events:", error);
    }
  
    
    // cron.schedule('* * * * *', async () => {
    //   console.log("Cron job running...");
    // });
  };
  
// id, zipCode, ageRange