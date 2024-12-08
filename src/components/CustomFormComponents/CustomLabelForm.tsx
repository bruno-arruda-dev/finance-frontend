import { Skeleton } from "antd"
import dayjs from "dayjs"
import { Controller } from "react-hook-form"

type Props = {
    label: string,
    nameField: string,
    control: any,
    isLoading: boolean,
    format?: 'date' | 'datetime'
}

export default function CustomLabelForm({ label, nameField, control, isLoading, format }: Props) {

    return (
        <Controller
            name={nameField}
            control={control}
            render={({ field }) => {

                let value: string

                switch (format) {
                    case 'date':
                        value = dayjs(field.value).format('DD/MM/YYYY')
                        break;
                    case 'datetime':
                        value = dayjs(field.value).format('DD/MM/YYYY HH:mm:ss')
                        break;
                    default:
                        value = field.value;
                }


                return (
                    <div className="grid w-full items-center gap-1.5 min-w-8 relative">
                        <label htmlFor={`${nameField}`}>{label}</label>
                        {
                            isLoading ? (
                                <Skeleton.Input active style={{ width: '100%' }} />
                            ) : (
                                <p>{value}</p>
                            )

                        }
                    </div>

                )
            }}
        />
    )
}  