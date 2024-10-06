import LoginForm from "@/app/forms/LoginForm/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import CustomCard from "./CustomCard";
import RegisterForm from "@/app/forms/registerForm/RegisterForm";

export default function LoginCard() {
    return (
        <CustomCard>
            <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2 rounded">
                    <TabsTrigger value="login" className="tab-trigger rounded">Login</TabsTrigger>
                    <TabsTrigger value="registro" className="tab-trigger rounded">Registro</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <br />
                    <LoginForm />
                </TabsContent>
                <TabsContent value="registro">
                    <br />
                    <RegisterForm />
                </TabsContent>
            </Tabs>
        </CustomCard>
    );
}
