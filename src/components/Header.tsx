'use client'
import { Button } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BasicModal from "./BasicModal";
import CustomAvatar from "./CustomAvatar";
import LoginCard from "./LoginCard";

export default function Header() {
    const params = useParams();
    const sessionUserData = typeof window != 'undefined' ? sessionStorage.getItem('user-data') : null;
    const user = sessionUserData ? JSON.parse(sessionUserData) : null
    const [name, setName] = useState(user?.name);
    const [token, setToken] = useState(user?.token);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const greeting = !token
        ? 'Finance'
        : name
            ? `Olá, ${name.split(' ')[0]}!`
            : (
                <Link href='/user/data'>
                    Olá! Ainda não sei seu nome. Clica aqui e me conta!
                </Link>
            );

    useEffect(() => {
        setToken(user?.token);
        setName(user?.name);
    }, [params]);

    return (
        <>
            <div className="w-full h-12 px-1 flex items-center justify-between bg-primary text-txt-primary">
                <h1 className={`ml-1 ${name && 'capitalize'}`}>{greeting}</h1>
                <div className="flex gap-4 h-full items-center">
                    {!token && <Button type='primary' onClick={() => setIsModalOpen(true)}>Entrar</Button>}
                    <CustomAvatar />
                </div>
            </div>

            <BasicModal isOpen={isModalOpen} onCancel={setIsModalOpen} onOk={() => setIsModalOpen(false)} disableFooter>
                <LoginCard setIsModalOpen={setIsModalOpen} />
            </BasicModal>
        </>
    );
}
