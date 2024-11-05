import { Button } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from '../context/UserContext';
import BasicModal from "./BasicModal";
import CustomAvatar from "./CustomAvatar";
import LoginCard from "./LoginCard";

export default function Header() {
    const { user } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const greeting = !user?.token
        ? 'Finance'
        : user?.name
            ? `Olá, ${user?.name.split(' ')[0]}!`
            : (
                <Link to='/user/data'>
                    Olá! Ainda não sei seu nome. Clica aqui e me conta!
                </Link>
            );


    return (
        <>
            <div className="w-full h-12 px-1 flex items-center justify-between bg-primary text-txt-primary">
                <h1 className={`ml-1 ${user?.name && 'capitalize'}`}>{greeting}</h1>
                <div className="flex gap-4 h-full items-center">
                    {!user?.token && <Button type='primary' onClick={() => setIsModalOpen(true)}>Entrar</Button>}
                    {user?.token && <CustomAvatar />}
                </div>
            </div>

            <BasicModal isOpen={isModalOpen} onCancel={setIsModalOpen} onOk={() => setIsModalOpen(false)} disableFooter>
                <LoginCard setIsModalOpen={setIsModalOpen} />
            </BasicModal>
        </>
    );
}
