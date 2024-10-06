import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

type props = {
    title?: string;
    description?: string;
    children: any;
    footer?: string;
}

export default function CustomCard({ title, description, children, footer }: props) {

    return (
        <Card className="bg-primary items-center justify-center text-txt-primary p-4 mx-4 w-full">
            {title || description && <CardHeader>
                {title && <CardTitle><h3 className="font-bold">{title}</h3></CardTitle>}
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>}

            <CardContent>
                {children}
            </CardContent>

            {footer && <CardFooter>
                {footer}
            </CardFooter>}
        </Card>)

}