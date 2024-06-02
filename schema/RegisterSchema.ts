import { z } from "zod"

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "Campo Obrigatório!" })
      .min(5, "Seu nome deve ter pelomenos 5 caracteres!"),
    email: z
      .string({ required_error: "Campo Obrigatório!" })
      .email("Insira um email válido!"),
    password: z
      .string({ required_error: "Campo Obrigatório!" })
      .min(7, "Sua senha precisa ter pelomenos 7 caracteres!"),
    confirmPassword: z.string().optional(),
    favorite_framework: z.string({ required_error: "Campo Obrigatório!" }),
    terms: z.boolean({
      required_error: "Você deve aceitar os termos e condições!",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas devem ser iguais!",
        path: ["confirmPassword"],
      })
    }
  })
  .superRefine(({ terms }, ctx) => {
    if (!terms) {
      ctx.addIssue({
        code: "custom",
        message: "Você deve aceitar os termos e condições!",
        path: ["terms"],
      })
    }
  })

export type ZodRegisterSchema = z.infer<typeof registerSchema>
