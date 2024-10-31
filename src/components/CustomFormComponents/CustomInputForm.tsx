import { Input } from 'antd';
import { Controller } from "react-hook-form";
import { RiEyeCloseLine, RiEye2Line } from "react-icons/ri";
import { useState } from "react";


type Props = {
    type?: React.HTMLInputTypeAttribute;
    label: string;
    nameField: string;
    control: any;
    readOnly?: boolean;
    disabled?: boolean;
    textTransform?: 'capitalize' | 'uppercase' | 'lowercase'
};

export default function CustomInputForm({ type = 'text', label, nameField, control, disabled, readOnly, textTransform = 'lowercase' }: Props) {
    const [eyes, setEyes] = useState<'closed' | 'opened'>('closed');
    const closedEyes = <RiEyeCloseLine style={{ position: 'absolute', top: '38px', right: '8px' }} onClick={() => setEyes('opened')} />
    const OpenedEyes = <RiEye2Line style={{ position: 'absolute', top: '38px', right: '8px' }} onClick={() => setEyes('closed')} />

    const isPassword = type !== 'password' ? type : eyes === 'opened' ? 'text' : 'password'

    return (
        <Controller
            name={nameField}
            control={control}
            render={({ field, formState: { errors } }) => {
                const error = errors[nameField] ? 'error' : undefined;

                return (
                    <>
                        <div className="grid w-full items-center gap-1.5 min-w-8 relative">
                            <label htmlFor={`${type}-${label}`}>{label}</label>

                            <Input
                                {...field}
                                readOnly={readOnly}
                                className="w-full"
                                type={isPassword}
                                id={`${type}-${label}`}
                                placeholder={label}
                                disabled={disabled}
                                style={{ textTransform: textTransform }}
                                status={error}
                            />

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
