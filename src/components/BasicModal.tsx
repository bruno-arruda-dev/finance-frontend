import { Modal } from 'antd';

type Props = {
    title?: string;
    isOpen: boolean;
    onOk: () => void;
    onCancel: any;
    children: any;
    closable?: boolean;
    destroyOnClose?: boolean;
    okText?: any;
    cancelText?: any;
    disableFooter?: boolean;
};

export default function BasicModal({ title, isOpen, onOk, onCancel, children, closable = true, destroyOnClose = true, okText, cancelText, disableFooter = undefined }: Props) {
    const footer = disableFooter ? null : undefined;

    return (
        <Modal
            title={title}
            open={isOpen}
            closable={closable}
            onCancel={() => onCancel(false)}
            onOk={onOk}
            okText={okText}
            cancelText={cancelText}
            footer={footer}
            destroyOnClose={destroyOnClose}
        >
            {children}
        </Modal>
    );
}
