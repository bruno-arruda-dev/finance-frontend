import { zodResolver } from "@hookform/resolvers/zod"
import CustomInputForm from "@/components/CustomFormComponents/CustomInputForm"
import { useForm } from "react-hook-form"
import { LoginInitialValues, LoginSchema } from "./LoginFormController"
import { LoginService } from "@/services/login-service"
import { Button } from "antd"
import { TLoginProps } from "@/components/LoginCard"
import { useRouter } from "next/navigation"
import { toastSuccess } from "@/app/utils/toast-utils"

export default function LoginForm({ setIsModalOpen }: TLoginProps) {
    const router = useRouter()
    const { handleSubmit, control } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: LoginInitialValues,
        resolver: zodResolver(LoginSchema)
    })

    async function onSubmit(values: any) {
        const res = await LoginService.Login(values)
        if (res && res.status === 201) {
            const local = { id: res.data.user.id, name: res.data.user.name, email: res.data.user.email }
            localStorage.setItem('user-data', JSON.stringify(local));
            sessionStorage.setItem('token', res.data.user.token);
            toastSuccess('Você se está logado 😎 Vamos direcioná-lo para sua dashboard.')
            router.push('/dashboard');
            setIsModalOpen(false);
        }
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <CustomInputForm label="Email" nameField='email' control={control} />
            <br />
            <CustomInputForm label="Senha" type="password" nameField='password' control={control} />
            <br />
            <Button type="primary" htmlType="submit">Entrar</Button>
        </form>
    )
}