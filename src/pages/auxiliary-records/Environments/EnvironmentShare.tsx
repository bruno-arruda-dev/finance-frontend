import { Card } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TEnvironment } from "./Environments";
import { useForm } from "react-hook-form";
import { EnvironmentService } from "../../../services/environment-service";
import { verifyPermitions } from "../../../utils/security-utils";
import { AllEnvironmentShareSchema, TAllEnvironmentShare, TEnvironmentShare } from "./EnvironmentShareController";
import { zodResolver } from "@hookform/resolvers/zod";
import BottomBarForm from "../../../components/BottomBar/BottomBarForm";
import EnvironmentShareCard from "./EnvironmentShareCard";

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
            {
                data && data.map((e: TEnvironmentShare) => (
                    <EnvironmentShareCard environment={e} />
                )
                )
            }

            <BottomBarForm textOk={'Ok'} actionOk={() => setToShare({ open: false, environment: undefined })} hideCancel modal width={30} />
        </>
    )
}