import { Card, Tooltip } from "antd";
import dayjs from "dayjs";
import { BiCheckDouble } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";
import { TEnvironmentShare } from "./EnvironmentShareController";

type props = {
    environment: TEnvironmentShare
    onClick: () => void
}

export default function EnvironmentShareCard({ environment, onClick }: props) {
    const actionsTeste = environment.permitions || []

    // const actionsTeste = ["editar", "compartilhar", "deletar"]
    // const actionsTeste = ["compartilhar", "deletar"]
    // const actionsTeste = ["editar"]

    const actions = () => {
        if (actionsTeste.length === 0) return "";
        if (actionsTeste.length === 1) return "Pode " + actionsTeste[0];
        if (actionsTeste.length === 2) return "Pode " + actionsTeste.join(' e ');
        if (actionsTeste.length === 3) return "Pode " + actionsTeste[0] + ", " + actionsTeste[1] + " e " + actionsTeste[2];
    };

    const accepted = environment.accepted === null
        ? <Tooltip title='O convite foi enviado mas ainda não foi aceito ou recusado' className="absolute bottom-0 right-0.5">
            <BiCheckDouble size={20} />
        </Tooltip>
        : environment.accepted === true
            ? <Tooltip title={`O convite foi aceito`} className="absolute bottom-0 right-0.5">
                <BiCheckDouble size={20} className="text-green-500" />
            </Tooltip>
            : <Tooltip title={`Convite recusado`} className="absolute bottom-0.5 right-0.5 text-red-500">
                <TiCancel size={20} />
            </Tooltip>

    return (
        <div onClick={onClick}>
            <Card className="cursor-pointer hover:bg-secondary">
                <p className="absolute top-0 left-2">{environment.userPartnerName ? environment.userPartnerName : environment.userPartnerEmail}</p>
                <p>{actions()}</p>
                <p className="absolute bottom-0.5 left-2 text-[8px]">Convite enviado em {dayjs(environment.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                {accepted}
            </Card>
            <div className="h-1" />
        </div>
    )
}