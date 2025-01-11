import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BottomBarForm from "../../../components/BottomBar/BottomBarForm";
import { EnvironmentService } from "../../../services/environment-service";
import { verifyPermitions } from "../../../utils/security-utils";
import { TEnvironment } from "./Environments";
import EnvironmentShareCard from "./EnvironmentShareCard";
import { TEnvironmentShare } from "./EnvironmentShareController";
import { Empty } from "antd";

type props = {
    fetchData: () => void;
    id?: number;
    setToShare: Dispatch<SetStateAction<{ open: boolean; environment?: TEnvironment }>>;
}

export default function EnvironmentShare({ fetchData, id, setToShare }: props) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [actions, setActions] = useState([])
    const isAllowed = verifyPermitions(actions);

    async function fetchEnvironment() {
        setIsLoading(true)
        const res = await EnvironmentService.get(id);
        if (res && res.status === 200) {
            setData(res.data.environments[0].share)
            setActions(res.data.environments[0].permitions)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchEnvironment()
    }, [])

    return (
        <>
            {isLoading ? <h1>Carregando...</h1> :
                data && data.length === 0 ? <Empty /> : data.map((e: TEnvironmentShare) => (
                    <EnvironmentShareCard environment={e} />
                )
                )
            }

            <BottomBarForm textOk={'Ok'} actionOk={() => setToShare({ open: false, environment: undefined })} modal width={30} />
        </>
    )
}