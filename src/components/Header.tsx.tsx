'use client'
import { useEffect, useState } from "react";
import { Button } from "antd";
import CustomAvatar from "./CustomAvatar";
import BasicModal from "./BasicModal";
import LoginCard from "./LoginCard";
import { isAuth } from "@/app/utils/isAuth";


export default function Header() {
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('token') ? true : false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const token = isAuth().token

    useEffect(() => {
        setLoggedIn(token ? true : false)
    }, [isAuth()])


    return (
        <>
            <div className="w-full h-12 px-1 flex items-center justify-between bg-primary text-txt-primary">
                <div />
                <div className="flex gap-4 h-full items-center">
                    {!loggedIn && <Button type='primary' onClick={() => setIsModalOpen(true)}>Entrar</Button>}
                    <CustomAvatar />
                </div>
            </div>

            <BasicModal isOpen={isModalOpen} onCancel={setIsModalOpen} onOk={() => setIsModalOpen(false)} disableFooter>
                <LoginCard setIsModalOpen={setIsModalOpen} />
            </BasicModal>
        </>
    );
}
