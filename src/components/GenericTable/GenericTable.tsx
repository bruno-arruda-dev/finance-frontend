import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

type Props = {
    rowKey: string;
    cols: ColumnsType<any>;
    data: any;
    loading: boolean;
    getRowSingleClick?: (recordKey?: any, record?: any, rowIndex?: number) => void;
    getRowDoubleClick?: (recordKey?: any, record?: any, rowIndex?: number) => void;
}

export default function GenericTable({ rowKey, cols, data, loading, getRowSingleClick, getRowDoubleClick }: Props) {
    return (
        <>
            <Table
                key={rowKey}
                columns={cols}
                dataSource={data}
                bordered={true}
                loading={loading}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => getRowSingleClick && getRowSingleClick(record[rowKey], record, rowIndex),
                        onDoubleClick: () => getRowDoubleClick && getRowDoubleClick(record[rowKey], record, rowIndex),
                    };
                }}
            />
        </>
    )
}
