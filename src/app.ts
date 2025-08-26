import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import appConfig from "@config/app.config";
import authRoutes from "@routes/auth.routes";
import userRoutes from "@routes/user.routes";
import todoRoutes from "@routes/todo.routes";

class App {
  private app: Express;

  constructor() {
    this.app = express();

    this.initMiddlewares();
    this.initRoutes();
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "http://localhost:5173",
          // production URL can be added here
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );
  }

  private initRoutes() {
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/user", userRoutes);
    this.app.use("/api/todos", todoRoutes);
  }

  public start() {
    const { port, host } = appConfig;

    this.app.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  }
}

export default App;
