import { z } from "zod"

export const RegisterInitialValues = {
    email: '',
    password: '',
    confirmPassword: ''
}

export const RegisterSchema = z.object({
    email: z.string().min(1, { message: 'Email é requerido' }),
    password: z.string().min(1, { message: 'Senha é requerida' }),
    confirmPassword: z.string().min(1, { message: 'Confirmação de senha é requerida' })
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'As senhas devem ser iguais',
            path: ['confirmPassword'],
        });
    }
});
