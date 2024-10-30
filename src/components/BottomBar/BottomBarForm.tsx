import { Button } from "antd";
type props = {
    actionOk?: any;
    textOk?: any;
    disableOk?: boolean;
    hideOk?: boolean;
    actionCancel?: any;
    textCancel?: any;
    disableCancel?: boolean,
    hideCancel?: any,
}

export default function BottomBarForm({
    actionOk = 'submit',
    textOk = 'Salvar',
    disableOk,
    hideOk,
    actionCancel,
    textCancel = 'Cancelar',
    disableCancel,
    hideCancel,
}: props) {

    return (
        <div className="fixed bottom-0 right-0 bg-primary w-full h-14 pl-14 pr-4 flex flex-row items-center justify-between">

            <div />

            <div className="flex flex-row items-center justify-between gap-4">
                {!hideCancel && <Button
                    onClick={actionCancel}
                    disabled={disableCancel}
                >
                    {textCancel}
                </Button>}

                {!hideOk && <Button
                    onClick={actionOk !== 'submit' ? actionOk : undefined}
                    htmlType={actionOk === 'submit' ? 'submit' : undefined}
                    type="primary"
                    disabled={disableOk}
                >
                    {textOk}
                </Button>}
            </div>
        </div>
    )
}