import Button from "@/components/Button"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInputForm from "@/components/CustomFormComponents/CustomInputForm"
import { useForm } from "react-hook-form"
import { RegisterInitialValues, RegisterSchema } from "./RegisterFormController"

export default function RegisterForm() {
    const { handleSubmit, control } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: RegisterInitialValues,
        resolver: zodResolver(RegisterSchema)
    })

    async function onSubmit(values: any) {
        console.log(values)
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <CustomInputForm label="Email" nameField='email' control={control} />
            <br />
            <CustomInputForm label="Senha" nameField='password' control={control} type='password' />
            <br />
            <CustomInputForm label="Confirmação de Senha" nameField='confirmPassword' control={control} type='password' />
            <br />
            <Button>Registrar</Button>
        </form>
    )
}