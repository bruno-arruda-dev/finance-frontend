import Button from "@/components/Button"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInputForm from "@/components/CustomFormComponents/CustomInputForm"
import { useForm } from "react-hook-form"
import { LoginInitialValues, LoginSchema } from "./LoginFormController"

export default function LoginForm() {
    const { handleSubmit, control } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: LoginInitialValues,
        resolver: zodResolver(LoginSchema)
    })

    async function onSubmit(values: any) {
        console.log(values)
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <CustomInputForm label="Email" nameField='email' control={control} />
            <br />
            <CustomInputForm label="Senha" type="password" nameField='password' control={control} />
            <br />
            <Button>Entrar</Button>
        </form>
    )
}