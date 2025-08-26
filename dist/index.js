"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("tsconfig-paths/register");
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const app = new app_1.default;
app.start();
//# sourceMappingURL=index.js.map