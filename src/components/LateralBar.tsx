import { Menu, MenuProps } from "antd";
import { MdDashboard } from "react-icons/md";
import { FaMoneyBillTransfer, FaWallet } from "react-icons/fa6";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import { FaHouseUser } from "react-icons/fa";






export default function LateralBar() {

    const items: any = [
        {
            key: '1',
            icon: <MdDashboard size={20} />,
            label: 'Dashboard'
        },
        {
            key: '2',
            icon: <FaMoneyBillTransfer size={20} />,
            label: 'Fluxo Financeiro'
        },
        {
            key: '3',
            icon: <HiOutlinePuzzlePiece size={20} />,
            label: 'Cadastros Auxiliares',

            children: [
                {
                    key: '4',
                    icon: <FaHouseUser size={20} />,
                    label: 'Ambientes'
                },
                {
                    key: '5',
                    icon: <FaWallet size={20} />,
                    label: 'Carteiras'
                },
            ],
        },
    ];

    return (
        <div className="h-[calc(100vh-48px)] min-w-12 bg-primary absolute bottom-0 left-0">
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={true}
                items={items}
                triggerSubMenuAction={'hover'}
            />
        </div>)
}