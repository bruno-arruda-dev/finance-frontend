'use client'
import { useEffect, useState } from "react";
import { Button, Tooltip, Typography } from "antd";
import CustomAvatar from "./CustomAvatar";
import BasicModal from "./BasicModal";
import LoginCard from "./LoginCard";
import { isAuth } from "@/utils/isAuth";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Header() {
    const params = useParams();
    const [name, setName] = useState(isAuth().name);
    const [token, setToken] = useState(isAuth().token);
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
        setToken(isAuth().token);
        setName(isAuth().name);
    }, [params]);

    return (
        <>
            <div className="w-full h-12 px-1 flex items-center justify-between bg-primary text-txt-primary">
                <h1 className="ml-1 capitalize">{greeting}</h1>
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
