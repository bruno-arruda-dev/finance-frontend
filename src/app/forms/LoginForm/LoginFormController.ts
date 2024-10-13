import { z } from "zod"

export const LoginInitialValues = {
    email: '',
    password: ''
}

export const LoginSchema = z.object({
    email: z.string({ message: "Email precisa ser um email válido" }).email({ message: "Email precisa ser um email válido" }).min(1, { message: "Email precisa ser um email válido" }),
    password: z.string({ message: "Senha precisa ter no mínimo 8 caracteres" }).min(8, { message: "Senha precisa ter no mínimo 8 caracteres" })
})