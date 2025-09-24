import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import users from "./router/users";

const app: Application = express(); 

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/users", users);

export default app; 