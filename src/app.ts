import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"
import { router as senderController } from "./controller/sender.controller";

// Load environment variables from .env file
dotenv.config();

// Create Express server
const app: Express = express();

var corsOptions = {
  origin: ["https://selfie.pollak.info","http://localhost:5173"],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const port = process.env.APP_PORT || 3000;

// Express configuration
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("public"));
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/sender", senderController);

// Default route
// app.get("/", (req: Request, res: Response) => {
//   res.render("pages/index");
// });

// Start Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
