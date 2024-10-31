'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UserDataSecurityInitialValues, UserDataSecuritySchema } from "./UserDataFormController"
import { useState } from "react";
import { getDeviceType } from "@/utils/device-type";
import { Col, Row } from "antd";
import CustomInputForm from "@/components/CustomFormComponents/CustomInputForm";
import BottomBarForm from "@/components/BottomBar/BottomBarForm";
import { UserService } from "@/services/user-service";
import { toastSuccess } from "@/utils/toast-utils";

export default function UserSecurityForm() {
    const { handleSubmit, reset, control, setError, formState: { dirtyFields } } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: UserDataSecurityInitialValues,
        resolver: zodResolver(UserDataSecuritySchema)
    })
    const isDirty = Object.entries(dirtyFields).length > 0;
    const [isLoading, setIsLoading] = useState(false);
    const isMobile = getDeviceType() === 'isMobile';
    const sessionUserData = typeof window != 'undefined' ? sessionStorage.getItem('user-data') : null;
    const user = sessionUserData ? JSON.parse(sessionUserData) : null

    async function onSubmit(values: any) {
        setIsLoading(true)
        try {
            const res = await UserService.UpdateUser(values, user.token)

            if (res && res.status === 200) reset()
            if (typeof window != undefined) sessionStorage.setItem('user-data', JSON.stringify(res.data.user))
            toastSuccess('Senha alterada com sucesso!')
            setIsLoading(false)
        } catch (error: any) {
            console.log(error.response.data.message)
            if (error.status === 401) setError('password', { message: error.response.data.message });
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={[10, 10]}>
                <Col span={isMobile ? 24 : 12}>
                    <CustomInputForm label='Senha' nameField='password' control={control} type="password" disabled={isLoading} />
                </Col>
            </Row>
            <br />
            <Row gutter={[10, 10]}>
                <Col span={isMobile ? 24 : 12}>
                    <CustomInputForm label='Nova Senha' nameField='newPassword' control={control} type="password" disabled={isLoading} />
                </Col>
            </Row>
            <br />
            <Row gutter={[10, 10]}>
                <Col span={isMobile ? 24 : 12}>
                    <CustomInputForm label='Confirmação de Nova Senha' nameField="newPasswordConfirmation" control={control} type="password" disabled={isLoading} />
                </Col>
            </Row>

            <BottomBarForm hideOk={isLoading || !isDirty} hideCancel={isLoading || !isDirty} actionCancel={() => reset()} />
        </form>
    )
}