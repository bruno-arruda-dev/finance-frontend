import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useState } from "react";
import { Controller } from "react-hook-form";
import { RiEye2Line, RiEyeCloseLine } from "react-icons/ri";

type Props = {
    type?: React.HTMLInputTypeAttribute;
    label: string;
    nameField: string;
    control: any;
    readOnly?: boolean;
    disabled?: boolean;
};

export default function CustomDatePickerForm({ type = 'text', label, nameField, control, disabled, readOnly }: Props) {
    const [eyes, setEyes] = useState<'closed' | 'opened'>('closed');
    const closedEyes = <RiEyeCloseLine style={{ position: 'absolute', top: '38px', right: '8px' }} onClick={() => setEyes('opened')} />;
    const OpenedEyes = <RiEye2Line style={{ position: 'absolute', top: '38px', right: '8px' }} onClick={() => setEyes('closed')} />;
    const isPassword = type !== 'password' ? type : eyes === 'opened' ? 'text' : 'password';

    return (
        <Controller
            name={nameField}
            control={control}
            render={({ field, formState: { errors } }) => {
                // Convertendo a string de data em um objeto dayjs
                const dateValue = field.value ? dayjs(field.value) : null;

                return (
                    <>
                        <div className="grid w-full items-center gap-1.5 min-w-8 relative">
                            <label htmlFor={`${type}-${label}`}>{label}</label>
                            <DatePicker
                                {...field}
                                value={dateValue}
                                format={'DD/MM/YYYY HH:mm:ss'}
                                readOnly={readOnly}
                                className="w-full"
                                type={isPassword}
                                id={`${type}-${label}`}
                                placeholder={label}
                                disabled={disabled}
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
