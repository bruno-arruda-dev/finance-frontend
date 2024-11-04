import { Button } from "antd";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BasicModal from "./BasicModal";
import CustomAvatar from "./CustomAvatar";
import LoginCard from "./LoginCard";
import { HandleSessionStorage } from "../utils/session-storage";

export default function Header() {
    const params = useParams();
    const user = HandleSessionStorage.getUserData();
    const [name, setName] = useState(user?.name);
    const [token, setToken] = useState(user?.token);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const greeting = !token
        ? 'Finance'
        : name
            ? `Olá, ${name.split(' ')[0]}!`
            : (
                <Link to='/user/data'>
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
