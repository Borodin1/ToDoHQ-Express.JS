"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app_config_1 = __importDefault(require("./config/app.config"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
class App {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.initMiddlewares();
        this.initRoutes();
    }
    initMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, cors_1.default)({
            origin: [
                "http://localhost:3000",
                "http://localhost:5173",
                // production URL can be added here
            ],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        }));
    }
    initRoutes() {
        this.app.use("/api/auth", auth_routes_1.default);
        this.app.use("/api/user", user_routes_1.default);
        this.app.use("/api/todos", todo_routes_1.default);
    }
    start() {
        const { port, host } = app_config_1.default;
        this.app.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map