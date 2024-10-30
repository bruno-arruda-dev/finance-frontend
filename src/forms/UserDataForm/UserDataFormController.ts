import { required } from "@/utils/requiredField"
import { z } from "zod"

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