import PageTitle from "@/components/PageTitle";
import WorkLayout from "@/components/WorkLayout";
import UserDataForm from "@/forms/UserDataForm/UserDataForm";
import UserSecurityForm from "@/forms/UserDataForm/UserSecurityForm";
import { Tabs, TabsProps } from "antd";

export default function Dashboard() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Dados de usuário',
      children: <UserDataForm />,
    },
    {
      key: '2',
      label: 'Alteração de senha',
      children: <UserSecurityForm />,
    }
  ]


  return (
    <WorkLayout>
      <PageTitle title='Dados de Usuário' />
      <Tabs items={items} />
    </WorkLayout>
  );
}
