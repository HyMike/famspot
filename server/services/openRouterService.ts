import OpenAI from 'openai';
import dotenv from "dotenv"; 
import { UserPromptData } from '../types/user.types';

interface OpenAIMessage {
  role: "assistant" | "user" | "system";
  content: string | null;
}

dotenv.config(); 

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});


async function getEvents(userPromptData: UserPromptData): Promise<OpenAIMessage | undefined>  {
  const today = new Date();
  const nextWeek = new Date(); 
  nextWeek.setDate(today.getDate() + 7);

  const {id, zipCode, ageRange} = userPromptData;

  const completion = await openai.chat.completions.create({
    model: 'openai/gpt-4o',
    messages: [
      {
        role: "system",
        content: "You are a JSON API. You respond only with valid JSON data, never with explanatory text or markdown formatting. You are a helpful assistant that specializes in finding local family events. You have web search capabilities and can find events from various online sources including social media, community websites, and local organizations."
      },
      {
        role: "user",
        content: `Search for 3 friendly events age range ${ageRange} happening this week (${today} till ${nextWeek}) in ZIP code ${zipCode}.
    
    Include events from various sources like:
    - Local business Instagram pages
    - Community center websites/calendars
    - Library or park district newsletters
    - Small venue event pages
    - Facebook community groups
    - Local mom blogs or parenting groups
    
    CRITICAL: Return ONLY a complete, valid JSON array. Ensure:
    - All strings are properly quoted
    - All objects are properly closed with }
    - The array is properly closed with ]
    - No trailing commas
    - No explanatory text
    Example format:
    [{"event":"Name","description":"brief description","event_date":"Date & time","location":"Location/venue","event_link":"Source link (Instagram post, website calendar, etc.)"}]
    `
      }
    ],
    max_tokens: 100,
  });

  return completion.choices[0]?.message;
}

export default getEvents; 

// since javascript is single threaded. inside a function with async and await. the await will 
// trigger to run in the background queues event loop. it will stop whatever line of code comes after it. 
// So we don't need to pass in the id and email just have it there and it loop thru and we can insert it back 
// after we are done with the await. just need to send the age range and zip code. 

//  Need to consider if there are 0 events happening in your local event? what do you do then? 


// You're a parent and trying to find local events in the area code 91801 for toddler events? Can you give me 3 listing that a family would be able to do this week?



// You are a parent looking for local family activities. 
// Search the web for up to 3 toddler-friendly events (ages 1–3) happening this week (Sept 26 – Oct 2, 2025) in Alhambra, CA (ZIP 91801). 
// Only include events that are listed on an official or reputable source (e.g., city websites, event platforms, libraries, or parks & recreation pages). 
// Return the results as a markdown table with JSON: Event | Date & Time | Location | Link. 
// If fewer than 3 events are available, use other sources to gather them. 

//Should i include a prompt that would increase it by zipcode radius like 5 if none are found? 
// what if it keep inserting into the database the same events again. (Could solve this later)


// `You are a parent looking for local family activities.
// Search for 3 friendly events age range ${ageRange} happening this week (${today} till ${nextWeek}) in ZIP code ${zipCode}.

// Include events from various sources like:
// - Local business Instagram pages
// - Community center websites/calendars
// - Library or park district newsletters
// - Small venue event pages
// - Facebook community groups
// - Local mom blogs or parenting groups

// Return the results in valid JSON with the following fields:

// - event: Event name
// - description: brief description
// - event_date: Date & time
// - location: Location/venue
// - event_link: Source link (Instagram post, website calendar, etc.)
// `;
