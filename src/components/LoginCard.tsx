import { Tabs, TabsProps } from "antd";
import LoginForm from "./forms/LoginForm/LoginForm";
import RegisterForm from "./forms/registerForm/RegisterForm";

export type TLoginProps = {
    setIsModalOpen: any
}

export default function LoginCard({ setIsModalOpen }: TLoginProps) {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Login',
            children: <LoginForm setIsModalOpen={setIsModalOpen} />,
        },
        {
            key: '2',
            label: 'Registrar',
            children: <RegisterForm setIsModalOpen={setIsModalOpen} />,
        }
    ]

    return <Tabs items={items} />

}
