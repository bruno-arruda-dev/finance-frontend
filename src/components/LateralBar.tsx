import { Menu, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { FaHouseUser } from "react-icons/fa";
import { FaMoneyBillTransfer, FaWallet } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';
import { toastInfo } from "../utils/toast-utils";
import BasicModal from "./BasicModal";
import CollapseButton from "./CollapseButton";

export default function LateralBar() {
    const { deleteUser } = useUser();
    const [collapsed, setCollapsed] = useState(true);
    const [logoutModal, setLogoutModal] = useState(false);
    const navigateFunc = useNavigate();
    const sidebarRef = useRef<HTMLDivElement>(null);

    function handleCollapseMenu() {
        setCollapsed(!collapsed);
    }

    function handleMenuClick(values: any) {
        const key = values.key;
        switch (key) {
            case 'dashboard':
                navigateFunc('/dashboard');
                break;
            case 'cashFlow':
                navigateFunc('/cashFlow');
                break;
            case 'environments':
                navigateFunc('/auxiliary-records/environments');
                break;
            case 'wallets':
                navigateFunc('/auxiliary-records/wallets');
                break;
            case 'userConfig':
                navigateFunc('/user/data');
                break;
        }
    }

    function handleLogOut() {
        deleteUser();
        toastInfo('Ficarei aqui te esperando! Até a próxima 😊');
        navigateFunc('/');
    }

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setCollapsed(true);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const items: any = [
        {
            key: 'dashboard',
            icon: <MdDashboard size={20} />,
            label: 'Dashboard',
        },
        {
            key: 'cashFlow',
            icon: <FaMoneyBillTransfer size={20} />,
            label: 'Fluxo Financeiro'
        },
        {
            key: 'cadastrosAuxiliares',
            icon: <HiOutlinePuzzlePiece size={20} />,
            label: 'Cadastros Auxiliares',

            children: [
                {
                    key: 'environments',
                    icon: <FaHouseUser size={20} />,
                    label: 'Ambientes'
                },
                {
                    key: 'wallets',
                    icon: <FaWallet size={20} />,
                    label: 'Carteiras'
                },
            ],
        },
        {
            key: 'userConfig',
            icon: <FiUser size={20} />,
            label: 'Dados de usuário',
        },
    ];

    return (
        <>
            <div ref={sidebarRef} className={`
                h-[calc(100vh-48px)] flex bg-primary absolute flex-col justify-between bottom-0 left-0 pt-8 pb-4 px-1 z-10
                ${collapsed && 'w-[54px]'}
            `}>
                <CollapseButton direction={collapsed ? 'right' : 'left'} size="small" right={-7} top={3} onClick={handleCollapseMenu} />

                <Menu
                    style={{ width: collapsed ? '100%' : '300px', transition: 'all 0s' }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={handleMenuClick}
                />

                <Tooltip title={collapsed ? 'Sair do aplicativo' : ''} placement="right">
                    <div
                        onClick={() => setLogoutModal(true)}
                        className={`
                        h-8 w-full bg-secondary error cursor-pointer rounded-lg text-white flex items-center justify-center transition duration-200 ease-in-out
                        hover:bg-primary
                        ${!collapsed && 'gap-2'}
                        `}>
                        <RiLogoutBoxLine size={20} /> {!collapsed ? 'Sair' : ''}
                    </div>
                </Tooltip>
            </div>

            <BasicModal
                isOpen={logoutModal}
                onOk={handleLogOut}
                onCancel={() => setLogoutModal(false)}
                title="Não vá ainda 😢, fique mais um pouco!"
                okText={'Sair'}
                cancelText={'Não, vou continuar logado'}
            >
                Tem certeza de que quer sair?
            </BasicModal>
        </>
    );
}
