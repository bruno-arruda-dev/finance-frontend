import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EnvironmentService } from "../../../services/environment-service";
import { toastSuccess } from "../../../utils/toast-utils";
import BottomBarForm from "../../BottomBar/BottomBarForm";
import CustomCheckboxForm from "../../CustomFormComponents/CustomCheckboxForm";
import CustomInputForm from "../../CustomFormComponents/CustomInputForm";
import { EnvironmentInitialValues, EnvironmentSchema } from "./EnvironmentFormController";
import CustomLabelForm from "../../CustomFormComponents/CustomLabelForm";

type props = {
    fetchData: () => void;
    id?: number;
}

export default function EnvironmentForm({ fetchData, id }: props) {
    const { handleSubmit, control, reset, formState: { dirtyFields } } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: EnvironmentInitialValues,
        resolver: zodResolver(EnvironmentSchema)
    })
    const [isLoading, setIsLoading] = useState(false)
    const isDirty = Object.entries(dirtyFields).length > 0;

    async function fetchEnvironment() {
        setIsLoading(true)
        const res = await EnvironmentService.get(id);
        if (res && res.status === 200) reset(res.data.environments[0])
        console.log(res.data.environments[0])
        setIsLoading(false)
    }

    async function onSubmit(values: any) {
        setIsLoading(true)
        if (id) {
            const data = { id: values.id, name: values.name }
            const res = await EnvironmentService.put(data);

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
        setIsLoading(false)
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
                        <CustomCheckboxForm isLoading={isLoading} label='Ativo' nameField="active" control={control} />
                    </Col>
                </Row>
                <br />
                <Row gutter={[10, 10]}>
                    <Col span={24}>
                        <CustomInputForm textTransform="capitalize" isLoading={isLoading} label='Nome' nameField="name" control={control} />
                    </Col>
                </Row>
            </Card>

            <BottomBarForm hideCancel={!isDirty} hideOk={!isDirty} actionCancel={() => reset()} />
        </form>
    )
}