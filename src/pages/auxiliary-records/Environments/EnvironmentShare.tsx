import { Drawer, Empty } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BottomBarForm from "../../../components/BottomBar/BottomBarForm";
import { EnvironmentService } from "../../../services/environment-service";
import { addUserIcon } from "../../../utils/icons";
import { TEnvironment } from "./Environments";
import EnvironmentShareCard from "./EnvironmentShareCard";
import { TEnvironmentShare } from "./EnvironmentShareController";
import EnvironmentShareDetails from "./EnvironmentShareDetails";

type props = {
    fetchData: () => void;
    id?: number;
    setToShare: Dispatch<SetStateAction<{ open: boolean; environment?: TEnvironment }>>;
}

export default function EnvironmentShare({ fetchData, id, setToShare }: props) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [compartilhamentoModal, setCompartilhamentoModal] = useState<{ open: boolean, id?: number }>({ open: false, id: undefined })


    async function fetchEnvironment() {
        setIsLoading(true)
        const res = await EnvironmentService.get(id);
        if (res && res.status === 200) {
            setData(res.data.environments[0].share)
        }
        setIsLoading(false)
    }

    function handleCloseCompartilhamentoModal() {
        setCompartilhamentoModal({ open: false, id: undefined })
    }

    useEffect(() => {
        fetchEnvironment()
    }, [])

    return (
        <>
            {isLoading ? <h1>Carregando...</h1> :
                data && data.length === 0 ? <Empty /> : data.map((e: TEnvironmentShare) => (
                    <EnvironmentShareCard environment={e} onClick={() => setCompartilhamentoModal({ open: true, id: e.id })} />
                )
                )
            }

            <BottomBarForm
                textCancel={'Sair'}
                actionCancel={() => setToShare({ open: false, environment: undefined })}
                width={30}
                leftButton={{ text: 'Novo Convite', onClick: () => setCompartilhamentoModal({ open: true, id: undefined }), icon: addUserIcon() }}
                modal
                hideOk
            // hideCancel
            />

            <Drawer open={compartilhamentoModal.open} onClose={handleCloseCompartilhamentoModal} width={'30vw'} title={compartilhamentoModal.id ? "Detalhes do Compartilhamento" : "Novo Compartilhamento"}>
                <EnvironmentShareDetails id={compartilhamentoModal.id} />
            </Drawer>
        </>
    )
}