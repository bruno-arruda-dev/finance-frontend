import { Checkbox } from 'antd';
import { Controller } from "react-hook-form";

type Props = {
    label: string;
    nameField: string;
    control: any;
    disabled?: boolean;
};

export default function CustomCheckboxForm({ label, nameField, control, disabled }: Props) {
    return (
        <Controller
            name={nameField}
            control={control}
            render={({ field, formState: { errors } }) => {
                return (
                    <>
                        <div className="grid w-full items-center gap-1.5 min-w-8 relative">
                            <label htmlFor={`${nameField}`}>{label}</label>
                            <Checkbox
                                {...field}
                                checked={field.value}
                                onChange={e => field.onChange(e.target.checked)}
                                className="w-full"
                                id={`${nameField}`}
                                disabled={disabled}
                            />
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
