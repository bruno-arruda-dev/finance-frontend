import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EnvironmentShareService } from "../../../services/environment-share-service";
import { EnvironmentShareSchema } from "./EnvironmentShareController";
import { Card, Col, Row } from "antd";
import CustomLabelForm from "../../../components/CustomFormComponents/CustomLabelForm";

type TEnvironmentShareDetails = {
    id?: number
};

export default function EnvironmentShareDetails({ id }: TEnvironmentShareDetails) {
    const { handleSubmit, control, reset, formState: { dirtyFields } } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: zodResolver(EnvironmentShareSchema)
    })
    const isDirty = Object.entries(dirtyFields).length > 0
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        setIsLoading(true)
        const res = await EnvironmentShareService.get(id);
        if (res && res.status === 200) reset(res.data.environment)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Card>
            <Row gutter={[10, 10]}>
                <Col span={12}>
                    <CustomLabelForm label="Código do Ambiente" nameField="id" control={control} isLoading={isLoading} />
                </Col>
            </Row>
        </Card>
    );
}
