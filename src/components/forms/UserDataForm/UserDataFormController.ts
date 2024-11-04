import { z } from "zod"
import { required } from "../../../utils/requiredField"

export const UserDataFormInitialValues = {
    id: '',
    name: null,
    email: '',
    createdAt: '',
    active: false,
}

export const UserDataFormSchema = z.object({
    id: z.string(),
    name: z.string().nullable().optional(),
    email: z.string({ message: required('Email') }).min(1, { message: required('Email') }).email({ message: 'Formato de email inválido' }),
    active: z.boolean(),
    createdAt: z.string()
}).omit({
    id: true,
    createdAt: true,
})

export type TUserDataFormSchema = z.infer<typeof UserDataFormSchema>

export const UserDataSecurityInitialValues = {
    password: '',
    newPassword: '',
    newPasswordConfirmation: '',
}

export const UserDataSecuritySchema = z.object({
    password: z.string({ message: required('Senha') }).min(8, { message: 'Senha precisa ter no mínimo 8 caracteres' }),
    newPassword: z.string({ message: required('Nova Senha') }).min(8, { message: 'Nova Senha precisa ter no mínimo 8 caracteres' }),
    newPasswordConfirmation: z.string({ message: required('Confirmação de Nova Senha') }).min(8, { message: 'Confirmação de Nova Senha precisa ter no mínimo 8 caracteres' }),
}).superRefine((data, ctx) => {
    if (data.password === data.newPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'Nova Senha é igual a Senha digitada',
            path: ['newPassword']
        })
    }

    if (data.newPassword !== data.newPasswordConfirmation) {
        ctx.addIssue({
            code: 'custom',
            message: 'Novas senhas não são iguais',
            path: ['newPassword']
        })
        ctx.addIssue({
            code: 'custom',
            message: 'Novas senhas não são iguais',
            path: ['newPasswordConfirmation']
        })
    }
})

export type TUserDataSecuritySchema = z.infer<typeof UserDataSecuritySchema>
