import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import { UserService } from "../../../services/user-service";
import { toastSuccess } from "../../../utils/toast-utils";
import CustomInputForm from "../../CustomFormComponents/CustomInputForm";
import { TLoginProps } from "../../LoginCard";
import { LoginInitialValues, LoginSchema } from "./LoginFormController";

export default function LoginForm({ setIsModalOpen }: TLoginProps) {
    const { updateUser } = useUser();
    const { handleSubmit, control } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: LoginInitialValues,
        resolver: zodResolver(LoginSchema)
    });
    const [isLoading, setIsLoading] = useState(false)
    const navigateFunc = useNavigate()

    async function onSubmit(values: any) {
        setIsLoading(true)
        try {
            const res = await UserService.Login(values);

            if (res && res.status === 201) {
                updateUser(res.data.user);
                toastSuccess('Você está logado! Vamos direcioná-lo para sua dashboard.');
                navigateFunc('/dashboard');
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
