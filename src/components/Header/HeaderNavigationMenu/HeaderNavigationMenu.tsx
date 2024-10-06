'use client'

import CustomCard from "@/components/CustomCard";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "../../ui/navigation-menu";
import LoginCard from "@/components/LoginCard";

export default function HeaderNavigationMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem className="relative">
                    <NavigationMenuTrigger className="bg-primary">Entrar</NavigationMenuTrigger>
                    <NavigationMenuContent className="absolute top-full -left-64 mt-2">
                        <LoginCard />
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}