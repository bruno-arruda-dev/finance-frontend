import { Button } from "antd";

export default function CustomButton({ children, ...props }: any) {

    return <Button {...props}>{children}</Button>
}