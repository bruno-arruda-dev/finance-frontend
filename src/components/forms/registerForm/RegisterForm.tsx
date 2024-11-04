import { RegisterInitialValues, RegisterSchema } from "./RegisterFormController"
import { Button } from "antd"
import { useState } from "react"
import { useForm } from "react-hook-form";
import CustomInputForm from "../../CustomFormComponents/CustomInputForm";
import { TLoginProps } from "../../LoginCard";
import { toastSuccess } from "../../../utils/toast-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserService } from "../../../services/user-service";
import { useNavigate } from "react-router-dom";
import { HandleSessionStorage } from "../../../utils/session-storage";

export default function RegisterForm({ setIsModalOpen }: TLoginProps) {
    const { handleSubmit, control } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: RegisterInitialValues,
        resolver: zodResolver(RegisterSchema)
    })
    const [isLoading, setIsLoading] = useState(false)
    const navigateFunc = useNavigate()

    async function onSubmit(values: any) {
        setIsLoading(true);
        try {
            const res = await UserService.Register(values)
            if (res && res.status === 201) {
                HandleSessionStorage.setUserData(res.data.user);
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
            <CustomInputForm disabled={isLoading} label="Senha" nameField='password' control={control} type='password' />
            <br />
            <CustomInputForm disabled={isLoading} label="Confirmação de Senha" nameField='passwordConfirmation' control={control} type='password' />
            <br />
            <Button disabled={isLoading} type='primary' htmlType="submit" >Registrar</Button>
        </form>
    )
}