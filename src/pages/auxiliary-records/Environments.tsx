import { Col, Drawer, Row } from "antd";
import { useEffect, useState } from "react";
import BasicModal from "../../components/BasicModal";
import BottomBarForm from "../../components/BottomBar/BottomBarForm";
import EnvironmentForm from "../../components/forms/EnvironmentForm/EnvironmentForm";
import ColumnActions from "../../components/GenericTable/ColumnActions";
import GenericTable from "../../components/GenericTable/GenericTable";
import PageTitle from "../../components/PageTitle";
import { toastSuccess } from "../../utils/toast-utils";
import WorkLayout from "../../components/WorkLayout";
import { EnvironmentService } from "../../services/environment-service";
import { HandleSessionStorage } from "../../utils/session-storage";

type TPermitions = 'editar' | 'compartilhar' | 'deletar';

type TEnvironment = {
  id: number,
  name: string,
  createdAt: string,
  userOwner: string,
  active: boolean,
  permitions: TPermitions[],
}


export default function Environments() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TEnvironment[]>([]);
  const user = HandleSessionStorage.getUserData();
  const [toEdit, setToEdit] = useState<{ open: boolean, environment: TEnvironment | null }>({ open: false, environment: null });
  const [toShare, setToShare] = useState<{ open: boolean, environment: TEnvironment | null }>({ open: false, environment: null });
  const [toDelete, setToDelete] = useState<{ open: boolean, environment: TEnvironment | null }>({ open: false, environment: null });

  async function fetchData() {
    setIsLoading(true)
    const res = await EnvironmentService.get();
    if (res && res.status === 200 || res.status === 204) setData(res.data.environments)
    setIsLoading(false)
  }

  function handleEdit(record: TEnvironment) {
    setToEdit({ open: true, environment: record })

  }
  function handleShare(record: TEnvironment) {
    setToShare({ open: true, environment: record })
  }

  function handleConfirmDelete(record: TEnvironment) {
    setToDelete({ open: true, environment: record })
  }

  async function handleDelete() {
    setIsLoading(true)
    const res = await EnvironmentService.delete(toDelete.environment!.id)

    if (res.status === 200) {
      toastSuccess('Ambiente apagado com sucesso!');
      fetchData();
    }
    setToDelete({ open: false, environment: null })
    setIsLoading(false)
  }

  const cols = [
    {
      title: 'Código',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      render: (value: string) => <p className="capitalize">{value}</p>
    },
    {
      title: 'Cadastro',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (record: string) => `${record.split(' ')[0].split('-').reverse().join('/')} ${record.split(' ')[1]}`
    },
    {
      key: '',
      title: '',
      render: (_: any, record: TEnvironment) =>
        <ColumnActions
          actionEdit={() => handleEdit(record)}
          actionShare={() => handleShare(record)}
          actionDelete={() => handleConfirmDelete(record)}
          allowedEdit={record.permitions.includes('editar')}
          allowedShare={record.permitions.includes('compartilhar')}
          allowedDelete={record.permitions.includes('deletar')}
        />
    }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <WorkLayout>
        <PageTitle title="Ambientes" />

        <Row gutter={[10, 10]}>
          <Col span={24}>
            <GenericTable
              cols={cols}
              data={data}
              loading={isLoading}
            />
          </Col>
        </Row>

        <BottomBarForm textOk={'Novo Ambiente'} actionOk={() => setToEdit({ open: true, environment: null })} hideCancel />
      </WorkLayout>

      <Drawer destroyOnClose title={toEdit.environment ? 'Editar Ambiente' : 'Cadastrar Ambiente'} open={toEdit.open} onClose={() => setToEdit({ open: false, environment: null })}>
        <EnvironmentForm fetchData={fetchData} id={toEdit.environment?.id} />
      </Drawer>

      <Drawer destroyOnClose title={'Compartilhamento de Ambiente'} open={toShare.open} onClose={() => setToShare({ open: false, environment: null })}>
        Compartilhar
      </Drawer>

      <BasicModal
        title={`Deseja apagar o ambiente?`}
        isOpen={toDelete.open}
        onOk={handleDelete}
        onCancel={() => setToDelete({ open: false, environment: null })}
      >
        <br />
        <p>{toDelete.environment?.name.toUpperCase()}</p>
      </BasicModal>
    </>
  );
}