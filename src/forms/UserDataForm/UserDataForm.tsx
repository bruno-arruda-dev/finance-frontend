'use client'
import BottomBarForm from "@/components/BottomBar/BottomBarForm";
import CustomCheckboxForm from "@/components/CustomFormComponents/CustomCheckboxForm";
import CustomDatePickerForm from "@/components/CustomFormComponents/CustomDatePickerForm";
import CustomInputForm from "@/components/CustomFormComponents/CustomInputForm";
import { UserService } from "@/services/user-service";
import { toastSuccess } from "@/utils/toast-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Row } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserDataFormInitialValues, UserDataFormSchema } from "./UserDataFormController";
import { SessionStorage } from "@/utils/setSessionStorage";

export default function UserDataForm() {
    const { handleSubmit, reset, control, formState: { dirtyFields } } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: UserDataFormInitialValues,
        resolver: zodResolver(UserDataFormSchema)
    })
    const isDirty = Object.entries(dirtyFields).length > 0;

    async function fetchData() {
        const res = await UserService.GetUser();

        if (res && res.status === 200) reset(res.data.user);
    }

    async function onSubmit(values: any) {
        if (values.name === '') values.name = null;
        const res = await UserService.UpdateUser(values)

        if (res && res.status === 200) {
            SessionStorage.SetUserData(res.data.user)
            reset(res.data.user);
            toastSuccess('Dados de usuário atualizados com sucesso!')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Row gutter={[10, 10]}>
                <Col span={12}>
                    <CustomInputForm label='Email' nameField="email" control={control} />
                </Col>

            </Row>
            <br />
            <Row gutter={[10, 10]}>
                <Col span={12}>
                    <CustomInputForm label='Nome' nameField="name" control={control} textTransform="capitalize" />
                </Col>
            </Row>
            <br />
            <Row gutter={[10, 10]}>
                <Col span={6}>
                    <CustomCheckboxForm label='Usuário Ativo' nameField="active" control={control} />
                </Col>
                <Col span={6}>
                    <CustomDatePickerForm label='Data de Cadastro' nameField="createdAt" control={control} disabled />
                </Col>
            </Row>
            <br />
            <Row gutter={[10, 10]}>
                <Col span={12}>
                    <CustomInputForm label='ID de Usuário' nameField="id" control={control} readOnly />
                </Col>
            </Row>

            <BottomBarForm hideOk={!isDirty} hideCancel={!isDirty} actionCancel={() => reset()} />
        </form>
    )
}