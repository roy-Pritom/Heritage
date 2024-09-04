import { z } from "zod";

const loginValidationSchema=z.object({
    body:z.object({
        email:z.string({'required_error':'email is required'}).email(),
        password:z.string({'required_error':"password is required"}).max(20)
    })
})

const refreshTokenValidationSchema = z.object({
    cookies: z.object({
      refreshToken: z.string({
        required_error: 'Refresh token is required!',
      }),
    }),
  });
export const AuthValidationSchemas={
loginValidationSchema,
refreshTokenValidationSchema
}