import { Button as Btn } from "./ui/button"

type props = {
    children: any;
    type?: "submit" | "reset" | "button";
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null;
}

export default function Button({ children, type = 'submit', variant = 'default' }: any) {

    return (
        <Btn className="bg-secondary hover:bg-highlight w-full" type={type} variant={variant}>{children}</Btn>
    )
}