'use client'
import { useState } from "react";
import { Button } from "antd";
import CustomAvatar from "./CustomAvatar";
import BasicModal from "./BasicModal";
import LoginCard from "./LoginCard";
import { message } from 'antd'


export default function Header() {
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false)

    function toastSuccess(content: string) {
        messageApi.open({
            type: 'success',
            content: content
        })
    }

    return (
        <>
            {contextHolder}
            <div className="w-full h-12 px-1 flex items-center justify-between bg-primary text-txt-primary">
                <div />
                <div className="flex gap-4 h-full items-center">
                    <Button type='primary' onClick={() => setIsModalOpen(true)}>Entrar</Button>
                    <CustomAvatar />
                </div>
            </div>

            <BasicModal isOpen={isModalOpen} onCancel={setIsModalOpen} onOk={() => setIsModalOpen(false)} disableFooter>
                <LoginCard setIsModalOpen={setIsModalOpen} />
            </BasicModal>
        </>
    );
}
