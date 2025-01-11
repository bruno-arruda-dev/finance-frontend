import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Col, Row } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EnvironmentService } from "../../../services/environment-service";
import { toastSuccess } from "../../../utils/toast-utils";
import BottomBarForm from "../../BottomBar/BottomBarForm";
import CustomCheckboxForm from "../../CustomFormComponents/CustomCheckboxForm";
import CustomInputForm from "../../CustomFormComponents/CustomInputForm";
import { EnvironmentInitialValues, EnvironmentSchema } from "./EnvironmentFormController";
import CustomLabelForm from "../../CustomFormComponents/CustomLabelForm";
import { TEnvironment } from "../../../pages/auxiliary-records/Environments/Environments";
import { verifyPermitions } from "../../../utils/security-utils";

type props = {
    fetchData: () => void;
    id?: number;
    setToEdit: Dispatch<SetStateAction<{ open: boolean; environment?: TEnvironment }>>;
}

export default function EnvironmentForm({ fetchData, id, setToEdit }: props) {
    const { handleSubmit, control, reset, formState: { dirtyFields } } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: EnvironmentInitialValues,
        resolver: zodResolver(EnvironmentSchema)
    })
    const isDirty = Object.entries(dirtyFields).length > 0;
    const [isLoading, setIsLoading] = useState(false)
    const [actions, setActions] = useState([])
    const isAllowed = verifyPermitions(actions);
    const allowedEdit = id ? isAllowed('editar') : true;

    async function fetchEnvironment() {
        setIsLoading(true)
        const res = await EnvironmentService.get(id);
        if (res && res.status === 200) {
            reset(res.data.environments[0])
            setActions(res.data.environments[0].permitions)
        }
        setIsLoading(false)
    }

    console.log(actions)

    async function onSubmit(values: any) {
        setIsLoading(true)
        try {
            if (id) {
                const res = await EnvironmentService.put(values);

                if (res && res.status === 200) {
                    reset(res.data.environment);
                    fetchData();
                    toastSuccess('Ambiente atualizado com sucesso!')
                }
            } else {
                const data = { name: values.name }
                const res = await EnvironmentService.post(data);

                if (res && res.status === 201) {
                    reset(res.data.environment);
                    fetchData();
                    toastSuccess('Ambiente registrado com sucesso!')
                }
            }
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setIsLoading(false)
            setToEdit({ open: false, environment: undefined })
        }
    }


    useEffect(() => {
        if (id) fetchEnvironment()
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <Row gutter={[10, 10]}>
                    <Col span={20}>
                        <CustomLabelForm label='Código' nameField="id" control={control} isLoading={isLoading} />
                    </Col>
                    <Col span={4}>
                        <CustomCheckboxForm isLoading={isLoading} label='Ativo' nameField="active" control={control} disabled={!allowedEdit} />
                    </Col>
                </Row>
                <br />
                <Row gutter={[10, 10]}>
                    <Col span={24}>
                        <CustomInputForm textTransform="capitalize" isLoading={isLoading} label='Nome' nameField="name" control={control} disabled={!allowedEdit} />
                    </Col>
                </Row>
            </Card>

            <BottomBarForm disableOk={!isDirty || !allowedEdit} disableCancel={!isDirty} actionCancel={() => reset()} width={30} modal />
        </form>
    )
}