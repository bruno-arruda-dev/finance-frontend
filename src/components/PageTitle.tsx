import { useNavigate } from "react-router-dom"
import CollapseButton from "./CollapseButton";

type props = {
    title: string;
    navigate?: string;
}

export default function PageTitle({ title, navigate }: props) {
    const navigateFunc = useNavigate();

    function handleNavigate() {
        if (navigate) {
            navigateFunc(navigate)
        } else {
            navigateFunc(-1)
        }
    }

    return (
        <div className="my-4 flex items-center justify-start">
            <CollapseButton direction="left" size="medium" position="static" onClick={handleNavigate} />
            <h2 className="font-bold text-2xl">{title}</h2>
        </div>
    )
}