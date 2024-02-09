import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import "reflect-metadata";

import { developerRouter, gameRouter, genreRouter, platformRouter, publisherRouter, userRouter } from "./routes";
import { errorHandler } from "./middlewares";

dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
const { PORT = 8080 } = process.env;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Set it as a string 'true'
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use("/auth", userRouter);
app.use(gameRouter);
app.use(developerRouter);
app.use(publisherRouter);
app.use(platformRouter);
app.use(genreRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});


AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));