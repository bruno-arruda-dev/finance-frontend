import CustomAvatar from "../CustomAvatar";
import HeaderNavigationMenu from "./HeaderNavigationMenu/HeaderNavigationMenu";

export default function Header() {
    return (
        <div className="w-full h-12 px-1 flex items-center justify-between bg-primary text-txt-primary">
            <div />
            <div className="flex gap-4 h-full items-center">
                <HeaderNavigationMenu />
                <CustomAvatar />
            </div>
        </div>
    );
}
