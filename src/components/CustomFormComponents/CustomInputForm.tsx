import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RiEyeCloseLine, RiEye2Line } from "react-icons/ri";
import { useState } from "react";


type Props = {
    type?: React.HTMLInputTypeAttribute;
    label: string;
    nameField: string;
    control: any;
};

export default function CustomInputForm({ type = 'text', label, nameField, control }: Props) {
    const [eyes, setEyes] = useState<'closed' | 'opened'>('closed');
    const closedEyes = <RiEyeCloseLine className="absolute right-2 top-1/2 cursor-pointer" onClick={() => setEyes('opened')} />
    const OpenedEyes = <RiEye2Line className="absolute right-2 top-1/2 cursor-pointer" onClick={() => setEyes('closed')} />

    const isPassword = type !== 'password' ? type : eyes === 'opened' ? 'text' : 'password'

    return (
        <Controller
            name={nameField}
            control={control}
            render={({ field, formState: { errors } }) => {
                console.log(errors);
                return (
                    <>
                        <div className="grid w-full items-center gap-1.5 min-w-8 relative">
                            <Label htmlFor={`${type}-${label}`}>{label}</Label>
                            <Input {...field} className="w-full" type={isPassword} id={`${type}-${label}`} placeholder={label} />
                            {type === 'password' ? eyes === 'closed' ? closedEyes : OpenedEyes : null}
                        </div>
                        {errors[nameField] && typeof errors[nameField].message === "string" && (
                            <p className="text-xs text-primary font-bold error">{errors[nameField].message}</p>
                        )}
                    </>
                );
            }}
        />
    );
}
