import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

type props = {
    cols: ColumnsType<any>;
    data: any;
    loading: boolean,
}

export default function GenericTable({ cols, data, loading }: props) {
    return (
        <>
            <Table
                columns={cols}
                dataSource={data}
                bordered={true}
                loading={loading}
            />
        </>
    )
}