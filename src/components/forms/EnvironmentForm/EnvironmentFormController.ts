import { z } from "zod"
import { required } from "../../../utils/requiredField"

export const EnvironmentInitialValues = {
    id: null,
    name: '',
    active: true,
}

export const EnvironmentSchema = z.object({
    id: z.number().optional().nullable(),
    name: z.string({ message: required('Nome') }).min(4, { message: 'Nome precisa ter no mínimo 4 caracteres' }),
    active: z.boolean(),
})