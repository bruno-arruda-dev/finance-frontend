import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

type props = {
    key: string,
    cols: ColumnsType<any>;
    data: any;
    loading: boolean,
}

export default function GenericTable({ key, cols, data, loading }: props) {
    return (
        <>
            <Table
                key={key}
                columns={cols}
                dataSource={data}
                bordered={true}
                loading={loading}
            />
        </>
    )
}