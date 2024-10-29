'use client'
import { useRouter } from "next/navigation";
import CollapseButton from "./CollapseButton";

type props = {
    title: string;
    navigate?: string;
}

export default function PageTitle({ title, navigate }: props) {
    const router = useRouter()

    function handleNavigate() {
        if (navigate) {
            router.push(navigate)
        } else {
            router.back()
        }
    }

    return (
        <div className="my-4 flex items-center justify-start">
            <CollapseButton direction="left" size="medium" position="static" onClick={handleNavigate} />
            <h1 className="font-bold text-2xl">{title}</h1>
        </div>
    )
}