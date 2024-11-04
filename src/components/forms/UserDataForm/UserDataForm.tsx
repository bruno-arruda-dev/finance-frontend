import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserService } from "../../../services/user-service";
import { getDeviceType } from "../../../utils/device-type";
import { normalizeText } from "../../../utils/normalize-text";
import { HandleSessionStorage } from "../../../utils/session-storage";
import { toastSuccess } from "../../../utils/toast-utils";
import BottomBarForm from "../../BottomBar/BottomBarForm";
import CustomCheckboxForm from "../../CustomFormComponents/CustomCheckboxForm";
import CustomDatePickerForm from "../../CustomFormComponents/CustomDatePickerForm";
import CustomInputForm from "../../CustomFormComponents/CustomInputForm";
import { UserDataFormInitialValues, UserDataFormSchema } from "./UserDataFormController";

export default function UserDataForm() {
    const { handleSubmit, reset, control, formState: { dirtyFields } } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: UserDataFormInitialValues,
        resolver: zodResolver(UserDataFormSchema)
    })
    const isDirty = Object.entries(dirtyFields).length > 0;
    const [isLoading, setIsLoading] = useState(false)
    const isMobile = getDeviceType() === "isMobile";
    async function fetchData() {
        const res = await UserService.GetUser();

        if (res && res.status === 200) reset(res.data.user);
    }

    async function onSubmit(values: any) {
        setIsLoading(true)
        if (values.name === '') {
            values.name = null
        } else {
            values.name = normalizeText(values.name)
        }
        const res = await UserService.UpdateUser(values)

        if (res && res.status === 200) {
            HandleSessionStorage.setUserData(res.data.user);
            reset(res.data.user);
            toastSuccess('Dados de usuário atualizados com sucesso!')
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Row gutter={[10, 10]}>
                <Col span={isMobile ? 24 : 12}>
                    <CustomInputForm label='Email' nameField="email" control={control} disabled={isLoading} />
                </Col>

            </Row>
            <br />
            <Row gutter={[10, 10]}>
                <Col span={isMobile ? 24 : 12}>
                    <CustomInputForm label='Nome' nameField="name" control={control} textTransform="capitalize" disabled={isLoading} />
                </Col>
            </Row>
            <br />
            <Row gutter={[10, 10]}>
                <Col span={isMobile ? 9 : 3}>
                    <CustomCheckboxForm label='Usuário Ativo' nameField="active" control={control} disabled={isLoading} />
                </Col>
                <Col span={isMobile ? 15 : 9}>
                    <CustomDatePickerForm label='Data de Cadastro' nameField="createdAt" control={control} disabled />
                </Col>
            </Row>
            <br />
            <Row gutter={[10, 10]}>
                <Col span={isMobile ? 24 : 12}>
                    <CustomInputForm label='ID de Usuário' nameField="id" control={control} readOnly />
                </Col>
            </Row>

            <BottomBarForm hideOk={isLoading || !isDirty} hideCancel={isLoading || !isDirty} actionCancel={() => reset()} />
        </form>
    )
}