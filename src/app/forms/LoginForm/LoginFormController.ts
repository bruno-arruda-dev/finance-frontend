import { z } from "zod"

export const LoginInitialValues = {
    email: '',
    password: ''
}

export const LoginSchema = z.object({
    email: z.string().min(1, { message: 'Email é requerido' }),
    password: z.string().min(1, { message: 'Senha é requerida' })
})