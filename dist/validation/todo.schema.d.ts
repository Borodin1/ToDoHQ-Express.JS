import z from "zod";
export declare const todoSchema: {
    create: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        priority: z.ZodEnum<{
            extreme: "extreme";
            moderate: "moderate";
            low: "low";
        }>;
        completed: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
    update: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        priority: z.ZodOptional<z.ZodEnum<{
            extreme: "extreme";
            moderate: "moderate";
            low: "low";
        }>>;
        completed: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
};
//# sourceMappingURL=todo.schema.d.ts.map