import { z } from "zod";

const userValidationSchema=z.object({
    body:z.object({
        firstName:z.string(),
        lastName:z.string(),
        gender:z.enum(['male','female']),
        email:z.string().email(),
        password:z.string(),
        profilePhoto:z.string().optional(),
        // role:z.enum(['admin','user']),
    })
})

export const userValidationSchemas={
userValidationSchema
}