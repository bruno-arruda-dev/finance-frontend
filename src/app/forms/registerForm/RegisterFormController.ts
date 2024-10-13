import { z } from "zod"

export const RegisterInitialValues = {
    email: '',
    password: '',
    passwordConfirmation: ''
}

export const RegisterSchema = z.object({
    email: z.string({ message: 'Email precisa ser um email válido' }).email({ message: 'Email precisa ser um email válido' }).min(1, { message: 'Email é requerido' }),
    password: z.string().min(8, { message: 'Senha precisa ter no mínimo 8 caracteres' }),
    passwordConfirmation: z.string().min(8, { message: 'Confirmação de senha precisa ter no mínimo 8 caracteres' })
}).superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'As senhas devem ser iguais',
            path: ['passwordConfirmation'],
        });
    }
});
