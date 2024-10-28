import { zodResolver } from "@hookform/resolvers/zod";
import CustomInputForm from "@/components/CustomFormComponents/CustomInputForm";
import { useForm } from "react-hook-form";
import { LoginInitialValues, LoginSchema } from "./LoginFormController";
import { LoginService } from "@/services/login-service";
import { Button } from "antd";
import { TLoginProps } from "@/components/LoginCard";
import { useRouter } from "next/navigation";
import { toastSuccess } from "@/utils/toast-utils";
import { useState } from "react";

export default function LoginForm({ setIsModalOpen }: TLoginProps) {
    const { handleSubmit, control } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: LoginInitialValues,
        resolver: zodResolver(LoginSchema)
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(values: any) {
        setIsLoading(true)
        try {
            const res = await LoginService.Login(values);

            if (res && res.status === 201) {
                sessionStorage.setItem('user-data', JSON.stringify(res.data.user));
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
            <CustomInputForm disabled={isLoading} label="Senha" type="password" nameField='password' control={control} />
            <br />
            <Button disabled={isLoading} type="primary" htmlType="submit">Entrar</Button>
        </form>
    );
}
