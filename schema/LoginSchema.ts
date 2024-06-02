import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Campo Obrigatório!" })
    .email("Insira um email válido!"),
  password: z
    .string({ required_error: "Campo Obrigatório!" })
    .min(7, "Sua senha precisa ter pelomenos 7 caracteres!"),
})

export type ZodLoginSchema = z.infer<typeof loginSchema>
