import { Input } from 'antd';
import { Controller } from "react-hook-form";
import { RiEyeCloseLine, RiEye2Line } from "react-icons/ri";
import { useState } from "react";


type Props = {
    type?: React.HTMLInputTypeAttribute;
    label: string;
    nameField: string;
    control: any;
    disabled?: boolean;
};

export default function CustomInputForm({ type = 'text', label, nameField, control, disabled }: Props) {
    const [eyes, setEyes] = useState<'closed' | 'opened'>('closed');
    const closedEyes = <RiEyeCloseLine style={{ position: 'absolute', top: '38px', right: '8px' }} onClick={() => setEyes('opened')} />
    const OpenedEyes = <RiEye2Line style={{ position: 'absolute', top: '38px', right: '8px' }} onClick={() => setEyes('closed')} />

    const isPassword = type !== 'password' ? type : eyes === 'opened' ? 'text' : 'password'

    return (
        <Controller
            name={nameField}
            control={control}
            render={({ field, formState: { errors } }) => {
                return (
                    <>
                        <div className="grid w-full items-center gap-1.5 min-w-8 relative">
                            <label htmlFor={`${type}-${label}`}>{label}</label>
                            <Input {...field} className="w-full" type={isPassword} id={`${type}-${label}`} placeholder={label} disabled={disabled} />
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
