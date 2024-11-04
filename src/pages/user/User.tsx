import { Tabs, TabsProps } from "antd";
import UserDataForm from "../../components/forms/UserDataForm/UserDataForm";
import UserSecurityForm from "../../components/forms/UserDataForm/UserSecurityForm";
import PageTitle from "../../components/PageTitle";
import WorkLayout from "../../components/WorkLayout";

export default function User() {
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
