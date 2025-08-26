import { z } from "zod";
declare const authSchema: {
    login: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
    register: z.ZodObject<{
        username: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        password_confirmation: z.ZodString;
    }, z.core.$strip>;
    updateProfile: z.ZodObject<{
        username: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
};
export default authSchema;
//# sourceMappingURL=auth.schema.d.ts.map