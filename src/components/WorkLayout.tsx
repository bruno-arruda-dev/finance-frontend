import LateralBar from "./LateralBar";

type props = {
    children: any;
}

export default function WorkLayout({ children }: props) {

    return (
        <div className="w-full min-h-[calc(100vh-48px)] relative pl-16 pr-4 py-2">
            <LateralBar />
            {children}
        </div>
    )
}