import { z } from "zod";

export const NewEnvironmentShareSchema = z.object({
    createdAt: z.string(),
    userPartnerEmail: z.string().email(),
    permitions: z.array(z.string()).nullish().nullable().optional()
})

export const AditionalValuesEnvironmentShareSchema = z.object({
    id: z.number(),
    createdAt: z.string(),
    accepted: z.boolean().nullable(),
    active: z.boolean(),
    userPartner: z.string(),
    userPartnerName: z.string().nullable()
})

export const EnvironmentShareSchema = z.intersection(
    NewEnvironmentShareSchema,
    AditionalValuesEnvironmentShareSchema
);

export const AllEnvironmentShareSchema = z.array(EnvironmentShareSchema)

export type TEnvironmentShare = z.infer<typeof EnvironmentShareSchema>
export type TAllEnvironmentShare = z.infer<typeof AllEnvironmentShareSchema>