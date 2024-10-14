import LateralBar from "./LateralBar";

type props = {
    children: any;
}

export default function WorkLayout({ children }: props) {

    return (
        <div className="w-full min-h-[calc(100vh-48px)] relative pl-12">
            <LateralBar />
            {children}
        </div>
    )
}