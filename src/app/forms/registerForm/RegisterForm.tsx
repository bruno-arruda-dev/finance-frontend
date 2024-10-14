import { zodResolver } from "@hookform/resolvers/zod"
import CustomInputForm from "@/components/CustomFormComponents/CustomInputForm"
import { useForm } from "react-hook-form"
import { RegisterInitialValues, RegisterSchema } from "./RegisterFormController"
import { LoginService } from "@/services/login-service"
import { Button } from "antd"
import { toastSuccess } from "@/app/utils/toast-utils"
import { useRouter } from "next/navigation"
import { TLoginProps } from "@/components/LoginCard"

export default function RegisterForm({ setIsModalOpen }: TLoginProps) {
    const router = useRouter()
    const { handleSubmit, control } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: RegisterInitialValues,
        resolver: zodResolver(RegisterSchema)
    })


    async function onSubmit(values: any) {
        const res = await LoginService.Register(values)
        if (res && res.status === 201) {
            sessionStorage.setItem('user-data', JSON.stringify(res.data.user));
            toastSuccess('Você está logado! Vamos direcioná-lo para sua dashboard.');
            router.push('/dashboard');
            setIsModalOpen(false);
        }

    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <CustomInputForm label="Email" nameField='email' control={control} />
            <br />
            <CustomInputForm label="Senha" nameField='password' control={control} type='password' />
            <br />
            <CustomInputForm label="Confirmação de Senha" nameField='passwordConfirmation' control={control} type='password' />
            <br />
            <Button type='primary' htmlType="submit" >Registrar</Button>
        </form>
    )
}