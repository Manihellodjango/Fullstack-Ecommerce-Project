import express, {Request, Response,NextFunction} from 'express';
import morgan from "morgan";
import chalk from "chalk";
import { dev } from "./config/index";
import connectDB from "./config/db";
import userRoute from "./routes/user";
import categoryRoute from "./routes/category";
import productRoute from "./routes/product";
import cors from "cors"

const app = express();

const port = dev.app.serverPort;

app.listen(port, async () => {
  console.log(chalk.blue(`server is running at http://localhost:${port}`));
  await connectDB();
});


app.use(cors({
  credentials:true,
  origin:"http://localhost:3000"
}))
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);

app.get("/test", (req:Request, res:Response) => {
  res.send("api is working fine");
});

//error handling middleware client error
app.use((req:Request, res:Response, next:NextFunction) => {
  return res.status(404).send({
    success: false,
    message: "Route not found",
  });
});

// error handling middleware server error
app.use((err:any, req:Request, res:Response) => {
  console.error(err.stack);
  return res.status(500).json({
    success: false,
    error: err.message,
  });
});
