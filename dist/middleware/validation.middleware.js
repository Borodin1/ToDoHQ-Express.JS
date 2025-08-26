"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_utils_1 = __importDefault(require("../utils/response.utils"));
const zod_1 = require("zod");
class ValidationMiddleware {
    static validateBody(schema) {
        return (req, res, next) => {
            try {
                schema.parse(req.body);
                next();
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const formattedErrors = {};
                    error.issues.forEach((err) => {
                        const field = err.path.join(".");
                        if (!formattedErrors[field]) {
                            formattedErrors[field] = [];
                        }
                        formattedErrors[field].push(err.message);
                    });
                    return response_utils_1.default.validationErrors(res, formattedErrors);
                }
                return response_utils_1.default.error(res, null, "Invalid request data");
            }
        };
    }
}
exports.default = ValidationMiddleware;
//# sourceMappingURL=validation.middleware.js.map