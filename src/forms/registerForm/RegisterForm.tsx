import { zodResolver } from "@hookform/resolvers/zod"
import CustomInputForm from "@/components/CustomFormComponents/CustomInputForm"
import { useForm } from "react-hook-form"
import { RegisterInitialValues, RegisterSchema } from "./RegisterFormController"
import { UserService } from "@/services/user-service"
import { Button } from "antd"
import { toastSuccess } from "@/utils/toast-utils"
import { useRouter } from "next/navigation"
import { TLoginProps } from "@/components/LoginCard"
import { useState } from "react"

export default function RegisterForm({ setIsModalOpen }: TLoginProps) {
    const { handleSubmit, control } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: RegisterInitialValues,
        resolver: zodResolver(RegisterSchema)
    })
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)


    async function onSubmit(values: any) {
        setIsLoading(true);
        try {
            const res = await UserService.Register(values)
            if (res && res.status === 201) {
                sessionStorage.setItem('user-data', JSON.stringify(res.data.user))
                toastSuccess('Você está logado! Vamos direcioná-lo para sua dashboard.');
                router.push('/dashboard');
                setIsModalOpen(false);
            }

            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }

    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <CustomInputForm disabled={isLoading} label="Email" nameField='email' control={control} />
            <br />
            <CustomInputForm disabled={isLoading} label="Senha" nameField='password' control={control} type='password' />
            <br />
            <CustomInputForm disabled={isLoading} label="Confirmação de Senha" nameField='passwordConfirmation' control={control} type='password' />
            <br />
            <Button disabled={isLoading} type='primary' htmlType="submit" >Registrar</Button>
        </form>
    )
}